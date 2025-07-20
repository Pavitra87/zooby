const express=require('express')

const { createSong, getAllSongs, getSongsById, getSongByLanguage } = require('../../controller/songCtrl/songController')
const upload = require('../../middleware/uploadCtrl')

const router=express.Router()

router.post('/',upload.fields([{name:"audioFile",maxCount:1}]) ,createSong)
router.get('/',getAllSongs)
router.get('/:id',getSongsById)

//songbylang
router.get('/language/:songId',getSongByLanguage)

module.exports=router;