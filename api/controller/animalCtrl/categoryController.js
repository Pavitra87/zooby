const Category = require('../../model/animals/categoryModel')

const createCategory = async (req, res) => {
    const { category } = req.body;
    try {
        const existCategory = await Category.findOne({ category })
        if (existCategory) {
            res.status(400).json({ message: "Category already exist" })
        }

        const newCategory = new Category({ category })
        const saved = await newCategory.save()
        res.status(201).json(saved)
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find({})
        res.status(200).json(categories)
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getCategoryById = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id)
        if (!category) return res.status(404).json({ message: "Category not found" });
        res.json(category);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const upadteCategory = async (req, res) => {
    const { category } = req.body;
    try {
        const updated = await Category.findByIdAndUpdate(req.params.id, { category }, { new: true })
        if (!updated) {
            return res.status(400).json({ message: "Category not found" })
        }
        res.json(updated);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const deleteCategory = async (req, res) => {
    try {
        const deleted = await Category.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ message: "Category not found" });

        res.json({ message: "Category deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { createCategory, getAllCategories, getCategoryById, deleteCategory, upadteCategory }

