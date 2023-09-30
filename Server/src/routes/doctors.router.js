const { Router } = require('express');
const getAllDoctors = require('../controllers/doctors/getAllDoctors');
const createDoctor = require('../controllers/doctors/createDoctor');
const getDoctor = require('../controllers/doctors/getDoctor');

const doctorsRouter = Router();

doctorsRouter.get('/doctors', getAllDoctors);
doctorsRouter.get('/doctors/:id', getDoctor);
doctorsRouter.post('/doctors', createDoctor);

module.exports = doctorsRouter;