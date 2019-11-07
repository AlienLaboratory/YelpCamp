import Comment from '../models/comment';
import Campground from '../models/campground';
const middleware = {};

middleware.isLoggedIn = function isLoggedIn(req,res,next)
{
  if(req.isAuthenticated())
  {
    return next();
  }
  req.flash("error", "Please log in first");
  res.redirect("/login");
}

middleware.isAuthorized  = function isAuthorized(req,res,next)
{
  if(req.isAuthenticated())
  {
    Campground.findById(req.params.id,function(err,foundCamp)
    {
      if(err)
      {
        req.flash("error", "Campground not found!");
        console.log(err);
        res.redirect("/campgrounds");
      }
      else
      {
        if(foundCamp.author.id.equals(req.user.id))
        {
           next();
        }
        else
        {
          req.flash("error", "Looks like this campground does not belong to you!");
          res.redirect("back");
        }
        
      }
    });
  }
  else
  {
    req.flash("error", "Please log in first");
    res.redirect("/login");
  }
}

middleware.canComment = function canComment(req,res,next)
{
  if(req.isAuthenticated())
  {
    Comment.findById(req.params.comment_id,function(err,foundComment)
    {
      if(err)
      {
        console.log(err);
        req.flash("error", "Can't comment!");
        res.redirect("/campgrounds");
      }
      else
      {
        console.log("found comment "+foundComment);
        if(foundComment.author.id.equals(req.user._id))
        {
           next();
        }
        else
        {
          req.flash("error", "Could not comment!");
          res.redirect("back");
        }
        
      }
    });
  }
  else
  {
    req.flash("error", "Please log in first");
    res.redirect("/login");
  }
}

module.exports = middleware;