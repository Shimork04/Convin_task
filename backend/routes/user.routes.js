const express = require('express');
const { createUser, getUsers } = require('../controllers/userController');
const { validateUser, handleValidationErrors } = require('../middleware/validation');

const router = express.Router();

router.post('/', validateUser, handleValidationErrors, createUser);
router.get('/', getUsers);

module.exports = router;
