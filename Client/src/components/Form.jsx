import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Form.module.css';
import { previsiones } from '../data2';
import closeImage from '../img/bxs-x-circle.svg';
import { useState } from 'react';

export default function Form() {
    const [modalidad, setModalidad] = useState('');
    const [horasPresElegidas, setHorasPresElegidas] = useState([]);
    const [horasOnlineElegidas, setHorasOnlineElegidas] = useState([]);
    const [convenioDeploy, setconvenioDeploy] = useState(false);
    const [hoursPresencial, setHoursPresencial] = useState([]);
    const [hoursOnline, setHoursOnline] = useState([]);
    const [day, setDay] = useState('');
    const [newObject, setNewObject] = useState({
        id: null,
        name: '',
        gender: '',
        especialidad: '',
        convenio: [],
        puntuacion: '',
        lugar: '',
        ubicacion: [],
        image: '',
        presencial: {},
        online: {}
    })

    function handleHours(e) {
        e.preventDefault();
        const h = e.target.name;
        const t = e.target.title;
        if(modalidad === 'presencial') {
            setHoursPresencial([...hoursPresencial, h]);
            if(t) {
                const filter = hoursPresencial.filter(h => h !== t);
                setHoursPresencial(filter);
            }
        }
        if(modalidad === 'online') {
            setHoursOnline([...hoursOnline, h]);
            if(t) {
                const filter = hoursOnline.filter(h => h !== t);
                setHoursOnline(filter);
            }
        }
    }

    function handleInput(e) {
        const fecha = e.target.value;
        const fechaFormat = fecha.split('-').join('/');
        setDay(fechaFormat);
    }

    function handleAddObject(e) {
        e.preventDefault();
        if (modalidad === 'presencial') {
            if (day !== '' && hoursPresencial.length > 0) {
                setNewObject({ ...newObject, presencial: { ...newObject.presencial, [day]: [hoursPresencial] } });
                setDay('');
                setHoursPresencial([]);
            }
        }
        else if (modalidad === 'online') {
            if (day !== '' && hoursOnline.length > 0) {
                setNewObject({ ...newObject, online: { ...newObject.online, [day]: [hoursOnline] } });
                setDay('');
                setHoursOnline([]);
            }
        }
    }

    function handleChange(e) {
        const property = e.target.name;
        const value = e.target.value;
        if (property === 'male' || property === 'female') {
            e.preventDefault();
            setNewObject({ ...newObject, gender: property });
            console.log({ ...newObject, gender: property });
        }
        else if (property === 'name' || property === 'especialidad' || property === 'lugar' || property === 'image') {
            e.preventDefault();
            setNewObject({ ...newObject, [property]: value });
        }
        else if (property === 'ubicacion') {
            e.preventDefault();
            setNewObject({ ...newObject, [property]: [value] });
        }
        else if (property === 'convenio') {
            if (!newObject.convenio.includes(value)) {
                setNewObject({ ...newObject, [property]: [...newObject[property], value] });
            }
            else {
                const filter = newObject.convenio.filter(con => con !== value);
                setNewObject({ ...newObject, [property]: filter });
            }
        }
        else if (property === 'presencial' || property === 'online') {
            e.preventDefault();
            setModalidad(property);
        }
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

    function submitObject(e) {
        e.preventDefault();
        if (newObject.gender === '' || (!Object.keys(newObject.presencial).length && !Object.keys(newObject.online).length)) {
            alert('Hay campos incompletos');
        }
        else alert('Todo listo!');
        console.log(newObject);
    }

    function handleHour(e) {
        e.preventDefault();
        let hora = e.target.name;
        hora = hora.split(':').join('');
        if (day) {
            if (modalidad === 'presencial') {
                if(!horasPresElegidas.includes(hora)) {
                    setHorasPresElegidas([...horasPresElegidas, hora].sort(compareNumbers));
                }
                if (horasPresElegidas.includes(hora)) {
                    let _hora = hora.split(':').join('');
                    const horasFiltradas = horasPresElegidas.filter(h => h !== _hora);
                    setHorasPresElegidas(horasFiltradas);
                }
                if (day) {
                    setNewObject({...newObject, [modalidad]: {...newObject[modalidad], [day]: horasPresElegidas}});
                    console.log({...newObject, [modalidad]: {...newObject[modalidad], [day]: horasPresElegidas}});
                }
            }
            else if (modalidad === 'online') {
                if(!horasOnlineElegidas.includes(hora)) {
                    setHorasOnlineElegidas([...horasOnlineElegidas, hora].sort(compareNumbers));
                }
                if (horasOnlineElegidas.includes(hora)) {
                    let _hora = hora.split(':').join('');
                    const horasFiltradas = horasOnlineElegidas.filter(h => h !== _hora);
                    setHorasOnlineElegidas(horasFiltradas);
                }
                if (day) {
                    setNewObject({...newObject, [modalidad]: {...newObject[modalidad], [day]: horasOnlineElegidas}});
                    console.log({...newObject, [modalidad]: {...newObject[modalidad], [day]: horasOnlineElegidas}});
                }
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
            <form onSubmit={submitObject} className={styles.container}>
                <div>
                    <div className={styles.formulario}>
                        <NavLink to='/main' className={styles.close}>
                            <img src={closeImage} alt="" />
                        </NavLink>
                        <div className={styles.nombre}>
                            <div className={styles.section}>
                                <label htmlFor="">Nombre:</label>
                                <input onChange={handleChange} name='name' type="text" required/>
                                <div id={styles.subirImagen} className={styles.section}>
                                    <label htmlFor="image" className={styles.labelAddImage}>Subir imagen</label>
                                    <input onChange={handleChange} name='image' id='image' className={styles.addImage} type="file" accept=".png, .jpg, .jpeg" />
                                </div>
                            </div>
                        </div>
                        <div className={styles.section}>
                            <label htmlFor="">Género:</label>
                            <div className={styles.gender}>
                                <div className={styles.section}>
                                    <button name='male' onClick={handleChange} id={newObject.gender === 'male' ? styles.buttonOnn : ''}>Male</button>
                                </div>
                                <div className={styles.section}>
                                    <button name='female' onClick={handleChange} id={newObject.gender === 'female' ? styles.buttonOnn : ''}>Female</button>
                                </div>
                            </div>
                        </div>
                        <div className={styles.section}>
                            <label htmlFor="">Especialidad:</label>
                            <input onChange={handleChange} name='especialidad' type="text" required/>
                        </div>
                        <div id={styles.convenio} className={styles.section}>
                            <div  className={styles.label} onClick={e => { setconvenioDeploy(!convenioDeploy) }}>
                                <label onClick={e => { setconvenioDeploy(!convenioDeploy) }} htmlFor="">Convenio:</label>
                                {convenioDeploy ? <i class='bx bxs-chevrons-down bx-rotate-180' ></i> : <i onClick={e => { setconvenioDeploy(!convenioDeploy) }} class='bx bxs-chevrons-down'></i>}
                            </div>
                            <div id={styles.convenioBox} className={convenioDeploy ? styles.convenioOnn : styles.convenioOff}>
                                {previsiones.map(convenio => {
                                    return (
                                        <div>
                                            <label htmlFor="">{convenio}</label>
                                            <input onChange={handleChange} value={convenio} name='convenio' type="checkbox" />
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                        <div className={styles.section}>
                            <label htmlFor="">Lugar(Comuna):</label>
                            <input onChange={handleChange} name='lugar' type="text" required/>
                        </div>
                        <div className={styles.section}>
                            <label htmlFor="">Ubicación(Centro Médico):</label>
                            <input onChange={handleChange} name='ubicacion' type="text" required/>
                        </div>
                        <div className={styles.section}>
                            <label htmlFor="">Modalidad:</label>
                            <div className={styles.modalidad}>
                                <div className={styles.section}>
                                    <button name='presencial' onClick={handleChange} id={modalidad === 'presencial' ? styles.buttonOnn : ''}>Presencial</button>
                                </div>
                                <div className={styles.section}>
                                    <button name='online' onClick={handleChange} id={modalidad === 'online' ? styles.buttonOnn : ''}>Online</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


{/* SECCIÓN DESPLEGABLE */}
                <div className={styles.horarioContainer}>
                    <h1 className={styles.h1}>Horario</h1>
                    <div className={modalidad !== '' ? styles.calendarOnn : styles.calendarOff}>
                        <div className={styles.horasContainer}>
                            {horas().map(hora => {
                                if (modalidad === 'presencial') {
                                    return <button onClick={handleHours} name={hora} className={styles.presenciales}>{hora}</button>
                                }
                                else if (modalidad === 'online') {
                                    return <button onClick={handleHours} name={hora} className={styles.online}>{hora}</button>
                                }
                            })}
                        </div>


{/* BANDEJA PRESENCIAL */}
                        <div className={styles.horarioSeleccionado}>
                            {modalidad === 'presencial' &&
                                <div className={styles.segundoContainer}>
                                    <div className={styles.barra}>
                                        <input onChange={handleInput} type="date"/>
                                        <ul>
                                            {hoursPresencial?.map(h => {
                                                return <li>{h}<span title={h} onClick={handleHours} className={styles.after}>✖️</span></li>
                                            })}
                                        </ul>
                                        <button onClick={handleAddObject} className={styles.addIcon}>
                                            Add
                                        </button>
                                    </div>
{/* YA SELECCIONADOS */}
                                    <div className={styles.yaSeleccionados}>
                                        {newObject.presencial && Object.entries(newObject.presencial).map(([key, value]) => {
                                            return (
                                                <div className={styles.barra2}>
                                                    <div className={styles.fechaSaved}>{key}</div>
                                                    <ul>
                                                        {value[0]?.map(horas => {
                                                            return <li>{horas}</li>
                                                        })}
                                                    </ul>
                                                    <button onClick={handleAddObject} className={styles.checkIcon}>
                                                        ✓
                                                    </button>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                            }


{/* BANDEJA ONLINE */}
                            
                            {modalidad === 'online' && 
                                <div className={styles.segundoContainer}>
                                    <div className={styles.barra}>
                                        <input onChange={handleInput} type="date" required />
                                        <ul>
                                            {hoursOnline?.map(h => {
                                                return <li>{h}<span title={h} onClick={handleHours} className={styles.after}>✖️</span></li>
                                            })}
                                        </ul>
                                        <button onClick={handleAddObject} className={styles.addIcon}>
                                            Add
                                        </button>
                                    </div>
{/* YA SELECCIONADOS */}
                                    <div className={styles.yaSeleccionados}>
                                        {newObject.online && Object.entries(newObject.online).map(([key, value]) => {
                                            return (
                                                <div className={styles.barra2}>
                                                    <div className={styles.fechaSaved}>{key}</div>
                                                    <ul>
                                                        {value[0]?.map(horas => {
                                                            return <li>{horas}</li>
                                                        })}
                                                    </ul>
                                                    <button onClick={handleAddObject} className={styles.checkIcon}>
                                                        ✓
                                                    </button>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                </div>
                <button className={styles.submit}>Crear</button>
            </form>
        </div>
    )
}