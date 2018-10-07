'use strict';

var should = require('should'),
  request = require('supertest'),
  path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Gcode = mongoose.model('Gcode'),
  express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app,
  agent,
  credentials,
  user,
  gcode;

/**
 * Gcode routes tests
 */
describe('Gcode CRUD tests', function () {

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

    // Save a user to the test db and create new Gcode
    user.save(function () {
      gcode = {
        name: 'Gcode name'
      };

      done();
    });
  });

  it('should be able to save a Gcode if logged in', function (done) {
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

        // Save a new Gcode
        agent.post('/api/gcodes')
          .send(gcode)
          .expect(200)
          .end(function (gcodeSaveErr, gcodeSaveRes) {
            // Handle Gcode save error
            if (gcodeSaveErr) {
              return done(gcodeSaveErr);
            }

            // Get a list of Gcodes
            agent.get('/api/gcodes')
              .end(function (gcodesGetErr, gcodesGetRes) {
                // Handle Gcodes save error
                if (gcodesGetErr) {
                  return done(gcodesGetErr);
                }

                // Get Gcodes list
                var gcodes = gcodesGetRes.body;

                // Set assertions
                (gcodes[0].user._id).should.equal(userId);
                (gcodes[0].name).should.match('Gcode name');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to save an Gcode if not logged in', function (done) {
    agent.post('/api/gcodes')
      .send(gcode)
      .expect(403)
      .end(function (gcodeSaveErr, gcodeSaveRes) {
        // Call the assertion callback
        done(gcodeSaveErr);
      });
  });

  it('should not be able to save an Gcode if no name is provided', function (done) {
    // Invalidate name field
    gcode.name = '';

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

        // Save a new Gcode
        agent.post('/api/gcodes')
          .send(gcode)
          .expect(400)
          .end(function (gcodeSaveErr, gcodeSaveRes) {
            // Set message assertion
            (gcodeSaveRes.body.message).should.match('Please fill Gcode name');

            // Handle Gcode save error
            done(gcodeSaveErr);
          });
      });
  });

  it('should be able to update an Gcode if signed in', function (done) {
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

        // Save a new Gcode
        agent.post('/api/gcodes')
          .send(gcode)
          .expect(200)
          .end(function (gcodeSaveErr, gcodeSaveRes) {
            // Handle Gcode save error
            if (gcodeSaveErr) {
              return done(gcodeSaveErr);
            }

            // Update Gcode name
            gcode.name = 'WHY YOU GOTTA BE SO MEAN?';

            // Update an existing Gcode
            agent.put('/api/gcodes/' + gcodeSaveRes.body._id)
              .send(gcode)
              .expect(200)
              .end(function (gcodeUpdateErr, gcodeUpdateRes) {
                // Handle Gcode update error
                if (gcodeUpdateErr) {
                  return done(gcodeUpdateErr);
                }

                // Set assertions
                (gcodeUpdateRes.body._id).should.equal(gcodeSaveRes.body._id);
                (gcodeUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should be able to get a list of Gcodes if not signed in', function (done) {
    // Create new Gcode model instance
    var gcodeObj = new Gcode(gcode);

    // Save the gcode
    gcodeObj.save(function () {
      // Request Gcodes
      request(app).get('/api/gcodes')
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Array).and.have.lengthOf(1);

          // Call the assertion callback
          done();
        });

    });
  });

  it('should be able to get a single Gcode if not signed in', function (done) {
    // Create new Gcode model instance
    var gcodeObj = new Gcode(gcode);

    // Save the Gcode
    gcodeObj.save(function () {
      request(app).get('/api/gcodes/' + gcodeObj._id)
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Object).and.have.property('name', gcode.name);

          // Call the assertion callback
          done();
        });
    });
  });

  it('should return proper error for single Gcode with an invalid Id, if not signed in', function (done) {
    // test is not a valid mongoose Id
    request(app).get('/api/gcodes/test')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'Gcode is invalid');

        // Call the assertion callback
        done();
      });
  });

  it('should return proper error for single Gcode which doesnt exist, if not signed in', function (done) {
    // This is a valid mongoose Id but a non-existent Gcode
    request(app).get('/api/gcodes/559e9cd815f80b4c256a8f41')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'No Gcode with that identifier has been found');

        // Call the assertion callback
        done();
      });
  });

  it('should be able to delete an Gcode if signed in', function (done) {
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

        // Save a new Gcode
        agent.post('/api/gcodes')
          .send(gcode)
          .expect(200)
          .end(function (gcodeSaveErr, gcodeSaveRes) {
            // Handle Gcode save error
            if (gcodeSaveErr) {
              return done(gcodeSaveErr);
            }

            // Delete an existing Gcode
            agent.delete('/api/gcodes/' + gcodeSaveRes.body._id)
              .send(gcode)
              .expect(200)
              .end(function (gcodeDeleteErr, gcodeDeleteRes) {
                // Handle gcode error error
                if (gcodeDeleteErr) {
                  return done(gcodeDeleteErr);
                }

                // Set assertions
                (gcodeDeleteRes.body._id).should.equal(gcodeSaveRes.body._id);

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to delete an Gcode if not signed in', function (done) {
    // Set Gcode user
    gcode.user = user;

    // Create new Gcode model instance
    var gcodeObj = new Gcode(gcode);

    // Save the Gcode
    gcodeObj.save(function () {
      // Try deleting Gcode
      request(app).delete('/api/gcodes/' + gcodeObj._id)
        .expect(403)
        .end(function (gcodeDeleteErr, gcodeDeleteRes) {
          // Set message assertion
          (gcodeDeleteRes.body.message).should.match('User is not authorized');

          // Handle Gcode error error
          done(gcodeDeleteErr);
        });

    });
  });

  it('should be able to get a single Gcode that has an orphaned user reference', function (done) {
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

          // Save a new Gcode
          agent.post('/api/gcodes')
            .send(gcode)
            .expect(200)
            .end(function (gcodeSaveErr, gcodeSaveRes) {
              // Handle Gcode save error
              if (gcodeSaveErr) {
                return done(gcodeSaveErr);
              }

              // Set assertions on new Gcode
              (gcodeSaveRes.body.name).should.equal(gcode.name);
              should.exist(gcodeSaveRes.body.user);
              should.equal(gcodeSaveRes.body.user._id, orphanId);

              // force the Gcode to have an orphaned user reference
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

                    // Get the Gcode
                    agent.get('/api/gcodes/' + gcodeSaveRes.body._id)
                      .expect(200)
                      .end(function (gcodeInfoErr, gcodeInfoRes) {
                        // Handle Gcode error
                        if (gcodeInfoErr) {
                          return done(gcodeInfoErr);
                        }

                        // Set assertions
                        (gcodeInfoRes.body._id).should.equal(gcodeSaveRes.body._id);
                        (gcodeInfoRes.body.name).should.equal(gcode.name);
                        should.equal(gcodeInfoRes.body.user, undefined);

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
      Gcode.remove().exec(done);
    });
  });
});
