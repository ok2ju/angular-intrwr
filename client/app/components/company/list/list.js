import angular from 'angular';
import companiesListController from './companies-list.controller';
import companiesListTemplate from './companies-list.tpl.html';

let companyListModule = angular.module('company.list', [])
.config(($stateProvider) => {
  "ngInject";

  $stateProvider
    .state('app.companies', {
      url: '/companies',
      template: companiesListTemplate,
      controller: 'CompaniesListController',
      controllerAs: 'vm',
      data: {
        requiresLogin: true,
        pageTitle: 'Companies'
      },
      resolve: {
        companyResource: 'companyResource',

        companies(companyResource) {
          return companyResource.list();
        }
      }
    });
})
.controller('CompaniesListController', companiesListController);

export default companyListModule;
