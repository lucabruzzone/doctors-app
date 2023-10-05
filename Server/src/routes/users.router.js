const { Router } = require('express');
const getUserData = require('../controllers/users/getUserData');
const createUser = require('../controllers/users/createUser');
const modifyUser = require('../controllers/users/modifyUser');

const usersRouter = Router();

usersRouter.post('/', createUser);
usersRouter.get('/:codigo', (req, res) => {
    const  { codigo } = req.params;
    getUserData(res);
});
usersRouter.put('/:id', (req, res) => {
    const  { id } = req.params;
    modifyUser(id, res);
});

module.exports = usersRouter;