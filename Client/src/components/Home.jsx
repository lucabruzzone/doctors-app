import React, { useEffect, useState } from 'react';
import styles from './Home.module.css';
import Navbar from './Navbar';
import SearchBarPro from './SearchBarPro';
import image from '../img/healthcare-workers-7408560_1280.png';



export default function Home() {
   return(
      <div className={styles.bigContainer}>
         {/* <section className={styles.navSection}>
            <Navbar/>
         </section> */}
         <section className={styles.midSection}>
            <div className={styles.searchSection}>
               <div className={styles.textoGrande}>
                  <h1>Encuentra tu especialista y pide cita</h1>
                  <h4>60 000 profesionales están aquí para ayudarte.</h4>
               </div>
               <div className={styles.searchBox}>
                  <SearchBarPro/>
               </div>
            </div>
         </section>
         <img src={image} alt="" />
      </div>
   )
}
