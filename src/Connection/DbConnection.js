const mysql = require('mysql');

module.exports = () => {
    return mysql.createConnection({
        host: 'localhost',
        user: 'tuUsuario', //root
        password: 'tuPassword',
        database: 'VecinAppDb',
        insecureAuth: true
    });
};