const {Router}=require("express");

module.exports=(app)=>{
    const userController=require("../controllers/user.controller")
    
    const router=require('express').Router();

    
    router.post('/signup',userController.signUp);
    router.post('/login',userController.login); 
    router.post('/logout',userController.logout);
    router.get('/coupons',userController.getCoupons);
    router.post('/bookings',userController.bookShow)
    app.use("/api/auth",router);
}