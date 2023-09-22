const express = require('express');
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.json({ message: 'Ini adalah RESTful API Group 6 Section Semarang' });
});

app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});
