const mongoose = require('mongoose');

const serviceCategorySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        color: {
            type: String,
            required: true,
        },
        subCategories: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'SubCategory',
                required: true,
            },
        ],
    },
    { timestamps: true }
);

const ServiceCategory = mongoose.model('ServiceCategory', serviceCategorySchema);

module.exports = ServiceCategory;
