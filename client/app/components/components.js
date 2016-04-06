import angular from 'angular';
import Intro from './intro/intro';
import User from './user/user';

let componentModule = angular.module('app.components', [
  Intro.name,
  User.name
]);

export default componentModule;
