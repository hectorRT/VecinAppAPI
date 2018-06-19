const mysql = require('mysql');

module.exports = () => {
    return mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'hectoredev3295',
        database: 'VecinAppDb',
        insecureAuth: true
    });
};