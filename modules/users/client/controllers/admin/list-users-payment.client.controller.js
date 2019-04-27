(function () {
    'use strict';

  angular
    .module('users.admin')
    .controller('UserPaymentsListController', UserPaymentsListController);

  UserPaymentsListController.$inject = ['$scope', '$filter', '$state', '$window', 'AdminService','Notification'];

  function UserPaymentsListController($scope, $filter, $state, $window, AdminService,Notification) {
    console.log('open payment page');
    var vm = this;
    vm.buildPager = buildPager;
    vm.figureOutItemsToDisplay = figureOutItemsToDisplay;
    vm.pageChanged = pageChanged;
    refreshData();
    function refreshData(){
      console.log('refresh list');
      AdminService.usersPayments(function (data) {
        console.log(data);
        vm.users = data;
        vm.buildPager();
      });
    }

    function buildPager() {
      vm.pagedItems = [];
      vm.itemsPerPage = 15;
      vm.currentPage = 1;
      vm.figureOutItemsToDisplay();
    }

    function figureOutItemsToDisplay() {
      vm.filteredItems = $filter('filter')(vm.users, {
        $: vm.search
      });
      vm.filterLength = vm.filteredItems.length;
      var begin = ((vm.currentPage - 1) * vm.itemsPerPage);
      var end = begin + vm.itemsPerPage;
      vm.pagedItems = vm.filteredItems.slice(begin, end);
    }

    function pageChanged() {
      vm.figureOutItemsToDisplay();
    }
  }
}());
