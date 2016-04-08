function AppController($rootScope, $scope, uiState) {
  const vm = this;

  vm.isToggled = uiState.getState();

  $scope.$watch(function() {
    return uiState.getState();
  }, function(newVal, oldVal) {
    vm.isToggled = newVal;
  }, true);
}

export default AppController;
