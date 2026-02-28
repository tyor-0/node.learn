const User = require("../model/users");
const Product = require("../model/product");


async function getAllUsers(req, res) {
    try {
        const users = await User.find().select("-password");
        res.status(200).json({ users });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }

}

async function deleteUser(req, res) {
    try {
        const { id } = req.params;
        const user = await User.findByIdAndDelete(id);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        res.status(200).json({ message: "User deleted successfully", user });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }

}

async function updateUser(req, res) {
    try {
        const { id } = req.params;
        const { firstName, lastName, } = req.body;
        const user = await User.findByIdAndUpdate(id, { firstName, lastName }, { new: true });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        res.status(200).json({ message: "User updated successfully", user });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


async function getUserById(req, res) {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }

}

async function getAllProducts(req, res) {
    try {
        const products = await Product.find().populate("user", "firstName lastName email");
        res.status(200).json({ message: "Products retrieved successfully", products });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }

}

async function deleteProduct(req, res) {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndDelete(id);
        if (!product) {
            return res.status(404).json({ error: "Product not found" });
        }
        res.status(200).json({ message: "Product deleted successfully", product });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    getAllUsers,
    deleteUser,
    updateUser,
    getUserById,
    getAllProducts,
    deleteProduct
}