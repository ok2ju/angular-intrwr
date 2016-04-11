import angular from 'angular';
import CompaniesList from './list/list';
import CreateCompany from './create/create';

let companyModule = angular.module('company', [
  CompaniesList.name,
  CreateCompany.name
]);

export default companyModule;
