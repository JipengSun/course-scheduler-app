import React, {useState, useEffect} from 'react'
import 'rbx/index.css';
import {Button, Container, Title} from 'rbx';
import firebase from 'firebase/app';
import 'firebase/database';
import ScheduleScreen from './screens/ScheduleScreen';


const App = () => {
 
  return(
    <ScheduleScreen/>
  );
  
};
export default App;
