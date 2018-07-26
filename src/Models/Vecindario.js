const DbConnection = require('../Connection/DbConnection');

let VecindarioModel={}
const conexion = DbConnection();

VecindarioModel.getVecindarios=(callback)=>{

    if(conexion){

        conexion.query("SELECT *FROM Vecindario",
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


VecindarioModel.getVecindario=(vecindario,callback)=>{

    if(conexion)
    {
        conexion.query("SELECT * FROM Vecindario WHERE IdVecindario=? ",vecindario,
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


VecindarioModel.insertVecindario =(vecindario, callback)=>{

    if(conexion){
        conexion.query("INSERT INTO Vecindario SET?",vecindario,
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

VecindarioModel.updateVecindario=(vecindario,callback)=>{

    if(conexion)
    {
       let sql = `
       UPDATE Vecindario SET
       idFondo = ${conexion.escape(vecindario.idFondo)},
       nombre = ${conexion.escape(vecindario.nombre)},
       magenLogo = ${conexion.escape(vecindario.magenLogo)},
       ciudad = ${conexion.escape(vecindario.ciudad)},
       sector = ${conexion.escape(vecindario.sector)},
       direccionLocal = ${conexion.escape(vecino.direccionLocal)},
       provincia = ${conexion.escape(vecindario.provincia)},
       montoAporteMensual = ${conexion.escape(vecindario.montoAporteMensual)},
       fechaCreacion = ${conexion.escape(vecindario.fechaCreacion)}
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

VecindarioModel.deleteVecindario=(vecindario,callback)=>{

    if(conexion)
    {
        let sql =` SELECT FROM Vecindario WHERE IdVecindario =${conexion.escape(vecindario)}`;
        
        conexion.query(sql,(err,result)=>{
           
            if(result){

                let sql =` DELETE FROM Vecindario WHERE IdVecindario =${conexion.escape(vecindario)}`;

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
module.exports = VecindarioModel;
