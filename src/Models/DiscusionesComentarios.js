const DbConnection = require('../Connection/DbConnection');

var connection = DbConnection();

let comentariosModel = {};

comentariosModel.getComentarios = (callback) => {
    if(connection){
        connection.query("SELECT * FROM DiscusionComentarios ORDER BY Fecha",
    (err, rows) => {
        if(err){
            callback(err,null);
        }else{
            callback(null,rows);
        }
    });
    }
};

comentariosModel.insertComentario = (comentario, callback) => {
    if(connection){
        connection.query('INSERT INTO DiscusionComentarios ?', comentario, 
        (err,result) => {
            if(err){
                callback(err,{'insertId': 0});
            }else{
                callback(null, {'insertId': result.insertId});
            }
        });
    }
};

module.exports = comentariosModel;