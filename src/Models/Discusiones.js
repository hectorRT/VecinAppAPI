const DbConnection = require('../Connection/DbConnection');

let DiscusionesModel = {};

const connection = DbConnection();

DiscusionesModel.getDiscusiones = (callback) => {
    if(connection){
        connection.query('SELECT * FROM Discusiones ORDER BY FechaCreacion DESC',
    (err, rows) => {
        if(err)
        {
            callback(err,null);
        }else{
            callback(null,rows);
        }
    })
    }
};

DiscusionesModel.insertDiscusion = (discusion, callback) => {
    if(connection){
        connection.query('INSERT INTO Discusiones SET ?', discusion,
    (err, result) => {
        if(err){
            callback(err, {'insertId': 0});
        }else{
            callback(null, {'insertId': result.insertId});
        }
    })
    }
};

module.exports = DiscusionesModel;