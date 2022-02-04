require('../../db/connection');
const bcrypt = require('bcryptjs');
const User = require('../../models/userSchema');


//// Admin Sign in

exports.signin=async(req,res)=>{
    console.log(req.body)
    const {email,password}=req.body
    if (!email || !password) {
        res.status(400).json({ message: "plz fill all the filds" })
    }
    try {
        const getEmail = await User.findOne({ email: email });
        if(getEmail){
            const isMatch=await bcrypt.compare(password,getEmail.password);
            if(isMatch){
                if(getEmail.type==='admin'){
                    const token=await getEmail.generateAuthToken();
                    res.cookie('jwtCookie',token,{
                        expires:new Date(Date.now()+2589200000),  ////  25892000000  is  equal  to  30 day  in  millisecond
                        httpOnly:true
                    })
                    res.status(200).json({ message: "Sucessfully Login",token:token,user:getEmail })
                }else{
                    res.status(400).json({ message: "You are not admin" })
                }
                
            }else{
                res.status(400).json({ message: "Invalid Email or Password" })
            }
        }else{
            res.status(400).json({ message: "Invalid Email or Password" })
        }
        
    } catch (error) {
        
    }
}

exports.signout=(req,res)=>{
    res.clearCookie('jwtToken')
    res.status(200).json({message:"LogOut Sucessfully"})
}