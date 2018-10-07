'use strict';

/**
 * Module dependencies
 */
var acl = require('acl');

// Using the memory backend
acl = new acl(new acl.memoryBackend());

/**
 * Invoke Usercredits Permissions
 */
exports.invokeRolesPolicies = function () {
    acl.allow([{
        roles: ['admin'],
        allows: [{
            resources: '/api/usercredits',
            permissions: '*'
        }, {
            resources: '/api/usercredits/:usercreditId',
            permissions: '*'
        },
            {
                resources: '/api/usercredits/verify',
                permissions: ['post']
            }]
    }, {
        roles: ['user'],
        allows: [{
            resources: '/api/usercredits',
            permissions: ['get', 'post']
        }, {
            resources: '/api/usercredits/:usercreditId',
            permissions: ['get']
        },

        ]
    }, {
        roles: ['guest'],
        allows: [{
            resources: '/api/usercredits',
            permissions: ['get']
        }, ]
    }]);
};

/**
 * Check If Usercredits Policy Allows
 */
exports.isAllowed = function (req, res, next) {
    var roles = (req.user) ? req.user.roles : ['guest'];

    // If an Usercredit is being processed and the current user created it then allow any manipulation
    if (req.usercredit && req.user && req.usercredit.user && req.usercredit.user.id === req.user.id) {
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
