import styles from './Tarjeta.module.css';
import locationImage from '../img/ubicacion.png';
import { useState } from 'react';
import { useSelector } from 'react-redux';

export default function Tarjeta({character, horas, modalidad}) {
    const { id, name, gender, especialidad, ubicacion, image, puntuacion } = character
    const SEL = useSelector(state => state.selectDate);
    const SELformat = `${SEL.weekDay} ${SEL.day} ${SEL.monthShort}`;
    const [mouseOverOn, setMouseOverOn] = useState(false);

    function handleMouseOver() {
        setMouseOverOn(true);
    }
    function handleMouseOff() {
        setMouseOverOn(false);
    }
    
    return(
        <div onMouseEnter={handleMouseOver} onMouseLeave={handleMouseOff} className={styles.bigContainer} key={id}>
            <div className={styles.containerUp}>
                <div>
                    <div className={gender === 'female' ? styles.imgContainer: styles.imgContainerMen}>
                        <img className={mouseOverOn ? styles.image2: styles.image1} src={image} alt="" />
                    </div>
                </div>
                <div className={styles.horarioContainer}>
                    <div className={styles.ambosHorarios}>
                        <div id={styles.div1} className={styles.horas}>
                            <div className={styles.modalidadPuntuacion}>
                                <p className={styles.p2}>{SELformat}</p>
                                <p className={styles.p1}>{modalidad}</p>
                            </div>
                            <ul className={modalidad === 'online' ? styles.online: styles.presenciales}>
                                {horas[0] && <li>{horas[0]}</li>}
                                {horas[1] && <li>{horas[1]}</li>}
                                {horas[2] && <li>{horas[2]}</li>}
                                {horas[3] && <li>{horas[3]}</li>}
                                {horas[4] && <li>{horas[4]}</li>}
                                {horas[5] && <li>{horas[5]}</li>}
                            </ul>
                        </div>
                    </div>
                    <div className={styles.masHoras}>
                        <p>Mas horas disponibles</p>
                    </div>
                </div>
            </div>
            <hr />
            <div className={mouseOverOn ? styles.containerDown: styles.containerDown2}>
                <div className={styles.DownLeft}>
                    <p className={styles.name}>{gender === 'male' ? 'Dr' : 'Dra'}. {name}</p>
                    {/* <p>{puntuacion}</p> */}
                    <p>{especialidad}</p>
                </div>
                <div className={styles.DownRight}>
                    <img src={locationImage} alt="" />
                    <ul>
                    {ubicacion.map(ubi => <li>{ubi}</li>)}
                    </ul>
                </div>
            </div>
        </div>
    )
}