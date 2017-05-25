/**
 * Created by matheus on 24/05/17.
 */

'use strict';

const restify = require('restify');

const logger = require('winston');
const httpStatusCodes = require('./api/httpstatuscodes.js');

// Constants
const DEFAULT_HTTP_PORT = 8080;

// Server creation
const server = restify.createServer({
  name: 'nodejs-microservice-test'
});
server.use(restify.fullResponse());
server.use(restify.queryParser());
server.use(restify.bodyParser({mapParams: true}));

// Controllers
const controllersPath = './controllers/';
const controllers = {
  people: require(controllersPath + 'people.js')
};

// Requests configuration
server.post('/people', controllers.people.addPeople);

const logError = (error) => {
  logger.info(`Error starting ${server.name} server`);
  logger.error(error);
};

const startServer = () => {
  try {
    // Server startup
    let port = process.argv[2] || DEFAULT_HTTP_PORT;

    if (isNaN(port) || port < 0) {
      throw new Error('Port should be a valid positive integer number');
    }

    server.listen(port, (error) => {
      if (error) {
        logError(error);
      } else {
        logger.info(`${server.name} server listening on port: ${port}`);
      }
    });

    // Exception handling
    server.on('uncaughtException', (req, res, route, error) => {
      logger.error(error);
      res.send(httpStatusCodes.InternalServerError, `Uncaught Exception: ${error}`);
    });

    server.on('error', error => {
      logError(error);
    });
  } catch (error) {
    logError(error);
  }
};

startServer();
