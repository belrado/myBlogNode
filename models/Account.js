const DbBase = require('./DbBase');

class Account extends DbBase {
    constructor () {
        super();
    };

    async getAllUsers () {
        try {
            const result = await this.DB.query('SELECT * FROM users');
            if (result[0].length < 1) {
                return [];
            }
            return result[0];
        } catch(e) {
            throw new Error('Post with this id was not found');
        }
    };

    async getHashTag (tag) {
        try {
            const result = await this.DB.query('SELECT * FROM hashtag');
            if (result[0].length < 1) {
                return [];
            }
            return result[0];
        } catch(e) {
            throw new Error('Post with this id was not found');
        }
    };
}

module.exports = Account;