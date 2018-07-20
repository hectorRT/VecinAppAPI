const cuotas = require('../Models/Cuotas');

module.exports = function(app) {

    app.get('/estados-cuotas', (req, res) => {
        cuotas.getEstados((err,data) => {
            if (err) {
                res.status(500).json(err);
            } else {
                res.json(data);
            }
        });
    });

    app.get('/cuotas', (req, res) => {
        cuotas.getCuotas((err,data) => {
            if(err){
                res.status(500).json(err);
            }else{
                res.json(data);
            }
        });
    });

    app.get('/cuotas/:id', (req, res) => {
        cuotas.getCuota(req.params.id, (err,data) => {
            if (err) {
                res.status(500).json(err);
            } else {
                res.json(data);
            }
        });
    });

    
    app.post('/cuotas', (req, res) => {
        var cuotas = {
            Idcuota: null,
            idVecindario: req.body.idVecindario,
            Fecha: req.body.Fecha,
            numeroCuota: req.body.numeroCuota,
            monto: req.body.monto,
            balance: req.body.balance,
            fechaUltimoPago: req.body.fechaUltimoPago,
            saldada:req.body.saldada
        };
        cuotas.insertCuotas(cuota, (err, data) => {
            if (data && data.insertId) {
                res.status(200).json({
                    success: true,
                    msg: "Completado",
                    data: data
                });
            } else {
                res.status(500).json({
                    success: false,
                    msg: "Erroe"
                });
            }
        })
    });

    app.put('/cuotas/:id', (req, res) => {
        const cuotaData = {
            Idcuota: null,
            idVecindario: req.body.idVecindario,
            Fecha: req.body.Fecha,
            numeroCuota: req.body.numeroCuota,
            monto: req.body.monto,
            balance: req.body.balance,
            fechaUltimoPago: req.body.fechaUltimoPago,
            saldada:req.body.saldada
        };

        // console.log(cuotaData);

        cuotas.updateCuota(cuotaData, function (err, data) {
            if (data && data.success) {
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

    app.delete('/cuotas/:id', (req, res) => {
        var id = req.params.id;
        cuotas.deletecuota(id, (err, data) =>  {
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