import mongoose, { Schema } from 'mongoose';

const permissionSchema = new Schema({
    name: { type: String, required: true, unique: true }, // z.B. "can_view_reports", "can_manage_users"
    description: { type: String } // Optional, eine Beschreibung der Berechtigung
});

export const Permission = mongoose.model('Permission', permissionSchema);
