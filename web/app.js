const express = require('express');
const app = express();
const PORT = 3000;

const searchRouter = require('./routes/home');

app.use(express.static('public'));

app.use('/', searchRouter);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
