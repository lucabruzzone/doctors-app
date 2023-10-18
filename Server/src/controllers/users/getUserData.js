let dataPacientes = require('../../utils/ejemploReserva');

function getUserData(codigo) {
    let buscarPaciente = dataPacientes[0][codigo];
    console.log(buscarPaciente.reservas);
    if (buscarPaciente) return buscarPaciente;
    else throw Error('No se encuentra datos del paciente');
}

module.exports = getUserData;