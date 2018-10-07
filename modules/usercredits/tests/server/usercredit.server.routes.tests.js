'use strict';

var should = require('should'),
  request = require('supertest'),
  path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Usercredit = mongoose.model('Usercredit'),
  express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app,
  agent,
  credentials,
  user,
  usercredit;

/**
 * Usercredit routes tests
 */
describe('Usercredit CRUD tests', function () {

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

    // Save a user to the test db and create new Usercredit
    user.save(function () {
      usercredit = {
        name: 'Usercredit name'
      };

      done();
    });
  });

  it('should be able to save a Usercredit if logged in', function (done) {
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

        // Save a new Usercredit
        agent.post('/api/usercredits')
          .send(usercredit)
          .expect(200)
          .end(function (usercreditSaveErr, usercreditSaveRes) {
            // Handle Usercredit save error
            if (usercreditSaveErr) {
              return done(usercreditSaveErr);
            }

            // Get a list of Usercredits
            agent.get('/api/usercredits')
              .end(function (usercreditsGetErr, usercreditsGetRes) {
                // Handle Usercredits save error
                if (usercreditsGetErr) {
                  return done(usercreditsGetErr);
                }

                // Get Usercredits list
                var usercredits = usercreditsGetRes.body;

                // Set assertions
                (usercredits[0].user._id).should.equal(userId);
                (usercredits[0].name).should.match('Usercredit name');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to save an Usercredit if not logged in', function (done) {
    agent.post('/api/usercredits')
      .send(usercredit)
      .expect(403)
      .end(function (usercreditSaveErr, usercreditSaveRes) {
        // Call the assertion callback
        done(usercreditSaveErr);
      });
  });

  it('should not be able to save an Usercredit if no name is provided', function (done) {
    // Invalidate name field
    usercredit.name = '';

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

        // Save a new Usercredit
        agent.post('/api/usercredits')
          .send(usercredit)
          .expect(400)
          .end(function (usercreditSaveErr, usercreditSaveRes) {
            // Set message assertion
            (usercreditSaveRes.body.message).should.match('Please fill Usercredit name');

            // Handle Usercredit save error
            done(usercreditSaveErr);
          });
      });
  });

  it('should be able to update an Usercredit if signed in', function (done) {
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

        // Save a new Usercredit
        agent.post('/api/usercredits')
          .send(usercredit)
          .expect(200)
          .end(function (usercreditSaveErr, usercreditSaveRes) {
            // Handle Usercredit save error
            if (usercreditSaveErr) {
              return done(usercreditSaveErr);
            }

            // Update Usercredit name
            usercredit.name = 'WHY YOU GOTTA BE SO MEAN?';

            // Update an existing Usercredit
            agent.put('/api/usercredits/' + usercreditSaveRes.body._id)
              .send(usercredit)
              .expect(200)
              .end(function (usercreditUpdateErr, usercreditUpdateRes) {
                // Handle Usercredit update error
                if (usercreditUpdateErr) {
                  return done(usercreditUpdateErr);
                }

                // Set assertions
                (usercreditUpdateRes.body._id).should.equal(usercreditSaveRes.body._id);
                (usercreditUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should be able to get a list of Usercredits if not signed in', function (done) {
    // Create new Usercredit model instance
    var usercreditObj = new Usercredit(usercredit);

    // Save the usercredit
    usercreditObj.save(function () {
      // Request Usercredits
      request(app).get('/api/usercredits')
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Array).and.have.lengthOf(1);

          // Call the assertion callback
          done();
        });

    });
  });

  it('should be able to get a single Usercredit if not signed in', function (done) {
    // Create new Usercredit model instance
    var usercreditObj = new Usercredit(usercredit);

    // Save the Usercredit
    usercreditObj.save(function () {
      request(app).get('/api/usercredits/' + usercreditObj._id)
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Object).and.have.property('name', usercredit.name);

          // Call the assertion callback
          done();
        });
    });
  });

  it('should return proper error for single Usercredit with an invalid Id, if not signed in', function (done) {
    // test is not a valid mongoose Id
    request(app).get('/api/usercredits/test')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'Usercredit is invalid');

        // Call the assertion callback
        done();
      });
  });

  it('should return proper error for single Usercredit which doesnt exist, if not signed in', function (done) {
    // This is a valid mongoose Id but a non-existent Usercredit
    request(app).get('/api/usercredits/559e9cd815f80b4c256a8f41')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'No Usercredit with that identifier has been found');

        // Call the assertion callback
        done();
      });
  });

  it('should be able to delete an Usercredit if signed in', function (done) {
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

        // Save a new Usercredit
        agent.post('/api/usercredits')
          .send(usercredit)
          .expect(200)
          .end(function (usercreditSaveErr, usercreditSaveRes) {
            // Handle Usercredit save error
            if (usercreditSaveErr) {
              return done(usercreditSaveErr);
            }

            // Delete an existing Usercredit
            agent.delete('/api/usercredits/' + usercreditSaveRes.body._id)
              .send(usercredit)
              .expect(200)
              .end(function (usercreditDeleteErr, usercreditDeleteRes) {
                // Handle usercredit error error
                if (usercreditDeleteErr) {
                  return done(usercreditDeleteErr);
                }

                // Set assertions
                (usercreditDeleteRes.body._id).should.equal(usercreditSaveRes.body._id);

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to delete an Usercredit if not signed in', function (done) {
    // Set Usercredit user
    usercredit.user = user;

    // Create new Usercredit model instance
    var usercreditObj = new Usercredit(usercredit);

    // Save the Usercredit
    usercreditObj.save(function () {
      // Try deleting Usercredit
      request(app).delete('/api/usercredits/' + usercreditObj._id)
        .expect(403)
        .end(function (usercreditDeleteErr, usercreditDeleteRes) {
          // Set message assertion
          (usercreditDeleteRes.body.message).should.match('User is not authorized');

          // Handle Usercredit error error
          done(usercreditDeleteErr);
        });

    });
  });

  it('should be able to get a single Usercredit that has an orphaned user reference', function (done) {
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

          // Save a new Usercredit
          agent.post('/api/usercredits')
            .send(usercredit)
            .expect(200)
            .end(function (usercreditSaveErr, usercreditSaveRes) {
              // Handle Usercredit save error
              if (usercreditSaveErr) {
                return done(usercreditSaveErr);
              }

              // Set assertions on new Usercredit
              (usercreditSaveRes.body.name).should.equal(usercredit.name);
              should.exist(usercreditSaveRes.body.user);
              should.equal(usercreditSaveRes.body.user._id, orphanId);

              // force the Usercredit to have an orphaned user reference
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

                    // Get the Usercredit
                    agent.get('/api/usercredits/' + usercreditSaveRes.body._id)
                      .expect(200)
                      .end(function (usercreditInfoErr, usercreditInfoRes) {
                        // Handle Usercredit error
                        if (usercreditInfoErr) {
                          return done(usercreditInfoErr);
                        }

                        // Set assertions
                        (usercreditInfoRes.body._id).should.equal(usercreditSaveRes.body._id);
                        (usercreditInfoRes.body.name).should.equal(usercredit.name);
                        should.equal(usercreditInfoRes.body.user, undefined);

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
      Usercredit.remove().exec(done);
    });
  });
});
