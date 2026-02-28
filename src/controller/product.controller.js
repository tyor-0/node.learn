const Product = require("../model/product");

async function getAllProducts(req, res) {
    try {
        const products = await Product.find().populate("user", "firstName lastName email");
        res.status(200).json({ message: "Products retrieved successfully", products });
        
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Internal server error", error });
    }
}

async function getAllUserProducts(req, res) {
    try {
        const userId = req.user.userId;
        const products = await Product.find({ user: userId }).populate("user", "firstName lastName email");
        res.status(200).json({ message: "User's products retrieved successfully", products });
        
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Internal server error", error });
    }

}



async function createProduct(req, res) {
    try {
        const { title, price, description, category, image, rating } = req.body;
        // req.user is set by verifyToken middleware
        const userId = req.user.userId;

        const newProduct = await Product.create({
            title,
            price,
            description,
            category,
            image,
            
            user: userId
        });

        res.status(201).json({ message: "Product created successfully", product: newProduct });
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Internal server error", error });
    }
}

async function getSingleProduct(req, res) {
    try {
        const productId = req.params.id;
        const product = await Product.findById(productId).populate("user", "firstName lastName email");

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json({ message: "Product retrieved successfully", product });
        
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Internal server error", error });
        
    }

}

async function updateProduct(req, res) {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ message: "Product not found" });

        // check if the product belongs to the user
        if (product.user.toString() !== req.user.userId) {
            return res.status(403).json({ message: "Forbidden: Not your product" });
        }

        // Update fields as needed
        Object.assign(product, req.body);
        await product.save();

        res.status(200).json({ message: "Product updated", product });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error });
    }
}

async function deleteProduct(req, res) {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ message: "Product not found" });

        if (product.user.toString() !== req.user.userId) {
            return res.status(403).json({ message: "Forbidden: Not your product" });
        }

        await product.remove();
        res.status(200).json({ message: "Product deleted" });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error });
    }
}

module.exports = {
    getAllProducts,
    createProduct,
    getSingleProduct,
    updateProduct,
    deleteProduct,
    getAllUserProducts
}