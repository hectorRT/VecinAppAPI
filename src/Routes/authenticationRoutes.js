const Solicitud = require('../Models/authenticate');

module.exports = function(app){

    // app.get('/authentication/', function(solicitud, respuesta){
    //     Solicitud.GetToken(respuesta);
    // })
    // app.get('/authentication/:id/', function(solicitud, respuesta){
    //     Solicitud.seleccionarId(solicitud.params.id, respuesta);
    // })
    app.get('/authentication/:email/', function(solicitud, respuesta){
        Solicitud.authentication(solicitud.params.email, respuesta);

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