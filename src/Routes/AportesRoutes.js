const aportes = require('../Models/Aportes');

module.exports = function(app){
    app.get('/aportes', (req,res) => {
        aportes.getAporte((err,data) => {
            if(err){
                res.status(500).json(err);
            }else{
                res.json(data);
            }
        });
    });

    app.get('/aportes/:id', (req,res) => {
        aportes.getAportes(req.params.id,(err,data) => {
            if(err){
                res.status(500).json(err);
            }else{
                res.json(data);
            }
        });
    });

    app.post('/aportes', (req, res) => {
        console.log('ANt');
        var aporte = {
            IdAporte: null,
            IdVecino: req.body.IdVecino,
            Nombre: req.body.Nombre,
            Nota: req.body.Nota,
            FechaCreacion: req.body.FechaCreacion,
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

    app.put('/aportes/:id', (req, res) => {
        const AportesData = {
            IdAporte: null,
            IdVecino: req.body.IdVecino,
            Nombre: req.body.Nombre,
            Nota: req.body.Nota,
            FechaCreacion: req.body.FechaCreacion,
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

    app.delete('/aportes/:id', (req, res) => {
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