const express = require('express');
const School = require('../models/School');
const router = express.Router();

// Okul Ekleme
router.post('/', async (req, res) => {
  try {
    const { name, location } = req.body;
    const school = new School({ name, location });
    await school.save();
    res.status(201).send(school);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Okulları Listeleme
router.get('/', async (req, res) => {
  try {
    const schools = await School.find();
    res.status(200).send(schools);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Belirli Bir Okulu Getirme
router.get('/:id', async (req, res) => {
  try {
    const school = await School.findById(req.params.id);
    if (!school) {
      return res.status(404).send();
    }
    res.status(200).send(school);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Okul Güncelleme
router.put('/:id', async (req, res) => {
  try {
    const { name, location } = req.body;
    const school = await School.findByIdAndUpdate(
      req.params.id,
      { name, location },
      { new: true, runValidators: true }
    );
    if (!school) {
      return res.status(404).send();
    }
    res.status(200).send(school);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Okul Silme
router.delete('/:id', async (req, res) => {
  try {
    const school = await School.findByIdAndDelete(req.params.id);
    if (!school) {
      return res.status(404).send();
    }
    res.status(200).send({ message: 'Okul başarıyla silindi' });
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
