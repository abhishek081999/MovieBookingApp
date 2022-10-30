const {v4 : uuidv4} = require('uuid')
const TokenGenerator = require('uuid-token-generator');
const {User}=require('../models/index')
const b2a = require('b2a')

const login=async(req,res)=>{
    let authToken=req.headers.authorization || req.headers.Authorization;
    authToken = authToken.split('Basic ');
    authToken = authToken[1];
    authToken = b2a.atobu(authToken).split(":");

    try {
      let email=authToken[0];
      let password=authToken[1];
        const olduser=await User.findOne({email});
      if(!olduser){
       return  res.status(404).json({message:"user doesn't exists"});
      }
      const isPasswordCoreect= b2a.btoa(password)===olduser.password;
      if(!isPasswordCoreect){
        return res.status(400).json({message:"invalid credentials"});

      }
     
      const tokgen = new TokenGenerator();
      let accessToken=tokgen.generate()
      const result = await User.findByIdAndUpdate(olduser._id,{
        accesstoken:accessToken,
      });
      res.status(200).json({"access-token":accessToken, "id":olduser.uuid});


    } catch (error) {
        res.status(500).json({message:"something went wrong"})
        console.log(error);
    }
}

 const signUp = async (req, res) => {
    const { email_address:email, password, first_name, last_name ,mobile_number:contact} = req.body;
    try {
      const oldUser = await User.findOne({ email });
  
      if (oldUser) {
        return res.status(400).json({ message: "User already exists" });
      }
  
      const userId = uuidv4()
      const tokgen = new TokenGenerator();
      const result = await User.create({
        email,
        password:b2a.btoa(password),
        uuid: userId,
        name: `${first_name} ${last_name}`,
        accesstoken:tokgen.generate(),
        contact:contact
      });
  
      res.status(201).json({"access-token":result.accessToken, "id":result.uuid});
    } catch (error) {
      res.status(500).json({ message: "Something went wrong" });
      console.log(error);
    }
  };
  
  const logout=async(req,res)=>{
     const accesstoken=req.body.uuid ;
    //  console.log(accesstoken,req.headers);
     if(!accesstoken){
      return res.status(400).json({message:"Missing accesstoken"});
     }
     const user= await User.findOne({uuid: accesstoken});
     if(!user){
      return res.status(400).json({message:"Either login or signup"})
     }
     const result = await User.findByIdAndUpdate(user._id,{
      accesstoken:"",
    });
    return res.status(200).json({message:"Logged Out successfully."})
  }


  const getCoupons=async(req,res)=>{
    let accesstoken=req.headers.authorization || req.headers.Authorization;
    accesstoken = accesstoken.split('Bearer ');
    accesstoken = accesstoken[1];
    if(!accesstoken){
      return res.status(400).json({msg:"Missing accesstoken"});
     }
     const user= await User.findOne({accesstoken});
     if(!user){
      return res.status(400).json({msg:"user is not valid"})
     }
     let discount=0;
     if(user.coupens){
     user.coupens.forEach((coupon)=>{
      if(coupon.id==req.query.code){
        discount=coupon.discountValue
      }
     })
     }
     return res.status(200).json({discountValue:discount});
  }


  const bookShow =async(req,res)=>{
    const {coupon_code,show_id,tickets}=req.body.bookingRequest;
    const reference_number=Math.floor(Math.random()*90000) + 10000;
    let accesstoken=req.headers.authorization || req.headers.Authorization;
    accesstoken = accesstoken.split('Bearer ');
    accesstoken = accesstoken[1];
    if(!accesstoken){
      return res.status(400).json({msg:"Missing accesstoken"});
     }
     const user= await User.findOne({accesstoken});
     if(!user){
      return res.status(400).json({msg:"user is not valid"})
     }
    
     let newbooking=user.bookingRequests?[...user.bookingRequests]:[];
     newbooking.push({coupon_code,reference_number,tickets,show_id})
     
     const result = await User.findByIdAndUpdate(user._id,{
      bookingRequests:newbooking,
    });
   return res.status(201).json({reference_number});
  }
  module.exports={signUp,login,logout,getCoupons,bookShow};
  