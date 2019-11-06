import express from 'express';
const router = express.Router();
import Campground from '../models/campground';
import Comment from '../models/comment';
import middleware from '../middleware/index';

router.delete("/campgrounds/:id/comments/:comment_id",middleware.canComment,function(req,res){
	Comment.findByIdAndRemove(req.params.comment_id,function(err){
		if(err)
		{
			req.flash("error", "Something went wrong!");
			res.redirect("back");
		}
		else
		{
			req.flash("success", "Deleted successfully!");
			res.redirect("/campgrounds/"+req.params.id);
		}
	});
});

router.get("/campgrounds/:id/comments/:comment_id/edit",middleware.canComment,function(req,res)
{
Campground.findById(req.params.id,function(err,foundCamp)
{
	if(err)
	{
		console.log(err);
	}
	else
	{
		console.log("ALL PARAMS "+ express.json(req.params));
		console.log("comment id"+ req.params.comment_id);
		
		console.log("PARAMS COMMENT "+req.params.comment_id);
		Comment.findById(req.params.comment_id,function(err,comment)
		{
			if(err)
			{
				res.redirect("back");
			}
			else
			{
				res.render("comments/edit",{comment:comment,campground:foundCamp});
			}
		});
		
	}
});
});

router.put("/campgrounds/:id/comments/:comment_id",middleware.canComment,function(req,res)
{
	Comment.findByIdAndUpdate(req.params.comment_id,req.body.comment,function(err,foundComment)
	{
		if(err)
		{
			res.redirect("back");
		}
		else{
			res.redirect("/campgrounds/"+req.params.id);
		}
	});
});

router.get("/campgrounds/:id/comments/new", middleware.isLoggedIn,function(req,res)
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

router.post("/campgrounds/:id/comments", middleware.isLoggedIn, function(req,res)
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
							req.flash("error", "Something went wrong!");
							console.log(err);
						}
						else
						{
              comment.author.id = req.user.id;
              comment.author.username = req.user.username;
              comment.save();
							campground.comments.push(comment);
							campground.save();
							req.flash("success", "Successfully added comment!");
							res.redirect("/campgrounds/"+campground._id);
						}
					});
			}
		});
  });
  module.exports = router;