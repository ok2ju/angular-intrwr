import angular from 'angular';
import vacancyCardComponent from './vacancy-card.component';

let vacancyCardModule = angular.module('', [])
.component('vacancyCard', vacancyCardComponent);

export default vacancyCardModule;
