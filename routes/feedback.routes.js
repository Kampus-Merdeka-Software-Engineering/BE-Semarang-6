const express = require('express');
const router = express.Router();
const db = require('../db');

// Middleware for contact form input validation
function validateFeedback(req, res, next) {
  const { name, email, subject, message } = req.body;
  if (!name || !email || !subject || !message) {
    return res.status(400).json({ error: 'Semua kolom harus diisi.' });
  }
  next();
}

// Endpoint to store feedback
router.post("/proses_feedback", validateFeedback, async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    // Save feedback to database using Sequelize model
    await db.Feedback.create({ name, email, subject, message });
    res.status(201).json({ message: 'Feedback berhasil disimpan.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Terjadi kesalahan pada server.' });
  }
});

module.exports = router;
