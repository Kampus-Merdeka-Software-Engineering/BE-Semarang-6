const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


// Middleware untuk mengizinkan akses ke JSON data
app.use(express.json());

// Data profil perusahaan e-commerce
const companyProfile = {
  companyName: 'Geesix Commerce',
  description: 'Kami adalah perusahaan e-commerce yang menyediakan berbagai produk dan layanan berkualitas.',
  address: 'Senayan, Kebayoran Baru, South Jakarta City, Jakarta, Indonesia',
  phone: '(+62) 123-4567',
  email: 'infogeesix@gmail.com',
};

// Data tim perusahaan
const ourTeam = {
  teamMembers: [
    { name: 'Ketut Ferio Rizky Ardana', position: 'Project Leader & Front-end Engineer' },
    { name: 'Suci Siti Zakiyah', position: 'Front-end Engineer' },
    { name: 'Azzahra Putri Maharani', position: 'Back-end Engineer' },
    { name: 'Fransiska Liska Bhanda Kiuk', position: 'Back-end Engineer' },
    { name: 'Adimas Raihan Haryobimo', position: 'Quality Assurance' },
    { name: 'Hilda Marsya Dwi Ananda', position: 'Quality Assurance' },
  ],
};

// Data feedback 
const feedbackData = [];

// Endpoint untuk mendapatkan profil perusahaan
app.get("/companyprofile", (req, res) => {
  res.render('companyprofile', { companyProfile });
});

// Endpoint untuk halaman "home"
app.get("/home", (req, res) => {
  res.render('home', { message: 'Selamat datang di halaman utama Geesix Commerce' });
});

// Endpoint untuk halaman "about"
app.get("/about", (req, res) => {
  res.render('about');
});

// Endpoint untuk halaman "contact"
app.get("/contact", (req, res) => {
  res.render('contact');
});

// Endpoint untuk halaman "our team"
app.get("/ourteam", (req, res) => {
  res.render('ourteam', { ourTeam });
});

// Endpoint untuk URL root ("/")
app.get("/", (req, res) => {
  res.json({ message: 'Ini adalah RESTful API Geesix Commerce' });
});

app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});
