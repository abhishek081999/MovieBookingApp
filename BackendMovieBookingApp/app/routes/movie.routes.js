const {Router}=require("express");

module.exports=(app)=>{
    const moviesController=require("../controllers/movie.controller")
    
    const router=require('express').Router();

    router.get('/',moviesController.findAllMovies);
    router.get('/:id',moviesController.findOne);
    router.get('/:id/shows',moviesController.findShows); 

    app.use("/api/movies",router);
}

