import controller from './header.controller';
import headerTemplate from './header.tpl.html';

function HeaderDirective(config) {
  return {
    restrict: 'E',
    scope: {
      'user': '='
    },
    transclude: true,
    template: headerTemplate,
    controller,
    controllerAs: 'vm',
    bindToController: true
  };
}

export default HeaderDirective;
