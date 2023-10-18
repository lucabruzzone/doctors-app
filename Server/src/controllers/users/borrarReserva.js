let dataPacientes = require('../../utils/ejemploReserva');

function borrarReserva(codigo, fecha) {
    let sinArray = dataPacientes.shift();
    let reservas = sinArray[codigo].reservas;
    let citaAnulada = reservas.filter(res => res.fecha !== fecha);
    let pacienteActualizado = {...sinArray[codigo], reservas: citaAnulada};
    sinArray = {...sinArray, [codigo]: pacienteActualizado};
    dataPacientes.push(sinArray);
    return pacienteActualizado;
}

module.exports = borrarReserva;