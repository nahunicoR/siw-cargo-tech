const db = require('../database/config.database')
const jwt = require('jsonwebtoken')
const { SECRET_KEY } = process.env

const isUserLoged = async (req, res, next) => {
    const authorization = req.headers.authorization
    let token = '';

    if (authorization && authorization.toLowerCase().startsWith('bearer')) {
        token = authorization.split(' ')[1];
    }
    if (!token) {
        return res.status(401).json({
            msg: 'No hay token en la petición'
        })
    }
    try {
        const decodedToken = jwt.verify(token, SECRET_KEY)
        const { id } = decodedToken;
        req.user = id;
        next()
    } catch (error) {
        return res.status(401).json({
            msg: 'Token no valido'
        })
    }
}

const isValidUser = async (req, res, next) => {
    const { id } = req.params
    try {
        db.query(`SELECT * FROM usuarios WHERE id = ?;`, [id], (err, rows) => {
            if (err) {
                res.status(400).send(err.sqlMessage)
            }
            if (rows.length === 0) {
                return res.status(400).json({
                    msg: 'No existe el usuario'
                })
            }
            next()
        })
    } catch (error) {
        console.log(error)
        res.status(400).send(error.message)
    }
}

const notFound = (req, res) => {
    res.status(404).json({
        msg: 'Ruta no encontrada'
    })
}


module.exports = {
    isUserLoged,
    isValidUser,
    notFound
}