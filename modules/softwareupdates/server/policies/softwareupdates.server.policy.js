'use strict';

/**
 * Module dependencies
 */
var acl = require('acl');

// Using the memory backend
acl = new acl(new acl.memoryBackend());

/**
 * Invoke Softwareupdates Permissions
 */
exports.invokeRolesPolicies = function () {
    acl.allow([{
        roles: ['admin'],
        allows: [{
            resources: '/api/softwareupdates',
            permissions: '*'
        }, {
            resources: '/api/softwareupdates/:softwareupdateId',
            permissions: '*'
        }, {
            resources: '/api/softwareupdates/add',
            permissions: ['post']
        }]
    }, {
        roles: ['user'],
        allows: [{
            resources: '/api/softwareupdates',
            permissions: ['get', 'post']
        }, {
            resources: '/api/softwareupdates/:softwareupdateId',
            permissions: ['get']
        }, {
            resources: '/api/softwareupdates/add',
            permissions: ['post']
        }]
    }, {
        roles: ['guest'],
        allows: [{
            resources: '/api/softwareupdates',
            permissions: ['get']
        }, {
            resources: '/api/softwareupdates/:softwareupdateId',
            permissions: ['get']
        }, {
            resources: '/api/softwareupdates/add',
            permissions: ['post']
        }

        ]
    }]);
};

/**
 * Check If Softwareupdates Policy Allows
 */
exports.isAllowed = function (req, res, next) {
    var roles = (req.user) ? req.user.roles : ['guest'];

    // If an Softwareupdate is being processed and the current user created it then allow any manipulation
    if (req.softwareupdate && req.user && req.softwareupdate.user && req.softwareupdate.user.id === req.user.id) {
        return next();
    }

    // Check for user roles
    acl.areAnyRolesAllowed(roles, req.route.path, req.method.toLowerCase(), function (err, isAllowed) {
        if (err) {
            // An authorization error occurred
            return res.status(500).send('Unexpected authorization error');
        } else {
            if (isAllowed) {
                // Access granted! Invoke next middleware
                return next();
            } else {
                return res.status(403).json({
                    message: 'User is not authorized'
                });
            }
        }
    });
};
