import express from 'express';
const router = express.Router();
import Campground from '../models/campground';



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

router.get('/campgrounds/new', (req, res) => {
  res.render('campgrounds/new');
});


router.get('/campgrounds/:id', (req, res) => {

  Campground.findById(req.params.id).populate("comments").exec(function(err, camp){
  	console.log("found camp " + camp);
    res.render('campgrounds/show', { campground: camp });
  });

});

router.post('/campgrounds', (req, res) => {
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

module.exports = router;