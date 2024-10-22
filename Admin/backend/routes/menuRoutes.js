const express = require('express');
const { getMenuItems, createMenuItem, updateMenuItem, deleteMenuItem } = require('../controllers/menuController');
const router = express.Router();

router.route('/').get(getMenuItems).post(createMenuItem);
router.route('/:id').put(updateMenuItem).delete(deleteMenuItem);

module.exports = router;
