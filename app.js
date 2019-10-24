const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Campground = require("./models/campground");
const seedDB = require("./seeds");
const Comment = require("./models/comment")
const passport = require("passport");
const localStrategy = require("passport-local");
const passportLocalMongoose = require("passport-local-mongoose");
const expressSession = require("express-session");
const User = require("./models/user");
app.use(express.static(__dirname+"/public"));
app.use(expressSession(
  {
    secret:"area 51",
    resave:false,
    saveUninitialized:false
  }
));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

seedDB();
const connectionString = "mongodb+srv://Oleksandr:ecu3ador4@cluster0-hnbvl.mongodb.net/test?retryWrites=true&w=majority";

mongoose.connect(connectionString,{useNewUrlParser:true,useUnifiedTopology:true});

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('landing');
});

function isLoggedIn(req,res,next)
{
  if(req.isAuthenticated())
  {
    return next();
  }
  res.redirect("/login");
}


app.get('/campgrounds', (req, res) => {
  // get campgrounds from yelpCamp Database
  Campground.find({}, (err, allCampgrounds) => {
    if (err) {
      console.log(err);
    } else {
			 res.render('campgrounds/index', { campgrounds: allCampgrounds });
    }
  });
});

app.get('/campgrounds/new', (req, res) => {
  res.render('campgrounds/new');
});


app.get('/campgrounds/:id', (req, res) => {

  Campground.findById(req.params.id).populate("comments").exec(function(err, camp){
  	console.log("found camp " + camp);
    res.render('campgrounds/show', { campground: camp });
  });

});

app.post('/campgrounds', (req, res) => {
  // res.render("campgrounds");
  const { name } = req.body;
  const { image } = req.body;
  const { description } = req.body;
  const newCamp = { name, image, description };
  // here we need to create a new campground and save it to a database(yelpCamp)
  Campground.create(newCamp, (err, campground) => {
    if (err) {
      console.log(err);
    } else {
      res.redirect('/campgrounds');
    }
  });
});

app.get("/campgrounds/:id/comments/new",isLoggedIn,function(req,res)
	{
		Campground.findById(req.params.id,function(err,foundCamp)
			{
				if(err)
				{
					console.log(err);
				}
				else
				{
					res.render("comments/new",{campground:foundCamp});
				}
				
			});
	});

app.post("/campgrounds/:id/comments", isLoggedIn, function(req,res)
	{
		Campground.findById(req.params.id,function(err,campground)
		{
			if(err)
			{
				console.log(err);
			}
			else
			{
				Comment.create(req.body.comment,function(err,comment)
					{
						if(err)
						{
							console.log(err);
						}
						else
						{
							campground.comments.push(comment);
							campground.save();
							res.redirect("/campgrounds/"+campground._id);
						}
					});
			}
		});
  });
  

  app.get("/register",function(req,res){
    res.render("register");
  });

  app.post("/register",function(req,res){
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

  app.get('/login',function(req,res)
  {
    res.render("login");
  });

  app.post('/login',passport.authenticate("local",{
    successRedirect:"/campgrounds",
    failureRedirect:"/login"
  }),function(req,res)
  {
  });

  app.get("/logout",function(req,res){
    req.logout();
  });

app.listen(9000, () => {
  console.log('YELP CAMP SEVER HAS STARTED!');
});
