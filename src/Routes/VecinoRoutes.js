const vecino = require('../Models/Vecinos');

module.exports = function(app){
    app.get('/vecinos', (req,res)=>{

        vecino.getVecinos((err,data)=>{

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


    app.get('/vecinos/:id', (req,res)=>{

        vecino.getVecino(req.params.id,(err,data)=>{

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


app.get('/Vecinos/Email/:email', (req,res)=>{

    vecino.SeleccionarEmail(req.params.email,(err,data)=>{
        if(err)
        {

            res.status(500).json(err);
        }
        else
        {
            res.json(data);
        }
    })
})

    app.post('/vecinos',(req,res)=>{

        var vecinoData ={
            IdVecino: null,
            IdVecindario: req.body.IdVecindario,
            Idfrecuencia:req.body.Idfrecuencia,
            IdCargo: req.body.IdCargo,
            Nombres: req.body.Nombres,
            Apellidos: req.body.Apellidos,
            Cedula: req.body.Cedula,
            Direccion: req.body.Direccion,
            Email: req.body.Email,
            Clave: req.body.Clave
        };

        vecino.insertVecino(vecinoData,(err,data)=>{
            
            if(data && data.insertId)
            {
                res.status(200).json({success: true, msg: "Vecino Registrado Exitosamente...",  data: data });
            }
            else
            {
                res.status(500).json({ success: false, msg: "Vecino Fallido" });
            }

        });


    });


    app.put('/vecinos/:id',(req,res)=>{

        var vecinoData ={

            IdVecino: req.params.IdVecino,
            IdVecindario: req.body.IdVecindario,
            Idfrecuencia:req.body.Idfrecuencia,
            IdCargo: req.body.IdCargo,
            Nombres: req.body.Nombres,
            Apellidos: req.body.Apellidos,
            Cedula: req.body.Cedula,
            Direccion: req.body.Direccion,
            Email: req.body.Email,
            Clave:req.body.Clave

        };

        vecino.updateVecino(vecinoData,(err,data)=>{


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

        vecino.deleteVecino(req.params.id,(err,data)=>{
            
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