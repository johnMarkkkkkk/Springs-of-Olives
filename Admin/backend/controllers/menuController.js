const MenuItem = require('../models/menuItem');

// Get all menu items
exports.getMenuItems = async (req, res) => {
    try {
        const menuItems = await MenuItem.find();
        res.json(menuItems);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Create a menu item
exports.createMenuItem = async (req, res) => {
    const { image, title, price } = req.body;
    try {
        const newMenuItem = new MenuItem({ image, title, price });
        await newMenuItem.save();
        res.json(newMenuItem);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Update a menu item
exports.updateMenuItem = async (req, res) => {
    const { id } = req.params;
    try {
        const updatedMenuItem = await MenuItem.findByIdAndUpdate(id, req.body, { new: true });
        res.json(updatedMenuItem);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Delete a menu item
exports.deleteMenuItem = async (req, res) => {
    const { id } = req.params;
    try {
        await MenuItem.findByIdAndDelete(id);
        res.json({ message: "Menu item deleted" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
