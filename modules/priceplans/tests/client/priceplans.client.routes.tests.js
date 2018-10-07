(function () {
  'use strict';

  describe('Priceplans Route Tests', function () {
    // Initialize global variables
    var $scope,
      PriceplansService;

    // We can start by loading the main application module
    beforeEach(module(ApplicationConfiguration.applicationModuleName));

    // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
    // This allows us to inject a service but then attach it to a variable
    // with the same name as the service.
    beforeEach(inject(function ($rootScope, _PriceplansService_) {
      // Set a new global scope
      $scope = $rootScope.$new();
      PriceplansService = _PriceplansService_;
    }));

    describe('Route Config', function () {
      describe('Main Route', function () {
        var mainstate;
        beforeEach(inject(function ($state) {
          mainstate = $state.get('priceplans');
        }));

        it('Should have the correct URL', function () {
          expect(mainstate.url).toEqual('/priceplans');
        });

        it('Should be abstract', function () {
          expect(mainstate.abstract).toBe(true);
        });

        it('Should have template', function () {
          expect(mainstate.template).toBe('<ui-view/>');
        });
      });

      describe('View Route', function () {
        var viewstate,
          PriceplansController,
          mockPriceplan;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          viewstate = $state.get('priceplans.view');
          $templateCache.put('modules/priceplans/client/views/view-priceplan.client.view.html', '');

          // create mock Priceplan
          mockPriceplan = new PriceplansService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Priceplan Name'
          });

          // Initialize Controller
          PriceplansController = $controller('PriceplansController as vm', {
            $scope: $scope,
            priceplanResolve: mockPriceplan
          });
        }));

        it('Should have the correct URL', function () {
          expect(viewstate.url).toEqual('/:priceplanId');
        });

        it('Should have a resolve function', function () {
          expect(typeof viewstate.resolve).toEqual('object');
          expect(typeof viewstate.resolve.priceplanResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(viewstate, {
            priceplanId: 1
          })).toEqual('/priceplans/1');
        }));

        it('should attach an Priceplan to the controller scope', function () {
          expect($scope.vm.priceplan._id).toBe(mockPriceplan._id);
        });

        it('Should not be abstract', function () {
          expect(viewstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(viewstate.templateUrl).toBe('modules/priceplans/client/views/view-priceplan.client.view.html');
        });
      });

      describe('Create Route', function () {
        var createstate,
          PriceplansController,
          mockPriceplan;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          createstate = $state.get('priceplans.create');
          $templateCache.put('modules/priceplans/client/views/form-priceplan.client.view.html', '');

          // create mock Priceplan
          mockPriceplan = new PriceplansService();

          // Initialize Controller
          PriceplansController = $controller('PriceplansController as vm', {
            $scope: $scope,
            priceplanResolve: mockPriceplan
          });
        }));

        it('Should have the correct URL', function () {
          expect(createstate.url).toEqual('/create');
        });

        it('Should have a resolve function', function () {
          expect(typeof createstate.resolve).toEqual('object');
          expect(typeof createstate.resolve.priceplanResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(createstate)).toEqual('/priceplans/create');
        }));

        it('should attach an Priceplan to the controller scope', function () {
          expect($scope.vm.priceplan._id).toBe(mockPriceplan._id);
          expect($scope.vm.priceplan._id).toBe(undefined);
        });

        it('Should not be abstract', function () {
          expect(createstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(createstate.templateUrl).toBe('modules/priceplans/client/views/form-priceplan.client.view.html');
        });
      });

      describe('Edit Route', function () {
        var editstate,
          PriceplansController,
          mockPriceplan;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          editstate = $state.get('priceplans.edit');
          $templateCache.put('modules/priceplans/client/views/form-priceplan.client.view.html', '');

          // create mock Priceplan
          mockPriceplan = new PriceplansService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Priceplan Name'
          });

          // Initialize Controller
          PriceplansController = $controller('PriceplansController as vm', {
            $scope: $scope,
            priceplanResolve: mockPriceplan
          });
        }));

        it('Should have the correct URL', function () {
          expect(editstate.url).toEqual('/:priceplanId/edit');
        });

        it('Should have a resolve function', function () {
          expect(typeof editstate.resolve).toEqual('object');
          expect(typeof editstate.resolve.priceplanResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(editstate, {
            priceplanId: 1
          })).toEqual('/priceplans/1/edit');
        }));

        it('should attach an Priceplan to the controller scope', function () {
          expect($scope.vm.priceplan._id).toBe(mockPriceplan._id);
        });

        it('Should not be abstract', function () {
          expect(editstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(editstate.templateUrl).toBe('modules/priceplans/client/views/form-priceplan.client.view.html');
        });

        xit('Should go to unauthorized route', function () {

        });
      });

    });
  });
}());
