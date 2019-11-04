import Comment from '../models/comment';
module.exports = function canComment(req,res,next)
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