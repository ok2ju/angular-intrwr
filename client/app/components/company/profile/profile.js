import angular from 'angular';
import companyProfileController from './company-profile.controller';
import companyProfileTemplate from './company-profile.tpl.html';
import companyCommentsTemplate from './comments.tpl.html';
import companyVacanciesTemplate from './vacancies.tpl.html';

let companyProfileModule = angular.module('company.profile', [])
.config(($stateProvider) => {
  "ngInject";

  $stateProvider
    .state('app.companyProfile', {
      url: '/companies/:id/view',
      template: companyProfileTemplate,
      controller: 'CompanyProfileController',
      controllerAs: 'vm',
      data: {
        requiresLogin: true,
        pageTitle: 'Company'
      },
      resolve: {
        companyResource: 'companyResource',
        vacancyResource: 'vacancyResource',

        company(companyResource, $stateParams) {
          return companyResource.one($stateParams.id);
        },

        vacancies(vacancyResource, $stateParams) {
          return vacancyResource.list({company_id: $stateParams.id});
        },

        comments(companyResource, $stateParams) {
          return companyResource.comments($stateParams.id);
        }
      },
      redirectTo: 'app.companyProfile.vacancies'
    })
    .state('app.companyProfile.vacancies', {
      url: '',
      template: companyVacanciesTemplate,
    })
    .state('app.companyProfile.comments', {
      template: companyCommentsTemplate,
    });
})
.controller('CompanyProfileController', companyProfileController);

export default companyProfileModule;
