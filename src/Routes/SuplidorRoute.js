const suplidor = require('../Models/Suplidores');

module.exports = function(app){
    app.get('/suplidor', (req,res)=>{

        suplidor.getSuplidores((err,data)=>{

            if(err)
            {
               res.status(500).json(err);
              

            }
            else
            {
                res.json(data);
        
            }

        });

    });


    app.get('/suplidor/:id', (req,res)=>{

        suplidor.getSuplidor(req.params.id,(err,data)=>{

            if(err)
            {
                res.status(500).json(err);
            }
            else
            {
                res.json(data);
            }

        });
    });



    
    app.post('/suplidor',(req,res)=>{

        var suplidorData ={
            IdSuplidor: null,
            Nombre: req.body.Nombre,
            Telefono: req.body.Telefono,
            Direccion: req.body.Direccion,
            Representante: req.body.Representante,
            TelRepresentante: req.body.TelRepresentante
        };

        suplidor.insertSuplidor(suplidorData,(err,data)=>{
            
            if(data && data.insertId)
            {
                res.status(200).json({success: true, msg: "Suplidor Registrado Exitosamente...",  data: data });
            }
            else
            {
                res.status(500).json({ success: false, msg: "Suplidor Fallido" });
            }

        });


    });


    app.put('/suplidor/:id',(req,res)=>{

        var suplidorData ={

            IdSuplidor: null,
            Nombre: req.body.Nombre,
            Telefono: req.body.Telefono,
            Direccion: req.body.Direccion,
            Representante: req.body.Representante,
            TelRepresentante: req.body.TelRepresentante

        };

        suplidor.updateSuplidor(suplidorData,(err,data)=>{


            if(data && data.msg)
            {
                res.status(200).json({ success: true,data: data});
            }
            else
            {
                res.status(500).json({ success: false, msg: "Fallido" });
            }
            
        });


    });

    app.delete('/vecinos/:id', (req,res)=>{

        suplidor.deleteVecino(req.params.id,(err,data)=>{
            
            if (data && (data.msg === 'Eliminado con Exito' || data.msg == 'No Existe'))
            {
                res.json({
                    success: 'true',
                    data: data
                });
            } 
            else 
            {
                res.status(500).json({msg: 'Error', data: err});
            }
          

        });
    });
}