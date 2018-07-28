const DbConnection = require('../Connection/DbConnection');

let GastoModel={}
const conexion = DbConnection();

GastoModel.getGastos=(callback)=>{

    if(conexion){

        conexion.query("SELECT * FROM Gastos",
            (err,rows)=>{
                if(err){
                    callback(err,null);
                }
                else{

                    callback(null,rows);
                }
            })
    }

};


GastoModel.getGasto=(gasto,callback)=>{

    if(conexion)
    {
        conexion.query("SELECT *FROM Gastos WHERE IdGasto=? ",gasto,
        (err,result)=>{

            if(err)
            {
                throw err;
            }
            else
            {
                callback(null,result);
            }
        });
    }

};




GastoModel.insertGastos=(gasto, callback)=>{

    if(conexion){
        conexion.query("INSERT INTO Gastos SET?",gasto,
            (err,result)=>{

                if(err)
                {
                    throw err;
                }
                else
                {
                    callback(null,{"insertId":result.insertId})
                }
            });
    }

};

module.exports = GastoModel;
