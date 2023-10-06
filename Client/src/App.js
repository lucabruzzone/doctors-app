import './App.css';
import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import {Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Home from './components/Home.jsx';
import Main from './components/Main';
import Form from './components/Form';
import { useDispatch, useSelector } from 'react-redux';
import { PATHROUTES } from './PathRoutes';
import { dateSelection, inputData, addInitialDoctors, showAllInitialDoctors } from './redux/actions';
import { fullWeek} from './Functions/Calendar';
import { data } from './data';
import Footer from './components/Footer';
import { Navbar } from './components/Navbar';


function App() {
   const pass = useSelector(state => state.inputData);
   const location = useLocation();
   const navigate = useNavigate();
   const dispatch = useDispatch();

   /* useEffect(() => {
      !access && navigate('/');
   }, [access]); */

   /* useEffect(() => {
      Object.keys(pass).length === 0 && navigate(PATHROUTES.home);
   }, [pass]); */

   async function getAllDoctors() {
      const URL = 'http://localhost:3001/doctors/';
      const { data } = await axios(URL);
      dispatch(showAllInitialDoctors(data));
   }
   
   useEffect(() => {
      getAllDoctors();
      !localStorage.dataInput && navigate(PATHROUTES.home);
   }, []);

   /* const a = fullWeek(0)[0]
   console.log(a)
   const aFinal = `${a.day}/${a.monthNumber}/${a.year}`;
   dispatch(dateSelection(aFinal)); */
   /* const initialDate = fullWeek(0)[0]
   dispatch(dateSelection(initialDate)); */

   return (
      <div className='App'>
         {location.pathname !== PATHROUTES.main && <Navbar/>}
         <Routes>
            <Route path={PATHROUTES.home} element={<Home/>}/>
            <Route path={PATHROUTES.main} element={<Main/>}/>
            <Route path={PATHROUTES.form} element={<Form/>}/>
         </Routes>
         {location.pathname !== PATHROUTES.home && <Footer/>}
      </div>
   );
}

export default App;
