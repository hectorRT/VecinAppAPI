const vecindario = require('../Models/Vecindario');

module.exports = function(app){
    app.get('/vecindario', (req,res)=>{

        vecindario.getVecindarios((err,data)=>{

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


    app.get('/vecindario/:id', (req,res)=>{

        vecindario.getVecindario(req.params.id,(err,data)=>{

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



    app.post('/vecindario',(req,res)=>{

        var vecindarioData ={
            IdVecindario: null,
            IdFondo: req.body.IdFondo,
            nombre: req.body.nombre,
            ciudad: req.body.ciudad,
            sector: req.body.sector,
            direccionLocal: req.body.direccionLocal,
            provincia: req.body.provincia,
            montoAporteMensual: req.body.montoAporteMensual,
            fechaCreacion: req.body.fechaCreacion
        };

        vecindario.insertVecindario(vecindarioData,(err,data)=>{
            
            if(data && data.insertId)
            {
                res.status(200).json({success: true, msg: "Vecindario Registrado Exitosamente...",  data: data });
            }
            else
            {
                res.status(500).json({ success: false, msg: "Vecindario Fallido" });
            }

        });


    });


    app.put('/vecindario/:id',(req,res)=>{

        var vecindarioData ={
            IdVecindario: req.body.IdVecindario,
            IdFondo: req.body.IdFondo,
            nombre: req.body.nombre,
            ciudad: req.body.ciudad,
            sector: req.body.sector,
            direccionLocal: req.body.direccionLocal,
            provincia: req.body.provincia,
            montoAporteMensual: req.body.montoAporteMensual,
            fechaCreacion: req.body.fechaCreacion

        };

        vecindario.updateVecindario(vecindarioData,(err,data)=>{


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

    app.delete('/vecindario/:id', (req,res)=>{

        vecindario.deleteVecindario(req.params.id,(err,data)=>{
            
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