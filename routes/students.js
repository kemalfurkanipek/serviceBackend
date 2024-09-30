const express = require('express');
const Student = require('../models/Student');
const router = express.Router();

// Öğrenci Ekleme
router.post('/', async (req, res) => {
  try {
    const { name, schoolId, serviceId, surname, address, telephone } = req.body;
    const student = new Student({ name, schoolId, serviceId, surname, address, telephone });
    await student.save();
    res.status(201).send(student);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Öğrencileri Listeleme
router.get('/', async (req, res) => {
  try {
    const students = await Student.find().populate('schoolId serviceId');
    res.status(200).send(students);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Belirli Bir Öğrenciyi Getirme
router.get('/:id', async (req, res) => {
  try {
    const student = await Student.findById(req.params.id).populate('schoolId serviceId');
    if (!student) {
      return res.status(404).send();
    }
    res.status(200).send(student);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.put('/:id', async (req, res) => {
    try {
      const { name, schoolId, serviceId, surname, address, telephone } = req.body;
      const student = await Student.findByIdAndUpdate(
        req.params.id,
        { name, schoolId, serviceId, surname, address, telephone },
        { new: true, runValidators: true }
      );
      if (!student) {
        return res.status(404).send();
      }
      res.status(200).send(student);
    } catch (error) {
      res.status(400).send(error);
    }
  });
  
  // Öğrenci Silme
  router.delete('/:id', async (req, res) => {
    try {
      const student = await Student.findByIdAndDelete(req.params.id);
      if (!student) {
        return res.status(404).send();
      }
      res.status(200).send({ message: 'Öğrenci başarıyla silindi' });
    } catch (error) {
      res.status(500).send(error);
    }
  });

module.exports = router;
