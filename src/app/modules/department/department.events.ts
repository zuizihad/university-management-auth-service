import { RedisClient } from '../../../shared/redis';
import {
    EVENT_ACADEMIC_DEPARTMENT_CREATED,
    EVENT_ACADEMIC_DEPARTMENT_DELETED,
    EVENT_ACADEMIC_DEPARTMENT_UPDATED
} from './department.constants';
import {
    AcademicDepartmentCreatedEvent,
    AcademicDepartmentDeletedEvent,
    AcademicDepartmentUpdatedEvent
} from './department.interface';
import { DepartmentService } from './department.service';

const initAcademicDepartmentEvents = () => {
    RedisClient.subscribe(EVENT_ACADEMIC_DEPARTMENT_CREATED, async (e: string) => {
        const data: AcademicDepartmentCreatedEvent = JSON.parse(e);

        await DepartmentService.insertIntoDBFromEvent(data);
    });

    RedisClient.subscribe(EVENT_ACADEMIC_DEPARTMENT_UPDATED, async (e: string) => {
        const data: AcademicDepartmentUpdatedEvent = JSON.parse(e);

        await DepartmentService.updateOneInDBFromEvent(data);
    });

    RedisClient.subscribe(EVENT_ACADEMIC_DEPARTMENT_DELETED, async (e: string) => {
        const data: AcademicDepartmentDeletedEvent = JSON.parse(e);

        await DepartmentService.deleteOneFromDBFromEvent(data.id);
    });
};

export default initAcademicDepartmentEvents;