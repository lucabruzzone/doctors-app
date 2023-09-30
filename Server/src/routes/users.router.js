const { Router } = require('express');
const getUserData = require('../controllers/users/getUserData');
const createUser = require('../controllers/users/createUser');
const modifyUser = require('../controllers/users/modifyUser');

const usersRouter = Router();

usersRouter.get('/users/:codigo', getUserData);
usersRouter.post('/users', createUser);
usersRouter.put('/users', modifyUser);

module.exports = usersRouter;