const aportes = require('../Models/TipoAporte');

module.exports = function(app){
    app.get('/tipoaportes', (req,res) => {
        aportes.getAporte((err,data) => {
            if(err){
                res.status(500).json(err);
            }else{
                res.json(data);
            }
        });
    });

    app.get('/tipoaportes/:id', (req,res) => {
        aportes.getAportes(req.params.id,(err,data) => {
            if(err){
                res.status(500).json(err);
            }else{
                res.json(data);
            }
        });
    });

    app.post('/tipoaportes', (req, res) => {
        console.log('ANt');
        var aporte = {
            IdTipoAporte: null,
           
            Nombre: req.body.Nombre,
         
            ModifyBy:req.body.ModifyBy,
            DateModification:req.body.DateModification
        };
        console.log('ANt');
        aportes.insertAporte(aporte, (err, data) => {
            console.log(data);
            console.log(err);
            if(data && data.insertId){
                res.status(200).json({
                    success: true,
                    msg: "Transacción Exitosa",
                    data: data
                });
            }else{
                res.status(500).json({
                    success: false,
                    msg: "Transacción Fallida"
                });
            }
        })
    });

    app.put('/tipoaportes/:id', (req, res) => {
        const AportesData = {
            IdTipoAporte: null,
           
            Nombre: req.body.Nombre,
            ModifiBy:req.body.ModifiBy,
            DateModification:req.body.DateModification
        };

        aportes.updateAporte(AportesData, function (err, data) {
            if (data && data.msg) {
                res.status(200).json({
                    success: true,
                    data: data
                });
            } else {
                res.status(500).json({
                    success: false,
                    msg: 'Error'
                });
            }
        });
    });

    app.delete('/tipoaportes/:id', (req, res) => {
        var id = req.params.id;
        aportes.deleteAporte(id, (err, data) =>  {
            if (data && (data.msg === 'deleted' || data.msg == 'not Exists')) {
                res.json({
                    success: 'true',
                    data: data
                });
            } else {
                res.status(500).json({
                    msg: 'Error',
                    data: err
                });
            }
        });
    });
}