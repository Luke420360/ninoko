import mongoose, { Schema } from 'mongoose';

const attendanceSchema = new Schema(
    {
        employee_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true },
        date: { type: Date, required: true },
        check_in_time: { type: Date },
        check_out_time: { type: Date },
        status: { type: String, enum: ['anwesend', 'abwesend', 'krank'], required: true },
        notes: { type: String }
    },
    {
        timestamps: true
    }
);

export const Attendance = mongoose.model('Attendance', attendanceSchema);
