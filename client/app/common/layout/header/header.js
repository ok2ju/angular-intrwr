import angular from 'angular';
import headerDirective from './header.directive';
import clickAnywhereButHereDirective from './clickAnywhere.directive';

let headerModule = angular.module('header', [])
.directive('headerNav', headerDirective)
.directive('clickAnywhereButHere', clickAnywhereButHereDirective);

export default headerModule;
