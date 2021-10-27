const expect = require('chai').expect;
const CustomError = require('../../../src/lib/CustomError');

describe('The CustomError class can...', () => {

    const clientErrMsg = 'Some client error message';
    const serverErrMsg = 'Some server error message';

    let err = new CustomError(
        clientErrMsg,
        serverErrMsg,
        500
    )


    it('creates a clientErrorMessage, serverErrorMessage, and statusCode property appropriately.', () => {
        

        expect(err.clientErrorMessage).to.equal(clientErrMsg);
        expect(err.serverErrorMessage).to.equal(serverErrMsg);
        expect(err.timestamp).to.not.equal(null);
        expect(err.uuid).to.not.equal(null);
        expect(err.statusCode).to.equal(500);

    })

    describe('when thrown...', () => {
        it ('will contain proper fields as well as be of CustomError type', () => {
    
            try {
                throw new CustomError(
                    clientErrMsg,
                    serverErrMsg,
                    500
                )
            } catch(err) {
                expect(err).to.have.property('clientErrorMessage');
                expect(err).to.have.property('serverErrorMessage');
                expect(err).to.have.property('statusCode');
                expect(err).to.have.property('timestamp');
                expect(err).to.have.property('message');
                expect(err).to.have.property('uuid');
                expect(err.name).to.equal('CustomError');
            }
    
        })

        it ('with a JSON object as a message, will stringify accordingly.', () => {

            const clientMsgJSON = { message: 'Some message', action: 'Do something'};
            const serverMsgJSON = { message: 'Some message2', action: 'Do something2'};

            try {
                throw new CustomError(
                    clientMsgJSON,
                    serverMsgJSON,
                    500
                )
            } catch(err) {
                expect(err.clientErrorMessage).to.equal(JSON.stringify(clientMsgJSON))
                expect(err.serverErrorMessage).to.equal(JSON.stringify(serverMsgJSON))
            }
    
        })
    })




})