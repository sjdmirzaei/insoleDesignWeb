(function () {
  'use strict';

  describe('Creditplans Route Tests', function () {
    // Initialize global variables
    var $scope,
      CreditplansService;

    // We can start by loading the main application module
    beforeEach(module(ApplicationConfiguration.applicationModuleName));

    // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
    // This allows us to inject a service but then attach it to a variable
    // with the same name as the service.
    beforeEach(inject(function ($rootScope, _CreditplansService_) {
      // Set a new global scope
      $scope = $rootScope.$new();
      CreditplansService = _CreditplansService_;
    }));

    describe('Route Config', function () {
      describe('Main Route', function () {
        var mainstate;
        beforeEach(inject(function ($state) {
          mainstate = $state.get('creditplans');
        }));

        it('Should have the correct URL', function () {
          expect(mainstate.url).toEqual('/creditplans');
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
          CreditplansController,
          mockCreditplan;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          viewstate = $state.get('creditplans.view');
          $templateCache.put('modules/creditplans/client/views/view-creditplan.client.view.html', '');

          // create mock Creditplan
          mockCreditplan = new CreditplansService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Creditplan Name'
          });

          // Initialize Controller
          CreditplansController = $controller('CreditplansController as vm', {
            $scope: $scope,
            creditplanResolve: mockCreditplan
          });
        }));

        it('Should have the correct URL', function () {
          expect(viewstate.url).toEqual('/:creditplanId');
        });

        it('Should have a resolve function', function () {
          expect(typeof viewstate.resolve).toEqual('object');
          expect(typeof viewstate.resolve.creditplanResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(viewstate, {
            creditplanId: 1
          })).toEqual('/creditplans/1');
        }));

        it('should attach an Creditplan to the controller scope', function () {
          expect($scope.vm.creditplan._id).toBe(mockCreditplan._id);
        });

        it('Should not be abstract', function () {
          expect(viewstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(viewstate.templateUrl).toBe('modules/creditplans/client/views/view-creditplan.client.view.html');
        });
      });

      describe('Create Route', function () {
        var createstate,
          CreditplansController,
          mockCreditplan;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          createstate = $state.get('creditplans.create');
          $templateCache.put('modules/creditplans/client/views/form-creditplan.client.view.html', '');

          // create mock Creditplan
          mockCreditplan = new CreditplansService();

          // Initialize Controller
          CreditplansController = $controller('CreditplansController as vm', {
            $scope: $scope,
            creditplanResolve: mockCreditplan
          });
        }));

        it('Should have the correct URL', function () {
          expect(createstate.url).toEqual('/create');
        });

        it('Should have a resolve function', function () {
          expect(typeof createstate.resolve).toEqual('object');
          expect(typeof createstate.resolve.creditplanResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(createstate)).toEqual('/creditplans/create');
        }));

        it('should attach an Creditplan to the controller scope', function () {
          expect($scope.vm.creditplan._id).toBe(mockCreditplan._id);
          expect($scope.vm.creditplan._id).toBe(undefined);
        });

        it('Should not be abstract', function () {
          expect(createstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(createstate.templateUrl).toBe('modules/creditplans/client/views/form-creditplan.client.view.html');
        });
      });

      describe('Edit Route', function () {
        var editstate,
          CreditplansController,
          mockCreditplan;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          editstate = $state.get('creditplans.edit');
          $templateCache.put('modules/creditplans/client/views/form-creditplan.client.view.html', '');

          // create mock Creditplan
          mockCreditplan = new CreditplansService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Creditplan Name'
          });

          // Initialize Controller
          CreditplansController = $controller('CreditplansController as vm', {
            $scope: $scope,
            creditplanResolve: mockCreditplan
          });
        }));

        it('Should have the correct URL', function () {
          expect(editstate.url).toEqual('/:creditplanId/edit');
        });

        it('Should have a resolve function', function () {
          expect(typeof editstate.resolve).toEqual('object');
          expect(typeof editstate.resolve.creditplanResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(editstate, {
            creditplanId: 1
          })).toEqual('/creditplans/1/edit');
        }));

        it('should attach an Creditplan to the controller scope', function () {
          expect($scope.vm.creditplan._id).toBe(mockCreditplan._id);
        });

        it('Should not be abstract', function () {
          expect(editstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(editstate.templateUrl).toBe('modules/creditplans/client/views/form-creditplan.client.view.html');
        });

        xit('Should go to unauthorized route', function () {

        });
      });

    });
  });
}());
