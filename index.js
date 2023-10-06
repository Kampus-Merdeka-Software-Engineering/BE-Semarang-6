const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const bodyParser = require('body-parser');
const db = require("./db/index.js");

const dbConfig = require('./db/config.js');
const Sequelize = require('sequelize');
const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
  host: dbConfig.host,
  port: dbConfig.port,
  dialect: dbConfig.dialect,
});

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Middleware for handling errors to applications
app.use(errorHandler);

// Define models and relationships
db.sequelize.sync().then(() => {
  console.log('Tabel berhasil dibuat.');
});

// Middleware for contact form input validation
function validateFeedback(req, res, next) {
  const { name, email, subject, message } = req.body;
  if (!name || !email || !subject || !message) {
    return res.status(400).json({ error: 'Semua kolom harus diisi.' });
  }
  next();
}

// Endpoint to store feedback (POST request)
app.post("/proses_feedback", validateFeedback, async (req, res) => {
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

// Endpoint to get feedback data (GET request)
app.get("/proses_feedback", async (req, res) => {
  try {
    // Retrieve feedback data from the database using the Sequelize model
    const feedbackData = await db.Feedback.findAll();
    res.status(200).json(feedbackData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Terjadi kesalahan pada server.' });
  }
});

// Endpoint to get data feedback from the database (GET request)
app.get("/api/feedback", async (req, res) => {
  try {
    // Retrieving feedback data from the database using the Sequelize model
    const feedbackData = await db.Feedback.findAll();
    res.status(200).json(feedbackData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Terjadi kesalahan pada server.' });
  }
});

// Middleware for error handling
function errorHandler(err, req, res, next) {
  console.error(err.stack);
  res.status(500).json({ error: 'Terjadi kesalahan pada server.' });
}

// Endpoint for "home" page
app.get("/home", (req, res) => {
  const homeData = {
    message: 'Selamat datang di halaman utama Geesix Commerce',
  };
  res.json(homeData);
});

/// Endpoint for "about us" page
app.get("/about", (req, res) => {
  const aboutData = {
    title: 'About Us',
    description: 'Ini adalah halaman tentang perusahaan Geesix Commerce.',
    companyProfile: {
      companyName: 'Geesix Commerce',
      description: 'Kami adalah perusahaan e-commerce yang menyediakan berbagai produk dan layanan berkualitas.',
      address: 'Senayan, Kebayoran Baru, South Jakarta City, Jakarta, Indonesia',
      phone: '(+62) 123-4567',
      email: 'infogeesix@gmail.com',
    },
  };
  res.json(aboutData);
});

// Endpoint for "our team" page
app.get("/ourteam", (req, res) => {
  const ourTeamData = {
    teamMembers: [
      { name: 'Ketut Ferio Rizky Ardana', position: 'Project Leader & Front-end Engineer' },
      { name: 'Suci Siti Zakiyah', position: 'Front-end Engineer' },
      { name: 'Azzahra Putri Maharani', position: 'Back-end Engineer' },
      { name: 'Fransiska Liska Bhanda Kiuk', position: 'Back-end Engineer' },
      { name: 'Adimas Raihan Haryobimo', position: 'Quality Assurance' },
      { name: 'Hilda Marsya Dwi Ananda', position: 'Quality Assurance' },
    ],
  };
  res.json(ourTeamData);
});

// Endpoint for "contact" page
app.get("/contact", (req, res) => {
  const contactData = {
    message: 'Hubungi kami melalui email di infogeesix@gmail.com.',
  };
  res.json(contactData);
});

// Endpoint for root URL ("/")
app.get("/", (req, res) => {
  res.json({ message: 'Ini adalah RESTful API Geesix Commerce' });
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server berjalan di http://localhost:${process.env.PORT || 3000}`);
});
