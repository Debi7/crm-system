const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});
