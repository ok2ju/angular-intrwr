import angular from 'angular';
import Header from './header/header';
import Sidebar from './sidebar/sidebar';
import MainArea from './mainArea/mainArea';

let layoutModule = angular.module('layout', [
  Header.name,
  Sidebar.name,
  MainArea.name
]);

export default layoutModule;
