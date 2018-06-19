const discusiones = require('../Models/Discusiones');

module.exports = function(app){
    app.get('/discusiones', (req,res) => {
        discusiones.getDiscusiones((err,data) => {
            if(err){
                res.status(500).json(err);
            }else{
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
    })
}