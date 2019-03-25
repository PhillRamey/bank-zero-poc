# Bank Zero PoC
This PoC leverages Auth0's [Universal Login Page](https://auth0.com/docs/universal-login), [rules](https://auth0.com/docs/rules), and [RBAC in the Core Authorization](https://auth0.com/docs/authorization/guides/how-to) feature set to demonstrate capabilities that meet the needs of a fictional bank modernizing it's consumer identity platform.

## Overview
### Login Options
As currently configured, PoC users can sign up and log in via the following methods: Facebook, Google, and email/password (in the Auth0 database).

By default, when leveraging the Universal Login Page, the email/password and Google options are available. To setup Facebook, or [other social connections](https://auth0.com/docs/identityproviders), activate them in the [Auth0 dashboard](https://manage.auth0.com/#/connections/social) and follow the provided instructions for your selected connection.

### Whitelist Rules
Although any user may sign up via the social login methods, this PoC utilizes an [email domain whitelist rule](https://auth0.com/rules/simple-domain-whitelist) to limit email/password signups to those with an email address on the `musubilabs.com`, `teampandy.club`, or `bankzero.xyz` domains. If a users attempts to sign up with an email address that does not match one of the specified domains, they will be directed to the homepage with guidance.

### User Roles
This PoC supports three roles that have been set up in the Auth0 Dashboard for the Bank Zero PoC. Based on the assigned role, users will see different information upon logging in and their ability to make requests to certain API endpoints will be restricted.
1. Customer - See an informational panel
2. Employees - See a list of customers
3. Managers - See a list of customers and employees

## Organization and Setup
In order to run this PoC on your own, you will need to complete the below setup instructions. Note that in addition to completing configuration steps detailed below in the [Auth0 Dashboard](https://manage.auth0.com), there are three folders that contain the PoC code which also need to be configured. Information on how to configure the API, app, and Auth0 rules are included in the README file within each folder.

### Auth0
If you haven't already, [create a free Auth0 account](https://auth0.com/signup). Prior 

**Create and configure the client app**
1. Create a new applicaiton and select "Single Page Web App" as the application type
2. Select the "Settings" tab and:
2a. Enter `http://localhost:3000/callback` into the Allowed Callback URLs field
2b. Enter `http://localhost:3000` into the Allowed Web Origins and Allowed Logout URLs fields
2c. Save your changes

**Create and configure the API**
1. From the "APIs" tab, click the button to "Create API"
2. Complete the New API form:
2a. Enter a name of your choice
2b. Enter `http://localhost:3001` for the Identifier
2c. Leave the Signing Algorithm as `RS256`
2d. Click "Create"
3. Select the "Settings" tab and under "RBAC Settings", toggle "Enable RBAC" and "Add Permissions in the Access Token" to be on and save
4. Selet the "Permissions" tab and create the following permissions: `read:customers` `read:employees`

**Create and configure roles**
1. Access the [roles](https://manage.auth0.com/#/roles) section of the Auth0 Dashboard
2. Click the "Create Role" button to create each of the three roles and add the relevant permissions
2a. Customer
2b. Employee - `read:customers`
2c. Manager - `read:customers` `read:employees`

### API

### App

### Auth0 Rules