const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: 'http://localhost:3000',
  })
);

app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});
