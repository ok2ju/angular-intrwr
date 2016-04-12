import angular from 'angular';
import mainAreaComponent from './mainArea.component';

let mainAreaModule = angular.module('mainArea', [])
.component('mainArea', mainAreaComponent);

export default mainAreaModule;
