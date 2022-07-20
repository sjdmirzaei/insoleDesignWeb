(function () {
    'use strict';

    // Orders controller
    angular
        .module('orders')
        .controller('OrdersController', OrdersController);

    OrdersController.$inject = ['$scope', '$stateParams', '$state', '$window', 'Authentication', 'orderResolve', 'patientsResolve', 'cncUsersResolve','PriceplansService','OrdersService','Notification','RecordsService'];

    function OrdersController($scope, $stateParams, $state, $window, Authentication, order, patients, cncUsers,PriceplansService,OrdersService,Notification,RecordsService) {
        var vm = this;

        //console.log($stateParams);
        Array.prototype.remove = function() {
            var what, a = arguments, L = a.length, ax;
            while (L && this.length) {
                what = a[--L];
                while ((ax = this.indexOf(what)) !== -1) {
                    this.splice(ax, 1);
                }
            }
            return this;
        };
        vm.authentication = Authentication;
        vm.order = order;
        vm.ShowCheckBox = false;
        //console.log(vm.order);
        vm.error = null;
        vm.form = {};

        vm.remove = remove;
        vm.save = save;
        vm.patients = patients;
        vm.cncUsers = cncUsers;
        //console.log(vm.cncUsers);
        vm.pay=pay;
        vm.order.records=[];
        // console.log('MNR');
      //   console.log(vm.authentication.software);
      if(vm.authentication.software == 'PT-SCANSUIT'){
        vm.order.doDesign = true;
      }else if(vm.authentication.software == 'PT-InsoleDesign'){
        vm.order.doDesign = false;
      }
        // Remove existing Order
        vm.toggleChecked=function (recordId) {

            //console.log(vm.order.records.indexOf(recordId));
            if (vm.order.records.indexOf(recordId) !=-1){
                vm.order.records.remove(recordId)
            }else{
                vm.order.records.push(recordId);
            }
            //console.log(vm.order.records);
        };

        function pay(){

                OrdersService.pay({orderId: vm.order._id, records: vm.order.records}).$promise.then(function (data) {
                    vm.error = data.message;

                    if (data.msgtype == 'error') {
                        Notification.error({message: vm.error});
                        $state.go('orders.list');
                    } else {
                        Notification.success({message: vm.error});
                        Authentication.user.credit = data.newcredit;
                        if(data.newcreditPlan)
                        Authentication.user.creditPlan = data.newcreditPlan;
                        $state.go('orders.list');
                    }
                });

        }
        vm.fillPricePlans=fillPricePlans;
        function fillPricePlans(){
          // console.log('2');
            if(vm.order.cncUser=="-1"){

                Notification.error({message: "Select Designer"});
            }
            else if (vm.order.cncUser == vm.authentication.user._id){
              Notification.error({message: "You dont have access"});
              vm.order.cncUser=-1;
              return false;
            }
            else {
                PriceplansService.findBy({user: vm.order.cncUser}).$promise.then(function (data) {
                    vm.pricePlans = data;
                })
            }
        }

        if ($stateParams.patientId != "none") {
            vm.patientId=$stateParams.patientId;
            vm.order.patient=$stateParams.patientId;
            RecordsService.findRecord({
                patient:vm.order.patient
            }).$promise.then(function (data) {
                // data.forEach(function (rec) {
                //     vm.order.records.push(rec._id);
                // });
                //console.log(vm.order.records);
                vm.records=data;
            })
        }
        function remove() {
            if ($window.confirm('Are you sure you want to delete?')) {
                vm.order.$remove($state.go('orders.list'));
            }
        }

        // Save Order
        function save(isValid) {

          //console.log(vm.order);
          //   console.log(vm.authentication.software);
          // console.log(vm.authentication.user);
          // if(vm.authentication.user.creditPlan == null ||vm.authentication.user.creditPlan === undefined){
          //     console.log('No plan found!!');
          //   Notification.error({message: "پلن اعتباری یافت نشد"});
          //   return false;
          // }else{
          //   console.log(vm.authentication.user.creditPlan);
          //
          // }
          // // console.log(vm.user.creditPlan);

          if (vm.order.cncUser==-1 && !vm.order.sendTome){
                Notification.error({message: "No Designer Selected"});
                return false;
            }

            if ((!vm.order.sendTome || vm.order.sendTome==false) && !vm.order.cncUser){
                Notification.error({message: "No Designer Selected"});
                return false;
            }
          if (vm.order.cncUser == vm.authentication.user._id){
            Notification.error({message: "You Dont Have Access"});
            return false;
          }
            if (vm.order.records.length==0){

                Notification.error({message: "No Design Selected"});
                return false;
            }
            if (!isValid) {
                $scope.$broadcast('show-errors-check-validity', 'vm.form.orderForm');
                return false;
            }

            // TODO: move create/update logic to service
            if (vm.order._id) {
                vm.order.$update(successCallback, errorCallback);
            } else {
                vm.order.$save(successCallback, errorCallback);
            }

            function successCallback(res) {
                $state.go('orders.view', {
                    orderId: res._id
                });
            }

            function errorCallback(res) {
                vm.error = res.data.message;
            }
        }
    }
}());
