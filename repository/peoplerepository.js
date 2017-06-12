/**
 * Created by matheus on 25/05/17.
 */

'use strict';

// TODO db connection

const logger = require('winston');

class PeopleRepository {
  addPerson(person) {
    return new Promise((resolve, reject) => {
      // TODO insert into db
      return resolve();
    });
  };
}

module.exports = {
  PeopleRepository: PeopleRepository
};