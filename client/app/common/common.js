import angular from 'angular';
import Filters from './filters/filters';
import Resources from './resources/resources';
import Services from './services/services';

let commonModule = angular.module('app.common', [
  Filters.name,
  Resources.name,
  Services.name
]);

export default commonModule;
