let express = require("express");
let app = express();
let bodyParser = require("body-parser");
let mongoose = require("mongoose");

let campgrounds = [
{
	name: "John",
	image: "https://images.unsplash.com/photo-1504851149312-7a075b496cc7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
},
{
	name:"Lampsy",
	image: "https://images.unsplash.com/photo-1530541930197-ff16ac917b0e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
},
{
	name:"Lance",
	image:"https://images.unsplash.com/photo-1517771778436-39f5763f5270?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
},
{
	name:"Franz",
	image:"https://images.unsplash.com/photo-1470246973918-29a93221c455?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
},
{
	name: "John",
	image: "https://images.unsplash.com/photo-1504851149312-7a075b496cc7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
},
{
	name:"Lampsy",
	image: "https://images.unsplash.com/photo-1530541930197-ff16ac917b0e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
},
{
	name:"Lance",
	image:"https://images.unsplash.com/photo-1517771778436-39f5763f5270?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
},
{
	name:"Franz",
	image:"https://images.unsplash.com/photo-1470246973918-29a93221c455?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
}
];

//connecting/creating yelpCamp database
mongoose.connect("mongodb://localhost/yelpCamp",{useNewUrlParser:true,useUnifiedTopology:true});



app.use(bodyParser.urlencoded({extended:true}));
 app.set("view engine","ejs");

app.get("/",function(req,res)
{
    res.render("landing");
});

//creating Mongoose Schema for db

let campgroundSchema = new mongoose.Schema(
{
name : String,
image : String,
description: String
}
);

let Campground = mongoose.model("Campground",campgroundSchema);


Campground.create({
	name:"Franz",
	image:"https://images.unsplash.com/photo-1470246973918-29a93221c455?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
	description:"test description"
},function(err,campground){
       if(err)
       {
       	 console.log("Error"+err);
       }
       else
       {
       	console.log("successfully created "+campground);
       }
});


app.get("/campgrounds",function(req,res)
{
	//get campgrounds from yelpCamp Database
	Campground.find({},function(err,allCampgrounds){
		if(err)
		{
			console.log(err);
		}
		else
		{
			 res.render("index",{campgrounds:allCampgrounds});
		}
	});
   
});

app.get("/campgrounds/new",function(req,res)
{	
	res.render("new");
});


app.get("/campgrounds/:id",function(req,res)
	{
		Campground.findById(req.params.id,function(err,camp)
		{
			res.render("show",{campground:camp});
		});
		
	});

app.post("/campgrounds", function(req,res)
{
   //res.render("campgrounds");
   let name = req.body.name;
	let image = req.body.image;
	let description = req.body.description;
	let newCamp = {name: name, image: image,description:description};
	//here we need to create a new campground and save it to a database(yelpCamp)
	Campground.create(newCamp,function(err,campground)
		{
			if(err)
			{
				console.log(err);
			}
			else
			{
				res.redirect("/campgrounds");
			}
		});
    
});

app.listen(9000,function()
{
	console.log("YELP CAMP SEVER HAS STARTED!");
})