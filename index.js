#!/usr/bin/env node
const fs = require('fs');
const Ajv = require('ajv');
const express = require('express');
const bodyParser = require('body-parser');

const info = require('./package.json');
const configSchema = require('./schemas/config.schema.json');
const hooksSchema = require('./schemas/hooks.schema.json');

const ajv = new Ajv();

console.log("TeamsTemp " + info.version);

module.paths.push(process.cwd());

const config = require('config.json');
const hooks = require('hooks.json');

if (!ajv.validate(configSchema, config)) {
  console.log("Error while parsing config.json:");
  console.log(ajv.errorsText());
  process.exit(1);
}

if (!ajv.validate(hooksSchema, hooks)) {
  console.log("Error while parsing hooks.json:");
  console.log(ajv.errorsText());
  process.exit(1);
}

global.config = config;
global.hooks = hooks;

// Other dependencies
const postActionCard = require('./postActionCard');

// Start the web server
const app = express();

// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// Parse application/json
app.use(bodyParser.json())

app.use("/", require('./controllers'));

const port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log("TeamsTemp api listening on port " + port);
})

/* const mappings = config["mappings"];

mappings.forEach(mapping => {
  const template = require(mapping.entry);

  hooks.forEach(hook => {
    postActionCard(hook.url, template);
  });

  console.log(template);
});*/
