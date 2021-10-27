class Controller {

    constructor(deps) {
        this.Engine = deps.Engine;
        this.CustomError = deps.CustomError;
    }

    
    
    serviceCalls = []; // stores the service calls in order the managing controller. Used for cleanup purposes.




    checkServicesHaveSucceeded() {
        return !this.serviceCalls.map(serviceCall => serviceCall.success).includes(false)
    }



    addServiceCall(service, success) {

        try {

            if (!Controller.#isServiceValid(service) || typeof success != 'boolean') {
                throw new this.CustomError(
                    'Server error, please try again later.',
                    `Invalid service and status provided to controller addServiceCall. Service: ${service}. Status: ${success}`,
                    500
                )
            }

            else
                this.serviceCalls.push({ service, success });


        } catch(err) {
            throw new this.CustomError(
                'Server error, please try again later.',
                `Invalid service and status provided to controller addServiceCall. Service: ${service}. Status: ${success}`,
                500
            )
        }
        
    }




    initiateCleanup() {
        for (let i = this.serviceCalls.length - 1; i >= 0; --i) {
            let serviceData = this.serviceCalls[i];

            if (serviceData.success && serviceData.service.doCleanup)
                serviceData.service.cleanup();
        }
    }



    returnErrors() {
        return {
            clientErrorMessages: this.serviceCalls.filter(call => call.success == false).map(call => call.serviceCall.error.clientErrorMessage),
            serviceErrorMessages: this.serviceCalls.filter(call => call.success == false).map(call => call.serviceCall.error.serverErrorMessage),
        }
    }



    static #isServiceValid(service) {
        const keys = Object.keys(service);
        const includesData = keys.includes('data');
        const includesError = keys.includes('error');
        const includesCleanup = keys.includes('cleanup');
        const includesSuccess = keys.includes('success');

        return (includesData && includesError && includesCleanup && includesSuccess) ? true : false;
    }

}

module.exports = Controller;