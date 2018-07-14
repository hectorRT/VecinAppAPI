const eventos = require('../Models/Eventos');

module.exports = function(app) {

    app.get('/eventos', (req, res) => {
        eventos.getEventos((err, data) => {
            if (err) {
                res.status(500).json(err);
            } else {
                res.json(data);
            }
        });
    });

    app.get('/eventos/:IdVecindario', (req, res) => {

        eventos.getEventosVecindario(req.params.IdVecindario, (err, data) => {
            if (err) {
                res.status(500).json(err);
            } else {
                res.json(data);
            }
        });
    });

    app.post('/eventos', (req, res) => {

        let evento = {
            IdEvento: req.body.IdEvento,
            IdVecindario: req.body.IdVecindario,
            Nombre: req.body.Nombre,
            Descripcion: req.body.Descripcion,
            Lugar: req.body.Lugar,
            HoraInicio: req.body.HoraInicio,
            HoraFin: req.body.HoraFin
        }
        
        eventos.insertEvento(evento, (err, data) => {
            if (data && data.insertId) {
                res.status(200).json({
                    success: true,
                    msg: 'Evento guardado',
                    data: data
                });
            } else {
                res.status(500).json({
                    success: false,
                    msg: 'Error al guardar evento'
                });
            }
        });
    });

    app.put('/eventos/:id', (req, res) => {

        let evento = {
            IdEvento: req.params.id,
            IdVecindario: req.body.IdVecindario,
            Nombre: req.body.Nombre,
            Descripcion: req.body.Descripcion,
            Lugar: req.body.Lugar,
            HoraInicio: req.body.HoraInicio,
            HoraFin: req.body.HoraFin
        }
        
        eventos.updateEvento(evento, (err, data) => {
            if (data && data.success) {
                res.status(200).json({
                    success: true,
                    msg: 'Evento actualizado',
                    data: data
                });
            } else {
                res.status(500).json({
                    success: false,
                    msg: 'Error al actualizar evento'
                });
            }
        });
    });

    app.delete('/eventos/:id', (req, res) => {
        
        let id = req.params.id;
        eventos.deleteEvento(id, (err, data) => {
            if (data && (data.msg === "deleted" || data.msg === "event not exists")) {
                res.json({
                    success: true,
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