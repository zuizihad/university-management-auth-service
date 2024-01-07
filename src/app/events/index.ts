import initAcademicDepartmentEvents from '../modules/department/department.events';
import initAcademicSemesterEvents from '../modules/semester/semester.event'

const subscribeToEvents = () => {
  initAcademicSemesterEvents();
  initAcademicDepartmentEvents();
}

export default subscribeToEvents
