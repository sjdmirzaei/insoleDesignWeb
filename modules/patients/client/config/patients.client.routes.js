(function () {
    'use strict';

    angular
        .module('patients')
        .config(routeConfig);

    routeConfig.$inject = ['$stateProvider'];

    function routeConfig($stateProvider) {
        $stateProvider
            .state('patients', {
                abstract: true,
                url: '/patients',
                data: {
                    roles: ['user','doctor','admin'],
                },
                template: '<ui-view/>'
            })
            .state('patients.list', {
                url: '',
                templateUrl: '/modules/patients/client/views/list-patients.client.view.html',
                controller: 'PatientsListController',
                controllerAs: 'vm',
                data: {
                    roles: ['user','doctor','admin'],
                    pageTitle: 'Patients List'
                }
            })
            .state('patients.create', {
                url: '/create',
                templateUrl: '/modules/patients/client/views/form-patient.client.view.html',
                controller: 'PatientsController',
                controllerAs: 'vm',
                resolve: {
                    patientResolve: newPatient,

                },
                data: {
                    roles: ['user','doctor','admin'],
                    pageTitle: 'Patients Create'
                }
            })
            .state('patients.edit', {
                url: '/:patientId/edit',
                templateUrl: '/modules/patients/client/views/form-patient.client.view.html',
                controller: 'PatientsController',
                controllerAs: 'vm',
                resolve: {
                    patientResolve: getPatient,

                },
                data: {
                    roles: ['user','doctor','admin'],
                    pageTitle: 'Edit Patient {{ patientResolve.name }}'
                }
            })
            .state('patients.view', {
                url: '/:patientId',
                templateUrl: '/modules/patients/client/views/view-patient.client.view.html',
                controller: 'PatientsController',
                controllerAs: 'vm',
                resolve: {
                    patientResolve: getPatient,

                },
                data: {
                    roles: ['user','doctor','admin'],
                    pageTitle: 'Patient {{ patientResolve.name }}'
                }
            });
    }

    getPatient.$inject = ['$stateParams', 'PatientsService'];

    function getPatient($stateParams, PatientsService) {
        return PatientsService.get({
            patientId: $stateParams.patientId
        }).$promise;
    }


    newPatient.$inject = ['PatientsService'];

    function newPatient(PatientsService) {
        return new PatientsService();
    }
}());
