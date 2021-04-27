import Course from './Course'
import {Button} from 'rbx';
import 'rbx/index.css';
import React, {useState} from 'react'

/*
The CourseList components does folling jobs:
1. Implment the CourseList function in ScheduleScreen
2. It draws TermSelctor buttons group on the top and Courses Button Group below the TermSelctor
3. It implements the term filtering and button color logic
*/

const terms = {F:'Fall',W:'Winter',S:'Spring'};

const buttonColor = selected=>(
    selected ? 'success' : null
  );

const getCourseTerm = course =>(
  terms[course.id.charAt(0)]
);
// selected is an array store the selected courses
const useSelection = ()=>{
    const [selected, setSelected] = useState([]);
    const toggle = (x)=>{
      setSelected(selected.includes(x) ? selected.filter(y => y!== x) : [x].concat(selected))
    };
    return [ selected, toggle];
  
}

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

const CourseList = ({courses, view, db, user}) =>{
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
            db = {db}
            user = {user}/>
          )}
        </Button.Group>
      </React.Fragment>
    )
  };

export default CourseList;