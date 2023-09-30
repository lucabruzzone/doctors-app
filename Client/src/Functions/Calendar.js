import { data } from "../data";

const locale = 'es-CL';
const intlWeek = new Intl.DateTimeFormat(locale, {weekday: 'long'});
const intlMonth = new Intl.DateTimeFormat(locale, {month: 'long'});
const intlMonthShort = new Intl.DateTimeFormat(locale, {month: 'short'});
let hoy = new Date();
const fecha = {
    minutes: hoy.getMinutes(),
    hours: hoy.getHours(),
    day: hoy.getDate(),
    weekDay: intlWeek.format(hoy),
    monthNumber: hoy.getMonth(),
    month: intlMonth.format(hoy).toUpperCase(),
    year: hoy.getFullYear()
}
let { hours, day, monthNumber, year } = fecha;

export const fullWeek = j => {
    let elements = [];
    for (let i = 0; i < 6; i++) {
        elements.push(new Date(year, monthNumber, day + j, hours));
        j++;
    }
    let fullWeek = elements.map(element => {
        return {
            minutes: element.getMinutes(),
            hours: element.getHours(),
            day: element.getDate(),
            weekDay: intlWeek.format(element),
            monthNumber: element.getMonth(),
            month: intlMonth.format(element).toUpperCase(),
            monthShort: intlMonthShort.format(element),
            year: element.getFullYear()
        }
    });
    return fullWeek;
}


export function cssDayMatcher(SEL, doctors, Modalidad, iData) {
    /* const iData = () => {
        if(localStorage.dataInput) {
            return JSON.parse(localStorage.dataInput)
        }
        else {
            return ({
                especialidad: [],
                lugar: []
            });
        }
    } */
    /* const LUGAR = iData().lugar;
    const ESP = iData().especialidad; */
    const LUGAR = iData.lugar;
    const ESP = iData.especialidad;
    const charsFiltered = doctors.filter(char => {
        const SELformat = `${SEL.day}/${SEL.monthNumber}/${SEL.year}`;
        return char[Modalidad].hasOwnProperty(SELformat) && LUGAR.includes(char.lugar) && ESP.includes(char.especialidad);
    })
    return charsFiltered.length > 0;
}

const initialDate = fullWeek(0)[0];
const DATEformat = `${initialDate.day}/${initialDate.monthNumber}/${initialDate.year}`;
export const initialFilterPresencial = data.filter(doc => {
    return doc.presencial.hasOwnProperty(DATEformat);
})
export const initialFilterOnline = data.filter(doc => {
    return doc.online.hasOwnProperty(DATEformat);
})



