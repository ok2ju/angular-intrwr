import angular from 'angular';
import Header from './header/header';
import Sidebar from './sidebar/sidebar';
import MainArea from './main-area/mainArea';
import CompanyCard from './company-card/company-card';
import VacancyCard from './vacancy-card/vacancy-card';
import Datapicker from './datapicker/datapicker';

let layoutModule = angular.module('layout', [
  Header.name,
  Sidebar.name,
  MainArea.name,
  CompanyCard.name,
  VacancyCard.name,
  Datapicker.name
]);

export default layoutModule;
