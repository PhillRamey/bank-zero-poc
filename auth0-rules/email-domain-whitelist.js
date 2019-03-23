function (user, context, callback) {

  const whitelist = ['musubilabs.com', 'teampandy.club']; //authorized domains
  const userHasAccess = whitelist.some(
      function (domain) {
        const emailSplit = user.email.split('@');
        return (emailSplit[emailSplit.length - 1].toLowerCase() === domain || context.connectionStrategy !== 'auth0');
      });

  if (!userHasAccess) {
    return callback(new UnauthorizedError('Access denied. Email and password is only availalbe for Bank Zero Employees.'));
  }
  
  // Access should only be granted to verified users.
  if (!user.email || !user.email_verified) {
    return callback(new UnauthorizedError('Access denied. Please verify your email address.'));
  }

  return callback(null, user, context);
}