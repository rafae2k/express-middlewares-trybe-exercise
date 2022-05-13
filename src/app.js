const express = require('express');

const app = express();

app.use(express.json());

app.use('/v1', require('./routes/routes.js') );

app.listen(3000, () => {
  console.log('listen on 3000');
});