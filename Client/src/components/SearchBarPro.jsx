import styles from './SearchBarPro.module.css';
import axios from 'axios';
import { data } from '../data';
import { fullWeek } from '../Functions/Calendar';
import { useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { inputData, addInitialDoctors, addEspecialidad, addPlace } from '../redux/actions';

export default function SearchBarPro() {
    let location = useLocation();
    const {pathname} = location;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [dataInput, setDataInput] = useState({
        especialidad: [''],
        lugar: ['']
    });
    async function handleSearch(){
        if(dataInput.especialidad[0] !== '' && dataInput.lugar[0] !== '') navigate('/main');
        /* const URL = 'http://localhost:3001/doctors/';
        const { data } = await axios(URL);
        console.log(data); */
        /* alert('ha ocurrido un error') */

    }
    function handleInput(e) {
        const property = e.target.name;
        if(typeof Storage !== 'undefined') {
            setDataInput({...dataInput, [property]: [e.target.value.toUpperCase()]});
            dispatch(inputData({...dataInput, [property]: [e.target.value.toUpperCase()]}));
            localStorage.setItem('dataInput', JSON.stringify({...dataInput, [property]: [e.target.value.toUpperCase()]}));
        }
    }

    return (
        <div className={styles.bigContainer}>
            <div className={styles.buttonsBox}>
                <button className={styles.buttonsBoxButtonPressed}>Buscar especialidad</button>
                <button className={styles.buttonsBoxButtonNotPressed}>Buscar Profesional</button>
            </div>
            <div className={styles.downContainer}>
                <div className={styles.inputsContainer}>
                    <input onChange={handleInput} name='especialidad' className={styles.inputDoctor} type="text" placeholder='Especialidad, enfermedad o profesional' />
                    <input onChange={handleInput} name='lugar' className={styles.inputLugar} type="text" placeholder='Lugar' />
                </div>
                <div className={styles.inputsSearch}>
                    <button onClick={handleSearch}>Buscar</button>
                </div>
            </div>
        </div>
    )
}