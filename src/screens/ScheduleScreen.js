import React, {useState, useEffect} from 'react'
import 'rbx/index.css';
import {Container} from 'rbx';
import CourseList from '../components/CourseList';
import Banner from '../components/Banner'
import firebase from '../shared/firebase'

/*
The Schedule Screen does the following jobs:
1. Draw the schedule screen
2. Pull the remote JSON data and modify it to a state data
*/


/*
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions/Cheatsheet
Regular expression rules:
'//' means the start of the reg expression
^ matches the begining of the input
$ matches the end of input
x|y matches either x or y
(?:x) matches x but doesn't remember the match
x+ matches the preceding item x 1 or more times
\d matches any digit
x? matches x 0 or 1 times
 */

// Original: "MWF 10:00-10:50"
// Parsed: { days: "TuTh" hours: { start: 600, end: 680 } }
const meetsPat = /^((?:M|Tu|W|Th|F)+) +(\d\d?):(\d\d)[ -](\d\d?):(\d\d)$/;

const timeParts = meets => {
  const[match,days,hh1,mm1,hh2,mm2] = meetsPat.exec(meets) || [];
  return !match ?{} : {
    days,
    hours:{
      start: hh1 * 60 + mm1 * 1,
      end: hh2 * 60 + mm2 * 1
    }
  };
};

// Spread Operators '...': https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax
const addCourseTimes = course => (
  {
    ...course,
    ...timeParts(course.meets)
  }
);
const addScheduleTimes = schedule =>(
  {
    title: schedule.title,
    courses: Object.values(schedule.courses).map(addCourseTimes)
  }
)

const ScheduleScreen = ({navigation}) =>{

    const db = firebase.database().ref();
    const [schedule, setSchedule] = useState({ title:'', courses:[]});
    const [user, setUser] = useState(null);
    const view = (course)=>{
      navigation.navigate('CourseDetailScreen',{course});
    };

    useEffect(()=>{
      const handleData = snap =>{
        if (snap.val()) setSchedule(addScheduleTimes(snap.val()));
      }
      db.on('value',handleData,error=> alert(error));
      return () => {db.off('value',handleData);}
    },[]);

    useEffect(()=>{
      firebase.auth().onAuthStateChanged(setUser);
    },[]);
  
    return(
      <Container>
        <Banner user = {user} title = {schedule.title}/>
        <CourseList courses={schedule.courses} view = {view} user = {user}/>
      </Container>
    )
     
};

export default ScheduleScreen;