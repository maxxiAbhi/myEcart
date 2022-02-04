require('../db/connection');
const Category = require('../models/categorySchema');
const slugify = require('slugify')
const { nanoid } = require('nanoid')



/////      set category function is use to set catagory as per parent id

const setCategory = (categories, parentId = null) => {
    const categoryList = []
    let category;
    if (parentId == null) {
        category = categories.filter(cat => cat.parentId == undefined)
    } else {
        category = categories.filter(cat => cat.parentId == parentId)
    }
    let cate
    for (cate of category) {
        categoryList.push({
            _id: cate._id,
            name: cate.name,
            slug: cate.slug,
            parentId: cate.parentId,
            type: cate.type,
            children: setCategory(categories, cate._id)   ////  call  setCategory function
        })
    }
    return categoryList
}


/////      add category 


exports.addCategory = async (req, res) => {
    try {
        const categoryImageName = `${req.files[0].filename}`
        const categoryObj = {
            name: req.body.name,
            slug: `${slugify(req.body.name)}-${nanoid(5)}`,
            type: req.body.type,
            categoryImage: categoryImageName
        }
        if (req.body.parentId) {
            categoryObj.parentId = req.body.parentId
        }
        const cat = Category(categoryObj)
        const category = await cat.save()
        if (category) {
            return res.status(200).json({
                category: category,
                messager: 'Category Added Sucessfully'
            })
        } else {
            return res.status(422).json({
                messager: 'Something went wrong'
            })
        }

    } catch (error) {

    }
}


/////      get  category 

exports.getCategory = async (req, res) => {
    try {
        const getcategory = await Category.find({})
        if (getcategory) {
            const categoryList = setCategory(getcategory)
            res.header("Access-Control-Allow-Origin", "true");
            res.status(200).json({ categoryList })
        }
    } catch (error) {
        console.log(error)
    }
}



///   update category

exports.updateCategory = async (req, res) => {
    try {
        const { _id, name, parentId, type } = req.body;
        const getName = await Category.findOne({ _id });
        console.log(req.body)
        if (!_id || !name || !type) {
            res.status(200).json({ message: "Plz fill all filds" })
        } else {
            if (!parentId) {
                if (name === getName.name) {
                    const category = { _id, type }
                    const updateCategory = await Category.findByIdAndUpdate({ _id: _id }, category)
                    res.status(200).json({ message: updateCategory })
                } else {
                    const category = { _id, name, type, slug: `${slugify(req.body.name)}-${nanoid(5)}` }
                    const updateCategory = await Category.findByIdAndUpdate({ _id: _id }, category)
                    res.status(200).json({ message: updateCategory })
                }
            } else {

                if (name === getName.name) {
                    const category = { _id, type, parentId }
                    const updateCategory = await Category.findByIdAndUpdate({ _id: _id }, category)
                    res.status(200).json({ message: updateCategory })
                } else {
                    const category = { _id, name, type, parentId, slug: `${slugify(req.body.name)}-${nanoid(5)}` }
                    const updateCategory = await Category.findByIdAndUpdate({ _id: _id }, category)
                    res.status(200).json({ message: updateCategory })
                }
            }
        }
    } catch (error) {
        console.log(error)
    }
}



/////      delete category 


exports.deleteCategory = async (req, res) => {
    try {
        const { _id } = req.body
        const getCategory = await Category.findOne({ _id });
        if (getCategory.type === 'main-category' || getCategory.type === 'sub-category') {
            res.status(400).json({ message: "Main and Sub-Category Category can't be deleted  first delete child category!!! " })
        } else {
            const getMain = await Category.find({ parentId: _id });
            objectLenght = Object.keys(getMain).length;
            console.log(objectLenght)
            if (objectLenght > 0) {
                res.status(400).json({ message: "Delete child category First !!! " })
            } else {
                const deleteCat = await Category.findByIdAndDelete({ _id })
                if (deleteCat) {
                    res.status(200).json({ message: "Category Deleted Sucessfully" })
                } else {
                    res.status(500).json({ message: "Something Went Wrong" })
                }
            }


        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Something Went Wrong' })
    }
}