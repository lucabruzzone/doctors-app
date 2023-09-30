import styles from './Navbar.module.css';
import { PATHROUTES } from '../PathRoutes';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { inputData } from '../redux/actions';
import { useState } from 'react';

export default function Navbar() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    let location = useLocation();
    const {pathname} = location;
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
    const [dataInput, setDataInput] = useState(iData());
    /* const [dataInput, setDataInput] = useState({
        especialidad: [''],
        lugar: ['']
    }); */

    function handleSearch(e) {
        dispatch(inputData(dataInput));
        if (typeof Storage !== 'undefined' && dataInput.especialidad[0] !== '' && dataInput.lugar[0] !== '' && (e.key === 'Enter' || e.target.name === 'button')) {
            localStorage.setItem('dataInput', JSON.stringify(dataInput));
        }
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
            <div id={styles.bigContainer} className={pathname === PATHROUTES.main ? styles.bigContainerColor2: styles.bigContainerColor1}>
                <div id={styles.miConsulta} className={pathname === PATHROUTES.main ? styles.nombre2: styles.nombre}>
                    <h1 onClick={navigateToHome}>MiConsulta</h1>
                </div>
                <div id={pathname === PATHROUTES.main ? styles.searchBar: styles.oculto}>
                    <div className={styles.inputsContainer}>
                        <input onChange={handleInput} onKeyPress={handleSearch} id={styles.input1} name='especialidad' className={styles.inputDoctor} type="text" placeholder={iData().especialidad}/>
                        <input onChange={handleInput} onKeyPress={handleSearch} id={styles.input2} name='lugar' className={styles.inputLugar} type="text" placeholder={iData().lugar} />
                    </div>
                    <div className={styles.inputsSearch}>
                        <button name='button' onClick={handleSearch}>Buscar</button>
                    </div>
                </div>
                <div className={styles.listaButtons}>
                    <li>
                        <h2 className={pathname === PATHROUTES.main ? styles.listaButtonslih2Cambio :styles.listaButtonslih2}>Reservas</h2>
                        <h2 className={pathname === PATHROUTES.main ? styles.listaButtonslih2Cambio :styles.listaButtonslih2}>Anular hora</h2>
                        <h2 className={pathname === PATHROUTES.main ? styles.listaButtonslih2Cambio :styles.listaButtonslih2}>Registrarse</h2>
                        <h3 className={pathname === PATHROUTES.main ? styles.inicioSesion2: styles.inicioSesion}>Iniciar sesión</h3>
                    </li>
                </div>
            </div>
        </div>
    );
}