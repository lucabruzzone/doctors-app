const dataPacientes = require('../../utils/ejemploReserva');
const modificarCita = require('../users/modifyUser');

function borrarReserva(codigo, fecha) {
    const sinArray = dataPacientes[0];
    const reservas = sinArray[codigo].reservas;
    const citaAnulada = reservas.filter(res => res.fecha !== fecha);
    const pacienteActualizado = {...sinArray[codigo], reservas: citaAnulada}
    modificarCita(pacienteActualizado, codigo);
    return pacienteActualizado;
}

module.exports = borrarReserva;