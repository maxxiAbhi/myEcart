require('../db/connection')
const express = require('express');
const router = express();
const {userAuth}=require('../middleware/middleware')
const {addProduct,getProductById,getProductByCategory,getProductByTime,getProductByTimeByCategory}=require('../controller/product')
const multer=require('multer')
const {nanoid}=require('nanoid')
const path=require('path')


var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(path.dirname(__dirname),'public/Uploads'))
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' +nanoid(10)+'-'+file.originalname)
    }
  })
  const upload=multer({storage})
   

router.post('/product/addproduct',userAuth,upload.array('productPictures'),addProduct);
router.get('/product/getproductbyid/:id',getProductById);
router.get('/product/getproductbycategoryid/:cid',getProductByCategory);
router.get('/product/latestproductadd',getProductByTime);
router.post('/product/addproduct',userAuth,upload.array('productPictures'),addProduct);
router.get('/product/getproductbyid/:id',getProductById);
router.get('/product/getproductbycategoryid/:cid',getProductByCategory);
router.get('/product/latestproductbycategoryid/:cid',getProductByTimeByCategory);
module.exports=router