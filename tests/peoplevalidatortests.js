/**
 * Created by matheus on 25/05/17.
 */

'use strict';

const test = require('tape');
const httpMocks = require('node-mocks-http');

const peopleValidator = require('../validators/peoplevalidator.js');
const httpStatusCodes = require('../api/httpstatuscodes.js');

const validBody = {
  'guid': 'b55ee146-217b-4696-b9ef-b61581dad7ef',
  'isActive': true,
  'balance': '$1,741.85',
  'picture': 'http://placehold.it/32x32',
  'age': 39,
  'eyeColor': 'brown',
  'name': 'Ruth Carney',
  'gender': 'female',
  'company': 'GYNK',
  'email': 'ruthcarney@gynk.com',
  'phone': '+1 (925) 519-3849',
  'address': '715 Bayard Street, Roeville, Washington, 1836',
  'about': 'Ullamco minim occaecat mollit ea incididunt commodo proident enim sit cillum quis. Aute proident officia labore irure. Esse id excepteur magna quis eu amet magna tempor duis laboris pariatur ad. Laborum ullamco consequat dolore aliquip laboris laborum occaecat nostrud anim enim ullamco labore irure voluptate. Nulla et deserunt quis amet voluptate anim irure.\r\n',
  'registered': '2016-01-25T12:53:26 +02:00',
  'latitude': 19.199843,
  'longitude': 129.606578,
  'tags': [
    'minim',
    'exercitation',
    'dolor',
    'magna',
    'cillum',
    'id',
    'ut'
  ]
};

const invalidBody = {

};

function runTests () {
  test('validatePeopleList - OK', (t) => {
    t.plan(1);

    let req = httpMocks.createRequest();
    req.body = [validBody];
    let res = httpMocks.createResponse();

    peopleValidator.validatePeople(req, res, () => {
      t.pass(); // Validation passed
    });
  });

  // test('validateAccessToken - Missing token', function (t) {
  //   t.plan(1);
  //
  //   var req = httpMocks.createRequest();
  //   var res = httpMocks.createResponse();
  //
  //   accessToken.validateAccessToken(req, res);
  //
  //   t.equal(res.statusCode, httpStatusCodes.Forbidden);
  // });
  //
  // test('validateAccessToken - Invalid token', function (t) {
  //   t.plan(1);
  //
  //   var req = httpMocks.createRequest();
  //   req.headers['authorization'] = 'test';
  //
  //   var res = httpMocks.createResponse({eventEmitter: eventEmitter});
  //
  //   accessToken.validateAccessToken(req, res);
  //
  //   res.on('send', function () {
  //     t.equal(res.statusCode, httpStatusCodes.Forbidden);
  //   });
  // });
}

runTests();
