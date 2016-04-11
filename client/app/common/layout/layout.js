import angular from 'angular';
import Header from './header/header';
import Sidebar from './sidebar/sidebar';
import MainArea from './mainArea/mainArea';
import CompanyCard from './companyCard/company-card';

let layoutModule = angular.module('layout', [
  Header.name,
  Sidebar.name,
  MainArea.name,
  CompanyCard.name
]);

export default layoutModule;
