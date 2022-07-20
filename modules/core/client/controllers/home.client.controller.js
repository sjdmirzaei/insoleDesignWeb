(function () {
  'use strict';

  angular
    .module('core')
    .controller('HomeController', HomeController);
    HomeController.$inject = ['OrdersService'];
  function HomeController(OrdersService) {
    var vm = this;
      Array.prototype.inArray = function(comparer) {
          for(var i=0; i < this.length; i++) {
              if(comparer(this[i])) return true;
          }
          return false;
      };

// adds an element to the array if it does not already exist using a comparer
// function
      Array.prototype.pushIfNotExist = function(element, comparer) {
          if (!this.inArray(comparer)) {
              this.push(element);
          }
      };
      vm.colors = ['#45b7cd', '#ff6384', '#ff8e72'];
      vm.data = [
          [],
          []
      ];
      vm.labels = [];
      vm.usage={usage:0,percentage:0,max:1024};

      vm.c2labels = [];
      vm.c2series = ['Paid', 'Not Paid'];

      vm.c2data = [
          []
      ];
      OrdersService.report({type: "PAYED"}).$promise.then(function (data) {
          data.forEach(function (item) {
              vm.c2data[0].push(item.cost);
              vm.c2labels.push(item._id);
              // vm.c2labels.pushIfNotExist(item._id, function(e) {
              //     return e === item._id;
              // });
          })
      });
      // OrdersService.report({type: "NOTPAYED"}).$promise.then(function (data) {
      //     data.forEach(function (item) {
      //         vm.c2data[1].push(item.count);
      //         //vm.c2labels.push(item._id);
      //         // vm.c2labels.pushIfNotExist(item._id, function(e) {
      //         //     return e === item._id;
      //         // });
      //     })
      // });
      OrdersService.report({type: "USAGE"}).$promise.then(function (data) {
          vm.usage.usage=data[0].usage;
          vm.usage.percentage=(vm.usage.usage*100)/vm.usage.max;
      });
      OrdersService.report({type: "ORDERER"}).$promise.then(function (data) {
          data.forEach(function (item) {
              vm.data[0].push(item.orders);
              vm.labels.push(item.date);
          })
      });
      OrdersService.report({type: "CNCUSER"}).$promise.then(function (data) {
          data.forEach(function (item) {
              vm.data[1].push(item.orders);

          })
      });

      vm.series = ['Set Order', 'Get Order'];

      vm.onClick = function (points, evt) {
          console.log(points, evt);
      };
      vm.datasetOverride = [{ yAxisID: 'y-axis-1' }];
      vm.options = {
          scales: {
              yAxes: [
                  {
                      id: 'y-axis-1',
                      type: 'linear',
                      display: true,
                      position: 'left'
                  }
              ]
          }
      };
  }
}());
