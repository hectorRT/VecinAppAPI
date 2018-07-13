const frecuencia = require('../Models/FrecuenciaPago');


module.exports =function(app){


    app.get('/Frecuencia',(req,res)=>{

        frecuencia.getFrecuencia((err,data)=>{

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
}