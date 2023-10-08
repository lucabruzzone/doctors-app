const dataPacientes = require('../../utils/ejemploReserva');

function modificarCita(body, codigo) {
    dataPacientes.shift();
    dataPacientes.push(body);
    return dataPacientes;
}

module.exports = modificarCita;