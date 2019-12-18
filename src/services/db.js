module.exports = {

    users = [],

    createUser = function (user) {
        if ( user.username && user.password ) {
            this.users.push( user );
        }
    },

    findUserByName = function (username) {
        return this.users.find( u => u.username === username );
    },  



}