import initAcademicDepartmentEvents from '../modules/academicDepartment/department.events'
import initAcademicFacultyEvents from '../modules/academicFaculty/faculty.events'
import initAcademicSemesterEvents from '../modules/academicSemester/semester.event'

const subscribeToEvents = () => {
  initAcademicSemesterEvents()
  initAcademicDepartmentEvents()
  initAcademicFacultyEvents()
}

export default subscribeToEvents
