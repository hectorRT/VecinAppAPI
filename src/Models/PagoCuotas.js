const DbConnection = require('../Connection/DbConnection');

let PagoModel = {};

const connection = DbConnection();

PagoModel.getPago = (callback) => {
    if(connection){
        connection.query('SELECT * FROM PagoCuota ORDER BY fecha',
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

PagoModel.getPago = (IdPago,callback) => {
    if(connection){
        connection.query('SELECT * FROM PagoCuota WHERE IdPago = ?', IdPago,
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

PagoModel.insertPago = (Pago, callback) => {
    if(connection){
        connection.query('INSERT INTO PagoCuota SET?', Pago,
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

PagoModel.updatePago = (PagoData, callback) => {
    if (connection) {
      const sql = `
        UPDATE PagoCuota SET
        Nota = ${connection.escape(PagoData.Nota)},
        Nombre = ${connection.escape(PagoData.Nombre)},
        ModifyBy = ${connection.escape(PagoData.ModifyBy)},
        DateModification = ${connection.escape(PagoData.DateModification)}
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

PagoModel.deletePago = (id, callback) => {
if (connection) {
    var sqlExists = `
    SELECT * FROM PagoCuota WHERE IdPago = ${connection.escape(id)}
    `;

    connection.query(sqlExists, (err, row) => {
    if (row) {
        var sql = `DELETE FROM PagoCuota WHERE IdPago=` + connection.escape(id);
        
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

module.exports = PagoModel;