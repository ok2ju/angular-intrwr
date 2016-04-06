import angular from 'angular';
import loginController from './login.controller';
import loginTemplate from './login.tpl.html';

let loginModule = angular.module('login', [])
.config(($stateProvider) => {
  "ngInject";

  $stateProvider
    .state('intro.login', {
      url: '/login',
      template: loginTemplate,
      controller: 'LoginController',
      controllerAs: 'vm',
      data: {
        pageTitle: 'Login'
      }
    });
})
.controller('LoginController', loginController);

export default loginModule;
