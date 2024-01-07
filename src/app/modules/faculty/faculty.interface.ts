import { Model } from 'mongoose'

export type IFaculty = {
  title: string
  syncId: string
}

export type IFacultyFilters = {
  searchTerm?: string
}

export type FacultyModel = Model<IFaculty>

export type AcademicFacultyCreatedEvent = {
  id: string;
  title: string;
};

export type AcademicFacultyUpdatedEvent = {
  id: string;
  title: string;
};

export type AcademicFacultyDeletedEvent = {
  id: string;
};
