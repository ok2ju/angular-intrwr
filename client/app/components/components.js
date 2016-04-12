import angular from 'angular';
import Intro from './intro/intro';
import User from './user/user';
import Company from './company/company';
import Vacancy from './vacancy/vacancy';

let componentModule = angular.module('app.components', [
  Intro.name,
  User.name,
  Company.name,
  Vacancy.name
]);

export default componentModule;
