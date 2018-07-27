const Solicitud = require('../Models/authenticate');

module.exports = function(app){
    app.get('/authentication/', function(solicitud, respuesta){
        Solicitud.seleccionar(respuesta);
    })
    /*app.get('/authentication/:id/', function(solicitud, respuesta){
        Solicitud.seleccionarId(solicitud.params.id, respuesta);
    })*/
    app.get('/authentication/:Email/', function(solicitud, respuesta){
        Solicitud.authentication(solicitud.params.Email, respuesta);
    })
    app.post('/authentication/', function(solicitud, respuesta){
        Solicitud.insertar(solicitud.body, respuesta);
    })
    app.put('/authentication/', function(solicitud, respuesta){
        Solicitud.actualizar(solicitud.body, respuesta);
    })
    app.delete('/authentication/:id/', function(solicitud, respuesta){
        Solicitud.delete(solicitud.params.id, respuesta);
    })
}