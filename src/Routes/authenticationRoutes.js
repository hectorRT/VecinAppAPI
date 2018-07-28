const Solicitud = require('../Models/authenticate');

module.exports = function(app){
<<<<<<< HEAD

    // app.get('/authentication/', function(solicitud, respuesta){
    //     Solicitud.GetToken(respuesta);
    // })
    // app.get('/authentication/:id/', function(solicitud, respuesta){
    //     Solicitud.seleccionarId(solicitud.params.id, respuesta);
    // })
    app.get('/authentication/:email/', function(solicitud, respuesta){
        Solicitud.authentication(solicitud.params.email, respuesta);
=======
    app.get('/authentication/', function(solicitud, respuesta){
        Solicitud.seleccionar(respuesta);
    })
    /*app.get('/authentication/:id/', function(solicitud, respuesta){
        Solicitud.seleccionarId(solicitud.params.id, respuesta);
    })*/
    app.get('/authentication/:Email/', function(solicitud, respuesta){
        Solicitud.authentication(solicitud.params.Email, respuesta);
>>>>>>> 6b576589e85701404610bb0509a030a0499b50ca
    })
    app.get('/authenticationt/:token/', function(solicitud, respuesta){
        Solicitud.Obtenerdatos(solicitud.params.token, respuesta);
    })
    app.put('/authentication/', function(solicitud, respuesta){
        Solicitud.actualizar(solicitud.body, respuesta);
    })
    app.get('/authenticationtoken/:token/', function(solicitud, respuesta){
        Solicitud.GetToken(solicitud.params.email, respuesta);
    })
}