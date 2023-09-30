import React from 'react';
import styles from './Calendar.module.css';
import image from '../img/atras.png'
import FilterBar from './FilterBar';
import { cssDayMatcher } from '../Functions/Calendar';
import { useDispatch, useSelector } from 'react-redux';
import { nextWeek, prevWeek, dateSelection, refreshCalendar } from '../redux/actions';

export default function Calendar({characters, fullWeek}) {
    const Modalidad = useSelector(state => state.modalidad)
    const dispatch = useDispatch();
    const selectDate = useSelector(state => state.selectDate);
    /* const iData = useSelector(state => state.inputData); */
    function iData() {
        if(localStorage.dataInput) {
            return JSON.parse(localStorage.dataInput)
        }
        else {
            return ({
                especialidad: [],
                lugar: []
            });
        }
    }
    const days = {
        a: JSON.stringify(fullWeek[0]),
        b: JSON.stringify(fullWeek[1]),
        c: JSON.stringify(fullWeek[2]),
        d: JSON.stringify(fullWeek[3]),
        e: JSON.stringify(fullWeek[4]),
        f: JSON.stringify(fullWeek[5]),

    }
    function classMatcher(letra, characters) {
        const letraParse = JSON.parse(letra);
        if(matcher(letraParse)) return styles.dateBoxCurrent;
        else {
            if(cssDayMatcher(letraParse, characters, Modalidad, iData())) return styles.dateBox;
            else return styles.dateBoxEmpty;
        }
    }
    function matcher(letra) {
        return (
            selectDate.day === letra.day && selectDate.monthNumber === letra.monthNumber && selectDate.year === letra.year
        );
    }
    function handleClick(e) {
        const targetParse = JSON.parse(e.target.value)
        const cssValidate = cssDayMatcher(targetParse, characters, Modalidad, iData());
        if(cssValidate) {
            dispatch(dateSelection(targetParse));
            
        }
    };
    function handleNext(){
        dispatch(nextWeek());
    }
    function handlePreview(){
        dispatch(prevWeek());
    }
    function handleRefreshCalendar() {
        dispatch(refreshCalendar())
    }

    return (
        <div className={styles.bigContainer}>
{/* UPPER TEXTS*/}
            <div className={styles.tituloBusqueda}>
                <p onClick={handleRefreshCalendar} className={styles.mes}>Centrar semana 🔄</p>
                <h1><span>{iData().especialidad[0]}</span> EN <span>{iData().lugar[0]}</span></h1>
                <p className={styles.falso}>{selectDate.weekDay.toUpperCase()}<span></span>{selectDate.day} - {selectDate.month}</p>
            </div>
{/* LEFT ARROW */}
            <div className={styles.containerDateBox}>
                <div className={styles.imgContainer}>
                    <img onClick={handlePreview} className={styles.imageLeft} src={image} alt="" />
                </div>
                <ul>
{/* DATE BUTTON BOXES */}
                    <button value={days.a} onClick={handleClick} className={classMatcher(days.a, characters)}>{fullWeek[0].weekDay}<br/>{fullWeek[0].day}<br/>{fullWeek[0].monthShort}</button>

                    <button value={days.b} onClick={handleClick} className={classMatcher(days.b, characters)}>{fullWeek[1].weekDay}<br/>{fullWeek[1].day}<br/>{fullWeek[1].monthShort}</button>

                    <button value={days.c} onClick={handleClick} className={classMatcher(days.c, characters)}>{fullWeek[2].weekDay}<br/>{fullWeek[2].day}<br/>{fullWeek[2].monthShort}</button>

                    <button value={days.d} onClick={handleClick} className={classMatcher(days.d, characters)}>{fullWeek[3].weekDay}<br/>{fullWeek[3].day}<br/>{fullWeek[3].monthShort}</button>

                    <button value={days.e} onClick={handleClick} className={classMatcher(days.e, characters)}>{fullWeek[4].weekDay}<br/>{fullWeek[4].day}<br/>{fullWeek[4].monthShort}</button>

                    <button value={days.f} onClick={handleClick} className={classMatcher(days.f, characters)}>{fullWeek[5].weekDay}<br/>{fullWeek[5].day}<br/>{fullWeek[5].monthShort}</button>
                </ul>

{/* RIGHT ARROW */}
                <div className={styles.imgContainer}>
                    <img onClick={handleNext} className={styles.imageRight} src={image} alt="" />
                </div>
            </div>

            <div className={styles.FilterbarContainer}>
                {/* <FilterBar /> */}
                <div className={styles.tituloBusquedaDown}>
                    <h1>Especialidad: <span>{iData().especialidad[0]}</span></h1>
                    <h1>Lugar: <span>{iData().lugar[0]}</span></h1>
                    <p>Busca y reserva de forma rápida y segura. Agendar tu hora médica jamás fue tan sencillo.</p>
                </div>
            </div>
        </div>
    )
}