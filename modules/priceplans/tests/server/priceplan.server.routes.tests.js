'use strict';

var should = require('should'),
  request = require('supertest'),
  path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Priceplan = mongoose.model('Priceplan'),
  express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app,
  agent,
  credentials,
  user,
  priceplan;

/**
 * Priceplan routes tests
 */
describe('Priceplan CRUD tests', function () {

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

    // Save a user to the test db and create new Priceplan
    user.save(function () {
      priceplan = {
        name: 'Priceplan name'
      };

      done();
    });
  });

  it('should be able to save a Priceplan if logged in', function (done) {
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

        // Save a new Priceplan
        agent.post('/api/priceplans')
          .send(priceplan)
          .expect(200)
          .end(function (priceplanSaveErr, priceplanSaveRes) {
            // Handle Priceplan save error
            if (priceplanSaveErr) {
              return done(priceplanSaveErr);
            }

            // Get a list of Priceplans
            agent.get('/api/priceplans')
              .end(function (priceplansGetErr, priceplansGetRes) {
                // Handle Priceplans save error
                if (priceplansGetErr) {
                  return done(priceplansGetErr);
                }

                // Get Priceplans list
                var priceplans = priceplansGetRes.body;

                // Set assertions
                (priceplans[0].user._id).should.equal(userId);
                (priceplans[0].name).should.match('Priceplan name');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to save an Priceplan if not logged in', function (done) {
    agent.post('/api/priceplans')
      .send(priceplan)
      .expect(403)
      .end(function (priceplanSaveErr, priceplanSaveRes) {
        // Call the assertion callback
        done(priceplanSaveErr);
      });
  });

  it('should not be able to save an Priceplan if no name is provided', function (done) {
    // Invalidate name field
    priceplan.name = '';

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

        // Save a new Priceplan
        agent.post('/api/priceplans')
          .send(priceplan)
          .expect(400)
          .end(function (priceplanSaveErr, priceplanSaveRes) {
            // Set message assertion
            (priceplanSaveRes.body.message).should.match('Please fill Priceplan name');

            // Handle Priceplan save error
            done(priceplanSaveErr);
          });
      });
  });

  it('should be able to update an Priceplan if signed in', function (done) {
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

        // Save a new Priceplan
        agent.post('/api/priceplans')
          .send(priceplan)
          .expect(200)
          .end(function (priceplanSaveErr, priceplanSaveRes) {
            // Handle Priceplan save error
            if (priceplanSaveErr) {
              return done(priceplanSaveErr);
            }

            // Update Priceplan name
            priceplan.name = 'WHY YOU GOTTA BE SO MEAN?';

            // Update an existing Priceplan
            agent.put('/api/priceplans/' + priceplanSaveRes.body._id)
              .send(priceplan)
              .expect(200)
              .end(function (priceplanUpdateErr, priceplanUpdateRes) {
                // Handle Priceplan update error
                if (priceplanUpdateErr) {
                  return done(priceplanUpdateErr);
                }

                // Set assertions
                (priceplanUpdateRes.body._id).should.equal(priceplanSaveRes.body._id);
                (priceplanUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should be able to get a list of Priceplans if not signed in', function (done) {
    // Create new Priceplan model instance
    var priceplanObj = new Priceplan(priceplan);

    // Save the priceplan
    priceplanObj.save(function () {
      // Request Priceplans
      request(app).get('/api/priceplans')
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Array).and.have.lengthOf(1);

          // Call the assertion callback
          done();
        });

    });
  });

  it('should be able to get a single Priceplan if not signed in', function (done) {
    // Create new Priceplan model instance
    var priceplanObj = new Priceplan(priceplan);

    // Save the Priceplan
    priceplanObj.save(function () {
      request(app).get('/api/priceplans/' + priceplanObj._id)
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Object).and.have.property('name', priceplan.name);

          // Call the assertion callback
          done();
        });
    });
  });

  it('should return proper error for single Priceplan with an invalid Id, if not signed in', function (done) {
    // test is not a valid mongoose Id
    request(app).get('/api/priceplans/test')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'Priceplan is invalid');

        // Call the assertion callback
        done();
      });
  });

  it('should return proper error for single Priceplan which doesnt exist, if not signed in', function (done) {
    // This is a valid mongoose Id but a non-existent Priceplan
    request(app).get('/api/priceplans/559e9cd815f80b4c256a8f41')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'No Priceplan with that identifier has been found');

        // Call the assertion callback
        done();
      });
  });

  it('should be able to delete an Priceplan if signed in', function (done) {
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

        // Save a new Priceplan
        agent.post('/api/priceplans')
          .send(priceplan)
          .expect(200)
          .end(function (priceplanSaveErr, priceplanSaveRes) {
            // Handle Priceplan save error
            if (priceplanSaveErr) {
              return done(priceplanSaveErr);
            }

            // Delete an existing Priceplan
            agent.delete('/api/priceplans/' + priceplanSaveRes.body._id)
              .send(priceplan)
              .expect(200)
              .end(function (priceplanDeleteErr, priceplanDeleteRes) {
                // Handle priceplan error error
                if (priceplanDeleteErr) {
                  return done(priceplanDeleteErr);
                }

                // Set assertions
                (priceplanDeleteRes.body._id).should.equal(priceplanSaveRes.body._id);

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to delete an Priceplan if not signed in', function (done) {
    // Set Priceplan user
    priceplan.user = user;

    // Create new Priceplan model instance
    var priceplanObj = new Priceplan(priceplan);

    // Save the Priceplan
    priceplanObj.save(function () {
      // Try deleting Priceplan
      request(app).delete('/api/priceplans/' + priceplanObj._id)
        .expect(403)
        .end(function (priceplanDeleteErr, priceplanDeleteRes) {
          // Set message assertion
          (priceplanDeleteRes.body.message).should.match('User is not authorized');

          // Handle Priceplan error error
          done(priceplanDeleteErr);
        });

    });
  });

  it('should be able to get a single Priceplan that has an orphaned user reference', function (done) {
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

          // Save a new Priceplan
          agent.post('/api/priceplans')
            .send(priceplan)
            .expect(200)
            .end(function (priceplanSaveErr, priceplanSaveRes) {
              // Handle Priceplan save error
              if (priceplanSaveErr) {
                return done(priceplanSaveErr);
              }

              // Set assertions on new Priceplan
              (priceplanSaveRes.body.name).should.equal(priceplan.name);
              should.exist(priceplanSaveRes.body.user);
              should.equal(priceplanSaveRes.body.user._id, orphanId);

              // force the Priceplan to have an orphaned user reference
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

                    // Get the Priceplan
                    agent.get('/api/priceplans/' + priceplanSaveRes.body._id)
                      .expect(200)
                      .end(function (priceplanInfoErr, priceplanInfoRes) {
                        // Handle Priceplan error
                        if (priceplanInfoErr) {
                          return done(priceplanInfoErr);
                        }

                        // Set assertions
                        (priceplanInfoRes.body._id).should.equal(priceplanSaveRes.body._id);
                        (priceplanInfoRes.body.name).should.equal(priceplan.name);
                        should.equal(priceplanInfoRes.body.user, undefined);

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
      Priceplan.remove().exec(done);
    });
  });
});
