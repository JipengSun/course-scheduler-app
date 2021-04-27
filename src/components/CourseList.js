import Course from './Course';
import {getCourseTerm} from './Course/times'
import {Button} from 'rbx';
import React, {useState} from 'react'
import TermSelector from './TermSelector'

/*
The CourseList components does folling jobs:
1. Implment the CourseList function in ScheduleScreen
2. It draws TermSelctor buttons group on the top and Courses Button Group below the TermSelctor
3. It implements the term filtering and button color logic
*/

// selected is an array store the selected courses
const useSelection = ()=>{
    const [selected, setSelected] = useState([]);
    const toggle = (x)=>{
      setSelected(selected.includes(x) ? selected.filter(y => y!== x) : [x].concat(selected))
    };
    return [ selected, toggle];
  
}

const CourseList = ({courses, view, user}) =>{
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
            state = { {selected, toggle}}
            view = {view}
            user = {user}/>
          )}
        </Button.Group>
      </React.Fragment>
    )
  };

export default CourseList;