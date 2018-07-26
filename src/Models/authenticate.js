const DbConnection = require('../Connection/DbConnection');
const conexion = DbConnection();
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

    this.seleccionarId = function (id, respuesta) {
        conexion.query('select * from vecinos where IdVecino=?', id, function (error, resultado) {
            if (error) {
                respuesta.send({ estado: 'error' });
            } else {
                respuesta.send(resultado);
            }
        })
    }
    this.seleccionarNombre = function (nombre, respuesta) {
        conexion.query('select * from vecinos where nombre=?', nombre, function (error, resultado) {
            if (error) {
                respuesta.send({ estado: 'error' });
            } else {
                respuesta.send(resultado);
            }
        })
    }
    this.authentication = function (email, respuesta) {
        conexion.query('select * from vecinos where Email=?', email, function (error, resultado) {
            if (error) {
                respuesta.send({ estado: 'error' });
            } else {
                respuesta.send(resultado);
            }
        })
    }
    this.insertar = function (datos, respuesta) {
        conexion.query('insert into vecinos set ?', datos, function (error, resultado) {
            if (error) {
                respuesta.send({ estado: 'Error' });
            } else {
                respuesta.send({ estado: 'Ok' });
            }
        })
    }
    this.actualizar = function (datos, respuesta) {
        conexion.query('update vecinos set ? where IdVecino = ?', [datos, datos.id], function (error, resultado) {
            if (error) {
                respuesta.send({ estado: 'Error' });
            } else {
                respuesta.send({ estado: 'Ok' });
            }
        })
    }
    this.delete = function (id, respuesta) {
        conexion.query('select * from vecinos where IdVecino=?', id, function (error, result) {
            console.log(result);
            if (result) {
                conexion.query('delete from vecinos where id = ?', id, function (error, resultado) {
                    if (error) {
                        respuesta.send({ estado: 'Error' });
                    } else {
                        respuesta.send({ estado: 'Ok' });
                    }
                });
            }
            else {
                respuesta.send({ estado: "No Existe" });
            }
        });
    }
}
module.exports = new MetodosDB();