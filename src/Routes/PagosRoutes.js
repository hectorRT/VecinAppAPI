const cuotas = require('../Models/PagoCuotas');

module.exports = function(app) {

    app.get('/estados-pagos', (req, res) => {
        pagos.getEstados((err,data) => {
            if (err) {
                res.status(500).json(err);
            } else {
                res.json(data);
            }
        });
    });

    app.get('/pagos', (req, res) => {
        pagos.getPago((err,data) => {
            if(err){
                res.status(500).json(err);
            }else{
                res.json(data);
            }
        });
    });

    app.get('/pagos/:id', (req, res) => {
        cuotas.getPago(req.params.id, (err,data) => {
            if (err) {
                res.status(500).json(err);
            } else {
                res.json(data);
            }
        });
    });

   
    
    app.post('/pagos', (req, res) => {
        var pagos = {
            IdPago: null,
            idVecino: req.body.idVecino,
            idCuota: req.body.cuota,
            Fecha: req.body.Fecha,
            monto: req.body.monto,
            nota: req.body.nota
            
        };
        pagos.insertPago(pago, (err, data) => {
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

    app.put('/pagos/:id', (req, res) => {
        const cuotaData = {
            IdPago: null,
            idVecino: req.body.idVecino,
            idCuota: req.body.cuota,
            Fecha: req.body.Fecha,
            monto: req.body.monto,
            nota: req.body.nota
        };

        // console.log(pagosData);

        pagos.updatePago(pagoData, function (err, data) {
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

    app.delete('/pagos/:id', (req, res) => {
        var id = req.params.id;
        pagos.deletepago(id, (err, data) =>  {
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