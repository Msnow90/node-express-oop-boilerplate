const awilix = require('awilix');
const UserLoginService = require('../services/UserServices/UserLoginService');
const UserRegisterService = require('../services/UserServices/UserRegisterService');

// UserServices Deps
module.exports = {
    UserLoginService: awilix.asClass(UserLoginService),
    UserRegisterService: awilix.asClass(UserRegisterService)
}