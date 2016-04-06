import angular from 'angular';
import signupController from './signup.controller';
import repeatPassword from './repeatPass.directive';
import signupTemplate from './signup.tpl.html';

let signupModule = angular.module('signup', [])
.config(($stateProvider) => {
  "ngInject";

  $stateProvider
    .state('intro.signup', {
      url: '/signup',
      template: signupTemplate,
      controller: 'SignupController',
      controllerAs: 'vm',
      data: {
        pageTitle: 'SignUp'
      }
    });
})
.directive('repeatPassword', repeatPassword)
.controller('SignupController', signupController);

export default signupModule;
