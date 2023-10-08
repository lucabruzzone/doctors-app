import React,  { useRef, useEffect } from 'react';
import styles from './Main.module.css';
import FilterBar from './FilterBar';
import Calendar from './Calendar';
import Tarjetas from './Tarjetas';
import { data } from '../data';
import { fullWeek} from '../Functions/Calendar';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { PATHROUTES } from '../PathRoutes';
import { Asidebar } from './Asidebar';
import { Navbar } from './Navbar';
import { asideScroll } from '../redux/actions';

export default function Main() {
    const dispatch = useDispatch();
    const divRef = useRef();
    const navigate = useNavigate();
    const asideTranslate = useSelector(state => state.asideBar);
    const pass = useSelector(state => state.inputData);
    const scrollY = useSelector(state => state.scrollY);
    const j = useSelector(state => state.j);
    const doctors = useSelector(state => state.renderDoctors);

    /* useEffect(() => {
        const handleScroll = () => {
            const div = divRef.current;
            const { y } = div.getBoundingClientRect();
            y <= -60 ? dispatch(asideScroll('bigContainerFixed')): dispatch(asideScroll('bigContainerAbsolute')) ;
        }
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        }
    }, []); */

    /* if(Object.keys(pass).length === 0) {
        navigate(PATHROUTES.home);
    }
    else {
    } */
    return (
        <div className={styles.firstContainer}>
            {doctors.length ?
                <div ref={divRef} className={styles.bigContainer} id={styles[scrollY]}>
                    <Navbar />
                    <FilterBar />
                    <Asidebar />
                    <section className={styles.containerSinNavBar} id={asideTranslate === 'bigContainerTranslateIn' ? styles.opacity : ''}>
                        <Calendar characters={doctors} fullWeek={fullWeek(j)} />
                        <div className={styles.tarjetasContainer}>
                            <Tarjetas characters={doctors} />
                        </div>
                    </section>
                </div> :
                <div id={styles.loadingBig}>
                    <div id={styles.loading}></div>
                </div>
            }
        </div>
    )
}