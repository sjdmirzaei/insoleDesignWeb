(function () {
    'use strict';

    // Users service used for communicating with the users REST endpoint
    angular
        .module('users.services')
        .factory('UsersService', UsersService);

    UsersService.$inject = ['$resource'];

    function UsersService($resource) {
        var Users = $resource('/api/users', {}, {
            update: {
                method: 'PUT'
            },
            updatePassword: {
                method: 'POST',
                url: '/api/users/password'
            },
            deleteProvider: {
                method: 'DELETE',
                url: '/api/users/accounts',
                params: {
                    provider: '@provider'
                }
            },
            sendPasswordResetToken: {
                method: 'POST',
                url: '/api/auth/forgot'
            },
            resetPasswordWithToken: {
                method: 'POST',
                url: '/api/auth/reset/:token'
            },
            signup: {
                method: 'POST',
                url: '/api/auth/signup'
            },
            signin: {
                method: 'POST',
                url: '/api/auth/signin'
            }
        });

        angular.extend(Users, {
            changePassword: function (passwordDetails) {
                return this.updatePassword(passwordDetails).$promise;
            },
            removeSocialAccount: function (provider) {
                return this.deleteProvider({
                    provider: provider // api expects provider as a querystring parameter
                }).$promise;
            },
            requestPasswordReset: function (credentials) {
                return this.sendPasswordResetToken(credentials).$promise;
            },
            resetPassword: function (token, passwordDetails) {
                return this.resetPasswordWithToken({
                    token: token // api expects token as a parameter (i.e. /:token)
                }, passwordDetails).$promise;
            },
            userSignup: function (credentials) {
                return this.signup(credentials).$promise;
            },
            userSignin: function (credentials) {
                return this.signin(credentials).$promise;
            }
        });

        return Users;
    }

    // TODO this should be Users service
    angular
        .module('users.admin.services')
        .factory('AdminService', AdminService);

    AdminService.$inject = ['$resource'];

    function AdminService($resource) {
        return $resource('/api/users/:userId', {
            userId: '@_id'
        }, {
            update: {
                method: 'PUT'
            },
          users: {
            url: '/api/users',
            method: 'GET',
            isObject: true
          },
          usersFiles: {
            url: '/api/usersFiles',
            method: 'GET',
            isArray: true
          },
          usersPayments: {
            url: '/api/usersPayments',
            method: 'GET',
            isArray: true
          },
          usersTransactions: {
            url: '/api/usersTransactions',
            method: 'GET',
            isArray: true
          },
          completeDelete: {
            url: '/api/completeDelete',
            method: 'POST',
            isObject: true
          },
          completeDownload: {
            url: '/api/completeDownload',
            method: 'GET',
            isObject: true
          },
          report: {
                url: '/api/report',
                method: 'POST',
                isArray: true
            }

        });
    }
}());
