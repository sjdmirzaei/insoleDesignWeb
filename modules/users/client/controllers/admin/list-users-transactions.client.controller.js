(function () {
    'use strict';

  angular
    .module('users.admin')
    .controller('UserTransactionsListController', UserTransactionsListController);

  UserTransactionsListController.$inject = ['$scope', '$filter', '$state', '$window', 'AdminService','Notification'];

  function UserTransactionsListController($scope, $filter, $state, $window, AdminService,Notification) {
    console.log('open transaction page');
    var vm = this;
    vm.buildPager = buildPager;
    vm.figureOutItemsToDisplay = figureOutItemsToDisplay;
    vm.pageChanged = pageChanged;
    vm.removeComplete = removeComplete;
    vm.downloadComplete = downloadComplete;
    refreshData();
    function refreshData(){
      console.log('refresh list');
      AdminService.usersTransactions(function (data) {
        console.log(data);
        vm.users = data;
        vm.buildPager();
      });
    }

    function downloadComplete(pathName){
        AdminService.completeDownload(pathName).$promise.then(function (data) {
          console.log("download");
          // vm.error = data.message;
          // Notification.success({message: data.message});
          if (data.msgtype == 'error') {
            Notification.error({message: data.message});
          } else {
            Notification.success({message: data.message});
          }
          refreshData();
          $state.go('admin.usersTransactions');
        }).catch(function(err){
          Notification.error({message: 'Error'});
          refreshData();
          $state.go('admin.usersTransactions');
        });
      //refreshData();
    }
    function removeComplete(pathName){
      console.log(pathName);
      if ($window.confirm('Are you sure you want to delete?'))
      AdminService.completeDelete(pathName).$promise.then(function (data) {
        console.log(pathName);
        // vm.error = data.message;
        // Notification.success({message: data.message});
        if (data.msgtype == 'error') {
          Notification.error({message: data.message});
        } else {
          Notification.success({message: data.message});
        }
        refreshData();
        $state.go('admin.usersTransactions');
      }).catch(function(err){
        Notification.error({message: 'Error'});
        refreshData();
        $state.go('admin.usersTransactions');
      });
      //refreshData();
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
