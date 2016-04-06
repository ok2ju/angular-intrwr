import angular from 'angular';
import settingsController from './settings.controller';
import modalController from './modal.controller';
import settingsTemplate from './settings.tpl.html';
import generalSettingsTemplate from './tabs/general.tpl.html';
import experienceSettingsTemplate from './tabs/experience.tpl.html';

let settingsModule = angular.module('settings', [])
.config(($stateProvider) => {
  "ngInject";

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
      template: generalSettingsTemplate
    })
    .state('app.userSettings.experience', {
      url: '/experience',
      template: experienceSettingsTemplate
    });
})
.controller('UserSettingsController', settingsController)
.controller('ModalInstanceController', modalController);

export default settingsModule;
