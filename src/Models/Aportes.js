const DbConnection = require('../Connection/DbConnection');

let AportesModel = {};

const connection = DbConnection();

AportesModel.getAporte = (callback) => {
    if(connection){
        connection.query('SELECT * FROM Aportes ORDER BY FechaCreacion DESC',
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

AportesModel.getAportes = (Idaporte,callback) => {
    if(connection){
        connection.query('SELECT * FROM Aportes WHERE IdAporte = ?', Idaporte,
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

AportesModel.insertAporte = (aporte, callback) => {
    if(connection){
        connection.query('INSERT INTO Aportes SET?', aporte,
            (err, result) => {
                console.log(err);
                console.log(result);
                if(err){
                    throw err;
                }else{
                    callback(null, {'insertId': result.insertId});
                }
            });
    }else{
        console.log('Error');
    }
};

AportesModel.updateAporte = (AportesData, callback) => {
    if (connection) {
      const sql = `
        UPDATE Aportes SET
        Nota = ${connection.escape(AportesData.Nota)},
        Nombre = ${connection.escape(AportesData.Nombre)},
        ModifyBy = ${connection.escape(AportesData.ModifyBy)},
        DateModification = ${connection.escape(AportesData.DateModification)}
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

AportesModel.deleteAporte = (id, callback) => {
if (connection) {
    var sqlExists = `
    SELECT * FROM Aportes WHERE Idaporte = ${connection.escape(id)}
    `;

    connection.query(sqlExists, (err, row) => {
    if (row) {
        var sql = `DELETE FROM Aportes WHERE Idaporte=` + connection.escape(id);
        
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

module.exports = AportesModel;