import { RedisClient } from '../../../shared/redis'
import {
  EVENT_ACADEMIC_SEMESTER_CREATED,
  EVENT_ACADEMIC_SEMESTER_DELETED,
  EVENT_ACADEMIC_SEMESTER_UPDATED,
} from './semester.constant'
import { IAcademicSemesterCreatedEvent } from './semester.interface'
import { SemesterService } from './semester.service'

const initAcademicSemesterEvents = () => {
  RedisClient.subscribe(EVENT_ACADEMIC_SEMESTER_CREATED, async (e: string) => {
    const data: IAcademicSemesterCreatedEvent = JSON.parse(e)
    await SemesterService.createSemesterFromEvent(data)
  })

  RedisClient.subscribe(EVENT_ACADEMIC_SEMESTER_UPDATED, async (e: string) => {
    const data: IAcademicSemesterCreatedEvent = JSON.parse(e)
    await SemesterService.updateSemesterFromEvent(data)
  })

  RedisClient.subscribe(EVENT_ACADEMIC_SEMESTER_DELETED, async (e: string) => {
    const data: IAcademicSemesterCreatedEvent = JSON.parse(e)
    await SemesterService.deleteSemesterFromEvent(data)
  })
}

export default initAcademicSemesterEvents
