const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch'); // для Node <18
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// ===== POST /generate =====
app.post('/generate', async (req, res) => {
  try {
    const { prompt, n } = req.body;
    const count = n || 1;

    console.log("Prompt:", prompt, "Count:", count);

    // ===== Виклик мого API =====
    // Підключаємо мій бекенд
    const apiResponse = await fetch('https://mini-app-api.nana-banana.studio/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt: prompt, n: count })
    });

    const data = await apiResponse.json();

    // Перевіряємо, що images існують
    if (!data.images || data.images.length === 0) {
      console.error("Мій API не повернув images");
      return res.status(500).json({ error: "Мій API не повернув зображення" });
    }

    // Відправляємо фронтенду
    res.json({ images: data.images });

  } catch(err) {
    console.error(err);
    res.status(500).json({ error: "Помилка генерації через мій API" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
