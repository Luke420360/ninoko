import mongoose, { Schema } from 'mongoose';

const employeeSchema = new Schema(
    {
        first_name: { type: String, required: true },
        last_name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        phone_number: { type: String },
        date_of_birth: { type: Date },
        hire_date: { type: Date, required: true },
        position: { type: String },
        department_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Department' },
        address_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Address' },
        manager_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee' }
    },
    {
        timestamps: true
    }
);

export const Employee = mongoose.model('Employee', employeeSchema);
