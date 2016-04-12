import angular from 'angular';
import vacanciesListController from './vacancies-list.controller';
import vacanciesListTemplate from './vacancies-list.tpl.html';

let vacanciesListModule = angular.module('vacancy.list', [])
.config(($stateProvider) => {
  "ngInject";

  $stateProvider
    .state('app.vacanciesList', {
      url: '/vacancies',
      template: vacanciesListTemplate,
      controller: 'VacancyListController',
      controllerAs: 'vm',
      data: {
        requiresLogin: true,
        pageTitle: 'Vacancies'
      },
      resolve: {
        vacancyResource: 'vacancyResource',

        vacancies(vacancyResource) {
          return vacancyResource.list();
        }
      }
    });
})
.controller('VacancyListController', vacanciesListController);

export default vacanciesListModule;
