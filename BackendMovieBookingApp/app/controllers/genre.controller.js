const {Genre}=require("../models/index")

const findAllGenres=async(req,res)=>{
  
    try {
        const genre=await Genre.find();
        res.status(200).json({success:true,genres:genre})
    } catch (error) {
        res.status(500).json({ success: false, msg: error });
    }
    
    

}
module.exports={findAllGenres}