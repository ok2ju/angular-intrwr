import angular from 'angular';
import 'angular-ui-router';
import Common from './common/common';
import Components from './components/components';
import AppComponent from './app.component';
import introTemplate from './intro.tpl.html';
import mainTemplate from './main.tpl.html';

angular.module('app', [
    'ui.router',
    Common.name,
    Components.name
  ])
  .config(($locationProvider, $stateProvider, $urlRouterProvider) => {
    "ngInject";

    $urlRouterProvider.otherwise('/');
    $locationProvider.html5Mode(true).hashPrefix('!');

    $stateProvider
      .state('intro', {
        abstract: true,
        template: introTemplate
      })
      .state('app', {
        abstract: true,
        template: mainTemplate
      });
  })
  .run(($rootScope, $state) => {
    "ngInject";

  })

  .component('app', AppComponent);
