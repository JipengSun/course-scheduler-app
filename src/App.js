import React, {useState, useEffect} from 'react'
import 'rbx/index.css';
import {Button, Container, Title} from 'rbx';
/*
const schedule = {
  'title':'CS Courses for 2020-2021',
  'courses':[
    {
      'id':'F101',
      'title':'Algorithm',
      'meets':'MWF 11:00-11:50'
    },
    {
      'id':'F110',
      'title':'Database',
      'meets':'MWF 12:00-13:50' 

    },
    {
      'id':'F111',
      'title':'Operating Systems',
      'meets':'MWF 13:00-14:50' 

    }
  ]
  
};
*/

const Banner = ({ title }) => (
  <Title>{ title || '[loading...]'}</Title>
);

const terms = {F:'Fall',W:'Winter',S:'Spring'};
const days = ['M','Tu','W','Th','F'];

const getCourseTerm = course =>(
  terms[course.id.charAt(0)]
);

const getCourseNumber = course=>(
  course.id.slice(1,4)
);

const buttonColor = selected=>(
  selected ? 'success' : null
);

const TermSelector = ({state})=>(
  <Button.Group hasAddons>
    {
      Object.values(terms).map( value => 
      <Button 
        key = {value}
        color = {buttonColor(value === state.term)}
        onClick = { () => state.setTerm(value)}
      > {value} </Button>
      )
    }
  </Button.Group>
);


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

// Return True if course1 conflicts with course2
const courseConflict = (course1, course2) =>(
  course1 !== course2 &&
  getCourseTerm(course1) === getCourseTerm(course2) &&
  timeConflict(course1,course2)
);

// Return True if course1 conflicts with course2
const timeConflict = (course1,course2)=>(
  daysOverlap(course1.days,course2.days) && hoursOverlap(course1.hours, course2.hours)
);

const daysOverlap = (days1, days2) =>{
  return days.some(day => days1.includes(day) && days2.includes(day))
};

const hoursOverlap = (hours1, hours2)=>{
  if (Math.max(hours1.start, hours2.start) < Math.min(hours1.end, hours2.end)){
    console.log(hours1,hours2)
  }
  return Math.max(hours1.start, hours2.start) < Math.min(hours1.end, hours2.end)
};

// Return True if the course is conflict with the selected courses.
const hasConflict = (course, selected)=>{
  //console.log(selected)
  return selected.some(selection => courseConflict(course,selection))
};




const Course = ({course, state}) =>(
  <Button 
    color = { buttonColor(state.selected.includes(course))}
    onClick = {()=> state.toggle(course)}
    disabled = { hasConflict(course, state.selected)}
  >
    {getCourseTerm(course)} CS {getCourseNumber(course)}:{course.title}
   </Button>
)

// selected is an array store the selected courses
const useSelection = ()=>{
  const [selected, setSelected] = useState([]);
  const toggle = (x)=>{
    setSelected(selected.includes(x) ? selected.filter(y => y!== x) : [x].concat(selected))
  };
  return [ selected, toggle];

}

const CourseList = ({courses}) =>{
  const [term,setTerm] = useState('Fall');
  const termCourses = courses.filter(course => term === getCourseTerm(course));
  const [selected, toggle] = useSelection();
  return(
    <React.Fragment>
      <TermSelector state = {{term, setTerm}}/>
      <Button.Group>
        { termCourses.map(course => 
        <Course 
          key={course.id} 
          course = {course}
          state = { {selected, toggle}}/>)}
      </Button.Group>
    </React.Fragment>
  )
};

const App = () => {
  const url = 'https://courses.cs.northwestern.edu/394/data/cs-courses.php';
  const [schedule, setSchedule] = useState({ title:'', courses:[]});
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
      <CourseList courses={schedule.courses}/>
    </Container>
  )
  
};


export default App;
