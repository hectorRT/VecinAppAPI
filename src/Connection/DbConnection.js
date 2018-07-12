const mysql = require('mysql');

module.exports = () => {
    return mysql.createConnection({
        host: 'localhost',
        user: 'root', //root
        password: '1234',
        database: 'VecinAppDb',
        
    });
};