import React from 'react'

const schedule = {
  'title':'CS Courses for 2020-2021',
  'courses':[
    {
      'id':'F101',
      'title':'CS Algorithm',
      'meets':'MWF 11:00-11:50'
    },
    {
      'id':'F110',
      'title':'Database',
      'meets':'MWF 12:00-13:50' 

    }
  ]
  
};

const Banner = ({ title }) => (
  <h1>{ title }</h1>
);
const CourseList = ({courses}) =>(
  <div>
    { courses.map(course => <Course course = {course}/>)}
  </div>
);
const terms = {F:'Fall',W:'Winter',S:'Spring'};

const getCourseTerm = course =>(
  terms[course.id.charAt(0)]
);

const getCourseNumber = course=>(
  course.id.slice(1,4)
);

const Course = ({course}) =>(
  <button>
    {getCourseTerm(course)} CS {getCourseNumber(course)}:{course.title}
   </button>
)
const App = () => (
  <div>
    <Banner title = {schedule.title}/>
    <CourseList courses={schedule.courses}/>
  </div>
);

export default App;
