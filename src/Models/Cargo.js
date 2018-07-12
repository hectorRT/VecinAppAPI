const DbConnection = require('../Connection/DbConnection');

let CargoModel={}

const conexion=DbConnection();

CargoModel.getCargos=(callback)=>{

    if(conexion){

        conexion.query('SELECT * FROM cargos',
        (err, resul)=>{

            if(err){
                callback(err,null);
            }
            else{

                callback(null,resul);
            }
        })
    }
}

module.exports=CargoModel;