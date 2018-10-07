(function () {
  'use strict';

  describe('Gcodes Route Tests', function () {
    // Initialize global variables
    var $scope,
      GcodesService;

    // We can start by loading the main application module
    beforeEach(module(ApplicationConfiguration.applicationModuleName));

    // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
    // This allows us to inject a service but then attach it to a variable
    // with the same name as the service.
    beforeEach(inject(function ($rootScope, _GcodesService_) {
      // Set a new global scope
      $scope = $rootScope.$new();
      GcodesService = _GcodesService_;
    }));

    describe('Route Config', function () {
      describe('Main Route', function () {
        var mainstate;
        beforeEach(inject(function ($state) {
          mainstate = $state.get('gcodes');
        }));

        it('Should have the correct URL', function () {
          expect(mainstate.url).toEqual('/gcodes');
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
          GcodesController,
          mockGcode;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          viewstate = $state.get('gcodes.view');
          $templateCache.put('modules/gcodes/client/views/view-gcode.client.view.html', '');

          // create mock Gcode
          mockGcode = new GcodesService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Gcode Name'
          });

          // Initialize Controller
          GcodesController = $controller('GcodesController as vm', {
            $scope: $scope,
            gcodeResolve: mockGcode
          });
        }));

        it('Should have the correct URL', function () {
          expect(viewstate.url).toEqual('/:gcodeId');
        });

        it('Should have a resolve function', function () {
          expect(typeof viewstate.resolve).toEqual('object');
          expect(typeof viewstate.resolve.gcodeResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(viewstate, {
            gcodeId: 1
          })).toEqual('/gcodes/1');
        }));

        it('should attach an Gcode to the controller scope', function () {
          expect($scope.vm.gcode._id).toBe(mockGcode._id);
        });

        it('Should not be abstract', function () {
          expect(viewstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(viewstate.templateUrl).toBe('modules/gcodes/client/views/view-gcode.client.view.html');
        });
      });

      describe('Create Route', function () {
        var createstate,
          GcodesController,
          mockGcode;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          createstate = $state.get('gcodes.create');
          $templateCache.put('modules/gcodes/client/views/form-gcode.client.view.html', '');

          // create mock Gcode
          mockGcode = new GcodesService();

          // Initialize Controller
          GcodesController = $controller('GcodesController as vm', {
            $scope: $scope,
            gcodeResolve: mockGcode
          });
        }));

        it('Should have the correct URL', function () {
          expect(createstate.url).toEqual('/create');
        });

        it('Should have a resolve function', function () {
          expect(typeof createstate.resolve).toEqual('object');
          expect(typeof createstate.resolve.gcodeResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(createstate)).toEqual('/gcodes/create');
        }));

        it('should attach an Gcode to the controller scope', function () {
          expect($scope.vm.gcode._id).toBe(mockGcode._id);
          expect($scope.vm.gcode._id).toBe(undefined);
        });

        it('Should not be abstract', function () {
          expect(createstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(createstate.templateUrl).toBe('modules/gcodes/client/views/form-gcode.client.view.html');
        });
      });

      describe('Edit Route', function () {
        var editstate,
          GcodesController,
          mockGcode;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          editstate = $state.get('gcodes.edit');
          $templateCache.put('modules/gcodes/client/views/form-gcode.client.view.html', '');

          // create mock Gcode
          mockGcode = new GcodesService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Gcode Name'
          });

          // Initialize Controller
          GcodesController = $controller('GcodesController as vm', {
            $scope: $scope,
            gcodeResolve: mockGcode
          });
        }));

        it('Should have the correct URL', function () {
          expect(editstate.url).toEqual('/:gcodeId/edit');
        });

        it('Should have a resolve function', function () {
          expect(typeof editstate.resolve).toEqual('object');
          expect(typeof editstate.resolve.gcodeResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(editstate, {
            gcodeId: 1
          })).toEqual('/gcodes/1/edit');
        }));

        it('should attach an Gcode to the controller scope', function () {
          expect($scope.vm.gcode._id).toBe(mockGcode._id);
        });

        it('Should not be abstract', function () {
          expect(editstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(editstate.templateUrl).toBe('modules/gcodes/client/views/form-gcode.client.view.html');
        });

        xit('Should go to unauthorized route', function () {

        });
      });

    });
  });
}());
