const gasto = require('../Models/Gastos');

module.exports = function(app){
    app.get('/gasto', (req,res)=>{

        gasto.getGastos((err,data)=>{

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


    app.get('/gasto/:id', (req,res)=>{

        gasto.getGasto(req.params.id,(err,data)=>{

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



   
    app.post('/gasto',(req,res)=>{

        var gastoData ={
            IdGasto: null,
            IdVecino: req.body.IdVecino,
            IdSuplidor:req.body.IdSuplidor,
            Descripcion: req.body.Descripcion,
            Monto: req.body.Monto,
            Fecha: req.body.Fecha
           
        };

        gasto.insertGastos(gastoData,(err,data)=>{
            
            if(data && data.insertId)
            {
                res.status(200).json({success: true, msg: "Gasto Registrado Exitosamente...",  data: data });
            }
            else
            {
                res.status(500).json({ success: false, msg: "Gasto Fallido" });
            }

        });


    });


   
}