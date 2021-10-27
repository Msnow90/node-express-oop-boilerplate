const { expect } = require('chai');

const Controller = require('../../src/controllers/Controller');
const Engine = require('../../src/services/Engine');
const CustomError = require('../../src/lib/CustomError');

describe('The controller class can...', () => {

    describe('the checkServicesHaveSucceeded method can...', () => {

        it('if one service call has succeeded, will return true.', () => {
            const controllerIns = new Controller({ Engine, CustomError });
            const engineIns = new Engine();
            const callData = { service: engineIns, success: true };

            controllerIns.addServiceCall(callData.service, callData.success);
            expect(controllerIns.checkServicesHaveSucceeded()).to.be.true;
        })


        it('if one service call has failed, will return false.', () => {
            const controllerIns = new Controller({ Engine, CustomError });
            const engineIns = new Engine();
            const callData = { service: engineIns, success: false };

            controllerIns.addServiceCall(callData.service, callData.success);
            expect(controllerIns.checkServicesHaveSucceeded()).to.be.false;
        })

        it('if more than one service call has succeeded, will return true.', () => {
            const controllerIns = new Controller({ Engine, CustomError });
            const engineIns = new Engine();
            const callData = { service: engineIns, success: true };

            controllerIns.addServiceCall(callData.service, callData.success);
            controllerIns.addServiceCall(callData.service, callData.success);
            expect(controllerIns.checkServicesHaveSucceeded()).to.be.true;
        })

        it('if more than one service call has failed, will return false.', () => {
            const controllerIns = new Controller({ Engine, CustomError });
            const engineIns = new Engine();
            const callData = { service: engineIns, success: false };

            controllerIns.addServiceCall(callData.service, callData.success);
            controllerIns.addServiceCall(callData.service, callData.success);
            expect(controllerIns.checkServicesHaveSucceeded()).to.be.false;
        })


        it('if more than one service call has succeeded and failed, will return false.', () => {
            const controllerIns = new Controller({ Engine, CustomError });
            const engineIns = new Engine();
            const callData = { service: engineIns, success: true };
            const callData2 = { service: engineIns, success: false };

            controllerIns.addServiceCall(callData.service, callData.success);
            controllerIns.addServiceCall(callData2.service, callData2.success);
            expect(controllerIns.checkServicesHaveSucceeded()).to.be.false;
        })


    })

    describe('the addServiceCall method can...', () => {


        it('store a serviceCall in instantiated instance.', () => {
            const controllerIns = new Controller({ Engine, CustomError });
            const engineIns = new Engine();
            const callData = { service: engineIns, success: true };
            controllerIns.addServiceCall(callData.service, callData.success);
    
            expect(controllerIns.serviceCalls[0].service).to.equal(engineIns);
        })


    
        it('ensure service is proper instance otherwise will throw error.', () => {
            const controllerIns = new Controller({ Engine, CustomError });
            const callData = { somethingElse: 'someservice', success: true };
    
            try {
                controllerIns.addServiceCall(callData.service, callData.success);
            } catch(err) {
                expect(err.clientErrorMessage).to.equal('Server error, please try again later.')
            }
        })



        it('needs a boolean for success', () => {
            const controllerIns = new Controller({ Engine, CustomError });
            const engineIns = new Engine();
            const callData = { somethingElse: engineIns, success: undefined };
    
            try {
                controllerIns.addServiceCall(callData.service, callData.success);
            } catch(err) {
                expect(err.clientErrorMessage).to.equal('Server error, please try again later.')
            }
        })

    })


    describe('the intiateCleanup method can...', () => {



    })





})