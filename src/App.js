import React from 'react'
import 'rbx/index.css';
import {Button, Container, Title} from 'rbx';
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

const Banner = ({ title }) => (
  <Title>{ title }</Title>
);
const CourseList = ({courses}) =>(
  <Button.Group>
    { courses.map(course => <Course course = {course}/>)}
  </Button.Group>
);
const terms = {F:'Fall',W:'Winter',S:'Spring'};

const getCourseTerm = course =>(
  terms[course.id.charAt(0)]
);

const getCourseNumber = course=>(
  course.id.slice(1,4)
);

const Course = ({course}) =>(
  <Button>
    {getCourseTerm(course)} CS {getCourseNumber(course)}:{course.title}
   </Button>
)
const App = () => (
  <Container>
    <Banner title = {schedule.title}/>
    <CourseList courses={schedule.courses}/>
  </Container>
);

export default App;
