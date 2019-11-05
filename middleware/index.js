import Comment from '../models/comment';
import Campground from '../models/campground';
const middleware = {};

middleware.isLoggedIn = function isLoggedIn(req,res,next)
{
  if(req.isAuthenticated())
  {
    return next();
  }
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
          res.redirect("back");
        }
        
      }
    });
  }
  else
  {
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
          res.redirect("back");
        }
        
      }
    });
  }
  else
  {
    res.redirect("/login");
  }
}

module.exports = middleware;