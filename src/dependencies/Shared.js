const awilix = require('awilix');
const db = require('./db/connection');
const CustomError = require('../lib/CustomError');
const Engine = require('../services/Engine');
const Controller = require('../controllers/Controller');

// shared deps
module.exports = {
    database: awilix.asValue(db),
    CustomError: awilix.asClass(CustomError),
    Engine: awilix.asClass(Engine),
    Controller: awilix.asClass(Controller)
}