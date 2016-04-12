import angular from 'angular';
import VacanciesList from './list/list';
import VacancyProfile from './profile/profile';

let vacancyModule = angular.module('vacancy', [
  VacanciesList.name,
  VacancyProfile.name
]);

export default vacancyModule;
