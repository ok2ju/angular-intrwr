import angular from 'angular';
import createCompanyController from './create-company.controller';
import companyModalController from './modal.controller';
import createCompanyTemplate from './create-company.tpl.html';

let createCompanyModule = angular.module('company.create', [])
.config(($stateProvider) => {
  "ngInject";

  $stateProvider
   .state('app.createCompany', {
      url: '/company/create',
      template: createCompanyTemplate,
      controller: 'CreateCompanyController',
      controllerAs: 'vm',
      data: {
        requiresLogin: true,
        pageTitle: 'Create Company'
      }
    });
})
.controller('CreateCompanyController', createCompanyController)
.controller('CompanyModalController', companyModalController);

export default createCompanyModule;
