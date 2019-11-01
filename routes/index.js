import express from 'express';
const router = express.Router();
import User from '../models/user';
import passport from 'passport';


router.get('/', (req, res) => {
  res.render('campgrounds/landing');
});

router.get("/register",function(req,res){
    res.render("register");
  });

  router.post("/register",function(req,res){
    const newUser = new User({username:req.body.username});
    User.register(newUser,req.body.password,function(err,user)
    {
      if(err)
      {
        console.log(err);
        return res.render("register");
      }
        passport.authenticate("local")(req,res,function(){
          res.redirect("/campgrounds");
        });
    });
  });

  router.get('/login',function(req,res)
  {
    res.render("login");
  });

  router.post('/login',passport.authenticate("local",{
    successRedirect:"/campgrounds",
    failureRedirect:"/login"
  }),function(req,res)
  {
  });

  router.get("/logout",function(req,res){
    req.logout();
    res.redirect("/campgrounds");
  });

  module.exports = router;