const SongCategory=require('../../model/songs/songCategoryModel')
const Song=require('../../model/songs/songModel')

const createSong=async(req,res)=>{
   try {
     const {title,language}=req.body
     const langExists=await SongCategory.findById(language)
      if (!langExists) {
      return res.status(404).json({ message: "language not found" });
    }
    const audioFile=req.files?.audioFile?.[0].filename || "";

    const newSong=new Song({
        title,audioFile,language
    })
    const saved=await newSong.save()
    res.status(201).json(saved)
   } catch (error) {
    res.status(400).json({ message: error.message });
   }
}

const getAllSongs=async(req,res)=>{
    try {
        const songs=await Song.find().populate('language')
        res.status(200).json(songs)
    } catch (error) {
        res.status(500).json({ message: "error.message" })
    }
}

const getSongsById=async(req,res)=>{
    try {
          const song = await Song.findById(req.params.id).populate('language')
                if (!song) {
                    return res.status(404).json({ message: 'song not found' });
                }
                res.status(200).json(song)
    } catch (error) {
        res.status(500).json({ message: "error.message" }) 
    }
}

const getSongByLanguage=async(req,res)=>{
    try {
        const songId=req.params.songId;
       const songs = await Song.find({ language: songId}).populate('language');

        if(!songs || songs.length===0){
           return res.status(404).json({ message: "No songs found for this language" });
        }
        res.status(200).json(songs)
    } catch (error) {
         res.status(500).json({ message: error.message });
    }
}

module.exports={createSong,getAllSongs,getSongsById,getSongByLanguage}