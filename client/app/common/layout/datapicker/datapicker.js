import angular from 'angular';
import ThemeColors from './theme-colors';
import JDataPicker from './jdate-picker';

let datapickerModule = angular.module('datapicker', [
  ThemeColors.name,
  JDataPicker.name
]);

export default datapickerModule;