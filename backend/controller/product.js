require('../db/connection');
const Product = require('../models/productSchema')
const Category = require('../models/categorySchema');
const slugify = require('slugify')
const { nanoid } = require('nanoid')



/////  add  Product

exports.addProduct = async (req, res) => {
    try {
        const { name, price, discription, offers, reviews, category, quantity } = req.body;
        console.log(req.body)
        let productPictures = [];
        if (!name || !price || !discription || !offers || !category || !quantity) {
            res.status(400).json({ message: "Plz fill all fild properly" })
        }
        if (req.files.length > 0) {
            productPictures = req.files.map(file => {
                return {
                    img: file.filename
                }
            })
        }
        const product = Product({
            name,
            slug: `${slugify(req.body.name)}-${nanoid(5)}`,
            price,
            discription,
            offers,
            quantity,
            productPictures,
            reviews,
            category,
            createdBy: req.userId
        })
        const addproduct = await product.save()
        if (addproduct) {
            res.status(200).json({ message: "Product Added Sucessfully" })
        } else {
            res.status(400).json({ message: "Something went Wrong" })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Something went Wrong" })
    }

}


////  get  Product  By  Id


exports.getProductById = async (req, res) => {
    try {
        const { id } = req.params
        const getProduct = await Product.findOne({
            _id: id
        });
        if (getProduct) {
            res.status(200).json({ product: getProduct })
        } else {
            res.status(400).json({ error: 'invalid id' })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Something went Wrong' })
    }
}


////  get  Product  By  Id
exports.getProductByCategory = async (req, res) => {
    try {
        const { cid } = req.params
        const getProduct = await Product.find({
            category: cid
        });
        Product.find().sort('descending').limit(5).find(function (err, post) {
            console.log(post);
        });
        if (getProduct) {
            res.status(200).json({ product: getProduct })
        } else {
            res.status(400).json({ error: 'invalid id' })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Something went Wrong' })
    }
}


exports.getProductByTime = async (req, res) => {
    try {
        const getProduct = await Product.find().sort({ createdAt: -1 }).limit(10)
        if (getProduct) {
            res.status(400).json({ message: getProduct })
        } else {
            res.status(400).json({ error: 'invalid id' })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Something went Wrong' })
    }
}




exports.getProductByTimeByCategory = async (req, res) => {
    try {
        const {cid}=req.params
        const getProduct = await Product.find({category:cid}).sort({ createdAt: -1 }).limit(3)
        if (getProduct) {
            res.status(400).json({ message: getProduct })
        } else {
            res.status(400).json({ error: 'invalid id' })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Something went Wrong' })
    }
}