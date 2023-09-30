import styles from './FilterBar.module.css';
import image from '../img/camera-360.png';
import { previsiones } from '../../src/data2';
import { switchModalidad, previsionSelection, previsionFiltro, showAllDoctors, asideTranslate } from '../redux/actions';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTypewriter } from 'react-simple-typewriter';
/* import {BsChevronUp, BsChevronDown} from 'react-icons/bs'; */

export default function FilterBar() {
    const dispatch = useDispatch();
    const scrollY = useSelector(state => state.scrollY);
    const asideGlobal = useSelector(state => state.asideBar);
    const [modalidad, setModalidad] = useState('presencial');
    const [prevision, setPrevision] = useState('');
    const [focus, setFocus] = useState(false);
    const [text] = useTypewriter({
        words: ['exámenes médicos', 'centros médicos'],
        loop: {},
        typeSpeed: 80,
    })
    const fullText = `Busca ${text}`;

    function handleModalidad(e) {
        let target = e.target.id;
        if(target === 'online2') target = 'online';
        setModalidad(target);
        dispatch(switchModalidad(target));
    }
    function handlePrevision(e) {
        const previsionFormat = e.target.value.toUpperCase();
        if(previsionFormat === '') {
            setPrevision(previsionFormat);
            dispatch(showAllDoctors());
        }
        else {
            setPrevision(previsionFormat);
            dispatch(previsionSelection(previsionFormat));
            dispatch(previsionFiltro(previsionFormat));
        }
    }
    function handleSideBar() {
        console.log(asideGlobal)
        asideGlobal === 'bigContainerTranslateIn' ? dispatch(asideTranslate('bigContainerTranslateOut')): dispatch(asideTranslate('bigContainerTranslateIn'));
    }

    return (
        <div className={styles[scrollY]}>
            <div className={styles.bigContainer}>
                <div className={styles.container}>
                    <div className={styles.presencialContainer}>
                        <div onClick={handleModalidad} id='presencial' className={modalidad === 'presencial' ? styles.on : styles.off}>Presencial
                        </div>
                    </div>
                    <div className={styles.onlineContainer}>
                        <div onClick={handleModalidad} id='online' className={modalidad === 'online' ? styles.on : styles.off}>
                            Telemedicina
                            <img id='online2' className={styles.img} src={image} alt="" />
                        </div>
                    </div>
                </div>

                <select onChange={handlePrevision} name="isapres" id={styles.isapres} className={prevision !== '' ? styles.on : styles.off}>
                    <option value=''>Previsión</option>
                    {previsiones.map(p => {
                        return <option value={p}>{p}</option>
                    })}
                </select>

                <div className={styles.searchBarContainer}>
                    <input onFocus={()=>{setFocus(!focus)}} onBlur={()=>{setFocus(!focus)}} type="text" placeholder={focus ? '': fullText} />
                    <button>Buscar</button>
                </div>
                
                <div onClick={handleSideBar} name="otrosFiltros" id={styles.isapres} className={asideGlobal === 'bigContainerTranslateIn' ? styles.otrosFiltrosContainerIn: styles.otrosFiltrosContainerOut}>
                    <p className={styles.otrosFiltros}>Otros filtros {/* {asideGlobal === 'bigContainerTranslateIn' ? <BsChevronUp className={styles.icons}/>: <BsChevronDown className={styles.icons}/>} */}
                    </p>
                </div>
            </div>
        </div>
    )
}