const Solicitud = require('../Models/Solicitudes');

module.exports = function(app){
    app.get('/Solicitudes', (req,res) => {
        Solicitud.getSolicitudes((err,data) => {
            if(err){
                res.status(500).json(err);
            }else{
                res.json(data);
            }
        });
    });

    app.get('/Solicitudes/:id', (req,res) => {
        Solicitud.getSolicitudes(req.params.id,(err,data) => {
            if(err){
                res.status(500).json(err);
            }else{
                res.json(data);
            }
        });
    });

    app.post('/Solicitudes', (req, res) => {
        var Solicitud = {
            Id: null,
            Fecha: req.body.Fecha,
            Tema: req.body.Tema,
            Descripcion: req.body.Descripcion,
        };
        Solicitud.insertSolicitud(Solicitud, (err, data) => {
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

    app.put('/Solicitudes/:id', (req, res) => {
        const discusionData = {
            Id: req.params.id,
            Fecha: req.body.Fecha,
            Descripcion: req.body.Descripcion,
            Tema: req.body.Tema
        };

        Solicitud.updateSolicitud(discusionData, function (err, data) {
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

    app.delete('/Solicitudes/:id', (req, res) => {
        var id = req.params.id;
        Solicitud.deleteSolicitud(id, (err, data) =>  {
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