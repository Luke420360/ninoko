import mongoose, { Schema } from 'mongoose';

// Definiere das Schema
export const userSchema = new Schema(
    {
        email: { type: String, required: true, unique: true, trim: true },
        username: { type: String, required: true, unique: true, trim: true },
        password: { type: String, required: true },
        role_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Role', required: true },
        employee_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: false }
    },
    {
        timestamps: true
    }
);

// Modell erstellen
export const User = mongoose.model('User', userSchema);
