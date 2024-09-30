const express = require('express');
const Account = require('../models/Account');
const router = express.Router();

// Cari Hesap Ekleme
router.post('/', async (req, res) => {
  try {
    const { studentId, totalDebt, monthlyPayments, remainingDebt } = req.body;
    const account = new Account({ studentId, totalDebt, monthlyPayments, remainingDebt });
    await account.save();
    res.status(201).send(account);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Cari Hesapları Listeleme
router.get('/', async (req, res) => {
  try {
    const accounts = await Account.find().populate('studentId');
    res.status(200).send(accounts);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Belirli Bir Cari Hesabı Getirme
router.get('/:id', async (req, res) => {
  try {
    const account = await Account.findById(req.params.id).populate('studentId');
    if (!account) {
      return res.status(404).send();
    }
    res.status(200).send(account);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Cari Hesap Güncelleme
router.put('/:id', async (req, res) => {
  try {
    const { studentId, totalDebt, monthlyPayments, remainingDebt } = req.body;
    const account = await Account.findByIdAndUpdate(
      req.params.id,
      { studentId, totalDebt, monthlyPayments, remainingDebt },
      { new: true, runValidators: true }
    );
    if (!account) {
      return res.status(404).send();
    }
    res.status(200).send(account);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Cari Hesap Silme
router.delete('/:id', async (req, res) => {
  try {
    const account = await Account.findByIdAndDelete(req.params.id);
    if (!account) {
      return res.status(404).send();
    }
    res.status(200).send({ message: 'Cari hesap başarıyla silindi' });
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
