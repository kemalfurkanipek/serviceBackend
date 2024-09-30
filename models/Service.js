const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  plate: {
    type: String,
    required: true,
  },
  schoolId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'School',
    required: true,
  },
},{
    timestamps: true // createdAt ve updatedAt alanlarını otomatik olarak ekler
  });

const Service = mongoose.model('Service', serviceSchema);
module.exports = Service;
