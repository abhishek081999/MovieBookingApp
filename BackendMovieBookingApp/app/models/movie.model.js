const Movie = (mongoose)=> {

const movieSchema=mongoose.Schema({
    movieid: Number,
    title:String,
    published:Boolean,
    released:Boolean,
    poster_url:{
        type:String,
        default:"https://images-na.ssl-images-amazon.com/images/M/MV5BM2FhM2E1MTktMDYwZ…",

    },
    release_date:String,
    publish_date:String,
    artists:{
        type:Array
    },
     genres:{
        type:Array
    },
    duration:Number,
    critic_rating:Number,
    trailer_url:{
        type:String,
        default:"https://www.youtube.com/watch?v=ltIcW2xMuzs"
    },
    wiki_url:{
        type:String,
        default:"https://en.wikipedia.org/wiki/Main_Page"
    },
    story_line:String,
    shows:[],

},{timestamp:true});
 
const Movie=mongoose.model("movies",movieSchema);
return Movie;
}
module.exports=Movie;