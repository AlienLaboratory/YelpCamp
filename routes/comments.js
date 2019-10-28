import express from 'express';
const router = express.Router();
import Campground from '../models/campground';
import Comment from '../models/comment';
import isLoggedIn from '../middleware/login';

router.get("/campgrounds/:id/comments/new", isLoggedIn,function(req,res)
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

router.post("/campgrounds/:id/comments", isLoggedIn, function(req,res)
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
              comment.author.id = req.user.id;
              comment.author.username = req.user.username;
              comment.save();
							campground.comments.push(comment);
							campground.save();
							res.redirect("/campgrounds/"+campground._id);
						}
					});
			}
		});
  });
  module.exports = router;