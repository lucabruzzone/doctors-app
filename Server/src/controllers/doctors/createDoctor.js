const allDoctors = require('../../utils/data');

function createDoctor(newDoctor) {
    allDoctors.push(newDoctor);
    return allDoctors;
}

module.exports = createDoctor;