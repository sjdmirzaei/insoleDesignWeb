(function () {
  'use strict';

  describe('Usercredits List Controller Tests', function () {
    // Initialize global variables
    var UsercreditsListController,
      $scope,
      $httpBackend,
      $state,
      Authentication,
      UsercreditsService,
      mockUsercredit;

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
    beforeEach(inject(function ($controller, $rootScope, _$state_, _$httpBackend_, _Authentication_, _UsercreditsService_) {
      // Set a new global scope
      $scope = $rootScope.$new();

      // Point global variables to injected services
      $httpBackend = _$httpBackend_;
      $state = _$state_;
      Authentication = _Authentication_;
      UsercreditsService = _UsercreditsService_;

      // create mock article
      mockUsercredit = new UsercreditsService({
        _id: '525a8422f6d0f87f0e407a33',
        name: 'Usercredit Name'
      });

      // Mock logged in user
      Authentication.user = {
        roles: ['user']
      };

      // Initialize the Usercredits List controller.
      UsercreditsListController = $controller('UsercreditsListController as vm', {
        $scope: $scope
      });

      // Spy on state go
      spyOn($state, 'go');
    }));

    describe('Instantiate', function () {
      var mockUsercreditList;

      beforeEach(function () {
        mockUsercreditList = [mockUsercredit, mockUsercredit];
      });

      it('should send a GET request and return all Usercredits', inject(function (UsercreditsService) {
        // Set POST response
        $httpBackend.expectGET('api/usercredits').respond(mockUsercreditList);


        $httpBackend.flush();

        // Test form inputs are reset
        expect($scope.vm.usercredits.length).toEqual(2);
        expect($scope.vm.usercredits[0]).toEqual(mockUsercredit);
        expect($scope.vm.usercredits[1]).toEqual(mockUsercredit);

      }));
    });
  });
}());
