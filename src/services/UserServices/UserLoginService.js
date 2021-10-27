const Engine = require('../Engine');
const bcrypt = require('bcryptjs');
const bcryptConfig = require('../../config/bcrypt');
const { isEmpty } = require('lodash');

class UserLoginService extends Engine {

    constructor(opts) {
        super();
        this.CustomError = opts.CustomError;
        this.database = opts.database;
    }

    async init(email, password) {

        const database = this.database;
        const CustomError = this.CustomError;
        let user; // user object returned upon successful login
        let match; // boolean for passwords did match
        

        try {

            if (isEmpty(database)) {
                throw new CustomError(
                    'Server error, please try again later.',
                    'No database connection found.',
                    500
                )
            }
    
            if (isEmpty(email) || isEmpty(password)) {
                throw new CustomError(
                    'No username/password provided to the system.',
                    `Email empty status ${isEmpty(email)} password empty status ${isEmpty(password)}`,
                    422
                )
            }
    
            const userData = await database.query(`SELECT * FROM User WHERE email = ? AND valid = 1`, [email]);
    
            if (isEmpty(userData)) {
                throw new CustomError( 
                    'Invalid username/password!', 
                    `No user found for provided email ${email}.`, 
                    401
                );
            }
    
            user = userData[0];
    
            match = await bcrypt.compare(password + bcryptConfig.secret, user.password);
    
            if (match) {
                delete user.password;
                this.setSuccess(true);
                this.setData(user);
                // await mysql.query(`UPDATE User SET lastLogin = Now() where email = ?`, [email]); // is this auto?
            }
    
            else {
                throw new CustomError(
                    'Invalid username/password!', 
                    `Passwords do not match for provided email ${email}.`, 
                    401 
                );
            }
    
        } catch(err) {
            this.catchError(err);
        }
    }
}


module.exports = UserLoginService;