import controller from './company-card.controller';
import template from './company-card.tpl.html';

let companyCardComponent = {
  restrict: 'E',
  bindings: {
    company: '<',
    editable: '<'
  },
  template,
  controller,
  controllerAs: 'vm'
};

export default companyCardComponent;
