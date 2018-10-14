(function () {
  'use strict';

  angular
    .module('core')
    .controller('HeaderController', HeaderController);
  app.constant("moment", moment);

  HeaderController.$inject = ['$scope', '$state', 'Authentication', 'menuService'];

  function HeaderController($scope, $state, Authentication, menuService) {
    var vm = this;
    //var moment = require('moment');
    vm.accountMenu = menuService.getMenu('account').items[0];
    vm.authentication = Authentication;
    if(vm.authentication.user.creditPlan)
    vm.remainingDate = vm.authentication.user.creditPlan.created.startOf(moment()).fromNow();
    vm.isCollapsed = false;
    vm.menu = menuService.getMenu('topbar');

    $scope.$on('$stateChangeSuccess', stateChangeSuccess);

    function stateChangeSuccess() {
      // Collapsing the menu after navigation
      vm.isCollapsed = false;
    }
  }
}());
