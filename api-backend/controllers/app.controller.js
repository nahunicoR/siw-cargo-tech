const db = require('../database/config.database')
const utils = require('../utils/common')
const bcrypt = require('bcrypt');

const register = async (req, res) => {
    const { name, username, password } = req.body;

    if (!name || !username | !password) {
        return res.status(400).json({
            msg: "Todos los campos son obligatorios",
            error: true
        })
    }
    try {
        const hashedPassword = await utils.hashPassword(password);

        db.query(`INSERT INTO usuarios (nombre, username, password) 
            VALUES( ?, ?, ?);`,
            [name, username, hashedPassword],
            (err, rows) => {
                if (err) {
                    return res.status(400).json({ errorNro: err.errno })
                }
                res.status(201).json({ id: rows.insertId })
            }
        )
    } catch (error) {
        console.log(error)
        res.status(400).json({
            msg: 'Error al registrar un usuario',
            error: true,
            description: error
        })
    }
}

const getAllUsers = async (req, res) => {
    try {
        db.query(`SELECT * FROM usuarios;`, (err, rows) => {
            if (err) {
                res.status(400).send(err.sqlMessage)
            }
            res.status(200).json(rows)
        })
    } catch (error) {
        console.log(error)
        res.status(400).send(error.message);
    }
}

const getUserById = async (req, res) => {
    const { id } = req.params;
    try {
        db.query(`SELECT * FROM usuarios WHERE id = ?;`,
            [id], (err, rows) => {
                if (err) {
                    res.status(400).send(err.sqlMessage)
                }
                res.status(200).json(rows)
            })
    } catch (error) {
        console.log(error)
        res.status(400).send(error.message);
    }
}

const updateUser = async (req, res) => {

    const { nombre, username, oldPassword, newPassword } = req.body;

    //controlar campos vacios

    if (!nombre || !username || !oldPassword || !newPassword) {
        return res.status(400).json({
            msg: "Todos los campos son obligatorios",
            error: true
        });
    }
    //buscar usuario por username, es lo único que podria identificarlo y es UNIQUE
    try {
        db.query(`SELECT * FROM usuarios WHERE username = ?;`,
            [username], async (err, rows) => {
                if (err) {
                    res.status(400).send(err.sqlMessage)
                }
                const user = rows[0];

                const verifyPassword = await utils.comparePassword(oldPassword, user.password);

                if (!verifyPassword) {
                    return res.status(400).json({
                        msg: "Contraseña incorrecta",
                        error: true
                    })
                }
                const hashedPassword = await utils.hashPassword(newPassword);
                db.query(`UPDATE usuarios SET  password = ? WHERE username = ?;`,
                    [hashedPassword, username], (err, rows) => {
                        if (err) {
                            res.status(400).send(err.sqlMessage)
                        }
                        res.status(200).send('Usuario correctamente actualizado')
                    })
            });
    } catch (error) {
        console.log(error)
        res.status(400).json({
            msg: 'Error al actualizar usuario',
            error: true,
            description: error
        });
    }
}

const getFacturasByUserId = async (req, res) => {
    const user = req.user;
    try {
        db.query(`SELECT * FROM facturas WHERE cliente = ?;`,
            [user], (err, rows) => {
                if (err) {
                    res.status(400).send(err.sqlMessage)
                }
                res.status(200).json(rows)
            }
        )
    } catch (error) {
        console.log(error)
        res.status(400).send(error.message);
    }
}

const login = async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({
            msg: "Todos los campos son obligatorios",
            error: true
        });
    }
    try {
        db.query(`SELECT * FROM usuarios WHERE username = ?;`,
            [username], async (err, rows) => {
                if (err) {
                    console.log(err)
                    res.status(400).send(err.sqlMessage)
                }
                const user = rows[0];
                if (!user) {
                    return res.status(400).json({
                        msg: "usuario o contraseña invalidos",
                        error: true
                    })
                }

                const verifyPassword = await bcrypt.compare(password, user.password);

                if (!(verifyPassword && user)) {
                    return res.status(400).json({
                        msg: "usuario o contraseña invalidos",
                        error: true
                    })
                }
                const token = utils.generateToken({ id: user.id });
                res.status(200).json({
                    nombre: user.nombre,
                    username: user.username,
                    token,
                })
            }
        )
    } catch (error) {
        res.status(400).json({
            msg: 'Error al loguearse',
            error: true,
            description: error
        })
    }
}

const createFactura = async (req, res) => {
    const { cliente, total } = req.body;

    if (!cliente || !total) {
        return res.status(400).json({
            msg: "Todos los campos son obligatorios",
            error: true
        });
    }

    try {
        const fecha = new Date().toISOString().split('T')[0];
        db.query(`INSERT INTO facturas (cliente, fecha, total) VALUES (?, ?, ?);`,
            [cliente, fecha, total], (err, rows) => {
                if (err) {
                    res.status(400).send(err.sqlMessage)
                }
                console.log(rows)
                res.status(200).json({
                    rows
                })
            }
        )
    } catch (error) {
        console.log(error)
        res.status(400).json({
            msg: 'Error al crear la factura',
            error: true,
            description: error
        })
    }
}

module.exports = {
    getAllUsers,
    register,
    getUserById,
    updateUser,
    getFacturasByUserId,
    login,
    createFactura
}