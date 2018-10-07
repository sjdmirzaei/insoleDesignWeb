(function () {
  'use strict';

  describe('Softwareupdates List Controller Tests', function () {
    // Initialize global variables
    var SoftwareupdatesListController,
      $scope,
      $httpBackend,
      $state,
      Authentication,
      SoftwareupdatesService,
      mockSoftwareupdate;

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
    beforeEach(inject(function ($controller, $rootScope, _$state_, _$httpBackend_, _Authentication_, _SoftwareupdatesService_) {
      // Set a new global scope
      $scope = $rootScope.$new();

      // Point global variables to injected services
      $httpBackend = _$httpBackend_;
      $state = _$state_;
      Authentication = _Authentication_;
      SoftwareupdatesService = _SoftwareupdatesService_;

      // create mock article
      mockSoftwareupdate = new SoftwareupdatesService({
        _id: '525a8422f6d0f87f0e407a33',
        name: 'Softwareupdate Name'
      });

      // Mock logged in user
      Authentication.user = {
        roles: ['user']
      };

      // Initialize the Softwareupdates List controller.
      SoftwareupdatesListController = $controller('SoftwareupdatesListController as vm', {
        $scope: $scope
      });

      // Spy on state go
      spyOn($state, 'go');
    }));

    describe('Instantiate', function () {
      var mockSoftwareupdateList;

      beforeEach(function () {
        mockSoftwareupdateList = [mockSoftwareupdate, mockSoftwareupdate];
      });

      it('should send a GET request and return all Softwareupdates', inject(function (SoftwareupdatesService) {
        // Set POST response
        $httpBackend.expectGET('api/softwareupdates').respond(mockSoftwareupdateList);


        $httpBackend.flush();

        // Test form inputs are reset
        expect($scope.vm.softwareupdates.length).toEqual(2);
        expect($scope.vm.softwareupdates[0]).toEqual(mockSoftwareupdate);
        expect($scope.vm.softwareupdates[1]).toEqual(mockSoftwareupdate);

      }));
    });
  });
}());
