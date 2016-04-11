import angular from 'angular';
import manageCompanyController from './manage.controller';
import manageCompanyTemplate from './manage-company.tpl.html';

let manageCompanyModule = angular.module('company.manage', [])
.config(($stateProvider) => {
  "ngInject";

  $stateProvider
    .state('app.manageCompany', {
      url: '/company/manage',
      template: manageCompanyTemplate,
      controller: 'ManageCompanyController',
      controllerAs: 'vm',
      data: {
        requiresLogin: true,
        pageTitle: 'Manage Company'
      },
      resolve: {
        companyResource: 'companyResource',

        companies(companyResource, myself) {
          return companyResource.list({owner: myself._id});
        }
      }
    });
})
.controller('ManageCompanyController', manageCompanyController);

export default manageCompanyModule;
