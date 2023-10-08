const allDoctors = require('../../utils/data');

function createDoctor(newDoctor) {
    if (Object.keys(newDoctor).length) {
        console.log(newDoctor);
        const newFormat = formatDate(newDoctor);
        allDoctors.push(newFormat);
        return allDoctors;
    }
    else throw Error('No se pudo recibir la información');
}

function formatDate(newDoctor) {
    const presencial = newDoctor.presencial;
    const online = newDoctor.online;
    var newPresencial = {};
    var newOnline = {};
    if(Object.keys(presencial).length) {
        Object.entries(presencial).forEach(([key, value]) => {
            newPresencial = {...newPresencial, [key]: value[0]};
        });
    }
    if(Object.keys(online).length) {
        Object.entries(online).forEach(([key, value]) => {
            newOnline = {...newOnline, [key]: value[0]};
        });
    }
    const lugarFormat = newDoctor.lugar.toUpperCase();
    const especialidadFormat = newDoctor.especialidad.toUpperCase();
    const _newDoctor = {...newDoctor, presencial: [newPresencial][0], online: [newOnline][0], lugar: lugarFormat, especialidad: especialidadFormat};
    console.log(_newDoctor);
    return _newDoctor;
} 

module.exports = createDoctor;