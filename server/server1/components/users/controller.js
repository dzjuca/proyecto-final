const store = require('./store');

function addUser(user){
    if (!user.email || !user.password || !user.name){
        return Promise.reject('Missing data');
    }
    return store.addUser(user);
}

module.exports = {
    addUser:addUser
}