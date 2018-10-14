'use strict';

var should = require('should'),
  request = require('supertest'),
  path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Gcodeplan = mongoose.model('Gcodeplan'),
  express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app,
  agent,
  credentials,
  user,
  gcodeplan;

/**
 * Gcodeplan routes tests
 */
describe('Gcodeplan CRUD tests', function () {

  before(function (done) {
    // Get application
    app = express.init(mongoose);
    agent = request.agent(app);

    done();
  });

  beforeEach(function (done) {
    // Create user credentials
    credentials = {
      username: 'username',
      password: 'M3@n.jsI$Aw3$0m3'
    };

    // Create a new user
    user = new User({
      firstName: 'Full',
      lastName: 'Name',
      displayName: 'Full Name',
      email: 'test@test.com',
      username: credentials.username,
      password: credentials.password,
      provider: 'local'
    });

    // Save a user to the test db and create new Gcodeplan
    user.save(function () {
      gcodeplan = {
        name: 'Gcodeplan name'
      };

      done();
    });
  });

  it('should be able to save a Gcodeplan if logged in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Gcodeplan
        agent.post('/api/gcodeplans')
          .send(gcodeplan)
          .expect(200)
          .end(function (gcodeplanSaveErr, gcodeplanSaveRes) {
            // Handle Gcodeplan save error
            if (gcodeplanSaveErr) {
              return done(gcodeplanSaveErr);
            }

            // Get a list of Gcodeplans
            agent.get('/api/gcodeplans')
              .end(function (gcodeplansGetErr, gcodeplansGetRes) {
                // Handle Gcodeplans save error
                if (gcodeplansGetErr) {
                  return done(gcodeplansGetErr);
                }

                // Get Gcodeplans list
                var gcodeplans = gcodeplansGetRes.body;

                // Set assertions
                (gcodeplans[0].user._id).should.equal(userId);
                (gcodeplans[0].name).should.match('Gcodeplan name');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to save an Gcodeplan if not logged in', function (done) {
    agent.post('/api/gcodeplans')
      .send(gcodeplan)
      .expect(403)
      .end(function (gcodeplanSaveErr, gcodeplanSaveRes) {
        // Call the assertion callback
        done(gcodeplanSaveErr);
      });
  });

  it('should not be able to save an Gcodeplan if no name is provided', function (done) {
    // Invalidate name field
    gcodeplan.name = '';

    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Gcodeplan
        agent.post('/api/gcodeplans')
          .send(gcodeplan)
          .expect(400)
          .end(function (gcodeplanSaveErr, gcodeplanSaveRes) {
            // Set message assertion
            (gcodeplanSaveRes.body.message).should.match('Please fill Gcodeplan name');

            // Handle Gcodeplan save error
            done(gcodeplanSaveErr);
          });
      });
  });

  it('should be able to update an Gcodeplan if signed in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Gcodeplan
        agent.post('/api/gcodeplans')
          .send(gcodeplan)
          .expect(200)
          .end(function (gcodeplanSaveErr, gcodeplanSaveRes) {
            // Handle Gcodeplan save error
            if (gcodeplanSaveErr) {
              return done(gcodeplanSaveErr);
            }

            // Update Gcodeplan name
            gcodeplan.name = 'WHY YOU GOTTA BE SO MEAN?';

            // Update an existing Gcodeplan
            agent.put('/api/gcodeplans/' + gcodeplanSaveRes.body._id)
              .send(gcodeplan)
              .expect(200)
              .end(function (gcodeplanUpdateErr, gcodeplanUpdateRes) {
                // Handle Gcodeplan update error
                if (gcodeplanUpdateErr) {
                  return done(gcodeplanUpdateErr);
                }

                // Set assertions
                (gcodeplanUpdateRes.body._id).should.equal(gcodeplanSaveRes.body._id);
                (gcodeplanUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should be able to get a list of Gcodeplans if not signed in', function (done) {
    // Create new Gcodeplan model instance
    var gcodeplanObj = new Gcodeplan(gcodeplan);

    // Save the gcodeplan
    gcodeplanObj.save(function () {
      // Request Gcodeplans
      request(app).get('/api/gcodeplans')
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Array).and.have.lengthOf(1);

          // Call the assertion callback
          done();
        });

    });
  });

  it('should be able to get a single Gcodeplan if not signed in', function (done) {
    // Create new Gcodeplan model instance
    var gcodeplanObj = new Gcodeplan(gcodeplan);

    // Save the Gcodeplan
    gcodeplanObj.save(function () {
      request(app).get('/api/gcodeplans/' + gcodeplanObj._id)
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Object).and.have.property('name', gcodeplan.name);

          // Call the assertion callback
          done();
        });
    });
  });

  it('should return proper error for single Gcodeplan with an invalid Id, if not signed in', function (done) {
    // test is not a valid mongoose Id
    request(app).get('/api/gcodeplans/test')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'Gcodeplan is invalid');

        // Call the assertion callback
        done();
      });
  });

  it('should return proper error for single Gcodeplan which doesnt exist, if not signed in', function (done) {
    // This is a valid mongoose Id but a non-existent Gcodeplan
    request(app).get('/api/gcodeplans/559e9cd815f80b4c256a8f41')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'No Gcodeplan with that identifier has been found');

        // Call the assertion callback
        done();
      });
  });

  it('should be able to delete an Gcodeplan if signed in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Gcodeplan
        agent.post('/api/gcodeplans')
          .send(gcodeplan)
          .expect(200)
          .end(function (gcodeplanSaveErr, gcodeplanSaveRes) {
            // Handle Gcodeplan save error
            if (gcodeplanSaveErr) {
              return done(gcodeplanSaveErr);
            }

            // Delete an existing Gcodeplan
            agent.delete('/api/gcodeplans/' + gcodeplanSaveRes.body._id)
              .send(gcodeplan)
              .expect(200)
              .end(function (gcodeplanDeleteErr, gcodeplanDeleteRes) {
                // Handle gcodeplan error error
                if (gcodeplanDeleteErr) {
                  return done(gcodeplanDeleteErr);
                }

                // Set assertions
                (gcodeplanDeleteRes.body._id).should.equal(gcodeplanSaveRes.body._id);

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to delete an Gcodeplan if not signed in', function (done) {
    // Set Gcodeplan user
    gcodeplan.user = user;

    // Create new Gcodeplan model instance
    var gcodeplanObj = new Gcodeplan(gcodeplan);

    // Save the Gcodeplan
    gcodeplanObj.save(function () {
      // Try deleting Gcodeplan
      request(app).delete('/api/gcodeplans/' + gcodeplanObj._id)
        .expect(403)
        .end(function (gcodeplanDeleteErr, gcodeplanDeleteRes) {
          // Set message assertion
          (gcodeplanDeleteRes.body.message).should.match('User is not authorized');

          // Handle Gcodeplan error error
          done(gcodeplanDeleteErr);
        });

    });
  });

  it('should be able to get a single Gcodeplan that has an orphaned user reference', function (done) {
    // Create orphan user creds
    var _creds = {
      username: 'orphan',
      password: 'M3@n.jsI$Aw3$0m3'
    };

    // Create orphan user
    var _orphan = new User({
      firstName: 'Full',
      lastName: 'Name',
      displayName: 'Full Name',
      email: 'orphan@test.com',
      username: _creds.username,
      password: _creds.password,
      provider: 'local'
    });

    _orphan.save(function (err, orphan) {
      // Handle save error
      if (err) {
        return done(err);
      }

      agent.post('/api/auth/signin')
        .send(_creds)
        .expect(200)
        .end(function (signinErr, signinRes) {
          // Handle signin error
          if (signinErr) {
            return done(signinErr);
          }

          // Get the userId
          var orphanId = orphan._id;

          // Save a new Gcodeplan
          agent.post('/api/gcodeplans')
            .send(gcodeplan)
            .expect(200)
            .end(function (gcodeplanSaveErr, gcodeplanSaveRes) {
              // Handle Gcodeplan save error
              if (gcodeplanSaveErr) {
                return done(gcodeplanSaveErr);
              }

              // Set assertions on new Gcodeplan
              (gcodeplanSaveRes.body.name).should.equal(gcodeplan.name);
              should.exist(gcodeplanSaveRes.body.user);
              should.equal(gcodeplanSaveRes.body.user._id, orphanId);

              // force the Gcodeplan to have an orphaned user reference
              orphan.remove(function () {
                // now signin with valid user
                agent.post('/api/auth/signin')
                  .send(credentials)
                  .expect(200)
                  .end(function (err, res) {
                    // Handle signin error
                    if (err) {
                      return done(err);
                    }

                    // Get the Gcodeplan
                    agent.get('/api/gcodeplans/' + gcodeplanSaveRes.body._id)
                      .expect(200)
                      .end(function (gcodeplanInfoErr, gcodeplanInfoRes) {
                        // Handle Gcodeplan error
                        if (gcodeplanInfoErr) {
                          return done(gcodeplanInfoErr);
                        }

                        // Set assertions
                        (gcodeplanInfoRes.body._id).should.equal(gcodeplanSaveRes.body._id);
                        (gcodeplanInfoRes.body.name).should.equal(gcodeplan.name);
                        should.equal(gcodeplanInfoRes.body.user, undefined);

                        // Call the assertion callback
                        done();
                      });
                  });
              });
            });
        });
    });
  });

  afterEach(function (done) {
    User.remove().exec(function () {
      Gcodeplan.remove().exec(done);
    });
  });
});
