const DbConnection = require('../Connection/DbConnection');

let AportesModel = {};

const connection = DbConnection();

AportesModel.getAporte = (callback) => {
    if(connection){
        connection.query('SELECT * FROM tipoAportes ORDER BY Nombre ',
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

AportesModel.getAportes = (IdTipoAporte,callback) => {
    if(connection){
        connection.query('SELECT * FROM tipoAportes WHERE IdTipoAporte = ?', IdTipoAporte,
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
        connection.query('INSERT INTO tipoAportes SET?', aporte,
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
        UPDATE tipoAportes SET
   
        Nombre = ${connection.escape(AportesData.Nombre)},
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
    SELECT * FROM tipoAportes WHERE IdTipoAporte = ${connection.escape(id)}
    `;

    connection.query(sqlExists, (err, row) => {
    if (row) {
        var sql = `DELETE FROM tipoaportes WHERE IdTipoAporte=` + connection.escape(id);
        
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