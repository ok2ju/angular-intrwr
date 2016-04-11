import angular from 'angular';
import Intro from './intro/intro';
import User from './user/user';
import Company from './company/company';

let componentModule = angular.module('app.components', [
  Intro.name,
  User.name,
  Company.name
]);

export default componentModule;
