class Engine {
    data;
    error;
    success;
    cleanup;

    constructor(opts) {
        this.CustomError = (opts) ? opts.CustomError : () => {};
    }



    setError(err) {
        this.error = err;
    }



    setData(data) {
        this.data = data;
    }




    setSuccess(bool) {
        this.success = bool;
    }




    catchError(err) {
        if (err.name == 'CustomError') {
            this.setError(err);
            this.setSuccess(false);
        }
        else {
            const newErr = new this.CustomError(
                'Unknown error occurred. Please try again later.',
                { message: err.message, stack: err.stack },
                500
            )
            this.setError(newErr);
            this.setSuccess(false);
        }
    }


    addCleanup(func, params, ins) {
        this.cleanup = func.bind(ins, params);
    }

}

module.exports = Engine;