const discusiones = require('../Models/Discusiones');

module.exports = function(app) {

    app.get('/estados-discusiones', (req, res) => {
        discusiones.getEstados((err,data) => {
            if (err) {
                res.status(500).json(err);
            } else {
                res.json(data);
            }
        });
    });

    app.get('/discusiones', (req, res) => {
        discusiones.getDiscusiones((err,data) => {
            if(err){
                res.status(500).json(err);
            }else{
                res.json(data);
            }
        });
    });

    app.get('/discusiones/:id', (req, res) => {
        discusiones.getDiscusion(req.params.id, (err,data) => {
            if (err) {
                res.status(500).json(err);
            } else {
                res.json(data);
            }
        });
    });

    app.post('/discusiones', (req, res) => {
        var discusion = {
            IdDiscusion: null,
            IdVecino: req.body.IdVecino,
            Titulo: req.body.Titulo,
            Descripcion: req.body.Descripcion,
            Conclusion: req.body.Conclusion,
            Estado: req.body.Estado,
            FechaCreacion: req.body.FechaCreacion
        };
        discusiones.insertDiscusion(discusion, (err, data) => {
            if (data && data.insertId) {
                res.status(200).json({
                    success: true,
                    msg: "Transacción Exitosa",
                    data: data
                });
            } else {
                res.status(500).json({
                    success: false,
                    msg: "Transacción Fallida"
                });
            }
        })
    });

    app.put('/discusiones/:id', (req, res) => {
        const discusionData = {
            IdDiscusion: req.params.id,
            Titulo: req.body.Titulo,
            Descripcion: req.body.Descripcion,
            Conclusion: req.body.Conclusion,
            Estado: req.body.Estado,
            ModifyBy: req.body.IdVecino,
            DateModification: req.body.DateModification
        };

        discusiones.updateDiscusion(discusionData, function (err, data) {
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

    app.delete('/discusiones/:id', (req, res) => {
        var id = req.params.id;
        discusiones.deleteDiscusion(id, (err, data) =>  {
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