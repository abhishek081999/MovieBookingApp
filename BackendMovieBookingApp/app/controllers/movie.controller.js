const { Movie } = require("../models/index")

const findAllMovies = async(req, res) => {
    if (req.query.status === undefined) {
        const movie=await Movie.find();
        if(movie!==null){
            res.status(200).json({ success: true, movies: movie });
        }else{
            res.status(500).json({ success: false, msg: err });
        };
    } else {
        let status = req.query.status;
        let conditionTocheck = null;
        if (status === "PUBLISHED") {
            conditionTocheck = {};
            conditionTocheck.published=true;
            
        }
      else if (status === "RELEASED") {
           conditionTocheck = {};
            conditionTocheck.released=true;
            
        
        if (req.query.title!==undefined) {
            conditionTocheck.title=req.query.title
        }
        if (req.query.genres!==undefined) {
            conditionTocheck.genres=req.query.genres
        }
        if (req.query.artists!==undefined) {
            conditionTocheck.artists=req.query.artists
        }
    };
    if(conditionTocheck!==null){
        Movie.find(conditionTocheck).then((data)=>{
            res.status(200).json({success:true,movies:data})
        }).catch((err) => {
            res.status(500).json({ success: false, msg: err });
        });
    }
    }
    

}


const findOne = async(req,res) => {
    try {
     const movieid=req.params.id;
     const movie=await Movie.findOne({movieid});
      if(movie.length1!==null){
      res.status(200).json([movie]);
       }
    } catch (error) {
        res.status(404).json({ success: true,msg:"id dosen't match" });
    }
}

const findShows = async(req,res) => {
    try {
        const showsid=req.params.id;
        const movie=await Movie.findOne({showsid});
         if(movie.length1!==null){
         res.status(200).json({ success: true, shows:movie.shows });
          }
       } catch (error) {
           res.status(404).json({ success: true,msg:"id dosen't match" });
       }
}

module.exports={findAllMovies,findOne,findShows}
