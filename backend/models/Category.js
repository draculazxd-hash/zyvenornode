const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Category name is required'],
    trim: true,
    unique: true
  },
  icon: {
    type: String,
    default: 'Package',
    trim: true
  },
  order: {
    type: Number,
    default: 0
  }
});

module.exports = mongoose.model('Category', CategorySchema);
