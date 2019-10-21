const mongoose = require("mongoose");
const Campground = require("./models/campground");
const Comment = require("./models/comment");

const data = [
{name:"Super Campground",
image: "https://images.unsplash.com/photo-1533732533124-5e089ed02342?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
description:"blah blah blah"
},
{name:"The Greatest View",
image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
description:"blah blah blah"
},
{name:"Perfect Nature",
image: "https://images.unsplash.com/photo-1516571748831-5d81767b788d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
description:"blah blah blah"
}
];

function seedDB()
{

	//remove all campgrounds
	Campground.remove({},function(err)
	{
	if(err)
	{
		console.log(err);
	}
	else
	{
		console.log("Everything is removed now");

		//add a few campgrounds
		data.forEach(function(seed)
		{
			Campground.create(seed,function(err,campground){
				if(err)
				{
					console.log(err);
				}
				else
				{
					console.log("created campground");
					//now can create comment

					Comment.create({text:"sample text",author:"Alex"},function(err,comment){
						if(err)
						{
							console.log(err);
						}
						else
						{
							campground.comments.push(comment);
							campground.save();
							console.log("created comment")
						}
					});
				}
			});
		});

	}
	});

	

}

module.exports = seedDB;