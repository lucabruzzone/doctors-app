const allDoctors = require('../../utils/data');

function getDoctor(name) {
    const doctor = allDoctors.find(doc => doc.name === name)
    return doctor;
}

module.exports = getDoctor;