function adminAuth(req, res, next){
  console.log("session user: ", req.session.user);
  if (req.session.user){
    next();
  } else {
    res.redirect("/login");
  }
}

module.exports = adminAuth;