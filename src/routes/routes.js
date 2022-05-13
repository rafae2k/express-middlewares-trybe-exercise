const express = require('express');
const router = express.Router();
const moment = require('moment');

router.post('/sales', function (req, res) {
  const {
    productName,
    infos,
    infos: { salesDate, warrantyPeriod },
  } = req.body;

  if (!productName) {
    return res
      .status(400)
      .json({ message: 'O campo productName é obrigatório' });
  }

  if (productName.length < 4) {
    return res.status(400).json({
      message: 'O campo productName deve ter pelo menos 4 caracteres',
    });
  }

  if (!infos) {
    return res.status(400).json({
      message: 'O campo infos é obrigatório',
    });
  }

  if (
    !Object.keys(infos).includes('saleDate') ||
    !Object.keys(infos).includes('warrantyPeriod')
  ) {
    return res.status(400).json({
      message: 'O campo infos é obrigatório',
    });
  }

  // luana regex
  const dataRegex =
    /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/g;

  //  7
  if (!salesDate) {
    return res.status(400).json({ message: 'O campo saleDate é obrigatório' });
  }

  //8
  if (!moment(salesDate, 'DD/MM/YYYY', true).isValid()) {
    return res
      .status(400)
      .json({ message: 'O campo saleDate não é uma data válida' });
  }

  //9
  if (warrantyPeriod >= 1 || warrantyPeriod <= 3) {
    return res
      .status(400)
      .json({ message: 'O campo saleDate não é uma data válida' });
  }

  // jéssica requisito 10
  if (!infos.warrantyPeriod) {
    return res
      .status(400)
      .json({ message: 'O campo warrantyPeriod é obrigatório' });
  }

  //jéssica requisito 11
  if (infos.warrantyPeriod < 1 || infos.warrantyPeriod > 3) {
    return res
      .status(400)
      .json({ message: 'O campo warrantyPeriod precisa estar entre 1 e 3' });
  }

  res.status(201).json({ message: 'Venda cadastrada com sucesso' });
});

router.get('/', function (req, res) {
  res.send('Hello World!');
});

module.exports = router;
