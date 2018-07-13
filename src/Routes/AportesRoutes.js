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
        aportes.getAporte(req.params.id,(err,data) => {
            if(err){
                res.status(500).json(err);
            }else{
                res.json(data);
            }
        });
    });

    app.post('/aportes', (req, res) => {
        var aportes = {
            IdAporte: null,
            IdVecino: req.body.IdVecino,
            Nombre: req.body.Nombre,
            Nota: req.body.Nota,
            FechaCreacion: req.body.FechaCreacion
        };
        aportes.insertAporte(aportes, (err, data) => {
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
            IdAporte: req.params.id,
            IdVecino: req.body.IdVecino,
            Nombre: req.body.Nombre,
            Nota: req.body.Nota,
            FechaCreacion: req.body.FechaCreacion,
            ModifyBy: req.body.IdVecino,
            DateModification: req.body.DateModification
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

    app.deleteAporte('/aportes/:id', (req, res) => {
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