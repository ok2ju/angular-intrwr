import controller from './vacancy-card.controller';
import template from './vacancy-card.tpl.html';

let vacancyCardComponent = {
  restrict: 'E',
  bindings: {
    vacancy: '<',
    withFollow: '<',
    editable: '<',
    withCandidates: '<'
  },
  template,
  controller,
  controllerAs: 'vm'
};

export default vacancyCardComponent;
