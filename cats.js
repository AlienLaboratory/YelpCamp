let mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/cat_app",
	{useNewUrlParser:true,useUnifiedTopology:true});

let catSchema = mongoose.Schema(
{
	name:String,
	age:Number,
	temperament:String
}
	);

let Cat = mongoose.model("Cat",catSchema);

let george = new Cat({
	name:"Smalec",
	age:180,
	temperament:"Bush"
});

/*george.save(function(err,cat){
if(err)
{
	console.log("Something went wrong!");
}
else
{
	console.log("Successfully saved Cat to DB");
	console.log(cat);
}
});
*/


Cat.create({
	name:"Loldast",
	age:1111,
	temperament:"Blant"
},function(err,cat){
if(err)
{
	console.log("ERROR:"+err);
}
else
{
	console.log("Cat Added:");
	console.log(cat);
}
});



Cat.find({},function(err,cats){
if(err)
{
	console.log("ERROR:"+err);
}
else
{
	console.log("Cats:");
	console.log(cats);
}
});