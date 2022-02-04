require('../db/connection')
const express = require('express');
const router = express();
const {userAuth,adminMiddleware}=require('../middleware/middleware')
const {addCategory,getCategory,updateCategory,deleteCategory}=require('../controller/category')
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

router.post('/category/addcategory',userAuth,adminMiddleware,upload.array('categoryPictures'),addCategory);
router.get('/category/getcategory',getCategory);
router.post('/category/updatecategory',userAuth,adminMiddleware,upload.array('categoryPictures'),updateCategory);
router.post('/category/deletecategory',userAuth,adminMiddleware,deleteCategory);

module.exports = router;