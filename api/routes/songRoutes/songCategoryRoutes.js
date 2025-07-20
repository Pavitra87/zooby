const express=require('express')
const { createSongCategory, getAllSongsCategory,getSongCategoryById } = require('../../controller/songCtrl/songLangController')

const router=express.Router()

router.post('/',createSongCategory)
router.get('/',getAllSongsCategory)
router.get('/:id',getSongCategoryById)

module.exports=router;