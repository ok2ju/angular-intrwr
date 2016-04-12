import angular from 'angular';
import manageVacanciesController from './manage.controller';
import manageVacanciesListController  from './manage-vacancies.controller';
import manageVacanciesTemplate from './manage-vacancies.tpl.html';
import manageCompaniesListTemplate from './manage-companies-list.tpl.html';
import manageVacanciesListTemplate from './manage-vacancies-list.tpl.html';

let manageVacanciesModule = angular.module('vacancy.manage', [])
.config(($stateProvider) => {
  "ngInject";

  $stateProvider
    .state('app.vacanciesManage', {
      abstract: true,
      url: '/manage/vacancies',
      template: manageVacanciesTemplate,
      data: {
        requiresLogin: true,
        pageTitle: 'Manage Vacancies'
      }
    })
    .state('app.vacanciesManage.companies', {
      url: '/',
      template: manageCompaniesListTemplate,
      controller: 'ManageVacanciesController',
      controllerAs: 'vm',
      resolve: {
        companyResource: 'companyResource',

        companies(companyResource, myself) {
          return companyResource.list({owner: myself._id});
        }
      }
    })
    .state('app.vacanciesManage.vacancies', {
      url: '?company_id',
      template: manageVacanciesListTemplate,
      controller: 'ManageVacanciesListController',
      controllerAs: 'vm',
      resolve: {
        vacancyResource: 'vacancyResource',

        vacancies(vacancyResource, $stateParams) {
          return vacancyResource.list({company_id: $stateParams.company_id});
        }
      }
    });
})
.controller('ManageVacanciesController', manageVacanciesController)
.controller('ManageVacanciesListController', manageVacanciesListController);

export default manageVacanciesModule;
