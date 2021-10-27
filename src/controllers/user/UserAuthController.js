const Controller = require('../Controller');

class UserAuthController extends Controller {

    constructor(deps) {
        this.UserLoginService = new deps.UserLoginService(deps);
        this.UserRegisterService = new deps.UserRegisterService(deps);
    }

    async login(req, res, next) {
        
        const { email, password } = req.body;

        await this.UserLoginService.init(email, password);
        this.addServiceCall.push(this.UserLoginService, this.UserLoginService.success); // push subsequent calls from other services

        if (this.checkServicesHaveSucceeded())
            return res.status(200).json(this.UserLoginService.data);

        else {
            await this.initiateCleanup(); // if cleanup necessary
            const { clientErrorMessages, serverErrorMessages } = this.returnErrors();
            return res.status(this.UserLoginService.error.statusCode).json({ errors: clientErrorMessages });
        }

    }

    async register(req, res, next) {

    }

}