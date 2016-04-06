import angular from 'angular';
import Header from './header/header';
import Sidebar from './sidebar/sidebar';

let layoutModule = angular.module('layout', [
  Header.name,
  Sidebar.name
]);

export default layoutModule;
