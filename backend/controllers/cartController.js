import userModel from "../models/userModel.js";

// Add items to cart
const addToCart = async (req, res) => {
    try {
        const { userId, itemId } = req.body;

        // Find the user by userId
        const userData = await userModel.findOne({ _id: userId });
        if (!userData) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // Get the user's cart data
        let cartData = userData.cartData || {};

        // Update the cart data
        if (!cartData[itemId]) {
            cartData[itemId] = 1; // Add new item to cart
        } else {
            cartData[itemId] += 1; // Increment item quantity
        }

        // Save the updated cart data
        await userModel.findByIdAndUpdate(userId, { cartData });

        return res.json({ success: true, message: "Added to cart", cartData });
    } catch (error) {
        console.error("Error adding to cart:", error);
        return res.status(500).json({ success: false, message: "Failed to add to cart" });
    }
};

// Remove items from cart
const removeFromCart = async (req, res) => {
    try {
        const { userId, itemId } = req.body;

        // Find the user by userId
        const userData = await userModel.findOne({ _id: userId });
        if (!userData) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // Get the user's cart data
        let cartData = userData.cartData || {};

        // Check if the item exists in the cart
        if (cartData[itemId]) {
            if (cartData[itemId] > 1) {
                cartData[itemId] -= 1; // Decrement item quantity
            } else {
                delete cartData[itemId]; // Remove item if quantity is 1
            }
        } else {
            return res.status(404).json({ success: false, message: "Item not found in cart" });
        }

        // Save the updated cart data
        await userModel.findByIdAndUpdate(userId, { cartData });

        return res.json({ success: true, message: "Removed from cart", cartData });
    } catch (error) {
        console.error("Error removing from cart:", error);
        return res.status(500).json({ success: false, message: "Failed to remove from cart" });
    }
};

// Get cart data
const getCart = async (req, res) => {
    try {
        const { userId } = req.body;

        // Find the user by userId
        const userData = await userModel.findOne({ _id: userId });
        if (!userData) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // Get the user's cart data
        const cartData = userData.cartData || {};
        
        return res.json({ success: true, cartData });
    } catch (error) {
        console.error("Error fetching cart:", error);
        return res.status(500).json({ success: false, message: "Failed to fetch cart" });
    }
};

export { addToCart, removeFromCart, getCart };