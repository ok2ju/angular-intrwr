import angular from 'angular';
import VacanciesList from './list/list';
import VacancyProfile from './profile/profile';
import ManageVacancies from './manage/manage';

let vacancyModule = angular.module('vacancy', [
  VacanciesList.name,
  VacancyProfile.name,
  ManageVacancies.name
]);

export default vacancyModule;
