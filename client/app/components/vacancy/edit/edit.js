import angular from 'angular';
import vacancyEditController from './edit.controller';
import vacancyEditModalController from './modal.controller';
import editVacancyTemplate from './edit.tpl.html';

let editVacancyModule = angular.module('vacancy.edit', [])
.config(($stateProvider) => {
  "ngInject";

  $stateProvider
    .state('app.vacanciesEdit', {
      url: '/vacancies/:id/edit',
      template: editVacancyTemplate,
      controller: 'VacancyEditController',
      controllerAs: 'vm',
      data: {
        requiresLogin: true,
        pageTitle: 'Edit Vacancy'
      },
      resolve: {
        vacancyResource: 'vacancyResource',

        vacancy(vacancyResource, $stateParams) {
          return vacancyResource.one($stateParams.id);
        }
      }
    });
})
.controller('VacancyEditController', vacancyEditController)
.controller('VacancyEditModalController', vacancyEditModalController);

export default editVacancyModule;
