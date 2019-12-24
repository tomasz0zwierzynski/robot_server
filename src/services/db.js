const Datastore = require('nedb');
const db = {};
db.users = new Datastore( { filename: 'users.db', autoload: true } );

function registerUser( user ) {

    if ( user.username && user.password && user.roles ) {

    } else {
        throw new Error('Unproper user object');
    }
}

module.exports = {

    users: [],

    roles: [ 'ADMIN', 'NOT_LOGGED', 'OBSERVER' ],

    createUser: function (user) {
        if ( user.username && user.password ) {
            this.users.push( user );
        }
    },

    findUserByUsername: function (username) {
        return this.users.find( u => u.username === username );
    }

}