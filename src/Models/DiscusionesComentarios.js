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

comentariosModel.getComentariosDiscusion = (idDiscusion,callback) => {
    if(connection){
        connection.query("SELECT * FROM DiscusionComentarios WHERE IdDiscusion = ? ORDER BY Fecha DESC", idDiscusion,
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
        connection.query('INSERT INTO DiscusionComentarios SET ?', comentario, 
        (err,result) => {
            if(err){
                throw err;
            }else{
                callback(null, {'insertId': result.insertId});
            }
        });
    }
};

comentariosModel.updateComentario = (comentarioData, callback) => {
    if (connection) {
      const sql = `
        UPDATE DiscusionComentarios SET
        Comentario = ${connection.escape(comentarioData.Comentario)},
        ModifyBy = ${connection.escape(comentarioData.ModifyBy)},
        DateModification = ${connection.escape(comentarioData.DateModification)}
        WHERE IdComentario = ${connectio.scape(comentarioData.IdComentario)}`;
  
      connection.query(sql, function (err, result) {
        if (err) {
          callback(err,null);
        } else {
          callback(null, {
            "msg": "success"
          });
        }
      });
    }
  };

  comentariosModel.deleteComentario = (id, callback) => {
if (connection) {
    var sqlExists = `
    SELECT * FROM DiscusionComentarios WHERE IdComentario = ${connection.escape(id)}
    `;

    connection.query(sqlExists, (err, row) => {
    if (row) {
        var sql = `
        DELETE FROM DiscusionComentarios WHERE IdComentario=` + connection.escape(id);
        
        connection.query(sql, (err, result) => {
        if (err) {
            callback(err,null);
        } else{
            callback(null, {
            "msg": "deleted"
            });
        }
        });

    } else {

        callback(err, {
        "msg": "not Exists"
        });

    }
    });
}
};

module.exports = comentariosModel;