import controller from './sidebar.controller';
import sidebarTemplate from './sidebar.tpl.html';

function SidebarDirective(config) {
  return {
    restrict: 'EA',
    scope: {
        info: '='
    },
    template: sidebarTemplate,
    controller,
    controllerAs: 'vm',
    bindToController: true
  };
}

export default SidebarDirective;
