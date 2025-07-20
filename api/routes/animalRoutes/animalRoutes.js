const express = require('express')
const { createAnimal, getAllAnimals, getAnimalsById, updateAnimal, deleteAnimal, getAnimalsByCategory } = require('../../controller/animalCtrl/animalController')
const upload = require('../../middleware/uploadCtrl')


const router = express.Router()

router.post('/', upload.fields([
  { name: 'images', maxCount: 5 },
  { name: 'sound', maxCount: 1 },
  { name: 'pronunciation', maxCount: 1 },
  { name: 'video', maxCount: 1 }
]), createAnimal)
router.get('/', getAllAnimals)
router.get('/:id', getAnimalsById)
router.put('/:id', upload.fields([
    { name: 'images', maxCount: 5 },
    { name: 'sound', maxCount: 1 },
    { name: 'pronunciation', maxCount: 1 },
    { name: 'video', maxCount: 1 }
]), updateAnimal)
router.delete('/:id', deleteAnimal)

//animalsbycategory
router.get('/category/:categoryId', getAnimalsByCategory);

module.exports = router;