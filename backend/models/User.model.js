const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Define the user schema
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
});

// Pre-save hook to hash the password before saving
userSchema.pre('save', async function (next) {
    try {
        // Only hash the password if it has been modified or is new
        if (!this.isModified('password')) return next();
        
        const salt = await bcrypt.genSalt(10); // Generate salt
        this.password = await bcrypt.hash(this.password, salt); // Hash password
        next(); // Proceed to save the user
    } catch (error) {
        next(error); // Pass any error to the next middleware
    }
});

// Method to compare the entered password with the hashed password in DB
userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

// Export the model
module.exports = mongoose.model('User', userSchema);
