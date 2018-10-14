(function () {
  'use strict';

  // Usercredits controller
  angular
    .module('usercredits')
    .controller('UsercreditsController', UsercreditsController);

  UsercreditsController.$inject = ['$scope', '$state', '$window', 'Authentication', 'usercreditResolve','creditPlansResolver','gcodePlansResolver','paymentService'];
  // var mongoose = require('mongoose');
  //
  //  var User = mongoose.model('User');
  function UsercreditsController ($scope, $state, $window, Authentication, usercredit,creditPlansResolver,gcodePlansResolver,paymentService) {
    var vm = this;

    vm.authentication = Authentication;
    vm.usercredit = usercredit;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;
    vm.PaymentRequest=PaymentRequest;
    //vm.addCredit = addCredit;

    vm.creditplans=creditPlansResolver;
    vm.gcodeplans=gcodePlansResolver;

    // Remove existing Usercredit
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.usercredit.$remove($state.go('usercredits.list'));
      }
    }
    // function addCredit(plan){
    //   console.log("In MNR!!");
    //   paymentService.create(plan).$promise.then(function (response) {
    //     alert(response.url);
    //     $window.open(response.url,'_blank');
    //     console.log(response);
    //   })
    //       // //Transaction.findOneAndUpdate({authority: req.session.authority}, {$set: {RefID: response.RefID}}, function (err, doc) {
    //       //
    //       //   var creditPlan = {
    //       //     expire: plan.expire,
    //       //     host: plan.host,
    //       //     totalorder: plan.totalorder,
    //       //     price: plan.price
    //       //   };
    //       //
    //       //   User.findOneAndUpdate({_id:  vm.authentication.user._id}, {
    //       //     //$inc: {credit: req.session.amount},
    //       //     $set: {
    //       //       creditPlan: creditPlan,
    //       //       expireCreditDate: moment(moment(), "DD-MM-YYYY").add(vm.session.expire, 'days')
    //       //     }
    //       //
    //       //   }, function (err, doc) {
    //       //     User.findOne({_id: vm.user._id}, function (err, doc) {
    //       //       res.render('modules/core/server/views/index', {
    //       //         response: JSON.stringify(response),
    //       //         user: JSON.stringify(doc),
    //       //         software: 'PT-SCANSUIT',//req.session.software,
    //       //         sharedConfig: JSON.stringify(config.shared)
    //       //       });
    //       //     });
    //       //   })
    //       // //})
    // }
    //
    function PaymentRequest(plan){
          paymentService.create(plan).$promise.then(function (response) {
            alert(response.url);
              $window.open(response.url,'_blank');
              console.log(response);
          })
      }
    // Save Usercredit
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.usercreditForm');
        return false;
      }

      // TODO: move create/update logic to service
      if (vm.usercredit._id) {
        vm.usercredit.$update(successCallback, errorCallback);
      } else {
        vm.usercredit.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('usercredits.list', {
          usercreditId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
}());
