const mongoose = require("mongoose");
const express = require("express")
const Notes = require("../Models/Notes")
const router = express.Router();
const multer = require("multer")
const path = require("path");
const { check, validationResult }
    = require('express-validator');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "Uploads");
    },
    filename: function (req, file, cb) {
        req.filename = `${Date.now()}-${file.originalname}`;
        cb(null, req.filename);
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
        cb(null, true);
    } else {
        cb(new Error('Only PDF files are allowed'), false);
    }
};
const upload = multer({
    storage: storage,
    fileFilter: fileFilter
});
router.post("/Notes",  upload.single('pdf'), async (req, res) => {
        try {
            const pdf = req.file ? req.file.filename : '';
            const { title, classValue, description, } = req.body
            const user = new Notes({ title, classValue, description, pdf });
            const result = await user.save();
            return res.status(201).json({ result });
            console.log(result)
        } catch (error) {
            console.log(error.message);
        }
    
})
router.get("/getNotes", async (req, res) => {
    try {
        const product = await Notes.find();
        if (!product || product.length === 0) {
            return res.status(404).json({ message: "Product Does Not Exist" });
        };
        const totalProduct = await Notes.countDocuments();
        res.status(200).json({ message: "Successfully retrieved Producr", product, totalProduct });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get("/No", async (req, res) => {
    try {
        const { gender } = req.query;

        const products = await Product.find({ gender: "No" });

        if (!products || products.length === 0) {
            return res.status(404).json({ message: "Products in the 'General' category not found" });
        }
        const totalProducts = await Product.countDocuments({ category: "Men" });

        res.status(200).json({ message: "Successfully retrieved products", products, totalProducts });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }

});

router.get("/Men", async (req, res) => {
    try {
        const { gender } = req.query;

        const products = await Product.find({ gender: "Men" });

        if (!products || products.length === 0) {
            return res.status(404).json({ message: "Products in the 'Men' category not found" });
        }
        const totalProducts = await Product.countDocuments({ category: "Men" });

        res.status(200).json({ message: "Successfully retrieved products", products, totalProducts });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }

});

router.get("/Women", async (req, res) => {
    try {
        const { gender } = req.query;

        const products = await Product.find({ gender: "Women" });

        if (!products || products.length === 0) {
            return res.status(404).json({ message: "Products in the 'Women' category not found" });
        }
        const totalProducts = await Product.countDocuments({ category: "women" });

        res.status(200).json({ message: "Successfully retrieved products", products, totalProducts });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }

});

router.get("/Child", async (req, res) => {
    try {
        const { gender } = req.query;

        const products = await Product.find({ gender: "child" });

        if (!products || products.length === 0) {
            return res.status(404).json({ message: "Products in the 'Child' category not found" });
        }
        const totalProducts = await Product.countDocuments({ category: "child" });

        res.status(200).json({ message: "Successfully retrieved products", products, totalProducts });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }

});

router.get("/OldMen", async (req, res) => {
    try {
        const { gender } = req.query;

        const products = await Product.find({ gender: "oldMen" });

        if (!products || products.length === 0) {
            return res.status(404).json({ message: "Products in the 'oldMen' category not found" });
        }
        const totalProducts = await Product.countDocuments({ category: "Men" });

        res.status(200).json({ message: "Successfully retrieved products", products, totalProducts });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }

});

router.get("/Men", async (req, res) => {
    try {
        const { gender } = req.query;

        const products = await Product.find({ gender: "Men" });

        if (!products || products.length === 0) {
            return res.status(404).json({ message: "Products in the 'Men' category not found" });
        }
        const totalProducts = await Product.countDocuments({ category: "Men" });

        res.status(200).json({ message: "Successfully retrieved products", products, totalProducts });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }

});
router.get("/getClint1/:id", async (req, res) => {
    try {
        const productfId = req.params.id;
        // Use the findById method to find a staff member by ID
        const productMember = await Product.findById(productfId);
        if (!productMember) {
            return res.status(404).json({ message: "This Product not found" });
        }
        res.status(200).json({ message: "Successfully retrieved staff member", productMember });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router

