require('../db/connection');
const Cart = require('../models/cartSchema');



exports.addToCart = async (req, res) => {
    const isCartAvailable = await Cart.findOne({ user: req.rootUser._id })
    if (isCartAvailable) {
        const getproduct = req.body.cartItem.product
        const isDuplicatedProductAvailable = isCartAvailable.cartItem.find((c) => {
            return c.product.toString() === getproduct;
        })
        if (isDuplicatedProductAvailable) {
            condition = { user: req.userId, "cartItem.product": getproduct }
            action = {
                $set: {
                    "cartItem.$": {
                        ...req.body.cartItem,
                        quantity: isDuplicatedProductAvailable.quantity + 1
                    }
                }
            }
            const updateCart = await Cart.findOneAndUpdate(condition, action, { upsert: true })
            if (updateCart) {
                res.status(200).json({ message: 'Cart Updated Sucessfull' })
            } else {
                res.status(400).json({ message: 'Something went wrong in cart' })
            }
        } else {
            condition = { user: req.userId }
            action = {
                "$push": {
                    "cartItem": req.body.cartItem
                }
            }

            const updateCart = await Cart.findOneAndUpdate(condition, action, { "upsert": true, 'new': true })
            if (updateCart) {
                res.status(200).json({ message: 'Cart Updated Sucessfull' })
            } else {
                res.status(500).json({ message: 'Something went wrong in cart' })
            }
        }
    } else {
        console.log('add to cart')
        const cart = Cart({
            user: req.userId,
            cartItem: req.body.cartItem
        })
        const addCart = await cart.save()
        if (addCart) {
            res.status(200).json({ message: 'Add To Cart' })
        } else {
            res.status(400).json({ message: 'Something went wrong' })
        }
    }
}



////  Get Cart Item

exports.getCartItem = async (req, res) => {
    try {
        const mycart = await Cart.findOne({ user: req.rootUser._id }).populate("cartItem.product", "_id name price productPictures")
        if (mycart) {
            let cartItems = {};
            mycart.cartItem.forEach((item, index) => {
                cartItems[item.product._id.toString()] = {
                    _id: item.product._id.toString(),
                    name: item.product.name,
                    img: item.product.productPictures[0].img,
                    price: item.product.price,
                    qty: item.quantity,
                };
            });
            res.status(200).json({ cartItems });
        } else {
            return res.status(200).json({ msg: 'cart is empty' })
        }
    } catch (error) {
        return res.status(500).json({ msg: 'Something went wrong' })
    }
}


///// Remove Cart Items


exports.removeCartItems =async (req, res) => {
    const { productId } = req.body.payload;
    // const { productId } = req.body;
    if (productId) {
       const rmvCart=await Cart.updateOne( { user: req.rootUser._id }, { $pull: {  cartItem: {product: productId, }, }, }  )
       if(rmvCart){
        res.status(200).json({ msg: 'Remove from cart sucessfully' })
       }else{
        res.status(400).json({ msg: 'Something went wrong' })
       }
    }
};