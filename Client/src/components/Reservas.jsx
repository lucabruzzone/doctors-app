import styles from './Reservas.module.css';
import axios from 'axios';
import { URL } from '../PathRoutes';
import { useState } from 'react';

function Reservas() {
    const [paciente, setPaciente] = useState({});
    const [reservasPaciente, setReservasPaciente] = useState([]);
    const [noEncontrado, setNoEncontrado] = useState('');
    const [desplegable, setDesplegable] = useState('');
    const [codigo, setCodigo] = useState('');

    function handleNumber(number) {
        if (number % 2 === 0) return true;
        return false
    }

    async function handleInputCodigo(e) {
        const codigo = e.target.value;
        setNoEncontrado(codigo);
        setDesplegable(codigo);
        setCodigo(codigo);
        try {
            const { data } = await axios(`${URL}/users?codigo=${codigo}`);
            if (data) {
                setReservasPaciente(data.reservas);
                setPaciente(data);
                setNoEncontrado('');
            }
        } catch (error) {
            setReservasPaciente([]);
            setPaciente({});
        }
    }

    async function handleClickAnular(e) {
        e.preventDefault();
        const codigo = e.target.id;
        const fecha = e.target.name;
        try {
            const { data } = await axios.delete(`${URL}/users?codigo=${codigo}&fecha=${fecha}`);
            if (data) {
                setReservasPaciente(data.reservas);
                setPaciente(data);
                setNoEncontrado('');
            }
        } catch (error) {
            setReservasPaciente([]);
            setPaciente({});
        }
    }

    return (
        <div className={styles.bigContainer}>
            <form className={styles.formBigContainer}>
                <div className={styles.codigoLabel}>
                    <label htmlFor="">Código de reserva:</label>
                    <input onChange={handleInputCodigo} type="text" />
                </div>
                <div className={styles.nombrePaciente}>
                    {paciente.nombrePaciente &&
                        <p>Paciente: {paciente.nombrePaciente}</p>
                    }
                </div>
                <div className={styles.reservasBigContainer}>
                    <div className={styles.reservasTitulo}>
                        <p>RESERVAS</p>
                    </div>
                    <div className={styles.tablaParams}>
                        <p className={styles.param1}>FECHA</p>
                        <p className={styles.param2}>DATOS</p>
                        <p className={styles.param3}>ANULAR CITA</p>
                    </div>
                    {noEncontrado !== '' && !reservasPaciente.length ?
                        <div id={desplegable !== '' ? styles.desplegableOnn : styles.desplegableOff} className={styles.desplegable}>
                            <div id={styles.loadingBig}>
                                <div id={styles.loading}></div>
                            </div>
                        </div> :
                        <div id={desplegable !== '' ? styles.desplegableOnn : styles.desplegableOff} className={styles.desplegable}>
                            {reservasPaciente.length > 0 && reservasPaciente.map((res, index) => {
                                const { doctor, especialidad, centroMedico, ubicacion, fecha, imagen } = res;
                                return (
                                    <div id={handleNumber(index) ? styles.color1 : styles.color2} className={styles.barra2}>
                                        <div className={styles.fechaSaved}>{fecha}</div>
                                        <ul>
                                            <li>
                                                <p>{doctor}, {especialidad}</p>
                                                <p>{centroMedico}, {ubicacion}</p>
                                            </li>
                                        </ul>
                                        <div className={styles.button}>
                                            <button name={fecha} id={codigo} onClick={handleClickAnular}>
                                                ✕
                                            </button>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    }
                </div>
            </form>
        </div>
    );
}

export default Reservas;
