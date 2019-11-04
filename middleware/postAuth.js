import Campground from '../models/campground';
module.exports = function isAuthorized(req,res,next)
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