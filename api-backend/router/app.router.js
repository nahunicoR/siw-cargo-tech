const express = require('express')
const router = express.Router();
const controller = require('../controllers/app.controller');
const { isUserLoged } = require('../middlewares/middlewares');

router.get('/', controller.getAllUsers);
router.get('/facturas', isUserLoged, controller.getFacturasByUserId);
router.get('/:id', isUserLoged, controller.getUserById);
router.put('/:user', controller.updateUser);
router.post('/registro', controller.register);
router.post('/login', controller.login);

router.post('/facturas', controller.createFactura);

module.exports = router;