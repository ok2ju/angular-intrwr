import angular from 'angular';
import Filters from './filters/filters';
import Resources from './resources/resources';
import Services from './services/services';
import Layout from './layout/layout';

let commonModule = angular.module('app.common', [
  Filters.name,
  Resources.name,
  Services.name,
  Layout.name
]);

export default commonModule;
