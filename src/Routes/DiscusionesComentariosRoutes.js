const discusionesComentarios = require('../Models/DiscusionesComentarios');

module.exports = function(app){
    app.get('/discusionesComentarios', (req,res) => {
        discusionesComentarios.getComentarios((err,data) => {
            if(err)
            {
                res.status(500).json(err);
            }else{
                res.status(200).json(data);
            }
        })
    });

    app.post('/discusionesComentarios', (req,res)=>{
        var comentario = {
            IdComentario: null,
            IdDiscusion: req.body.IdDiscusion,
            IdVecino: req.body.IdVecino,
            Fecha: req.body.Fecha,
            Comentario: req.body.Comentario
        };

        discusionesComentarios.insertComentario(comentario, (err,data)=>{
            if(data && data.idInsert){
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

    app.put('/discusionesComentarios/:id', (req, res) => {
        const discusionComentario = {
            IdComentario: req.params.id,
            Comentario: req.body.Comentario,
            ModifyBy: req.body.IdVecino,
            DateModification: req.body.DateModification
        };

        discusionesComentarios.updateComentario(discusionComentario, function (err, data) {
            if (data && data.msg) {
                if(data.msg)
                {
                    res.status(200).json({
                        success: true,
                        data: data
                    });
                }else {
                    res.status(500).json({
                        success: false,
                        msg: 'Error'
                    });
                }
            } else {
                res.status(500).json({
                    success: false,
                    msg: 'Error',
                    data: err
                });
            }
        });
    });

    app.delete('/discusiones/:id', (req, res) => {
        var id = req.params.id;

        discusiones.deleteDiscusion(id, (err, data) =>  {
            if (data) {
                if(data.msg === 'deleted' || data.msg == 'not Exists')
                {
                    res.json({
                        success: true,
                        data: data
                    });
                } else {
                    res.status(500).json({
                        msg: 'Error',
                        success: false
                    });
                }
            } else {
                res.status(500).json({
                    success: false,
                    msg: 'Error',
                    data: err
                });
            }
        });
    });
}