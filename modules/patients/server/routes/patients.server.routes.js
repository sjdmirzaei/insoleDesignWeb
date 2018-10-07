'use strict';

/**
 * Module dependencies
 */
var patientsPolicy = require('../policies/patients.server.policy'),
    patients = require('../controllers/patients.server.controller');


module.exports = function (app) {
    // Patients Routes
    //   app.route('/api/patients/import').all(patientsPolicy.isAllowed)
    //       .post(patients.import);

    app.route('/api/patients').all(patientsPolicy.isAllowed)
        .get(patients.list)
        .post(patients.create);

    app.route('/api/patients/find').all(patientsPolicy.isAllowed)
        .post(patients.findBy);

    app.route('/api/patients/download/:patientId').all(patientsPolicy.isAllowed).get(patients.download);
    app.route('/api/patients/download/last/:patientId').all(patientsPolicy.isAllowed).get(patients.downloadLast);

    app.route('/api/patients/:patientId').all(patientsPolicy.isAllowed)
        .get(patients.read)
        .put(patients.update)
        .delete(patients.delete);

    // Finish by binding the Patient middleware
    app.param('patientId', patients.patientByID);
};
