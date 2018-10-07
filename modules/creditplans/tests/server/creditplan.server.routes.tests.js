'use strict';

var should = require('should'),
  request = require('supertest'),
  path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Creditplan = mongoose.model('Creditplan'),
  express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app,
  agent,
  credentials,
  user,
  creditplan;

/**
 * Creditplan routes tests
 */
describe('Creditplan CRUD tests', function () {

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

    // Save a user to the test db and create new Creditplan
    user.save(function () {
      creditplan = {
        name: 'Creditplan name'
      };

      done();
    });
  });

  it('should be able to save a Creditplan if logged in', function (done) {
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

        // Save a new Creditplan
        agent.post('/api/creditplans')
          .send(creditplan)
          .expect(200)
          .end(function (creditplanSaveErr, creditplanSaveRes) {
            // Handle Creditplan save error
            if (creditplanSaveErr) {
              return done(creditplanSaveErr);
            }

            // Get a list of Creditplans
            agent.get('/api/creditplans')
              .end(function (creditplansGetErr, creditplansGetRes) {
                // Handle Creditplans save error
                if (creditplansGetErr) {
                  return done(creditplansGetErr);
                }

                // Get Creditplans list
                var creditplans = creditplansGetRes.body;

                // Set assertions
                (creditplans[0].user._id).should.equal(userId);
                (creditplans[0].name).should.match('Creditplan name');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to save an Creditplan if not logged in', function (done) {
    agent.post('/api/creditplans')
      .send(creditplan)
      .expect(403)
      .end(function (creditplanSaveErr, creditplanSaveRes) {
        // Call the assertion callback
        done(creditplanSaveErr);
      });
  });

  it('should not be able to save an Creditplan if no name is provided', function (done) {
    // Invalidate name field
    creditplan.name = '';

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

        // Save a new Creditplan
        agent.post('/api/creditplans')
          .send(creditplan)
          .expect(400)
          .end(function (creditplanSaveErr, creditplanSaveRes) {
            // Set message assertion
            (creditplanSaveRes.body.message).should.match('Please fill Creditplan name');

            // Handle Creditplan save error
            done(creditplanSaveErr);
          });
      });
  });

  it('should be able to update an Creditplan if signed in', function (done) {
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

        // Save a new Creditplan
        agent.post('/api/creditplans')
          .send(creditplan)
          .expect(200)
          .end(function (creditplanSaveErr, creditplanSaveRes) {
            // Handle Creditplan save error
            if (creditplanSaveErr) {
              return done(creditplanSaveErr);
            }

            // Update Creditplan name
            creditplan.name = 'WHY YOU GOTTA BE SO MEAN?';

            // Update an existing Creditplan
            agent.put('/api/creditplans/' + creditplanSaveRes.body._id)
              .send(creditplan)
              .expect(200)
              .end(function (creditplanUpdateErr, creditplanUpdateRes) {
                // Handle Creditplan update error
                if (creditplanUpdateErr) {
                  return done(creditplanUpdateErr);
                }

                // Set assertions
                (creditplanUpdateRes.body._id).should.equal(creditplanSaveRes.body._id);
                (creditplanUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should be able to get a list of Creditplans if not signed in', function (done) {
    // Create new Creditplan model instance
    var creditplanObj = new Creditplan(creditplan);

    // Save the creditplan
    creditplanObj.save(function () {
      // Request Creditplans
      request(app).get('/api/creditplans')
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Array).and.have.lengthOf(1);

          // Call the assertion callback
          done();
        });

    });
  });

  it('should be able to get a single Creditplan if not signed in', function (done) {
    // Create new Creditplan model instance
    var creditplanObj = new Creditplan(creditplan);

    // Save the Creditplan
    creditplanObj.save(function () {
      request(app).get('/api/creditplans/' + creditplanObj._id)
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Object).and.have.property('name', creditplan.name);

          // Call the assertion callback
          done();
        });
    });
  });

  it('should return proper error for single Creditplan with an invalid Id, if not signed in', function (done) {
    // test is not a valid mongoose Id
    request(app).get('/api/creditplans/test')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'Creditplan is invalid');

        // Call the assertion callback
        done();
      });
  });

  it('should return proper error for single Creditplan which doesnt exist, if not signed in', function (done) {
    // This is a valid mongoose Id but a non-existent Creditplan
    request(app).get('/api/creditplans/559e9cd815f80b4c256a8f41')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'No Creditplan with that identifier has been found');

        // Call the assertion callback
        done();
      });
  });

  it('should be able to delete an Creditplan if signed in', function (done) {
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

        // Save a new Creditplan
        agent.post('/api/creditplans')
          .send(creditplan)
          .expect(200)
          .end(function (creditplanSaveErr, creditplanSaveRes) {
            // Handle Creditplan save error
            if (creditplanSaveErr) {
              return done(creditplanSaveErr);
            }

            // Delete an existing Creditplan
            agent.delete('/api/creditplans/' + creditplanSaveRes.body._id)
              .send(creditplan)
              .expect(200)
              .end(function (creditplanDeleteErr, creditplanDeleteRes) {
                // Handle creditplan error error
                if (creditplanDeleteErr) {
                  return done(creditplanDeleteErr);
                }

                // Set assertions
                (creditplanDeleteRes.body._id).should.equal(creditplanSaveRes.body._id);

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to delete an Creditplan if not signed in', function (done) {
    // Set Creditplan user
    creditplan.user = user;

    // Create new Creditplan model instance
    var creditplanObj = new Creditplan(creditplan);

    // Save the Creditplan
    creditplanObj.save(function () {
      // Try deleting Creditplan
      request(app).delete('/api/creditplans/' + creditplanObj._id)
        .expect(403)
        .end(function (creditplanDeleteErr, creditplanDeleteRes) {
          // Set message assertion
          (creditplanDeleteRes.body.message).should.match('User is not authorized');

          // Handle Creditplan error error
          done(creditplanDeleteErr);
        });

    });
  });

  it('should be able to get a single Creditplan that has an orphaned user reference', function (done) {
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

          // Save a new Creditplan
          agent.post('/api/creditplans')
            .send(creditplan)
            .expect(200)
            .end(function (creditplanSaveErr, creditplanSaveRes) {
              // Handle Creditplan save error
              if (creditplanSaveErr) {
                return done(creditplanSaveErr);
              }

              // Set assertions on new Creditplan
              (creditplanSaveRes.body.name).should.equal(creditplan.name);
              should.exist(creditplanSaveRes.body.user);
              should.equal(creditplanSaveRes.body.user._id, orphanId);

              // force the Creditplan to have an orphaned user reference
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

                    // Get the Creditplan
                    agent.get('/api/creditplans/' + creditplanSaveRes.body._id)
                      .expect(200)
                      .end(function (creditplanInfoErr, creditplanInfoRes) {
                        // Handle Creditplan error
                        if (creditplanInfoErr) {
                          return done(creditplanInfoErr);
                        }

                        // Set assertions
                        (creditplanInfoRes.body._id).should.equal(creditplanSaveRes.body._id);
                        (creditplanInfoRes.body.name).should.equal(creditplan.name);
                        should.equal(creditplanInfoRes.body.user, undefined);

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
      Creditplan.remove().exec(done);
    });
  });
});
