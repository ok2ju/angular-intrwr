import angular from 'angular';
import CompaniesList from './list/list';
import CreateCompany from './create/create';
import ManageCompany from './manage/manage';
import CompanyProfile from './profile/profile';

let companyModule = angular.module('company', [
  CompaniesList.name,
  CreateCompany.name,
  ManageCompany.name,
  CompanyProfile.name
]);

export default companyModule;
