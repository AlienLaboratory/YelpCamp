import express from 'express';
const router = express.Router();
import Campground from '../models/campground';
import {isAuthorized} from '../middleware/index';
import {isLoggedIn} from '../middleware/index';
router.get("/campgrounds/:id/edit",isAuthorized,function(req,res)
{
    if(req.isAuthenticated())
    {
      Campground.findById(req.params.id,function(err,foundCamp)
      {
        if(err)
        {
          console.log(err);
          res.redirect("back");
        }
        else
        {
            res.render("campgrounds/edit",{campground:foundCamp});
        }
      });
    }
    else
    {
      res.redirect("/login");
    }

  
});

router.put("/campgrounds/:id",isAuthorized,function(req,res){
    Campground.findByIdAndUpdate(req.params.id,req.body.campground,function(err,updatedCamp){
      if(err)
      {
        res.redirect("/campgrounds");
      }
      else
      {
        res.redirect("/campgrounds/"+req.params.id);
      }
    });
});


router.delete("/campgrounds/:id",isAuthorized,function(req,res){
    Campground.findByIdAndRemove(req.params.id,function(err)
    {
      if(err)
      {
        res.redirect("/campgrounds");
      }
      else
      {
        res.redirect("/campgrounds");
      }
    })
});


router.get('/campgrounds', (req, res) => {
  // get campgrounds from yelpCamp Database
  Campground.find({}, (err, allCampgrounds) => {
    if (err) {
      console.log(err);
    } else {
			 res.render('campgrounds/index', { campgrounds: allCampgrounds, currentUser: req.user});
    }
  });
});

router.get('/campgrounds/new', isLoggedIn, (req, res) => {
  
  res.render('campgrounds/new',{});
});


router.get('/campgrounds/:id', (req, res) => {

  Campground.findById(req.params.id).populate("comments").exec(function(err, camp){
    res.render('campgrounds/show', { campground: camp });
  });

});

router.post('/campgrounds', isLoggedIn, (req, res) => {
  // res.render("campgrounds");
  const { name } = req.body;
  const { image } = req.body;
  const {price} = req.body;
  const { description } = req.body;
  const author = {
    id:req.user._id,
    username:req.user.username
  };
  const newCamp = { name:name, image:image, price:price, description:description,author:author };
  // here we need to create a new campground and save it to a database(yelpCamp)
  Campground.create(newCamp, (err, campground) => {
    if (err) {
      req.flash("error","something went wrong!");
    } else {
      req.flash("success","Successfully created Campground!");
      res.redirect('/campgrounds');
    }
  });
});

export default router;