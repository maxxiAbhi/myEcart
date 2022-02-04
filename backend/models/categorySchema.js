const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const categorySchema = new Schema({
    name:{
        type:String,
        required:true
    },
    slug:{
        type:String,
        required:true,
        unique:true
    },
    categoryImage:{
        type:String
    },
    type:{
        type:String ,
        enum:['main-category','sub-category','simple-category'],
        required:true
    },
    parentId:{
        type:String,
    }
  
},{
    timestamps:true
})

const Category = mongoose.model('categorys',categorySchema);

module.exports = Category;