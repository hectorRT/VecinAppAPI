const DbConnection = require('../Connection/DbConnection');

let FrecuenciaModel={}

const conexion=DbConnection();

FrecuenciaModel.getFrecuencia=(callback)=>{

    if(conexion){

        conexion.query("SELECT * FROM FrecuenciaPagoCuotas",
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

module.exports=FrecuenciaModel;