import angular from 'angular';
import 'angular-ui-router';
import Common from './common/common';
import Components from './components/components';
import AppComponent from './app.component';
import entryTemplate from './entry.tpl.html';
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
        template: entryTemplate
      })
      .state('app', {
        abstract: true,
        template: mainTemplate
      });
  })
  .run(() => {
    "ngInject";

  })

  .component('app', AppComponent);
