function NotificationService($mdToast) {
  function showNotification(msg) {
    $mdToast.show({
      hideDelay: 3000,
      position: 'bottom right',
      controller: function($mdToast) {
        const vm = this;
        
        vm.closeToast = function() {
          $mdToast.hide();
        };
      },
      controllerAs: 'vm',
      template: `
        <md-toast>
          <span class="md-toast-text" flex>${msg}</span>
          <md-button ng-click="vm.closeToast()">
            Close
          </md-button>
        </md-toast>
      `
    });
  }

  return {
    showNotification: showNotification
  };
}

export default NotificationService;
