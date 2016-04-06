import angular from 'angular';
import sidebarDirective from './sidebar.directive';

let sidebarModule = angular.module('sidebar', [])
.directive('sideBar', sidebarDirective);

export default sidebarModule;
