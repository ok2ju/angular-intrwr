import angular from 'angular';
import Intro from './intro/intro';

let componentModule = angular.module('app.components', [
  Intro.name
]);

export default componentModule;
