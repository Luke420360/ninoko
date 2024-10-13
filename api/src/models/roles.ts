import mongoose, { Schema } from 'mongoose';

const roleSchema = new Schema({
    name: { type: String, required: true, unique: true }, // z.B. "Admin", "Manager", "Mitarbeiter"
    description: { type: String }, // Optional, eine Beschreibung der Rolle
    permissions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Permission' }] // Array von Berechtigungen
});

export const Role = mongoose.model('Role', roleSchema);
