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
    })
}