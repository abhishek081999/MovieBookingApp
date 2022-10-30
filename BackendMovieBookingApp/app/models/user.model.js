const User=(mongoose)=>{
    const UserSchema=mongoose.Schema({
        userid:Number,
        email:String,
        first_name:String,
        last_name:String,
        username:String,
        contact:String,
        password:String,
        role:String,
        isLoggedIn:Boolean,
        uuid:String,
        accesstoken:String,
        coupens:[],
        bookingRequests:[],
},{timestamp:true})
    const User= mongoose.model('users',UserSchema)
    return User;
}
module.exports=User;