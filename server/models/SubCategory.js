const mongoose = require('mongoose');

const subCategory = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        color: {
            type: String,
            // required: true,
        },
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'ServiceCategory',
            required: true,
        },
        services: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Service',
                // required: true,
            },
        ],
    },
    { timestamps: true }
);

const SubCategory = mongoose.model('SubCategory', subCategory);

module.exports = SubCategory;
