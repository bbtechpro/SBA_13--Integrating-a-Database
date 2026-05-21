// name: String, required.
// description: String, required.
// price: Number, required, must be greater than 0.
// category: String, required.
// inStock: Boolean, defaults to true.
// tags: An Array of Strings.
// createdAt: Date, defaults to the current date and time.
// Compile this schema into a model named Product and export it.

const mongoose = require('mongoose');
const { Schema } = mongoose;
 
const productSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    minlength: 2,
    maxlength: 100
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    trim: true,
    minlength: 10,
    maxlength: 200
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: [0, 'Price must be a positive value']
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    trim: true
  },
  inStock: {
    type: Boolean,
    default: true
  },
  tags: {
    type: [String],
    default: []
  },
  createdAt: {
    type: Date,
    default: () => Date.now(),
    immutable: true
  }
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;

