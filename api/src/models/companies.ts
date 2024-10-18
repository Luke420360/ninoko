import mongoose, { Schema } from 'mongoose';

const companySchema = new Schema({
    name: { type: String, required: true, unique: true },
    slug: { type: String, unique: true, lowercase: true },
    description: { type: String },
    email: { type: String, required: true, match: /.+\@.+\..+/ },
    phone: { type: String, required: true },
    address: {
        street: String,
        city: String,
        state: String,
        postalCode: String,
        country: String
    },
    founded: { type: Date },
    founders: [String],
    website: { type: String },
    socialMedia: {
        linkedin: String,
        twitter: String,
        facebook: String,
        instagram: String
    },
    revenue: { type: Number },
    employeeCount: { type: Number },
    valuation: { type: Number },
    industry: { type: String },
    categories: [String],
    legalStructure: { type: String },
    registrationNumber: { type: String },
    vatNumber: { type: String },
    logo: { type: String },
    images: [String],
    status: { type: String, default: 'active' },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
    },
    {
        timestamps: true
    }
);

export const Company = mongoose.model('Department', companySchema);
