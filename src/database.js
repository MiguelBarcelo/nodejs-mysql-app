//const mysql           = require('mysql');
//const mariadb         = require('mariadb/callback);
const mariadb           = require('mariadb');

const { promisify } = require('util');

const { database } = require('./keys');

const pool = mariadb.createPool(database);

/*pool.getConnection((err, connection) => {
    if(err) {
        if(err.code === 'PROTOCOL_CONNECTION_LOST') {
            console.error('DATABASE CONNECTION WAS CLOSED');
        }
        if(err.code === 'ER_CON_COUNT_ERROR') {
            console.error('DATABASE HAS TOO MANY CONNECTIONS');
        }
        if(err.code === 'ECONNREFUSED') {
            console.error('DATABASE CONNECTION WAS REFUSED');
        }
        if(err.code === 'ER_ACCESS_DENIED_NO_PASSWORD_ERROR') {
            console.error('ACCESO DENEGADO');
        }
        console.error(`${err.code} ${err.sqlMessage}`);
    }
    console.log(`connection ${connection}`);
    if(connection) {
        connection.release();
        console.log('DB is Connected');
    }
    return;
});
*/
pool.getConnection()
    .then(connection => {
        if(connection) {
            connection.release();
            console.log('DB is Connected');
        }
        return;
    })
    .catch(err => {
        //not connected
        if(err) {
            if(err.code === 'PROTOCOL_CONNECTION_LOST') {
                console.error('DATABASE CONNECTION WAS CLOSED');
            }
            if(err.code === 'ER_CON_COUNT_ERROR') {
                console.error('DATABASE HAS TOO MANY CONNECTIONS');
            }
            if(err.code === 'ECONNREFUSED') {
                console.error('DATABASE CONNECTION WAS REFUSED');
            }
            if(err.code === 'ER_ACCESS_DENIED_NO_PASSWORD_ERROR') {
                console.error('ACCESO DENEGADO');
            }
            console.error(`${err.code} ${err.sqlMessage}`);
        }
    });

// Promisify Pool Querys
// Convirtiendo a promesas lo que eran antes Callbacks
//pool.query = promisify(pool.query);       // mariadb ya me regresa la promesa

module.exports = pool;