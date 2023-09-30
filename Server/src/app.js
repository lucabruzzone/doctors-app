const indexRouter = require('./routes/index');
const morgan = require('morgan');
const express = require('express');
const cors = require('cors');
// const router = require('router');

const app = express();

const myMiddleware = (req, res, next) => {
    console.log('este es mi middleware');
    next();
}
app.use(morgan('dev')); // logea info importante en consola
app.use(express.json());
app.use(cors()); // importante para controlar el acceso al servidor
// app.use(myMiddleware);
app.use(indexRouter);
app.use('*', (req, res) => {
    res.status(404).json({error: 'Not Found'})
})

module.exports = app;