import angular from 'angular';
import dateFilter from './date.filter';
import fromNowFilter from './fromNow.filter';

let filtersModule = angular.module('filters', [])
.filter('moment', dateFilter)
.filter('fromNow', fromNowFilter);

export default filtersModule;
