import mongoose from 'mongoose';

const options = {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
    versionKey: false,
    toJSON: { virtuals: true }, 
    toObject: { virtuals: true }
};

const adminSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
        required: false,
    },
}, options);

export const Admin = mongoose.model('Admin', adminSchema);