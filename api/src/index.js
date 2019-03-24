//import dependencies
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const jwt = require('express-jwt');
const jwtAuthz = require('express-jwt-authz');
const jwksRsa = require('jwks-rsa');
const axios = require('axios');
require('dotenv').config();

if (!process.env.AUTH0_DOMAIN || !process.env.AUTH0_AUDIENCE) {
  throw 'Make sure you have AUTH0_DOMAIN, and AUTH0_AUDIENCE in your .env file'
}

// define the Express app
const app = express();

// the database
const questions = [];

// enhance your app security with Helmet
app.use(helmet());

// use bodyParser to parse application/json content-type
app.use(bodyParser.json());

// enable all CORS requests
app.use(cors());

// log HTTP requests
app.use(morgan('combined'));

//placeholder route
app.get('/', (req, res) => {
  res.send({})
});

const checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`
  }),

  // Validate the audience and the issuer.
  audience: process.env.AUTH0_AUDIENCE,
  issuer: `https://${process.env.AUTH0_DOMAIN}/`,
  algorithms: ['RS256']
});

//roles and their ID
const roles = {
  customer: 'rol_knjusLtm4f4DD8G7',
  employee: 'rol_iJ4iTpYOPHrW6VH9',
  manager: 'rol_0p7iXed9JVRrYHcH'
}
const canViewCustomers = jwtAuthz([ 'read:customers' ]);
const canViewEmployees = jwtAuthz([ 'read:employees' ]);

app.get('/permissions', checkJwt, (req, res) => {
  res.send(req.user.permissions);
});

app.get('/customers', checkJwt, canViewCustomers, (req, res) => {
  axios({ 
    method: 'post',
    url: `https://${process.env.AUTH0_DOMAIN}/oauth/token`,
    data: {
      grant_type: 'client_credentials',
      client_id: process.env.AUTH0_CLIENT_ID,
      client_secret: process.env.AUTH0_CLIENT_SECRET,
      audience: `https://${process.env.AUTH0_DOMAIN}/api/v2/`  
    }
  })
    .then(response => {
      axios({
        method: 'get',
        url: `https://${process.env.AUTH0_DOMAIN}/api/v2/roles/${roles.customer}/users`,
        headers: {
          Authorization: `Bearer ${response.data.access_token}`
        }
      })
      .then(response => {
        res.send(response.data);
      })
      .catch(error => console.log(error));
    })
    .catch(error => console.log(error));
});

app.get('/employees', checkJwt, canViewEmployees, (req, res) => {
  axios({ 
    method: 'post',
    url: `https://${process.env.AUTH0_DOMAIN}/oauth/token`,
    data: {
      grant_type: 'client_credentials',
      client_id: process.env.AUTH0_CLIENT_ID,
      client_secret: process.env.AUTH0_CLIENT_SECRET,
      audience: `https://${process.env.AUTH0_DOMAIN}/api/v2/`  
    }
  })
    .then(response => {
      axios({
        method: 'get',
        url: `https://${process.env.AUTH0_DOMAIN}/api/v2/roles/${roles.employee}/users`,
        headers: {
          Authorization: `Bearer ${response.data.access_token}`
        }
      })
      .then(response => {
        res.send(response.data);
      })
      .catch(error => console.log(error));
    })
    .catch(error => console.log(error));
});

// start the server
app.listen(3001, () => {
  console.log('listening on port 3001');
});