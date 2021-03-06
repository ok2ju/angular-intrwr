import angular from 'angular';
import profileController from './profile.controller';
import profileTemplate from './profile.tpl.html';

let profileModule = angular.module('profile', [])
.config(($stateProvider) => {
  "ngInject";

  $stateProvider
    .state('app.userProfile', {
      url: '/user/:id/profile',
      template: profileTemplate,
      controller: 'UserProfileController',
      controllerAs: 'vm',
      data: {
        requiresLogin: true,
        pageTitle: 'Profile'
      },
      resolve: {
        userResource: 'userResource',

        user(userResource, $stateParams) {
          return userResource.one($stateParams.id);
        }
      }
    });
})
.controller('UserProfileController', profileController);

export default profileModule;
