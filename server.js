const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch'); // для Node.js <18
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Генерація зображень через мій API (імітація)
app.post('/generate', async (req, res) => {
  try {
    const { prompt, n } = req.body;
    const count = n || 1;
    const images = [];

    for (let i = 0; i < count; i++) {
      const url = `https://via.placeholder.com/512x512.png?text=${encodeURIComponent(prompt)}+${i+1}`;
      images.push(url);
    }

    // Якщо підключимо реальний API, замість placeholder вставляємо fetch сюди
    res.json({ images });
  } catch(err) {
    console.error(err);
    res.status(500).json({ error: "Помилка генерації" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
