const dotenv=require('dotenv')
const express = require('express');
const cors=require('cors');
require('./db/connection')
const PORT = process.env.PORT || 8000;


const app = express()
dotenv.config({path:'./config.env'})

///for response json object
app.use(express.json())



// app.use(cookieParser())
app.use(cors());
// Routes 
const userAuth = require('./route/userAuth')
const category = require('./route/category')
const product = require('./route/product')
const cart = require('./route/cart')
const adminAuth = require('./route/admin/adminAuth')
app.use('/api', userAuth)
app.use('/api', category)
app.use('/api', product)
app.use('/api', cart)
app.use('/api', adminAuth)


app.get('/' , (req , res)=>{

    res.status(200).send('hello from simple server :)')
 
 })
app.listen(PORT, () => {
    console.log("connect...")
})