const dataPacientes = require('../../utils/ejemploReserva');

function getUserData(codigo) {
    const buscarPaciente = dataPacientes[0][codigo];
    if (buscarPaciente) return buscarPaciente;
    else throw Error('No se encuentra datos del paciente');
}

module.exports = getUserData;