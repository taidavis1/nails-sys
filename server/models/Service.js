const mongoose = require('mongoose');

// name: '',
// displayName: '',
// price: 0,
// commission: 0,
// color: '',
// photo: '',
// subCategory: '',

const ServiceSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        displayName: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        commission: {
            type: Number,
            // required: true,
        },
        color: {
            type: String,
            // required: true,
        },
        subCategory: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'SubCategory',
            required: true,
        },
    },
    { timestamps: true }
);

const Service = mongoose.model('Service', ServiceSchema);

module.exports = Service;
