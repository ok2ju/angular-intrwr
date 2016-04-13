import angular from 'angular';
import VacanciesList from './list/list';
import VacancyProfile from './profile/profile';
import ManageVacancies from './manage/manage';
import CreateVacancy from './create/create';
import EditVacancy from './edit/edit';

let vacancyModule = angular.module('vacancy', [
  VacanciesList.name,
  VacancyProfile.name,
  ManageVacancies.name,
  CreateVacancy.name,
  EditVacancy.name
]);

export default vacancyModule;
