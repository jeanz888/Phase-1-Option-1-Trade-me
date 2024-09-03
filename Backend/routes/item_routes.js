const express = require('express');
const router = express.Router();
const itemController = require('../controllers/itemController');
const auth = require('../middleware/auth');

/**
 * @route POST /items
 * @description Create a new item
 * @access Private (requires authentication)
 */
router.post('/', auth, itemController.createItem);

/**
 * @route GET /items
 * @description Get all items
 * @access Public
 */
router.get('/', itemController.getAllItems);

/**
 * @route GET /items/:id
 * @description Get item by ID
 * @access Public
 */
router.get('/:id', itemController.getItemById);

/**
 * @route PUT /items/:id
 * @description Update item by ID
 * @access Private (requires authentication)
 */
router.put('/:id', auth, itemController.updateItem);

/**
 * @route DELETE /items/:id
 * @description Delete item by ID
 * @access Private (requires authentication)
 */
router.delete('/:id', auth, itemController.deleteItem);

module.exports = router;