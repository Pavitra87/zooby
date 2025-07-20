const express=require('express')
const { createCategory, getAllCategories, getCategoryById, upadteCategory, deleteCategory } = require('../../controller/animalCtrl/categoryController')

const router=express.Router()

router.post('/',createCategory)
router.get('/',getAllCategories)
router.get('/:id',getCategoryById)
router.put('/:id',upadteCategory)
router.delete('/:id',deleteCategory)

module.exports=router;