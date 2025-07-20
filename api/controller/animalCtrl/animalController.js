const Animal = require("../../model/animals/animalModel")
const Category=require("../../model/animals/categoryModel")

const createAnimal = async (req, res) => {
    try {
    const {
      animalname,
       info,
    
      category
    } = req.body;

    const categoryExists = await Category.findById(category);
    if (!categoryExists) {
      return res.status(404).json({ message: "Category not found" });
    }
   // Access files from multer
   const images = req.files?.images?.map(file => file.filename) || [];
const sound = req.files?.sound?.[0]?.filename || '';
const pronunciation = req.files?.pronunciation?.[0]?.filename || '';
const video = req.files?.video?.[0]?.filename || '';

      // Parse info string if exists
    let parsedInfo = {};
    if (info) {
      parsedInfo = typeof info === 'string' ? JSON.parse(info) : info;
    }
    const newAnimal = new Animal({
      animalname,
      images,
      sound,
      pronunciation,
      video,
      info:parsedInfo,
      category
    });

    const saved = await newAnimal.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

const getAllAnimals = async (req, res) => {
    try {
        const animals = await Animal.find().populate('category')
        res.status(200).json(animals)
    } catch (error) {
        res.status(500).json({ message: "error.message" })
    }
}

const getAnimalsById = async (req, res) => {
    try {
        const animal = await Animal.findById(req.params.id).populate('category')
        if (!animal) {
            return res.status(404).json({ message: 'Animal not found' });
        }
        res.status(200).json(animal)
    } catch (error) {
        res.status(500).json({ message: "error.message" })
    }
}

const updateAnimal = async (req, res) => {
    try {
        const updated = await Animal.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!updated) {
            return res.status(404).json({ message: 'Animal not found' });
        }
        res.status(200).json(updated)
    } catch (error) {
        res.status(500).json({ message: "error.message" })
    }
}

const deleteAnimal = async (req, res) => {
    try {
        const deleted = await Animal.findByIdAndDelete(req.params.id);
        if (!deleted) {
            return res.status(404).json({ message: 'Animal not found' });
        }
        res.json({ message: 'Animal deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

//animalsbycategory
const getAnimalsByCategory = async (req, res) => {
  try {
    const categoryId = req.params.categoryId;

    const animals = await Animal.find({ category: categoryId }).populate('category');

    if (!animals || animals.length === 0) {
      return res.status(404).json({ message: "No animals found for this category" });
    }

    res.status(200).json(animals);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


module.exports = { createAnimal, getAllAnimals, getAnimalsById, updateAnimal, deleteAnimal,getAnimalsByCategory }