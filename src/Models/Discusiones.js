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
            });
    }
};

DiscusionesModel.updateDiscusion = (discusionData, callback) => {
    if (connection) {
      const sql = `
        UPDATE Discusiones SET
        Titulo = ${connection.escape(discusionData.Titulo)},
        Descripcion = ${connection.escape(discusionData.Descripcion)},
        Conclusion = ${connection.escape(discusionData.Conclusion)},
        Estado = ${connection.escape(discusionData.Estado)},
        ModifyBy = ${connection.escape(discusionData.ModifyBy)},
        DateModification = ${connection.escape(discusionData.DateModification)}
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

DiscusionesModel.deleteDiscusion = (id, callback) => {
if (connection) {
    var sqlExists = `
    SELECT * FROM Discusiones WHERE IdDiscusion = ${connection.escape(id)}
    `;

    connection.query(sqlExists, (err, row) => {
    if (row) {
        var sql = `DELETE FROM Discusiones WHERE IdDiscusion=` + connection.escape(id);
        
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

module.exports = DiscusionesModel;