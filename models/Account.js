const mongoose = require('mongoose');
 
const accountSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true,
  },
  totalDebt: {
    type: Number,
    required: true,
    default: 9000,
  },
  monthlyPayments: [
    {
      month: {
        type: Number,
        required: true,
      },
      paid: {
        type: Boolean,
        default: false,
      },
      amountPaid: {
        type: Number,
        default: 0,
      },
      receiptNumber: {
        type: String, // Fiş numarası için alan
        default: '', // Varsayılan olarak boş
      },
    },
  ],
  remainingDebt: {
    type: Number,
    required: true,
    default: 9000,
  },
});

// Cari hesap için ayları otomatik olarak oluşturma
accountSchema.pre('save', function (next) {
  if (this.monthlyPayments.length === 0) {
    for (let i = 1; i <= 9; i++) {
      this.monthlyPayments.push({ month: i, paid: false, amountPaid: 0, receiptNumber: '' });
    }
  }
  next();
});

const Account = mongoose.model('Account', accountSchema);
module.exports = Account;
