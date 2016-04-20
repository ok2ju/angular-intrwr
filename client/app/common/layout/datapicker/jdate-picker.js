import angular from 'angular';
import jDatePickerCountService from './jdate-picker.service';
import jMdDatepicker from './jmd-datapicker.directive';
import jMdDatepickerComponent2 from './jmd-datapicker-component2.directive';

let jdatePickerModule = angular.module('JDatePicker', ['mdThemeColors'])
.factory('JDatePickerCount', jDatePickerCountService)
.directive('jMdDatepicker', jMdDatepicker)
.directive('jMdDatepickerComponent2', jMdDatepickerComponent2);

export default jdatePickerModule;