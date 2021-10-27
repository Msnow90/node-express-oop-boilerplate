class LoggerInterface {

    static async logDebug(msg) {};

    static async logToLocalFile(msg) {};

    static logToConsole(msg) {
        console.log(msg);
    };

    static async logProduction(msg) {};

    static async logDevelopment(msg) {};

    static async logAll(msg) {
        LoggerInterface.logDebug(msg);
        LoggerInterface.logToLocalFile(msg);
        LoggerInterface.logToConsole(msg);
        LoggerInterface.logProduction(msg);
        LoggerInterface.logDevelopment(msg);

        return true;
    };

}

module.exports = LoggerInterface;