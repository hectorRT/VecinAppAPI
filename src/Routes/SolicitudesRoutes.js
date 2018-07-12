const Solicitud = require('../Models/Solicitudes');

module.exports = function(app){
    app.get('/solicitudes/', function(solicitud, respuesta){
        Solicitud.seleccionar(respuesta);
    })
    app.get('/solicitudes/:id/', function(solicitud, respuesta){
        Solicitud.seleccionarId(solicitud.params.id, respuesta);
    })
    app.post('/solicitudes/', function(solicitud, respuesta){
        Solicitud.insertar(solicitud.body, respuesta);
    })
    app.put('/solicitudes/', function(solicitud, respuesta){
        Solicitud.insertar(solicitud.body, respuesta);
    })
    app.delete('/solicitudes/:id/', function(solicitud, respuesta){
        Solicitud.insertar(solicitud.body, respuesta);
    })
}