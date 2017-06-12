/**
 * Created by matheus on 25/05/17.
 */

'use strict';

const logger = require('winston');
const httpStatusCodes = require('../api/httpstatuscodes.js');

let Validator = require('jsonschema').Validator;
let validator = new Validator();

const personSchema = {
  'id': '/Person',
  'type': 'object',
  'properties': {
    'guid': {'type': 'string', 'required': true},
    'isActive': {'type': 'boolean'},
    'balance': {'type': 'string'},
    'picture': {'type': 'string'},
    'age': {'type': 'number'},
    'eyeColor': {'type': 'string'},
    'name': {'type': 'string'},
    'gender': {'type': 'string'},
    'company': {'type': 'string'},
    'email': {'type': 'string'},
    'phone': {'type': 'string'},
    'address': {'type': 'string'},
    'about': {'type': 'string'},
    'registered': {'type': 'string'},
    'latitude': {'type': 'number'},
    'longitude': {'type': 'number'},
    'tags': {
      'type': 'array',
      'items': {'type': 'string'}
    }
  },
  'additionalProperties': false
};

const validatePerson = person => {
  return validator.validate(person, personSchema);
};

const validatePeople = (req, res, next) => {
  logger.debug('Received add people request');

  let people = req.body;
  let valid = true;

  if (Array.isArray(people)){
    people.forEach(person => {
      if (!validatePerson(person).errors) {
        valid = false;
      }
    });
  } else {
    if (!validatePerson(people)) {
      valid = false;
    }
  }

  if (!valid){
    logger.debug('Invalid body');
    return res.send(httpStatusCodes.BadRequest);
  }

  return next()
};

module.exports = {
  validatePeople: validatePeople
};

// v.addSchema(addressSchema, '/SimpleAddress');
// console.log(v.validate(p, schema));