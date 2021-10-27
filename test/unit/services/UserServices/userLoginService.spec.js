const UserLoginService = require('../../../../src/services/UserServices/UserLoginService');
const expect = require('chai').expect;
const Engine = require('../../../../src/services/Engine');
const CustomError = require('../../../../src/lib/CustomError');

describe('UserLoginService can...', () => {

    let userLoginService;
    
    beforeEach(() => {
        const db = { query: async () => []};
        userLoginService = new UserLoginService({ database: db, Engine, CustomError })
    })


    it('if no users found, returns engine class with proper error messages and status', async () => {
        const email = 'someemail@email.com';
        const password = 'somepass'
        await userLoginService.init(email, password);

        expect(userLoginService.error.clientErrorMessage).to.equal('Invalid username/password!');
        expect(userLoginService.error.serverErrorMessage).to.equal(`No user found for provided email ${email}.`);
        expect(userLoginService.error.statusCode).to.equal(401);
        expect(userLoginService.success).to.equal(false);
        expect(userLoginService.data).to.be.undefined;

    })

    it('when database is not provided, will throw 500 error', async () => {
        const email = 'someemail@email.com';
        const password = 'somepass';
        userLoginService = new UserLoginService({ Engine, CustomError })
        await userLoginService.init(email, password);

        expect(userLoginService.error.statusCode).to.equal(500);
    })

    it('when email is blank, will throw 422 error', async () => {
        const password = 'somepass'
        await userLoginService.init('', password);

        expect(userLoginService.error.statusCode).to.equal(422);
    })

    it('when password is blank, will throw 422 error', async () => {
        const email = 'someemail@email.com';
        await userLoginService.init(email, '');

        expect(userLoginService.error.statusCode).to.equal(422);
    })

    // cover match specs and non-match specs next
})