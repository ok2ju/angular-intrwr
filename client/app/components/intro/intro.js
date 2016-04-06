import angular from 'angular';
import introTemplate from './intro.tpl.html';
import Login from './login/login';
import Signup from './signup/signup';

let introModule = angular.module('intro', [
  Login.name,
  Signup.name
])
.config(($stateProvider) => {
  "ngInject";
  
  $stateProvider
    .state('intro.landing', {
      url: '/',
      template: introTemplate,
      data: {
        pageTitle: 'Landing'
      }
    });
});

export default introModule;
