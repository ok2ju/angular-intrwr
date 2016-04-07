import controller from './sidebar.controller';
import template from './sidebar.tpl.html';

let sidebarComponent = {
  restrict: 'E',
  bindings: {},
  template,
  controller,
  controllerAs: 'vm'
};

export default sidebarComponent;
