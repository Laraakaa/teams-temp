#!/usr/bin/env node
const fs = require('fs');
const Ajv = require('ajv');

const info = require('./package.json');
const configSchema = require('./schemas/config.schema.json');
const hooksSchema = require('./schemas/hooks.schema.json');

const ajv = new Ajv();

console.log("TeamsTemp " + info.version);

if (process.argv.length !== 3) {
  console.log("Please specify a path. To use pwd, use (dot): 'teamstemp .'");
  process.exit(1);
}

const configFile = process.argv[2] + "/config.json";
const configContents = fs.readFileSync(configFile);
const config = JSON.parse(configContents);
console.log("Using config file: " + configFile);

if (!ajv.validate(configSchema, config)) {
  console.log("Error while parsing config.json:")
  console.log(ajv.errorsText());
  process.exit(1);
}

const mappings = config["mappings"];

console.log(mappings)
