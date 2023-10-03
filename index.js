const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const bodyParser = require('body-parser');
const db = require("./db/index.js");

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Middleware for handling errors to applications
app.use(errorHandler);

// Geesix commerce company profile data
const companyProfile = {
  companyName: 'Geesix Commerce',
  description: 'Kami adalah perusahaan e-commerce yang menyediakan berbagai produk dan layanan berkualitas.',
  address: 'Senayan, Kebayoran Baru, South Jakarta City, Jakarta, Indonesia',
  phone: '(+62) 123-4567',
  email: 'infogeesix@gmail.com',
};

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

// Endpoint to get company profile
app.get("/companyprofile", (req, res) => {
  res.render('companyprofile', { companyProfile });
});

// Endpoint for "home" page
app.get("/home", (req, res) => {
  res.render('home', { message: 'Selamat datang di halaman utama Geesix Commerce' });
});

// Endpoint for "about" page
app.get("/about", (req, res) => {
  res.render('about');
});

// Endpoint for "contact" page
app.get("/contact", (req, res) => {
  res.render('contact');
});

// Endpoint for "our team" page
app.get("/ourteam", (req, res) => {
  res.render('ourteam', { ourTeam });
});

// Endpoint for root URL ("/")
app.get("/", (req, res) => {
  res.json({ message: 'Ini adalah RESTful API Geesix Commerce' });
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server berjalan di http://localhost:${process.env.PORT || 3000}`);
});
