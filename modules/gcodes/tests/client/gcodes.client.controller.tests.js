(function () {
  'use strict';

  describe('Gcodes Controller Tests', function () {
    // Initialize global variables
    var GcodesController,
      $scope,
      $httpBackend,
      $state,
      Authentication,
      GcodesService,
      mockGcode;

    // The $resource service augments the response object with methods for updating and deleting the resource.
    // If we were to use the standard toEqual matcher, our tests would fail because the test values would not match
    // the responses exactly. To solve the problem, we define a new toEqualData Jasmine matcher.
    // When the toEqualData matcher compares two objects, it takes only object properties into
    // account and ignores methods.
    beforeEach(function () {
      jasmine.addMatchers({
        toEqualData: function (util, customEqualityTesters) {
          return {
            compare: function (actual, expected) {
              return {
                pass: angular.equals(actual, expected)
              };
            }
          };
        }
      });
    });

    // Then we can start by loading the main application module
    beforeEach(module(ApplicationConfiguration.applicationModuleName));

    // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
    // This allows us to inject a service but then attach it to a variable
    // with the same name as the service.
    beforeEach(inject(function ($controller, $rootScope, _$state_, _$httpBackend_, _Authentication_, _GcodesService_) {
      // Set a new global scope
      $scope = $rootScope.$new();

      // Point global variables to injected services
      $httpBackend = _$httpBackend_;
      $state = _$state_;
      Authentication = _Authentication_;
      GcodesService = _GcodesService_;

      // create mock Gcode
      mockGcode = new GcodesService({
        _id: '525a8422f6d0f87f0e407a33',
        name: 'Gcode Name'
      });

      // Mock logged in user
      Authentication.user = {
        roles: ['user']
      };

      // Initialize the Gcodes controller.
      GcodesController = $controller('GcodesController as vm', {
        $scope: $scope,
        gcodeResolve: {}
      });

      // Spy on state go
      spyOn($state, 'go');
    }));

    describe('vm.save() as create', function () {
      var sampleGcodePostData;

      beforeEach(function () {
        // Create a sample Gcode object
        sampleGcodePostData = new GcodesService({
          name: 'Gcode Name'
        });

        $scope.vm.gcode = sampleGcodePostData;
      });

      it('should send a POST request with the form input values and then locate to new object URL', inject(function (GcodesService) {
        // Set POST response
        $httpBackend.expectPOST('api/gcodes', sampleGcodePostData).respond(mockGcode);

        // Run controller functionality
        $scope.vm.save(true);
        $httpBackend.flush();

        // Test URL redirection after the Gcode was created
        expect($state.go).toHaveBeenCalledWith('gcodes.view', {
          gcodeId: mockGcode._id
        });
      }));

      it('should set $scope.vm.error if error', function () {
        var errorMessage = 'this is an error message';
        $httpBackend.expectPOST('api/gcodes', sampleGcodePostData).respond(400, {
          message: errorMessage
        });

        $scope.vm.save(true);
        $httpBackend.flush();

        expect($scope.vm.error).toBe(errorMessage);
      });
    });

    describe('vm.save() as update', function () {
      beforeEach(function () {
        // Mock Gcode in $scope
        $scope.vm.gcode = mockGcode;
      });

      it('should update a valid Gcode', inject(function (GcodesService) {
        // Set PUT response
        $httpBackend.expectPUT(/api\/gcodes\/([0-9a-fA-F]{24})$/).respond();

        // Run controller functionality
        $scope.vm.save(true);
        $httpBackend.flush();

        // Test URL location to new object
        expect($state.go).toHaveBeenCalledWith('gcodes.view', {
          gcodeId: mockGcode._id
        });
      }));

      it('should set $scope.vm.error if error', inject(function (GcodesService) {
        var errorMessage = 'error';
        $httpBackend.expectPUT(/api\/gcodes\/([0-9a-fA-F]{24})$/).respond(400, {
          message: errorMessage
        });

        $scope.vm.save(true);
        $httpBackend.flush();

        expect($scope.vm.error).toBe(errorMessage);
      }));
    });

    describe('vm.remove()', function () {
      beforeEach(function () {
        // Setup Gcodes
        $scope.vm.gcode = mockGcode;
      });

      it('should delete the Gcode and redirect to Gcodes', function () {
        // Return true on confirm message
        spyOn(window, 'confirm').and.returnValue(true);

        $httpBackend.expectDELETE(/api\/gcodes\/([0-9a-fA-F]{24})$/).respond(204);

        $scope.vm.remove();
        $httpBackend.flush();

        expect($state.go).toHaveBeenCalledWith('gcodes.list');
      });

      it('should should not delete the Gcode and not redirect', function () {
        // Return false on confirm message
        spyOn(window, 'confirm').and.returnValue(false);

        $scope.vm.remove();

        expect($state.go).not.toHaveBeenCalled();
      });
    });
  });
}());
