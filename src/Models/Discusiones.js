const DbConnection = require('../Connection/DbConnection');

let DiscusionesModel = {};
// let DiscusionesComentariosModel = require('./DiscusionesComentarios');

const connection = DbConnection();

DiscusionesModel.getEstados = (callback) => {
    if (connection) {
        connection.query('SELECT * FROM EstadosDiscusiones', (err, rows) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, rows);
            }
        });
    }
}

DiscusionesModel.getDiscusiones = (callback) => {
    if (connection) {
        connection.query('SELECT * FROM Discusiones ORDER BY FechaCreacion DESC', (err, rows) => {
            if (err) {
                callback(err,null);
            } else {
                callback(null,rows);
            }
        });
    }
};

DiscusionesModel.getDiscusion = (idDiscusion,callback) => {
    if (connection) {
        connection.query('SELECT * FROM Discusiones WHERE IdDiscusion = ?', idDiscusion, (err, rows) => {
            if (err) {
                callback(err,null);
            } else {
                callback(null,rows);
            }
        })
    }
};

DiscusionesModel.insertDiscusion = (discusion, callback) => {
    if (connection) {
        connection.query('INSERT INTO Discusiones SET ?', discusion, (err, result) => {
            if (err) {
                callback(err, {'insertId': 0});
            } else {
                callback(null, {'insertId': result.insertId});
            }
        });
    }
};

DiscusionesModel.updateDiscusion = (discusionData, callback) => {

    // console.log('entró al update');

    if (connection) {
      const sql = `
        UPDATE Discusiones SET
        Titulo = ${connection.escape(discusionData.Titulo)},
        Descripcion = ${connection.escape(discusionData.Descripcion)},
        Conclusion = ${connection.escape(discusionData.Conclusion)},
        Estado = ${connection.escape(discusionData.Estado)},
        ModifyBy = ${connection.escape(discusionData.ModifyBy)},
        DateModification = ${connection.escape(discusionData.DateModification)}
        WHERE IdDiscusion = ${discusionData.IdDiscusion}`;
  
        // console.log(sql);

      connection.query(sql, function (err, result) {
        if (err) {
            // console.log('Error SQL');
          callback(err,null);
        } else {
            // console.log('success en el update');
          callback(null, {
            "success": true
          });
        }
      });
    }
  };

DiscusionesModel.deleteDiscusion = (id, callback) => {
if (connection) {
    var sqlExists = `
    SELECT * FROM Discusiones WHERE IdDiscusion = ${connection.escape(id)}
    `;

    // console.log(sqlExists);

    connection.query(sqlExists, (err, row) => {
        console.log('dentro');
    if (row) {

        //HAY QUE ELIMINAR COMENTARIOS
        // let comentarios = DiscusionesComentariosModel.getComentariosDiscusion(+connection.escape(id));
        // comentarios.forEach(comentario => {
        //     comentario.deleteComentario(comentario.IdComentario);
        // });
        // DiscusionesComentariosModel.deleteComentario()

        var sql = `DELETE FROM Discusiones WHERE IdDiscusion=` + connection.escape(id);

        console.log(sql);
        
        connection.query(sql, (err, result) => {
        if (err) {
            console.log('error al eliminar');
            callback(err,null);
        } else {
            callback(null, {
            "msg": "deleted"
            });
        }
        });
    } else {
        console.log('error exists');
        callback(null, {
        "msg": "not Exists"
        });
    }
    });
}
};

module.exports = DiscusionesModel;