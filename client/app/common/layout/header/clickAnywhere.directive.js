function clickAnywhereButHereDirective($document, clickAnywhereService) {
  return {
    restrict: 'A',
    link: function(scope, elem, attr, ctrl) {
      var handler = function(e) {
        e.stopPropagation();
      };

      elem.on('click', handler);

      scope.$on('$destroy', function(){
        elem.off('click', handler);
      });

      clickAnywhereService(scope, attr.clickAnywhereButHere);
    }
  };
}

export default clickAnywhereButHereDirective;
