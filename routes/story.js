const express = require('express');
const router = express.Router();

/* GET users listing. */
router.get('/:name', (req, res, next)  => {
    console.log(req.params)
  res.send('respond ' + req.params.name);
});

router.post('/', (req, res, next)  => {
  console.log(req.params)
    res.send('respond ' + req.params);
});

module.exports = router;
