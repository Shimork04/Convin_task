// seperate function for user validation (bonus point)


const { check, validationResult } = require('express-validator');

// Validate user input
exports.validateUser = [
    check('name').notEmpty().withMessage('Name is required'),
    check('email').isEmail().withMessage('Invalid email format'),
    check('mobile').notEmpty().withMessage('Mobile number is required'),
];

// Validate expense input
exports.validateExpense = [
    check('amount').isNumeric().withMessage('Amount must be a number'),
    check('splitMethod').isIn(['equal', 'exact', 'percentage']).withMessage('Invalid split method'),
];

// Handle validation errors
exports.handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

