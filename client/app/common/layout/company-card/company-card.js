import angular from 'angular';
import companyCardComponent from './company-card.component';

let companyCardModule = angular.module('companyCard', [])
.component('companyCard', companyCardComponent);

export default companyCardModule;

