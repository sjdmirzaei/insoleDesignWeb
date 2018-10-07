'use strict';

/**
 * Module dependencies
 */
var acl = require('acl');

// Using the memory backend
acl = new acl(new acl.memoryBackend());

/**
 * Invoke Gcodes Permissions
 */
exports.invokeRolesPolicies = function () {
    acl.allow([{
        roles: ['user', 'cnc'],
        allows: [{
            resources: '/api/gcodes',
            permissions: '*'
        }, {
            resources: '/api/gcodes/pay',
            permissions: ['post']
        },{
            resources: '/gcodes/download/:gcodeId',
            permissions: ['get']
        }, {
            resources: '/api/gcodes/:gcodeId',
            permissions: '*'
        }]
    }, {
        roles: ['user', 'doctor'],
        allows: [{
            resources: '/api/gcodes',
            permissions: ['get', 'post']
        }, {
            resources: '/api/gcodes/pay',
            permissions: ['post']
        },{
            resources: '/gcodes/download/:gcodeId',
            permissions: ['get']
        },
            {
                resources: '/api/gcodes/:gcodeId',
                permissions: ['get']
            }]
    }, {
        roles: ['guest'],
        allows: [{
            resources: '/api/gcodes',
            permissions: ['get']
        }, {
            resources: '/api/gcodes/:gcodeId',
            permissions: ['get']
        }]
    }]);
};

/**
 * Check If Gcodes Policy Allows
 */
exports.isAllowed = function (req, res, next) {
    var roles = (req.user) ? req.user.roles : ['guest'];

    // If an Gcode is being processed and the current user created it then allow any manipulation
    if (req.gcode && req.user && req.gcode.user && req.gcode.user.id === req.user.id) {
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
