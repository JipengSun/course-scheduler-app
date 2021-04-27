import React from 'react'
import {Button} from 'rbx';
import { getCourseNumber, getCourseTerm, hasConflict } from './times';
import firebase from '../../shared/firebase'

/*
The Course component does following jobs:
1. The Course button implments conflict detection logic
*/

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

const saveCourse = (course, meets)=>{
  const db = firebase.database().ref()
  db.child('course').child(course.id).update({meets})
  .catch(error=>alert(error))
}

const moveCourse = (course)=>{
  const meets = prompt('Enter new meeting data, in this format:', course.meets);
  if (!meets) return;
  const {days} = timeParts(meets);
  if (days) saveCourse(course, meets);
  else moveCourse(course);

}

const Course = ({course, state, view, user}) =>{
  return(
    <Button 
      color = { buttonColor(state.selected.includes(course))}
      onClick = {()=>{state.toggle(course)}}
      onDoubleClick = {user? () => moveCourse(course):null}
      onLongPress = {()=> view(course)}
      disabled = { hasConflict(course, state.selected)}
    >
      {getCourseTerm(course)} CS {getCourseNumber(course)}:{course.title}
     </Button>
  )
}

export default Course;