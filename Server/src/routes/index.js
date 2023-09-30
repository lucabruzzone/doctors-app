const { Router } = require('express');
const doctorsRouter = require('./doctors.router');
const usersRouter = require('./users.router');

const indexRouter = Router();

indexRouter.use('/users', usersRouter);
indexRouter.use('/doctors', doctorsRouter);

module.exports = indexRouter;