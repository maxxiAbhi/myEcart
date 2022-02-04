require('../db/connection');
const bcrypt = require('bcryptjs');
const User = require('../models/userSchema');



///SIGN_UP
exports.signup=async(req,res)=>{
    const { name, email, phone, password, cypassword } = req.body
    if (!name || !email || !phone || !password || !cypassword) {
        res.status(422).json({ message: "plz fill all the filds" })
    }
    try {
        const getEmail = await User.findOne({ email: email });
        const getPhone = await User.findOne({ phone: phone });
        if (getEmail) {
            res.status(422).json({ message: "Email already registered" })
        } else if (getPhone) {
            res.status(422).json({ message: "Phone already registered" })
        } else {
            if (password === cypassword) {
                const user = new User({ name, email, phone, password })
                const userSave = await user.save();
                if (userSave) {
                    res.status(200).json({ message: "Register sucessfully" })
                }
            } else {
                res.status(422).json({ message: "Password and Conform-Password does't match" })
            }
        }

    } catch (error) {
        res.status(500).json({ message: "Something Wrong With Surver plz try after sometime" })
    }
}

///SIGN_IN

exports.signin=async(req,res)=>{
    const {email,password}=req.body
    if (!email || !password) {
        res.status(422).json({ message: "plz fill all the filds" })
    }
    try {
        const getEmail = await User.findOne({ email: email });
        if(getEmail){
            const isMatch=await bcrypt.compare(password,getEmail.password);
            if(isMatch){
                const token=await getEmail.generateAuthToken();
                res.cookie('jwtCookie',token,{
                    expires:new Date(Date.now()+2589200000),  ////  25892000000  is  equal  to  30 day  in  millisecond
                    httpOnly:true
                })
                res.status(200).json({ message: "Sucessfully Login" })
            }else{
                res.status(422).json({ message: "Invalid Email or Password" })
            }
        }else{
            res.status(422).json({ message: "Invalid Email or Password" })
        }
        
    } catch (error) {
        
    }
}