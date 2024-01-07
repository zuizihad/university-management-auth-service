import initAcademicDepartmentEvents from '../modules/department/department.events';
import initAcademicFacultyEvents from '../modules/faculty/faculty.events';
import initAcademicSemesterEvents from '../modules/semester/semester.event'

const subscribeToEvents = () => {
  initAcademicSemesterEvents();
  initAcademicDepartmentEvents();
  initAcademicFacultyEvents();
}

export default subscribeToEvents
