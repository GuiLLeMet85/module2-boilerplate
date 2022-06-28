module.exports = isLoggedIn = (req, res, next) => {
  if (!req.session.currentUser) {
    res.redirect('/auth/login');
     return
  }
  next();
}
