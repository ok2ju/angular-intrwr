import angular from 'angular';
import createVacancyController from './create.controller';
import createVacancyTemplate from './create.tpl.html';

let createVacancyModule = angular.module('vacancy.create', [])
.config(($stateProvider) => {
  "ngInject";

  $stateProvider
    .state('app.vacanciesCreate', {
      url: '/vacancy/create',
      template: createVacancyTemplate,
      controller: 'VacancyCreateController',
      controllerAs: 'vm',
      data: {
        requiresLogin: true,
        pageTitle: 'Create Vacancy'
      },
      resolve: {
        companyResource: 'companyResource',

        companies(myself, companyResource) {
          return companyResource.list({owner: myself._id});
        }
      }
    });
})
.controller('VacancyCreateController', createVacancyController);

export default createVacancyModule;
