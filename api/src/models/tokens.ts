import mongoose, { Schema } from 'mongoose';

const tokenSchema = new Schema({
    user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // Referenz auf die Benutzer-ID
    token: { type: String, required: true }, // Der Refresh Token selbst
    expires_at: { type: Date, required: true }, // Ablaufdatum
    revoked: { type: Boolean, default: false }, // Token ist zurückgezogen oder noch aktiv
    created_at: { type: Date, default: Date.now } // Wann der Token erstellt wurde
});

export const Token = mongoose.model('Token', tokenSchema);
