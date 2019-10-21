const express = require('express');

const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Campground = require("./models/campground");
const seedDB = require("./seeds");

seedDB();

const campgrounds = [
  {
    name: 'John',
    image: 'https://images.unsplash.com/photo-1504851149312-7a075b496cc7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
  },
  {
    name: 'Lampsy',
    image: 'https://images.unsplash.com/photo-1530541930197-ff16ac917b0e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
  },
  {
    name: 'Lance',
    image: 'https://images.unsplash.com/photo-1517771778436-39f5763f5270?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
  },
  {
    name: 'Franz',
    image: 'https://images.unsplash.com/photo-1470246973918-29a93221c455?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
  },
  {
    name: 'John',
    image: 'https://images.unsplash.com/photo-1504851149312-7a075b496cc7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
  },
  {
    name: 'Lampsy',
    image: 'https://images.unsplash.com/photo-1530541930197-ff16ac917b0e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
  },
  {
    name: 'Lance',
    image: 'https://images.unsplash.com/photo-1517771778436-39f5763f5270?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
  },
  {
    name: 'Franz',
    image: 'https://images.unsplash.com/photo-1470246973918-29a93221c455?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
  },
];

// connecting/creating yelpCamp database (USING LOCAL MONGODB)
//mongoose.connect('mongodb://localhost/yelpCamp', { useNewUrlParser: true, useUnifiedTopology: true });

// connecting/creating yelpCamp database (USING CLOUD ATLAS MONGODB)
const connectionString = "mongodb+srv://Oleksandr:ecu3ador4@cluster0-hnbvl.mongodb.net/test?retryWrites=true&w=majority";

mongoose.connect(connectionString,{useNewUrlParser:true,useUnifiedTopology:true});

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('landing');
});



Campground.create({
  name: 'Franz',
  image: 'https://images.unsplash.com/photo-1470246973918-29a93221c455?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
  description: 'test description',
}, (err, campground) => {
  if (err) {
       	 console.log(`Error${err}`);
  } else {
       	console.log(`successfully created ${campground}`);
  }
});


app.get('/campgrounds', (req, res) => {
  // get campgrounds from yelpCamp Database
  Campground.find({}, (err, allCampgrounds) => {
    if (err) {
      console.log(err);
    } else {
			 res.render('index', { campgrounds: allCampgrounds });
    }
  });
});

app.get('/campgrounds/new', (req, res) => {
  res.render('new');
});


app.get('/campgrounds/:id', (req, res) => {

  Campground.findById(req.params.id).populate("comments").exec(function(err, camp){
  	console.log("found camp " + camp);
    res.render('show', { campground: camp });
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

app.listen(9000, () => {
  console.log('YELP CAMP SEVER HAS STARTED!');
});
