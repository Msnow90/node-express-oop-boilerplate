const awilix = require('awilix');
const sharedDeps = require('./dependencies/Shared');
const userServicesDeps = require('./dependencies/UserServices');

const container = awilix.createContainer({
  injectionMode: awilix.InjectionMode.PROXY
})

function setup() {
    container.register(sharedDeps);
    container.register(userServicesDeps);
}


module.exports = setup;