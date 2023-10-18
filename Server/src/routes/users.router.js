const { Router } = require('express');
const getUserData = require('../controllers/users/getUserData');
const crearCita = require('../controllers/users/createUser');
const modificarCita = require('../controllers/users/modifyUser');
const borrarReserva = require('../controllers/users/borrarReserva');

const usersRouter = Router();

usersRouter.get('/', (req, res) => {
    try {
        const  { codigo } = req.query;
        const dataPaciente = getUserData(codigo);
        res.status(200).json(dataPaciente);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

usersRouter.delete('/', (req, res) => {
    try {
        const  { codigo, fecha } = req.query;
        const dataPaciente = borrarReserva(codigo, fecha);
        res.status(200).json(dataPaciente);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

usersRouter.post('/', crearCita);

usersRouter.put('/:codigo', (req, res) => {
    const  { id } = req.params;
    modificarCita(id, res);
});

module.exports = usersRouter;