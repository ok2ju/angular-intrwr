import angular from 'angular';
import headerComponent from './header.component';
import clickAnywhereButHereDirective from './clickAnywhere.directive';

let headerModule = angular.module('header', [])
.component('headerNav', headerComponent)
.directive('clickAnywhereButHere', clickAnywhereButHereDirective);

export default headerModule;
