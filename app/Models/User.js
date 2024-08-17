import mongoose, { Schema } from "mongoose";
import Role from '../Enums/role.js';
import bcrypt from 'bcryptjs';

const User = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    phone: {
        type: String,
        required: true
    },
    role: {
        type: Number,
        enum: Role.values,
        default: Role.USER,
    },
    is_verified: {
        type: Boolean,
        default: false,
    },
    password: {
        type: String,
        required: true,
        // select: false,
    },
    profile: {
        type: String,
    }
}, {timestamps: true});

User.virtual('roleEnum').get(function() {
    return Role[this.role];
});

User.pre('save', async function(next) {
    if (this.isModified('password')) {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
    }
    next();
});

export default mongoose.model('User', User);