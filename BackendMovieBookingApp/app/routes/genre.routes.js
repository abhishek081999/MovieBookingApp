const {Router}=require("express");

module.exports=(app)=>{
    const genresController=require("../controllers/genre.controller")
    
    const router=require('express').Router();

    router.get('/',genresController.findAllGenres);
     

    app.use("/api/genres",router);
}
