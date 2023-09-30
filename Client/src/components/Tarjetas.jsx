import Tarjeta from './Tarjeta';
import styles from './Tarjetas.module.css';
import { useSelector } from 'react-redux';

export default function Tarjetas({ characters }) {
    /* const LUGAR = useSelector(state => state.inputData.lugar);
    const ESP = useSelector(state => state.inputData.especialidad); */
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
    const LUGAR = iData().lugar;
    const ESP = iData().especialidad;
    const SEL = useSelector(state => state.selectDate);
    const Modalidad = useSelector(state => state.modalidad)
    const SELformat = `${SEL.day}/${SEL.monthNumber}/${SEL.year}`;
    const charsFiltered = characters.filter(char => {
        return char[Modalidad].hasOwnProperty(SELformat) && LUGAR.includes(char.lugar) && ESP.includes(char.especialidad);
    })
    return (
        <div className={styles.bigContainer}>
            {charsFiltered.map(character => {
                return <Tarjeta character={character} horas={character[Modalidad][SELformat]} modalidad={Modalidad} />
            })}
        </div>
    )
}