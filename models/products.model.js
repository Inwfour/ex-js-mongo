const { default: mongoose } = require("mongoose");

const productSchema = new mongoose.Schema({
    user_id: { type: mongoose.SchemaTypes.ObjectId },
    product_name: { type: String, unique: true },
    total: { type: Number }
}, {
    timestamps: true
});

module.exports = mongoose.model('products', productSchema)