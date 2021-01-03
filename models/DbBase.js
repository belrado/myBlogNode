const DBConn = require('../config/dbconn');

class DbBase {
    constructor () {
        this.DB = DBConn.connect();
    };
}

module.exports = DbBase;