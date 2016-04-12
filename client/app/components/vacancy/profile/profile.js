import angular from 'angular';
import vacancyProfileController from './vacancy-profile.controller';
import vacancyProfileTemplate from './vacancy-profile.tpl.html';

let vacancyProfileModule = angular.module('vacancy.profile', [])
.config(($stateProvider) => {
  "ngInject";

  $stateProvider
    .state('app.vacanciesProfile', {
      url: '/vacancies/:id',
      template: vacancyProfileTemplate,
      controller: 'VacancyProfileController',
      controllerAs: 'vm',
      data: {
        requiresLogin: true,
        pageTitle: 'Vacancy'
      },
      resolve: {
        vacancyResource: 'vacancyResource',
        subscriptionResource: 'subscriptionResource',

        vacancy(vacancyResource, $stateParams) {
          return vacancyResource.one($stateParams.id);
        },

        subscriptions(subscriptionResource, $stateParams) {
          return subscriptionResource.list({vacancy: $stateParams.id});
        }
      }
    });
})
.controller('VacancyProfileController', vacancyProfileController);

export default vacancyProfileModule;
