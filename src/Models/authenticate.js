const DbConnection = require('../Connection/DbConnection');
const conexion = DbConnection();
var jwt = require('jsonwebtoken');
var config = require('../config');
function MetodosDB() {

    this.seleccionar = function (respuesta) {
        conexion.query('select * from vecinos', function (error, resultado) {
            if (error) {
                respuesta.send({ estado: 'Error' })
            } else {
                respuesta.send(resultado);

            }
        })
    }
    this.Obtenerdatos = function (token, respuesta) {
        conexion.query('select * from vecinos where token=?', token, function (error, resultado) {
            if (error) {
                respuesta.send({ estado: 'error' });
            } else {
                console.log(resultado);
                respuesta.send(resultado);
            }
        })
    }
    this.seleccionarId = function (id, respuesta) {
        conexion.query('select * from vecinos where IdVecino=?', id, function (error, resultado) {
            if (error) {
                respuesta.send({ estado: 'error' });
            } else {
                respuesta.send(resultado);
            }
        })
    }
    this.actualizar = function (datos, respuesta) {
        conexion.query('update vecinos set ? where IdVecino = ?', [datos, datos.IdVecino], function (error, resultado) {
            if (error) {
                respuesta.send({ estado: 'Error' });
            } else {
                respuesta.send({ estado: 'Ok' });   
            }
        })
    }
    this.authentication = function (email, respuesta) {
        conexion.query('select * from vecinos where email=?', email, function (error, resultado) {
            if (error) {
                respuesta.send({ estado: 'error' });
            } else {
                respuesta.send(resultado);
            }
        })
    }
    this.GetToken = function (email, respuesta) {

        var token = jwt.sign({email:email}, config.secret, {
            expiresIn: 100000// expires in 24 hours
        });
        let data = { token: token}
        respuesta.send(data);
    }

}
module.exports = new MetodosDB();