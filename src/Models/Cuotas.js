const DbConnection = require('../Connection/DbConnection');

let CuotaModel = {};

const connection = DbConnection();

CuotaModel.getCuota = (callback) => {
    if(connection){
        connection.query('SELECT * FROM Cuota ORDER BY fechaUltimoPago',
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

CuotaModel.getCuota = (Idcuota,callback) => {
    if(connection){
        connection.query('SELECT * FROM Cuota WHERE IdCuota = ?', Idcuota,
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

CuotaModel.insertCuota = (cuota, callback) => {
    if(connection){
        connection.query('INSERT INTO Cuota SET?', cuota,
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

CuotaModel.updatecuota = (CuotaData, callback) => {
    if (connection) {
      const sql = `
        UPDATE Cuota SET
        Nota = ${connection.escape(CuotaData.Nota)},
        Nombre = ${connection.escape(CuotaData.Nombre)},
        ModifyBy = ${connection.escape(CuotaData.ModifyBy)},
        DateModification = ${connection.escape(CuotaData.DateModification)}
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

CuotaModel.deletecuota = (id, callback) => {
if (connection) {
    var sqlExists = `
    SELECT * FROM Cuota WHERE Idcuota = ${connection.escape(id)}
    `;

    connection.query(sqlExists, (err, row) => {
    if (row) {
        var sql = `DELETE FROM Cuota WHERE Idcuota=` + connection.escape(id);
        
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

module.exports = CuotaModel;