const DbConnection = require('../Connection/DbConnection');

let SolicitudModel = {};

const connection = DbConnection();

SolicitudModel.getSolicitudes = (callback) => {
    if(connection){
        connection.query('SELECT * FROM Solicitudes ORDER BY Fecha DESC',
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

SolicitudModel.getSolicitudes = (Id,callback) => {
    if(connection){
        connection.query('SELECT * FROM Solicitudes WHERE Id = ?', Id,
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

SolicitudModel.insertSolicitud= (discusion, callback) => {
    if(connection){
        connection.query('INSERT INTO Solicitudes SET ?', discusion,
            (err, result) => {
                if(err){
                    callback(err, {'insertId': 0});
                }else{
                    callback(null, {'insertId': result.insertId});
                }
            });
    }
};

SolicitudModel.updateSolicitud = (Data, callback) => {
    if (connection) {
      const sql = `
        UPDATE Solicitudes SET
        Fecha = ${connection.escape(Data.Titulo)},
        Tema = ${connection.escape(Data.Descripcion)},
        Descripcion = ${connection.escape(Data.Conclusion)},
        ModifyBy = ${connection.escape(Data.ModifyBy)},
        DateModification = ${connection.escape(Data.DateModification)}
        WHERE id = ${userData.id}`;
  
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

  SolicitudModel.deleteDiscusion = (id, callback) => {
if (connection) {
    var sqlExists = `
    SELECT * FROM Solicitudes WHERE Id = ${connection.escape(id)}
    `;

    connection.query(sqlExists, (err, row) => {
    if (row) {
        var sql = `DELETE FROM Solicitudes WHERE Id=` + connection.escape(id);
        
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

        callback(null, {
        "msg": "not Exists"
        });

    }
    });
}
};

module.exports = SolicitudModel;