# Bank Zero PoC
This PoC leverages Auth0's [Universal Login Page](https://auth0.com/docs/universal-login), [rules](https://auth0.com/docs/rules), and [RBAC in the Core Authorization](https://auth0.com/docs/authorization/guides/how-to) feature set to demonstrate capabilities that meet the needs of a fictional bank modernizing it's consumer identity platform.

## Login Options
As currently configured, PoC users can sign up and log in via the following methods: Facebook, Google, and email/password (in the Auth0 database).

By default, when leveraging the Universal Login Page, the email/password and Google options are available. To setup Facebook, or [other social connections](https://auth0.com/docs/identityproviders), activate them in the (Auth0 dashboard)[https://manage.auth0.com/#/connections/social] and follow the provided instructions for your selected connection.

## Whitelist Rules
Although any user may sign up via the social login methods, this PoC utilizes an [email domain whitelist rule](https://auth0.com/rules/simple-domain-whitelist) to limit email/password signups to those with an email address on the `musubilabs.com`, `teampandy.club`, or `bankzero.xyz` domains. If a users attempts to sign up with an email address that does not match one of the specified domains, they will be directed to the homepage with guidance.

## User Roles
This PoC supports three roles that have been set up in the Auth0 Dashboard for the Bank Zero PoC. Based on the assigned role, users will see different information upon logging in and their ability to make requests to certain API endpoints will be restricted.
1. Customer - See an informational panel
2. Employees - See a list of customers
3. Managers - See a list of customers and employees
