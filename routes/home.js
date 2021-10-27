const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('index', { title: 'Courses Catalog', message: 'The following is the list of courses.' });
});

module.exports = router;