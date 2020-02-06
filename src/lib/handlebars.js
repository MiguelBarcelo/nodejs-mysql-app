const { format }    = require('timeago.js');

// La funcion tiene que ser accedidad por las vistas hbs
const helpers = {};

helpers.timeago = (timestamp) => {
    return format(timestamp);
};

module.exports = helpers;