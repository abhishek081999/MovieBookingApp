const {Router}=require("express");

module.exports=(app)=>{
    const artistsController=require("../controllers/artist.controller")
    
    const router=require('express').Router();

    router.get('/',artistsController.findAllArtists);
     

    app.use("/api/artists",router);
}


