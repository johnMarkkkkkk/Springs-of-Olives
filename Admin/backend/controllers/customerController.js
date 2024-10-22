const Customer = require('../models/customer');

// Get all customers
exports.getCustomers = async (req, res) => {
    try {
        const customers = await Customer.find();
        res.json(customers);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Create a new customer
exports.createCustomer = async (req, res) => {
    const { customerId, name, phone, email, totalPoints, pointsInKsh } = req.body;
    try {
        const newCustomer = new Customer({ customerId, name, phone, email, totalPoints, pointsInKsh });
        await newCustomer.save();
        res.json(newCustomer);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Update a customer
exports.updateCustomer = async (req, res) => {
    const { id } = req.params;
    try {
        const updatedCustomer = await Customer.findByIdAndUpdate(id, req.body, { new: true });
        res.json(updatedCustomer);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Delete a customer
exports.deleteCustomer = async (req, res) => {
    const { id } = req.params;
    try {
        await Customer.findByIdAndDelete(id);
        res.json({ message: "Customer deleted" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
