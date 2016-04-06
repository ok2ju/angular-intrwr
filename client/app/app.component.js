import controller from './app.controller';
import template from './app.html';
import './app.scss';

let appComponent = {
  template,
  restrict: 'E',
  controller,
  controllerAs: 'appCtrl'
};

export default appComponent;
