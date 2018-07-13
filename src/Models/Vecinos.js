const DbConnection = require('../Connection/DbConnection');

let VecinoModel={}
const conexion = DbConnection();

VecinoModel.getVecinos=(callback)=>{

    if(conexion){

        conexion.query("SELECT * FROM Vecinos",
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


VecinoModel.getVecino=(vecino,callback)=>{

    if(conexion)
    {
        conexion.query("SELECT *FROM Vecinos WHERE IdVecino=? ",vecino,
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




VecinoModel.insertVecino =(vecino, callback)=>{

    if(conexion){
        conexion.query("INSERT INTO Vecinos SET?",vecino,
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

VecinoModel.updateVecino=(vecino,callback)=>{

    if(conexion)
    {
       let sql = `
       UPDATE Vecinos SET
       Nombres = ${conexion.escape(vecino.nombre)},
       Apellidos = ${conexion.escape(vecino.Apellidos)},
       Cedula = ${conexion.escape(vecino.Cedula)},
       Direccion = ${conexion.escape(vecino.Direccion)},
       Email = ${conexion.escape(vecino.Email)},
       Clave = ${conexion.escape(vecino.Clave)}
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

VecinoModel.deleteVecino=(vecino,callback)=>{

    if(conexion)
    {
        let sql =` SELECT FROM Vecinos WHERE IdVecino =${conexion.escape(vecino)}`;
        
        conexion.query(sql,(err,result)=>{
           
            if(result){

                let sql =` DELETE FROM Vecinos WHERE IdVecino =${conexion.escape(vecino)}`;

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
module.exports = VecinoModel;
