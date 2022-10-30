const Genre=(mongoose)=>{
    const GenreSchema=mongoose.Schema({
        genreid:Number,
        genre:String,
       
     },{timestamp:true})
    const Genre= mongoose.model('genres',GenreSchema)
    return Genre;
}
module.exports=Genre;