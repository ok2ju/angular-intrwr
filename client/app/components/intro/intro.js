import angular from 'angular';
import introTemplate from './intro.tpl.html';

let introModule = angular.module('intro', [])
.config(($stateProvider) => {
  $stateProvider
    .state('intro.landing', {
      url: '/',
      template: introTemplate
    });
});

export default introModule;
