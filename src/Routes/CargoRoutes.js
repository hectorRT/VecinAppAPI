const cargo = require('../Models/Cargo');


module.exports =function(app){


    app.get('/cargos',(req,res)=>{

        cargo.getCargos((err,data)=>{

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