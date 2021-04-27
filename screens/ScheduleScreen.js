import React, {useState, useEffect} from 'react'
import 'rbx/index.css';
import {Container, Title} from 'rbx';
//import firebase from 'firebase/app';
//import 'firebase/database';
import CourseList from '../components/CourseList';
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
    courses: schedule.courses.map(addCourseTimes)
  }
)

const Banner = ({ title }) => (
  <Title>{ title || '[loading...]'}</Title>
);


const ScheduleScreen = ({navigation}) =>{
    const url = 'https://courses.cs.northwestern.edu/394/data/cs-courses.php';
    const [schedule, setSchedule] = useState({ title:'', courses:[]});
    const view = (course)=>{
      navigation.navigate('CourseDetailScreen',{course});
    };

    useEffect( ()=>{
      const fetchSchedule = async ()=>{
        const response = await fetch(url);
        if (!response.ok) throw response;
        const json = await response.json();
        setSchedule(addScheduleTimes(json));
      }
      fetchSchedule();
    }
      ,[])
      
    return(
      <Container>
        <Banner title = {schedule.title}/>
        <CourseList courses={schedule.courses} view = {view}/>
      </Container>
    )
     
};

export default ScheduleScreen;