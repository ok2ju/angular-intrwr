import controller from './mainArea.controller';
import mainAreaTemplate from './mainArea.tpl.html';

function MainAreaDirective(config) {
  return {
    restrict: 'E',
    template: mainAreaTemplate,
    controller,
    controllerAs: 'vm'
  };
}

export default MainAreaDirective;
