import controller from './header.controller';
import template from './header.tpl.html';

let headerComponent = {
  restrict: 'E',
  bindings: {
    user: '<'
  },
  template,
  controller,
  controllerAs: 'vm'
};

export default headerComponent;
