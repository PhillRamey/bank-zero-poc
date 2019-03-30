function (user, context, callback) {
  //If there is already a role assigned, don't do anything.
  if(context.authorization && context.authorization.roles) {
    if(context.authorization.roles.length > 0) {
      callback(null, user, context);
      return null;
    }
  }
  
  //Roles and IDs
  const roles = {
    customer: 'rol_knjusLtm4f4DD8G7',
    employee: 'rol_iJ4iTpYOPHrW6VH9',
    manager: 'rol_0p7iXed9JVRrYHcH'
  };
  let roleId = roles.customer;
  
  //Check the user's email domain to determine their role
  const emailSplit = user.email.split('@');
  let userDomain = emailSplit[emailSplit.length -1].toLowerCase();
  
  if (user.email === 'manager@bankzero.xyz' || user.email === 'president@bankzero.xyz') {
    roleId = roles.manager;
  } else
  if (userDomain === 'teampandy.club' || userDomain === 'musubilabs.com' || userDomain === 'bankzero.xyz') {
    roleId = roles.employee;
  }
  
  //Get access_token for calls to management API
  var options = { 
    method: 'POST',
    url: 'https://bank-zero-poc.auth0.com/oauth/token',
    headers: { 'content-type': 'application/json' },
    body: {
      grant_type: 'client_credentials',
      client_id: 'ksMyEmhbyC6V2IHox1fGZbDcnRKTueCO',
      client_secret: configuration.bankZeroClientSecret,
      audience: 'https://bank-zero-poc.auth0.com/api/v2/' },
    json: true };
  
  request(options, function(error, response, body) {
    if (error) throw new Error(error);
    let options = {
      method: 'POST',
      url: 'https://bank-zero-poc.auth0.com/api/v2/users/' + user.user_id + '/roles',
      headers: { 'content-type': 'application/json',
                 'Authorization': 'Bearer ' + body.access_token
               },
      body: {
        roles: [roleId]
      },
      json: true
    };
    request(options, function(error, response, body) {
      if (error) throw new Error(error);
      //don't execute callback until after role is assigned so that user gets expected experience
      callback(null, user, context);
    });

  });
}