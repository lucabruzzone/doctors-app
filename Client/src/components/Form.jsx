import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import styles from './Form.module.css';
import Navbar from './Navbar';
import Footer from './Footer';
import FormCalendar from './FormCalendar';
import { fullWeek} from '../Functions/Calendar';
import closeImage from '../img/bxs-x-circle.svg';
import { useState } from 'react';

export default function Form() {
    const j = useSelector(state => state.j);
    const doctors = useSelector(state => state.renderDoctors);
    const [modalidad, setModalidad] = useState('');
    const [horasPresElegidas, setHorasPresElegidas] = useState([]);
    const [horasOnlineElegidas, setHorasOnlineElegidas] = useState([]);

    function handleClick(e) {
        e.preventDefault();
        setModalidad(e.target.name);
    }

    function horas() {
        let array = [];
        let minutes = ['00', '20', '40'];
        let g = 8;
        while (g < 20) {
            for (let i = 0; i < minutes.length; i++) {
                if(g < 10) array.push(`0${g}:${minutes[i]}`)
                else array.push(`${g}:${minutes[i]}`)
            }
            g++;
        }
        return array;
    }

    function handleHour(e) {
        e.preventDefault();
        let hora = e.target.name;
        hora = hora.split(':').join('');
        if (modalidad === 'presencial') {
            if(!horasPresElegidas.includes(hora)) {
                setHorasPresElegidas([...horasPresElegidas, hora].sort(compareNumbers));
            }
            else {
                let _hora = hora.split(':').join('');
                const horasFiltradas = horasPresElegidas.filter(h => h !== _hora);
                setHorasPresElegidas(horasFiltradas);
            }
        }
        else if (modalidad === 'online') {
            if(!horasOnlineElegidas.includes(hora)) {
                setHorasOnlineElegidas([...horasOnlineElegidas, hora].sort(compareNumbers));
            }
            else {
                let _hora = hora.split(':').join('');
                const horasFiltradas = horasOnlineElegidas.filter(h => h !== _hora);
                setHorasOnlineElegidas(horasFiltradas);
            }
        }
    }

    function compareNumbers(a, b) {
        return a - b;
    }

    function formatHour(hora) {
        const formatHora = hora.split(':').join('');
        return formatHora;
    }

    return (
        <div className={styles.bigContainer}>
            <Navbar />
            <form className={styles.container}>
                <div>
                    <div className={styles.formulario}>
                        <NavLink to='/main' className={styles.close}>
                            <img src={closeImage} alt="" />
                        </NavLink>
                        <div className={styles.nombre}>
                            <div className={styles.section}>
                                <label htmlFor="">Nombre:</label>
                                <input type="text" />
                            </div>
                            <div className={styles.section}>
                                <label htmlFor="">Subir imagen:</label>
                                <i id={styles.addMiniImage} class='bx bxs-file-plus'></i>
                                <i id={styles.addImage} class='bx bx-plus'></i>
                            </div>
                        </div>
                        <div className={styles.section}>
                            <label htmlFor="">Género:</label>
                            <input type="text" />
                        </div>
                        <div className={styles.section}>
                            <label htmlFor="">Especialidad:</label>
                            <input type="text" />
                        </div>
                        <div className={styles.section}>
                            <label htmlFor="">Convenio:</label>
                            <input type="text" />
                        </div>
                        <div className={styles.section}>
                            <label htmlFor="">Lugar(Comuna):</label>
                            <input type="text" />
                        </div>
                        <div className={styles.section}>
                            <label htmlFor="">Ubicación(Centro Médico):</label>
                            <input type="text" />
                        </div>
                        <div className={styles.section}>
                            <label htmlFor="">Modalidad:</label>
                            <div className={styles.modalidad}>
                                <div className={styles.section}>
                                    <button name='presencial' onClick={handleClick} id={modalidad === 'presencial' ? styles.buttonOnn : ''}>Presencial</button>
                                </div>
                                <div className={styles.section}>
                                    <button name='online' onClick={handleClick} id={modalidad === 'online' ? styles.buttonOnn : ''}>Online</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.horarioContainer}>
                    <h1 className={styles.h1}>Horario</h1>
                    <div className={modalidad !== '' ? styles.calendarOnn : styles.calendarOff}>
                        <FormCalendar characters={doctors} fullWeek={fullWeek(j)} />
                        <div className={styles.horas}>
                            {horas().map(hora => {
                                if (modalidad === 'presencial') {
                                    return <button onClick={handleHour} name={hora} id={horasPresElegidas.includes(formatHour(hora)) ? styles.horaOnn: ''} className={styles.presenciales}>{hora}</button>
                                }
                                else if (modalidad === 'online') {
                                    return <button onClick={handleHour} name={hora} id={horasOnlineElegidas.includes(formatHour(hora)) ? styles.horaOnn: ''} className={styles.online}>{hora}</button>
                                }
                            })}
                        </div>
                    </div>
                </div>
                <button onClick={e => {e.preventDefault()}} className={styles.submit}>Crear</button>
            </form>
            <Footer />
        </div>
    )
}