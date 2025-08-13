function isAuthenticate(req, res, next) {
  if (req.session.user) {
    return next();
  }
  res.status(401).send('Unauthorized');
}

module.exports = {
  isAuthenticate
};
