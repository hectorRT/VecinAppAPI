const DbConnection = require('../Connection/DbConnection');

EventosModel = {};

const connection = DbConnection();

EventosModel.getEventos = (callback) => {
    
    if (connection) {
        connection.query('SELECT * FROM Eventos', (err, rows) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, rows);
            }
        });
    }
}

EventosModel.getEvento = (id, callback) => {
    
    if (connection) {
        connection.query('SELECT * FROM Eventos WHERE IdEvento = ?', id, (err, rows) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, rows);
            }
        });
    }
}

EventosModel.getEventosVecindario = (idVecindario, callback) => {

    if (connection) {
        connection.query('SELECT * FROM Eventos WHERE IdVecindario = ? AND HoraInicio >= NOW()', idVecindario, (err, rows) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, rows);
            }
        });
    }
}

EventosModel.insertEvento = (evento, callback) => {

    if (connection) {
        connection.query('INSERT INTO Eventos SET ?', evento, (err, result) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, {
                    "insertId": result.insertId
                });
            }
        });
    }
}

EventosModel.updateEvento = (evento, callback) => {
    
    if (connection) {

        let sql = `
            UPDATE Eventos SET
            IdVecindario = ${connection.escape((evento.IdVecindario))},
            Nombre = ${connection.escape((evento.Nombre))},
            Descripcion = ${connection.escape((evento.Descripcion))},
            Lugar = ${connection.escape((evento.Lugar))},
            HoraInicio = ${connection.escape((evento.HoraInicio))},
            HoraFin = ${connection.escape((evento.HoraFin))}
            WHERE IdEvento = ${connection.escape((evento.IdEvento))}
        `;
        console.log(sql);
        connection.query(sql, (err, result) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, {
                    "success": true
                });
            }

        });

    }
}

EventosModel.deleteEvento = (idEvento, callback) => {
    
    if (connection) {
        let sqlExists = `
            SELECT * FROM Eventos WHERE IdEvento = ${connection.escape(idEvento)}
        `;

        connection.query(sqlExists, (err, rows) => {
            if (rows) {
                let sql = `
                    DELETE FROM Eventos WHERE IdEvento = ${connection.escape(idEvento)}
                `;
                connection.query(sql, (err, result) => {
                    if (err) {
                        callback(err, null);
                    } else {
                        callback(null, {
                            "msg": "deleted"
                        });
                    }
                });

            } else {

                callback(err, {
                    "msg": "event not exists"
                });
            }
        });
    }
}

module.exports = EventosModel;