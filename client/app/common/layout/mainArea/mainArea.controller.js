function MainAreaController($scope) {
  const vm = this;

  $scope.$on('sidebarToggleEvent', (event, data) => {
    vm.isToggled = data.isToggled;
  });
}

export default MainAreaController;
