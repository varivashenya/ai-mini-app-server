const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch'); // для Node.js <18
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// ===== POST /generate =====
app.post('/generate', async (req, res) => {
  try {
    const { prompt, n } = req.body;
    const count = n || 1;

    // ===== виклик мого API =====
    // Ти не потребуєш свій ключ, все через мій сервер
    const apiResponse = await fetch('https://mini-app-api.nana-banana.studio/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt: prompt, n: count })
    });

    const data = await apiResponse.json();

    // Очікуємо, що data.images = [url1, url2, ...]
    res.json({ images: data.images });

  } catch(err) {
    console.error(err);
    res.status(500).json({ error: "Помилка генерації через мій API" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
