// creating Mongoose Schema for db
import  mongoose from  'mongoose';

const campgroundSchema = new mongoose.Schema(
  {
    name: String,
    image: String,
    price: String,
    description: String,
    author:
    {
      id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
      },
      username: String
    },
    comments:[
    	{
    		type:mongoose.Schema.Types.ObjectId,
    		ref:"Comment"
    	}
    ]
  },
);

export default mongoose.model('Campground', campgroundSchema);
