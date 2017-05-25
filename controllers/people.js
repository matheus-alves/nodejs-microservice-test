/**
 * Created by matheus on 25/05/17.
 */

'use strict';

const logger = require('winston');
const httpStatusCodes = require('../api/httpstatuscodes.js');

const PeopleRepository = require('../repository/peoplerepository.js').PeopleRepository;
let peopleRepository = new PeopleRepository();

const insertPerson = (person) => {
  return peopleRepository.addPerson(person);
};

const addPeople = (req, res, next) => {
  logger.debug('Received add people request');

  let people = req.body;

  // TODO validate people

  return res.send(httpStatusCodes.Created);
};

module.exports = {
  addPeople: addPeople
};
