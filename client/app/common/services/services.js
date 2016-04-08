import angular from 'angular';
import 'restangular';
import {Vendor} from './vendor.service';
import {ImageService} from './image.service';
import {AuthService} from './auth.service';
import {ClickanywhereService} from './clickanywhere.service';
import {OpenRequestedPopupService} from './openconfpopup.service';
import UIState from './uiState.service';
import NotificationService from './notification.service';

let servicesModule = angular.module('services', ['restangular'])
.factory('imageService', ImageService)
.factory('Vendor', Vendor)
.factory('authService', AuthService)
.factory('clickAnywhereService', ClickanywhereService)
.factory('openRequestedPopupService', OpenRequestedPopupService)
.factory('uiState', UIState)
.factory('notificationService', NotificationService);

export default servicesModule;
