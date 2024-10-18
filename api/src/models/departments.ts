import mongoose, { Schema } from 'mongoose';

const departmentSchema = new Schema(
    {
        name: { type: String, required: true },
        description: { type: String },
        department_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Company' }
    },
    {
        timestamps: true
    }
);

export const Department = mongoose.model('Department', departmentSchema);
