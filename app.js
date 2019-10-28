import express from 'express';
const app = express();
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import Campground from "./models/campground";
import seedDB from './seeds';
import Comment from './models/comment';
import passport from 'passport';
import localStrategy from 'passport-local';
import passportLocalMongoose from 'passport-local-mongoose';
import expressSession  from 'express-session';
import User from './models/user';
import campgroundRoutes from './routes/campground';
import commentRoutes from './routes/comments';
import indexRoutes from './routes/index';


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
app.use(function(req,res,next)
{
  res.locals.currentUser = req.user;
  next();
});
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//seedDB();
const connectionString = "mongodb+srv://Oleksandr:ecu3ador4@cluster0-hnbvl.mongodb.net/test?retryWrites=true&w=majority";

mongoose.connect(connectionString,{useNewUrlParser:true,useUnifiedTopology:true});

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(campgroundRoutes);
app.use(commentRoutes);
app.use(indexRoutes);


app.listen(9000, () => {
  console.log('YELP CAMP SEVER HAS STARTED!');
});
