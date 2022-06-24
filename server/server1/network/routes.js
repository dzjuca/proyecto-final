const usersNetwork = require('../components/users/network');

const routes = function(server){
    server.use('/users', usersNetwork);
}

module.exports = routes;