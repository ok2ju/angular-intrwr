import angular from 'angular';
import Profile from './profile/profile';
import Settings from './settings/settings';

let userModule = angular.module('user', [
  Profile.name,
  Settings.name
]);

export default userModule;
