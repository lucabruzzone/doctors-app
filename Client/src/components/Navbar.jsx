import styles from './Navbar.module.css';
import { PATHROUTES } from '../PathRoutes';
import { useLocation, useNavigate, NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { inputData } from '../redux/actions';
import { useState } from 'react';
import { useTypewriter } from 'react-simple-typewriter';

export function Navbar() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    let location = useLocation();
    const {pathname} = location;
    const [text] = useTypewriter({
        words: ['Especialidad', 'Enfermedad', 'Profesional'],
        loop: {},
        typeSpeed: 60,
    })
    const [dataInput, setDataInput] = useState(iData());

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

    function handleSearch(e) {
        e.preventDefault();
        dispatch(inputData(dataInput));
        if (typeof Storage !== 'undefined' && dataInput.especialidad[0] !== '' && dataInput.lugar[0] !== '' && (e.key === 'Enter' || e.target.name === 'button')) {
            localStorage.setItem('dataInput', JSON.stringify(dataInput));
        }
        if(dataInput.especialidad[0] !== '' && dataInput.lugar[0] !== '') navigate('/main');

    }
    function handleInput(e) {
        const property = e.target.name;
        setDataInput({...dataInput, [property]: [e.target.value.toUpperCase()]});
    }
    function navigateToHome() {
        navigate(PATHROUTES.home)
        localStorage.removeItem('dataInput');
    }

    return (
        <div className={styles.bigContainerMagnum}>
            <div id={styles.bigContainer} className={pathname !== PATHROUTES.home ? styles.bigContainerColor2: styles.bigContainerColor1}>
                <div id={styles.miConsulta} className={pathname !== PATHROUTES.home ? styles.nombre2: styles.nombre}>
                    <h1 onClick={navigateToHome}>MiConsulta</h1>
                </div>
                <div id={pathname !== PATHROUTES.home ? styles.searchBar: styles.oculto}>
                    <div className={styles.inputsContainer}>
                        <input onChange={handleInput} onKeyPress={handleSearch} id={styles.input1} name='especialidad' className={styles.inputDoctor} type="text" placeholder={dataInput.especialidad.length > 1 ? dataInput : text}/>
                        <input onChange={handleInput} onKeyPress={handleSearch} id={styles.input2} name='lugar' className={styles.inputLugar} type="text" placeholder={dataInput.lugar.length > 1 ? dataInput : 'Lugar'}/>
                    </div>
                    <div className={styles.inputsSearch}>
                        <button name='button' onClick={handleSearch}>Buscar</button>
                    </div>
                </div>
                <div className={styles.listaButtons}>
                    <li>
                        <NavLink  to='/reservas' id={pathname === PATHROUTES.reservas ? styles.formOnn : ''} className={pathname !== PATHROUTES.home ? styles.listaButtonslih2Cambio : styles.listaButtonslih2}>
                            <h2 className={pathname === PATHROUTES.main || pathname === PATHROUTES.form ? styles.listaButtonslih2Cambio : styles.listaButtonslih2}>Reservas</h2>
                        </NavLink>
                        
                        <NavLink to='/form' id={pathname === PATHROUTES.form ? styles.formOnn : ''} className={pathname !== PATHROUTES.home ? styles.listaButtonslih2Cambio : styles.listaButtonslih2}>
                            <h2>¿Eres doctor?</h2>
                        </NavLink>
                        <h3 className={pathname === PATHROUTES.main || pathname === PATHROUTES.form ? styles.inicioSesion : styles.inicioSesion2}>Iniciar sesión</h3>
                    </li>
                </div>
            </div>
        </div>
    );
}