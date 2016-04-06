import angular from 'angular';
import mainAreaDirective from './mainArea.directive';

let mainAreaModule = angular.module('mainArea', [])
.directive('mainArea', mainAreaDirective);

export default mainAreaModule;
