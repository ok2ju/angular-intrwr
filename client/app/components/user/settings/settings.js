import angular from 'angular';
import 'ng-file-upload';
import settingsController from './settings.controller';
import modalController from './modal.controller';
import settingsTemplate from './settings.tpl.html';
import generalSettingsTemplate from './tabs/general.tpl.html';
import experienceSettingsTemplate from './tabs/experience.tpl.html';

let settingsModule = angular.module('settings', ['ngFileUpload'])
.config(($stateProvider, $urlRouterProvider) => {
  "ngInject";
  
  $urlRouterProvider.when('/settings', '/settings/general');
  
  $stateProvider
    .state('app.userSettings', {
      abstract: true,
      url: '/settings',
      template: settingsTemplate,
      controller: 'UserSettingsController',
      controllerAs: 'vm',
      data: {
        requiresLogin: true,
        pageTitle: 'Settings'
      }
    })
    .state('app.userSettings.general', {
      url: '/general',
      template: generalSettingsTemplate,
      data: {
        requiresLogin: true,
        pageTitle: 'General'
      }
    })
    .state('app.userSettings.experience', {
      url: '/experience',
      template: experienceSettingsTemplate,
      data: {
        requiresLogin: true,
        pageTitle: 'Experience'
      }
    });
})
.controller('UserSettingsController', settingsController)
.controller('ModalInstanceController', modalController);

export default settingsModule;
