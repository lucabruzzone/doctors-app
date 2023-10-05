import React, { useState } from 'react';
import styles from './FormCalendar.module.css';
import image from '../img/atras.png';
import { cssDayMatcher } from '../Functions/Calendar';
import { useDispatch, useSelector } from 'react-redux';
import { nextWeek, prevWeek, dateSelection } from '../redux/actions';

export default function FormCalendar({characters, fullWeek}) {
    const Modalidad = useSelector(state => state.modalidad)
    const dispatch = useDispatch();
    const selectDate = useSelector(state => state.selectDate);
    const [daySelected, setDaySelected] = useState('');
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

    function matcher(letra) {
        return (
            selectDate.day === letra.day && selectDate.monthNumber === letra.monthNumber && selectDate.year === letra.year
        );
    }
    function handleClick(e) {
        e.preventDefault();
        setDaySelected(e.target.value);
    };
    function handleNext(){
        dispatch(nextWeek());
    }
    function handlePreview(){
        dispatch(prevWeek());
    }

    return (
        <div className={styles.bigContainer}>
{/* LEFT ARROW */}
            <div className={styles.containerDateBox}>
                <div className={styles.imgContainer}>
                    <img onClick={handlePreview} className={styles.imageLeft} src={image} alt="" />
                </div>
                <ul>
{/* DATE BUTTON BOXES */}
                    <button value={days.a} onClick={handleClick} className={daySelected === days.a ? styles.dateBoxCurrent : styles.dateBox}>{fullWeek[0].weekDay}<br/>{fullWeek[0].day}<br/>{fullWeek[0].monthShort}</button>

                    <button value={days.b} onClick={handleClick} className={daySelected === days.b ? styles.dateBoxCurrent : styles.dateBox}>{fullWeek[1].weekDay}<br/>{fullWeek[1].day}<br/>{fullWeek[1].monthShort}</button>

                    <button value={days.c} onClick={handleClick} className={daySelected === days.c ? styles.dateBoxCurrent : styles.dateBox}>{fullWeek[2].weekDay}<br/>{fullWeek[2].day}<br/>{fullWeek[2].monthShort}</button>

                    <button value={days.d} onClick={handleClick} className={daySelected === days.d ? styles.dateBoxCurrent : styles.dateBox}>{fullWeek[3].weekDay}<br/>{fullWeek[3].day}<br/>{fullWeek[3].monthShort}</button>

                    <button value={days.e} onClick={handleClick} className={daySelected === days.e ? styles.dateBoxCurrent : styles.dateBox}>{fullWeek[4].weekDay}<br/>{fullWeek[4].day}<br/>{fullWeek[4].monthShort}</button>

                    <button value={days.f} onClick={handleClick} className={daySelected === days.f ? styles.dateBoxCurrent : styles.dateBox}>{fullWeek[5].weekDay}<br/>{fullWeek[5].day}<br/>{fullWeek[5].monthShort}</button>
                </ul>

{/* RIGHT ARROW */}
                <div className={styles.imgContainer}>
                    <img onClick={handleNext} className={styles.imageRight} src={image} alt="" />
                </div>
            </div>
        </div>
    )
}