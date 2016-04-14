import angular from 'angular';
import Intro from './intro/intro';
import User from './user/user';
import Company from './company/company';
import Vacancy from './vacancy/vacancy';
import Interview from './interview/interview';

let componentModule = angular.module('app.components', [
  Intro.name,
  User.name,
  Company.name,
  Vacancy.name,
  Interview.name
]);

export default componentModule;
