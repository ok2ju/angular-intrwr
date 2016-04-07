import controller from './mainArea.controller';
import template from './mainArea.tpl.html';

let mainAreaComponent = {
  restrict: 'E',
  template,
  controller,
  controllerAs: 'vm'
};

export default mainAreaComponent;
