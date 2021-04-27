import React from 'react'
import {Button} from 'rbx';
import 'rbx/index.css';
//import 'firebase/database';

/*
The Course component does following jobs:
1. The Course button implments conflict detection logic
*/

const terms = {F:'Fall',W:'Winter',S:'Spring'};
const days = ['M','Tu','W','Th','F'];

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

const buttonColor = selected=>(
    selected ? 'success' : null
  );

const getCourseTerm = course =>(
  terms[course.id.charAt(0)]
);

const getCourseNumber = course=>(
  course.id.slice(1,4)
);

// Return True if the course is conflict with the selected courses.
const hasConflict = (course, selected)=>{
    //console.log(selected)
    return selected.some(selection => courseConflict(course,selection))
  };

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

const saveCourse = (course, meets, db)=>{
  db.child('course').child(course.id).update({meets})
  .catch(error=>alert(error))
}

const moveCourse = (course,db )=>{
  const meets = prompt('Enter new meeting data, in this format:', course.meets);
  if (!meets) return;
  const {days} = timeParts(meets);
  if (days) saveCourse(course, meets, db);
  else moveCourse(course,db);

}

const Course = ({course, state, view, db, user}) =>{
  return(
    <Button 
      color = { buttonColor(state.selected.includes(course))}
      onClick = {()=>{state.toggle(course)}}
      onDoubleClick = {user? () => moveCourse(course,db):null}
      onLongPress = {()=> view(course)}
      disabled = { hasConflict(course, state.selected)}
    >
      {getCourseTerm(course)} CS {getCourseNumber(course)}:{course.title}
     </Button>
  )
}

export default Course;