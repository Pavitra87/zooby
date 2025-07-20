const  SongCategory  = require('../../model/songs/songCategoryModel')

const createSongCategory = async (req, res) => {
    const { language } = req.body;
    try {
        const existingLang = await SongCategory.find({ language })

        if (!existingLang) {
            res.status(400).json({ message: "Lang already exist" })
        }

        const newLanguage = new SongCategory({ language })
        const saved = await newLanguage.save()
        res.status(200).json(saved)
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getAllSongsCategory = async (req, res) => {
    try {
        const songcategories = await SongCategory.find({})
        res.status(200).json(songcategories)
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getSongCategoryById = async (req, res) => {
    try {
        const category = await SongCategory.findById(req.params.id)
        if (!category) return res.status(404).json({ message: "Category not found" });
        res.json(category);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


module.exports={createSongCategory,getAllSongsCategory,getSongCategoryById}