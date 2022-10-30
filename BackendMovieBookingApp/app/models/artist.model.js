const Artist=(mongoose)=>{
      const ArtistSchema=mongoose.Schema({
          artistid:Number,
          first_name:String,
          last_name:String,
          wiki_url:{
            type:String,
            default:"https://en.wikipedia.org/wiki/Amitabh_Bachchan",
        },
          profile_url:{
            type: String,
            default:"https://wikibio.in/wp-content/uploads/2017/12/Amitabh-Bachchan.jpg",

        },
        movies:[],

      },{timestamp:true})
      const Artist= mongoose.model('artists',ArtistSchema)
      return Artist;
}
module.exports=Artist;