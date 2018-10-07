'use strict';

var should = require('should'),
  request = require('supertest'),
  path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Softwareupdate = mongoose.model('Softwareupdate'),
  express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app,
  agent,
  credentials,
  user,
  softwareupdate;

/**
 * Softwareupdate routes tests
 */
describe('Softwareupdate CRUD tests', function () {

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

    // Save a user to the test db and create new Softwareupdate
    user.save(function () {
      softwareupdate = {
        name: 'Softwareupdate name'
      };

      done();
    });
  });

  it('should be able to save a Softwareupdate if logged in', function (done) {
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

        // Save a new Softwareupdate
        agent.post('/api/softwareupdates')
          .send(softwareupdate)
          .expect(200)
          .end(function (softwareupdateSaveErr, softwareupdateSaveRes) {
            // Handle Softwareupdate save error
            if (softwareupdateSaveErr) {
              return done(softwareupdateSaveErr);
            }

            // Get a list of Softwareupdates
            agent.get('/api/softwareupdates')
              .end(function (softwareupdatesGetErr, softwareupdatesGetRes) {
                // Handle Softwareupdates save error
                if (softwareupdatesGetErr) {
                  return done(softwareupdatesGetErr);
                }

                // Get Softwareupdates list
                var softwareupdates = softwareupdatesGetRes.body;

                // Set assertions
                (softwareupdates[0].user._id).should.equal(userId);
                (softwareupdates[0].name).should.match('Softwareupdate name');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to save an Softwareupdate if not logged in', function (done) {
    agent.post('/api/softwareupdates')
      .send(softwareupdate)
      .expect(403)
      .end(function (softwareupdateSaveErr, softwareupdateSaveRes) {
        // Call the assertion callback
        done(softwareupdateSaveErr);
      });
  });

  it('should not be able to save an Softwareupdate if no name is provided', function (done) {
    // Invalidate name field
    softwareupdate.name = '';

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

        // Save a new Softwareupdate
        agent.post('/api/softwareupdates')
          .send(softwareupdate)
          .expect(400)
          .end(function (softwareupdateSaveErr, softwareupdateSaveRes) {
            // Set message assertion
            (softwareupdateSaveRes.body.message).should.match('Please fill Softwareupdate name');

            // Handle Softwareupdate save error
            done(softwareupdateSaveErr);
          });
      });
  });

  it('should be able to update an Softwareupdate if signed in', function (done) {
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

        // Save a new Softwareupdate
        agent.post('/api/softwareupdates')
          .send(softwareupdate)
          .expect(200)
          .end(function (softwareupdateSaveErr, softwareupdateSaveRes) {
            // Handle Softwareupdate save error
            if (softwareupdateSaveErr) {
              return done(softwareupdateSaveErr);
            }

            // Update Softwareupdate name
            softwareupdate.name = 'WHY YOU GOTTA BE SO MEAN?';

            // Update an existing Softwareupdate
            agent.put('/api/softwareupdates/' + softwareupdateSaveRes.body._id)
              .send(softwareupdate)
              .expect(200)
              .end(function (softwareupdateUpdateErr, softwareupdateUpdateRes) {
                // Handle Softwareupdate update error
                if (softwareupdateUpdateErr) {
                  return done(softwareupdateUpdateErr);
                }

                // Set assertions
                (softwareupdateUpdateRes.body._id).should.equal(softwareupdateSaveRes.body._id);
                (softwareupdateUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should be able to get a list of Softwareupdates if not signed in', function (done) {
    // Create new Softwareupdate model instance
    var softwareupdateObj = new Softwareupdate(softwareupdate);

    // Save the softwareupdate
    softwareupdateObj.save(function () {
      // Request Softwareupdates
      request(app).get('/api/softwareupdates')
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Array).and.have.lengthOf(1);

          // Call the assertion callback
          done();
        });

    });
  });

  it('should be able to get a single Softwareupdate if not signed in', function (done) {
    // Create new Softwareupdate model instance
    var softwareupdateObj = new Softwareupdate(softwareupdate);

    // Save the Softwareupdate
    softwareupdateObj.save(function () {
      request(app).get('/api/softwareupdates/' + softwareupdateObj._id)
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Object).and.have.property('name', softwareupdate.name);

          // Call the assertion callback
          done();
        });
    });
  });

  it('should return proper error for single Softwareupdate with an invalid Id, if not signed in', function (done) {
    // test is not a valid mongoose Id
    request(app).get('/api/softwareupdates/test')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'Softwareupdate is invalid');

        // Call the assertion callback
        done();
      });
  });

  it('should return proper error for single Softwareupdate which doesnt exist, if not signed in', function (done) {
    // This is a valid mongoose Id but a non-existent Softwareupdate
    request(app).get('/api/softwareupdates/559e9cd815f80b4c256a8f41')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'No Softwareupdate with that identifier has been found');

        // Call the assertion callback
        done();
      });
  });

  it('should be able to delete an Softwareupdate if signed in', function (done) {
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

        // Save a new Softwareupdate
        agent.post('/api/softwareupdates')
          .send(softwareupdate)
          .expect(200)
          .end(function (softwareupdateSaveErr, softwareupdateSaveRes) {
            // Handle Softwareupdate save error
            if (softwareupdateSaveErr) {
              return done(softwareupdateSaveErr);
            }

            // Delete an existing Softwareupdate
            agent.delete('/api/softwareupdates/' + softwareupdateSaveRes.body._id)
              .send(softwareupdate)
              .expect(200)
              .end(function (softwareupdateDeleteErr, softwareupdateDeleteRes) {
                // Handle softwareupdate error error
                if (softwareupdateDeleteErr) {
                  return done(softwareupdateDeleteErr);
                }

                // Set assertions
                (softwareupdateDeleteRes.body._id).should.equal(softwareupdateSaveRes.body._id);

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to delete an Softwareupdate if not signed in', function (done) {
    // Set Softwareupdate user
    softwareupdate.user = user;

    // Create new Softwareupdate model instance
    var softwareupdateObj = new Softwareupdate(softwareupdate);

    // Save the Softwareupdate
    softwareupdateObj.save(function () {
      // Try deleting Softwareupdate
      request(app).delete('/api/softwareupdates/' + softwareupdateObj._id)
        .expect(403)
        .end(function (softwareupdateDeleteErr, softwareupdateDeleteRes) {
          // Set message assertion
          (softwareupdateDeleteRes.body.message).should.match('User is not authorized');

          // Handle Softwareupdate error error
          done(softwareupdateDeleteErr);
        });

    });
  });

  it('should be able to get a single Softwareupdate that has an orphaned user reference', function (done) {
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

          // Save a new Softwareupdate
          agent.post('/api/softwareupdates')
            .send(softwareupdate)
            .expect(200)
            .end(function (softwareupdateSaveErr, softwareupdateSaveRes) {
              // Handle Softwareupdate save error
              if (softwareupdateSaveErr) {
                return done(softwareupdateSaveErr);
              }

              // Set assertions on new Softwareupdate
              (softwareupdateSaveRes.body.name).should.equal(softwareupdate.name);
              should.exist(softwareupdateSaveRes.body.user);
              should.equal(softwareupdateSaveRes.body.user._id, orphanId);

              // force the Softwareupdate to have an orphaned user reference
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

                    // Get the Softwareupdate
                    agent.get('/api/softwareupdates/' + softwareupdateSaveRes.body._id)
                      .expect(200)
                      .end(function (softwareupdateInfoErr, softwareupdateInfoRes) {
                        // Handle Softwareupdate error
                        if (softwareupdateInfoErr) {
                          return done(softwareupdateInfoErr);
                        }

                        // Set assertions
                        (softwareupdateInfoRes.body._id).should.equal(softwareupdateSaveRes.body._id);
                        (softwareupdateInfoRes.body.name).should.equal(softwareupdate.name);
                        should.equal(softwareupdateInfoRes.body.user, undefined);

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
      Softwareupdate.remove().exec(done);
    });
  });
});
