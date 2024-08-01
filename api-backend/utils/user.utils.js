const db = require('../database/config.database')

const findUserById = (id) => {
    const data = db.query(`SELECT * FROM usuarios WHERE idusuarios = ?;`,
        [id], (err, rows) => {
            if (err) {
                return err;
            }
            return rows
        })
    return data;
}

const findUserByUsername = (username) => {
    const data = db.query(`SELECT * FROM usuarios WHERE username = ?;`,
        [username], (err, rows) => {
            if (err) {
                return err;
            }
            return rows
        })
    return data;
}

const findFacturasFromUser = (clientId) => {
    const data = db.query(`SELECT * FROM facturas WHERE cliente = ?;`,
        [clientId], (err, rows) => {
            if (err) {
                return err;
            }
            return rows
        })
    return data;
}

module.exports = {
    findUserById,
}