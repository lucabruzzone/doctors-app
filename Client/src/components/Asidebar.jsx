import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from './Asidebar.module.css';
/* import { FaHospital } from 'react-icons/fa';
import { MdMedicalServices, MdPayment } from 'react-icons/md';
import { TbReportMedical } from 'react-icons/tb'; */
import { asideTranslate } from "../redux/actions";
import { enfermedades, centros, servicios, pagos } from "../data2";

export function Asidebar() {
    const divRef = useRef();
    const dispatch = useDispatch();
    const [itemSelect, setItemSelect] = useState('');
    const [downBarCheck, setDownBarCheck] = useState(false);
    const scrollY = useSelector(state => state.scrollY);
    const asideTrans = useSelector(state => state.asideBar);

    function handleDownBar(e) {
        const sel = e.target.id;
        itemSelect !== sel ? setItemSelect(sel): setItemSelect('');
    }
    useEffect(() => {
        const closeAsidebar = (e) => {
            const div = divRef.current;
            if(div && !div.contains(e.target) && asideTrans === 'bigContainerTranslateIn') dispatch(asideTranslate('bigContainerTranslateOut'));
        }
        window.addEventListener('click', closeAsidebar);
        return () => {window.removeEventListener('click', closeAsidebar)};
    }, [asideTrans]);

    return (
        <div ref={divRef} className={styles[scrollY]} id={styles[asideTrans]}>
            <div className={styles.ulContainer}>
                <ul>
                    <div className={styles.filtrarPor}><h4>Filtrar por:</h4></div>
                    <section className={styles.mainItemsContainer}>
                        <section id={styles.items} className={itemSelect === 'enfermedades' ? styles.bigSectionIn: styles.bigSectionOut}>
                            <div onClick={handleDownBar} id='enfermedades'><p id="enfermedades">{/* <TbReportMedical id="enfermedades" style={{ marginRight: '10px' }} /> */}Enfermedades</p></div>
                            <section id={styles.sections} className={styles.subSection}>
                                <ul >
                                    {enfermedades.map(enf => <li>
                                        <input type="checkbox" /><label>{enf}</label>
                                    </li>)}
                                </ul>
                            </section>
                        </section>

                        <section id={styles.items} className={itemSelect === 'centros' ? styles.bigSectionIn: styles.bigSectionOut}>
                            <div onClick={handleDownBar} id='centros'><p id="centros">{/* <FaHospital id="centros" style={{ marginRight: '10px' }} /> */}Centros médicos</p></div>
                            <section id={styles.sections} className={styles.subSection}>
                                <ul >
                                    {centros.map(enf => <li>
                                        <input type="checkbox" /><label>{enf}</label>
                                    </li>)}
                                </ul>
                            </section>
                        </section>

                        <section id={styles.items} className={itemSelect === 'servicios' ? styles.bigSectionIn: styles.bigSectionOut}>
                            <div onClick={handleDownBar} id='servicios'><p id='servicios'>{/* <MdMedicalServices id='servicios' style={{ marginRight: '10px' }} /> */}Servicios</p></div>
                            <section id={styles.sections} className={styles.subSection}>
                                <ul >
                                    {servicios.map(enf => <li>
                                        <input type="checkbox" /><label>{enf}</label>
                                    </li>)}
                                </ul>
                            </section>
                        </section>

                        <section id={styles.items} className={itemSelect === 'pagos' ? styles.bigSectionIn: styles.bigSectionOut}>
                            <div onClick={handleDownBar} id='pagos'><p id='pagos'>{/* <MdPayment id='pagos' style={{ marginRight: '10px' }} /> */}Método de pago</p></div>
                            <section id={styles.sections} className={styles.subSection}>
                                <ul >
                                    {pagos.map(enf => <li>
                                        <input type="checkbox" /><label>{enf}</label>
                                    </li>)}
                                </ul>
                            </section>
                        </section>
                    </section>
                </ul>
            </div>
        </div>
    );
}
