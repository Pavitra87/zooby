const mongoose=require('mongoose')

const SongCategorySchema=mongoose.Schema({
    language: {
        type: String,
        required:true,
        unique: true
    }
},{ timestamps: true })

module.exports=mongoose.model('SongCategory',SongCategorySchema)