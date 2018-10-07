(function () {
  'use strict';

  describe('Softwareupdates Route Tests', function () {
    // Initialize global variables
    var $scope,
      SoftwareupdatesService;

    // We can start by loading the main application module
    beforeEach(module(ApplicationConfiguration.applicationModuleName));

    // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
    // This allows us to inject a service but then attach it to a variable
    // with the same name as the service.
    beforeEach(inject(function ($rootScope, _SoftwareupdatesService_) {
      // Set a new global scope
      $scope = $rootScope.$new();
      SoftwareupdatesService = _SoftwareupdatesService_;
    }));

    describe('Route Config', function () {
      describe('Main Route', function () {
        var mainstate;
        beforeEach(inject(function ($state) {
          mainstate = $state.get('softwareupdates');
        }));

        it('Should have the correct URL', function () {
          expect(mainstate.url).toEqual('/softwareupdates');
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
          SoftwareupdatesController,
          mockSoftwareupdate;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          viewstate = $state.get('softwareupdates.view');
          $templateCache.put('modules/softwareupdates/client/views/view-softwareupdate.client.view.html', '');

          // create mock Softwareupdate
          mockSoftwareupdate = new SoftwareupdatesService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Softwareupdate Name'
          });

          // Initialize Controller
          SoftwareupdatesController = $controller('SoftwareupdatesController as vm', {
            $scope: $scope,
            softwareupdateResolve: mockSoftwareupdate
          });
        }));

        it('Should have the correct URL', function () {
          expect(viewstate.url).toEqual('/:softwareupdateId');
        });

        it('Should have a resolve function', function () {
          expect(typeof viewstate.resolve).toEqual('object');
          expect(typeof viewstate.resolve.softwareupdateResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(viewstate, {
            softwareupdateId: 1
          })).toEqual('/softwareupdates/1');
        }));

        it('should attach an Softwareupdate to the controller scope', function () {
          expect($scope.vm.softwareupdate._id).toBe(mockSoftwareupdate._id);
        });

        it('Should not be abstract', function () {
          expect(viewstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(viewstate.templateUrl).toBe('modules/softwareupdates/client/views/view-softwareupdate.client.view.html');
        });
      });

      describe('Create Route', function () {
        var createstate,
          SoftwareupdatesController,
          mockSoftwareupdate;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          createstate = $state.get('softwareupdates.create');
          $templateCache.put('modules/softwareupdates/client/views/form-softwareupdate.client.view.html', '');

          // create mock Softwareupdate
          mockSoftwareupdate = new SoftwareupdatesService();

          // Initialize Controller
          SoftwareupdatesController = $controller('SoftwareupdatesController as vm', {
            $scope: $scope,
            softwareupdateResolve: mockSoftwareupdate
          });
        }));

        it('Should have the correct URL', function () {
          expect(createstate.url).toEqual('/create');
        });

        it('Should have a resolve function', function () {
          expect(typeof createstate.resolve).toEqual('object');
          expect(typeof createstate.resolve.softwareupdateResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(createstate)).toEqual('/softwareupdates/create');
        }));

        it('should attach an Softwareupdate to the controller scope', function () {
          expect($scope.vm.softwareupdate._id).toBe(mockSoftwareupdate._id);
          expect($scope.vm.softwareupdate._id).toBe(undefined);
        });

        it('Should not be abstract', function () {
          expect(createstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(createstate.templateUrl).toBe('modules/softwareupdates/client/views/form-softwareupdate.client.view.html');
        });
      });

      describe('Edit Route', function () {
        var editstate,
          SoftwareupdatesController,
          mockSoftwareupdate;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          editstate = $state.get('softwareupdates.edit');
          $templateCache.put('modules/softwareupdates/client/views/form-softwareupdate.client.view.html', '');

          // create mock Softwareupdate
          mockSoftwareupdate = new SoftwareupdatesService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Softwareupdate Name'
          });

          // Initialize Controller
          SoftwareupdatesController = $controller('SoftwareupdatesController as vm', {
            $scope: $scope,
            softwareupdateResolve: mockSoftwareupdate
          });
        }));

        it('Should have the correct URL', function () {
          expect(editstate.url).toEqual('/:softwareupdateId/edit');
        });

        it('Should have a resolve function', function () {
          expect(typeof editstate.resolve).toEqual('object');
          expect(typeof editstate.resolve.softwareupdateResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(editstate, {
            softwareupdateId: 1
          })).toEqual('/softwareupdates/1/edit');
        }));

        it('should attach an Softwareupdate to the controller scope', function () {
          expect($scope.vm.softwareupdate._id).toBe(mockSoftwareupdate._id);
        });

        it('Should not be abstract', function () {
          expect(editstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(editstate.templateUrl).toBe('modules/softwareupdates/client/views/form-softwareupdate.client.view.html');
        });

        xit('Should go to unauthorized route', function () {

        });
      });

    });
  });
}());
