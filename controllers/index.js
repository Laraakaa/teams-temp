const express = require('express');
const router = express.Router();

const postActionCard = require('../postActionCard');

module.paths.push(process.cwd());

router.get('/', (req, res) => {
  res.send(config.mappings);
});

router.post('/post/:name', (req, res) => {
  let wasFound = false;
  config.mappings.forEach(mapping => {
    if (mapping.name === req.params.name) {
      wasFound = true;

      const template = require(mapping.entry)(req.body);

      postActionCard(template).then(() => {
        res.send('posted');
      }).catch(body => {
        res.status(500).send(body.toString());
      });
    }
  });

  if (!wasFound) {
    return res.status(404).send('Card not found');
  }
});

module.exports = router;
