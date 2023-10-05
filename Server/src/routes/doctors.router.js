const { Router } = require('express');
const getAllDoctors = require('../controllers/doctors/getAllDoctors');
const createDoctor = require('../controllers/doctors/createDoctor');
const getDoctor = require('../controllers/doctors/getDoctor');

const doctorsRouter = Router();

doctorsRouter.post('/', (req, res) => {
    try {
        const addToAllDoctors = createDoctor(req.body);
        res.status(200).json(addToAllDoctors);
    } catch (error) {
        res.status(500).json({ error: 'error al obtener los datos' });
    }
});

doctorsRouter.get('/', (req, res) => {
    try {
        const allDoctors = getAllDoctors();
        res.status(200).json(allDoctors);
    } catch (error) {
        res.status(500).json({ error: 'error al obtener los datos' });
    }
});

doctorsRouter.get('/:name', (req, res) => {
    try {
        const { name } = req.params;
        const doctor = getDoctor(name);
        res.status(200).json(doctor);
    } catch (error) {
        res.status(500).json({ error: 'error al obtener los datos' });
    }
});

module.exports = doctorsRouter;