import angular from 'angular';
import editCompanyController from './edit-company.controller';
import editCompanyModalController from './edit-modal.controller';
import photoModalController from './photo-modal.controller';
import editCompanyTemplate from './edit-company.tpl.html';

let editCompanyModule = angular.module('company.edit', [])
.config(($stateProvider) => {
  "ngInject";

  $stateProvider
    .state('app.editCompany', {
      url: '/company/:id/edit',
      template: editCompanyTemplate,
      controller: 'EditCompanyController',
      controllerAs: 'vm',
      data: {
        requiresLogin: true,
        pageTitle: 'Edit Company'
      }
    });
})
.controller('EditCompanyController', editCompanyController)
.controller('EditCompanyModalController', editCompanyModalController)
.controller('CompanyPhotoModalController', photoModalController);

export default editCompanyModule;
