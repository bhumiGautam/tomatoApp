
import userModel from "../models/userModel.js";

// add item to cart
const addToCart = async (req, res) => {
  try {
    const { userId, itemId } = req.body;

    // Validate input
    if (!userId || !itemId) {
      return res.status(400).json({
        success: false,
        message: "userId and itemId are required",
      });
    }

    // Find user
    const userData = await userModel.findById(userId);

    if (!userData) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Initialize cart if empty
    let cartData = userData.cartData || {};

    // Add or increment item
    if (!cartData[itemId]) {
      cartData[itemId] = 1;
    } else {
      cartData[itemId] += 1;
    }

    // Save updated cart
    userData.cartData = cartData;
    await userData.save();

    res.json({
      success: true,
      message: "Item added to cart",
      cartData,
    });

  } catch (error) {
    console.error("AddToCart Error:", error);
    res.status(500).json({
      success: false,
      message: "Server error while adding item",
    });
  }
};


// remove item from cart
const removeFromCart = async (req, res) => {
  try {
    const { userId, itemId } = req.body;

    if (!userId || !itemId) {
      return res.status(400).json({
        success: false,
        message: "userId and itemId are required",
      });
    }

    const userData = await userModel.findById(userId);

    if (!userData) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    let cartData = userData.cartData || {};

    if (cartData[itemId] && cartData[itemId] > 0) {
      cartData[itemId] -= 1;

      // remove item completely if quantity = 0
      if (cartData[itemId] === 0) {
        delete cartData[itemId];
      }
    }

    userData.cartData = cartData;
    await userData.save();

    res.json({
      success: true,
      message: "Item removed from cart",
      cartData,
    });

  } catch (error) {
    console.error("RemoveFromCart Error:", error);
    res.status(500).json({
      success: false,
      message: "Server error while removing item",
    });
  }
};


// getting user cart item
const getCart = async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "userId is required",
      });
    }

    const userData = await userModel.findById(userId);

    if (!userData) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const cartData = userData.cartData || {};

    res.json({
      success: true,
      cartData,
    });

  } catch (error) {
    console.error("GetCart Error:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching cart",
    });
  }
};

export { addToCart, removeFromCart, getCart };