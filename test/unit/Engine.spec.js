const { expect } = require('chai');
const CustomError = require('../../src/lib/CustomError');
const Engine = require('../../src/services/Engine');


describe('The engine class can...', () => {

    describe('the setError method can...', () => {
        
        it('set an error to the instance', () => {
            const engIns = new Engine();
            const errTest = { name: 'Error Name' };

            engIns.setError(errTest);

            expect(engIns.error).to.deep.equal(errTest);
        })
    })


    describe('the setData method can...', () => {

        it('will set data to instance', () => {
            const engIns = new Engine();
            const dataTest = { data: 'some data' };

            engIns.setData(dataTest);

            expect(engIns.data).to.deep.equal(dataTest);
        })
    })


    describe('the setSuccess method can...', () => {

        it('will set a value to success', () => {
            const engIns = new Engine();

            engIns.setSuccess(true);

            expect(engIns.success).to.equal(true);
        })
    })


    describe('the catchError method can...', () => {

        it('will set the error of instance to the error passed, and set success to false.', () => {
            const engIns = new Engine();

            const err = new CustomError(
                'Some c msg',
                'Some s msg',
                500
            )

            engIns.catchError(err);

            expect(engIns.error).to.deep.equal(err);
            expect(engIns.success).to.equal(false);
        })

        it('if not a custom error, will reformat to a custom err and stringify original error as server msg.', () => {
            const engIns = new Engine({ CustomError });

            const err = new Error('Uncaught error.');

            engIns.catchError(err);
            
            const serverMessage = JSON.parse(engIns.error.serverErrorMessage);
            
            
            expect(engIns.error.clientErrorMessage).to.equal('Unknown error occurred. Please try again later.');
            expect(serverMessage.message).to.equal('Uncaught error.');
            expect(serverMessage.stack).to.not.be.empty;
            expect(engIns.success).to.equal(false);
        })
    })


})