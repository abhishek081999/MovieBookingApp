const {Artist}=require("../models/index")

const findAllArtists=async(req,res)=>{
  
    try {
        const artist=await Artist.find();
        res.status(200).json({success:true,artists:artist})
    } catch (error) {
    res.status(500).json({ success: false, msg: error });
    }
    
    

}
module.exports={findAllArtists}