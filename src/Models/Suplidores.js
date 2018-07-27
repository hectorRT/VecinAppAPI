const DbConnection = require('../Connection/DbConnection');

let SuplidorModel={}
const conexion = DbConnection();

SuplidorModel.getSuplidores=(callback)=>{

    if(conexion){

        conexion.query("SELECT * FROM Suplidores",
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

SuplidorModel.getSuplidor=(suplidor,callback)=>{

    if(conexion)
    {
        conexion.query("SELECT *FROM Suplidores WHERE IdSuplidor=? ",suplidor,
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

SuplidorModel.insertSuplidor =(suplidor, callback)=>{

    if(conexion){
        conexion.query("INSERT INTO Suplidor SET?",suplidor,
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

SuplidorModel.updateSuplidor=(suplidor,callback)=>{

    if(conexion)
    {
       let sql = `
       UPDATE Suplidores SET
       Nombre = ${conexion.escape(suplidor.nombre)},
       Telefono = ${conexion.escape(suplidor.Telefono)},
       Direccion = ${conexion.escape(suplidor.Direccion)},
       Representante = ${conexion.escape(suplidor.Representante)},
       Telrepresentante = ${conexion.escape(suplidor.TelRepresentante)}
       `;

       conexion.query(sql,(err,result)=>{
           if(err)
           {
               throw err;
           }
           else
           {
               callback(null,{msg:"Actualizado Con Exito..."});
           }
       });
    };


};

SuplidorModel.deleteVecino=(suplidor,callback)=>{

    if(conexion)
    {
        let sql =` SELECT FROM Suplidores WHERE IdSuplidor =${conexion.escape(suplidor)}`;
        
        conexion.query(sql,(err,result)=>{
           
            if(result){

                let sql =` DELETE FROM Suplidores WHERE IdSuplidor =${conexion.escape(suplidor)}`;

                conexion.query(sql,(err,result)=>{

                    if(err)
                    {
                         throw err;
                    }
                    else
                    {
                        callback(null,{msg:"Eliminado con Exito"});
                    }
                });

            }
            else
            {
                callback(null,{msg:"No Existe"});
            }

        });

  

    }

};
module.exports = SuplidorModel;
