module.exports = {

    users = [],

    roles = [ 'ADMIN', 'NOT_LOGGED', 'OBSERVER' ],

    createUser = function (user) {
        if ( user.username && user.password ) {
            this.users.push( user );
        }
    },

    findUserByUsername = function (username) {
        return this.users.find( u => u.username === username );
    },  



}