const express = require('express');
const Service = require('../models/Service');
const router = express.Router();

// Servis Ekleme
router.post('/', async (req, res) => {
  try {
    const { plate, schoolId } = req.body;
    const service = new Service({ plate, schoolId });
    await service.save();
    res.status(201).send(service);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Servisleri Listeleme
router.get('/', async (req, res) => {
  try {
    const services = await Service.find();
    res.status(200).send(services);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Belirli Bir Servisi Getirme
router.get('/:id', async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) {
      return res.status(404).send();
    }
    res.status(200).send(service);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Servis Güncelleme
router.put('/:id', async (req, res) => {
  try {
    const { plate, schoolId } = req.body;
    const service = await Service.findByIdAndUpdate(
      req.params.id,
      { plate, schoolId },
      { new: true, runValidators: true }
    );
    if (!service) {
      return res.status(404).send();
    }
    res.status(200).send(service);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Servis Silme
router.delete('/:id', async (req, res) => {
  try {
    const service = await Service.findByIdAndDelete(req.params.id);
    if (!service) {
      return res.status(404).send();
    }
    res.status(200).send({ message: 'Servis başarıyla silindi' });
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
