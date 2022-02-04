require('../db/connection')
const express = require('express');
const router = express();
const {userAuth}=require('../middleware/middleware')
const {addToCart,getCartItem,removeCartItems}=require('../controller/cart')

router.post('/user/cart/addtocart',userAuth,addToCart)
router.post('/user/cart/getcartitem',userAuth,getCartItem)
router.post('/user/cart/removecartitem',userAuth,removeCartItems)

module.exports=router