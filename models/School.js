const mongoose = require('mongoose');

const schoolSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  }, 
},{
    timestamps: true // createdAt ve updatedAt alanlarını otomatik olarak ekler
  });

const School = mongoose.model('School', schoolSchema);
module.exports = School;
