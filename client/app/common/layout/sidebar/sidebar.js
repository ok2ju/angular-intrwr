import angular from 'angular';
import sidebarComponent from './sidebar.component';

let sidebarModule = angular.module('sidebar', [])
.component('sideBar', sidebarComponent);

export default sidebarModule;
