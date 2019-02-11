var express = require('express');
var bodyParser = require('body-parser');
var _ = require('underscore');
var db = require('./db.js');
var bcrypt = require('bcryptjs');
var middleware = require('./middleware.js')(db);
var shortid = require('shortid32');
var cors = require('cors');
var generator = require('generate-password');
const nodemailer = require('nodemailer');
var async = require('async');

var app = express();
var PORT = process.env.PORT || 3000;

//GLOBAL VARS
//Nodemailer Settings
let transporter = nodemailer.createTransport({
  host: 'mail.revisioncheck.com', port: 25, secure: false, // true for 465, false for other ports
  auth: {
    user: "noreply@revisioncheck.com", // generated ethereal user
    pass: "RevisionCheck2018" // generated ethereal password
  },
  tls: {
    rejectUnauthorized: false
  }
});
//Cors Settings
var corsOptions = {
  "origin": "*",
  "methods": "GET,HEAD,PUT,PATCH,POST, DELETE, OPTIONS",
  "preflightContinue": true,
  "optionsSuccessStatus": 204,
  "exposedHeaders": "Auth"
};

//USERS ------------------------------------------------------------------------
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(cors(corsOptions));

//Main Api Route
app.get('/api', function(req, res) {
  res.send('Welcome to the Revision Check API');
});

//USERS ------------------------------------------------------------------------
//POST Sign Up
app.post('/v1/users', function(req, res) {
  var body = _.pick(req.body, "email", "password", "name", "company");
  body.confirmEmailCode = generator.generate({length: 15, numbers: true});
  db.user.create(body).then(function(user) {

    nodemailer.createTestAccount((err, account) => {

      var text = "Welcome to <strong>Revision Check!</strong>\
          <br><br>\
          <p>Please click <a href='https://revisioncheck.com/verifylogin?confirmcode=" + user.confirmEmailCode + "'>here</a> to verify your account</p>\
          <p>Thank You</p>";
      // setup email data with unicode symbols
      let mailOptions = {
        from: '"Revision Check" <noreply@revisioncheck.com>', // sender address
        to: body.email, // list of receivers
        subject: 'Welcome to Revision Check', // Subject line
        html: text // html body
      };

      // send mail with defined transport object
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          return console.log(error);
        }
      });
    });
    res.json(user.toPublicJSON());
  }, function(e) {
    res.status(400).json(e);

  });
});
//GET User
app.get('/v1/users', middleware.requireAuthentication, function(req, res) {
  var where = {
    id: req.user.get('id')
  };

  db.user.findOne({where: where}).then(function(user) {
    res.json(user.toPublicJSON());
  }, function(e) {
    res.status(500).send();
  });

});
//POST Login
app.post('/v1/users/login', function(req, res) {
  var body = _.pick(req.body, "email", "password");

  db.user.isValid(body).then(function(user) {
    var token = user.generateToken('authentication');
    if (token) {
      res.header('Auth', token).json(user.toPublicJSON());
    } else {
      res.status(401).send();
    }
  }, function(e) {
    res.status(401).json(e);
    console.log(e);
  });
});
//POST Add Sub User
app.post('/v1/users/subuser', middleware.requireAuthentication, function(req, res) {
  var body = _.pick(req.body, "email");
  var attributes = {};

  if (body.hasOwnProperty('email')) {
    attributes.email = body.email;
    attributes.parentId = req.user.get('id');
    attributes.password = generator.generate({length: 20, numbers: true});
    attributes.confirmSubuserCode = generator.generate({length: 15, numbers: true});

    db.user.findOne({
      where: {
        id: attributes.parentId
      }
    }).then(function(user) {
      attributes.company = user.company;
    }, function(e) {
      res.status(500).send();
    }).then(function() {
      db.user.create(attributes).then(function(user) {
        nodemailer.createTestAccount((err, account) => {

          var text = "You have been invited to join <strong>Revision Check</strong> by " + req.user.get('email') + "\
                <br><br>\
                <p>Please click <a href='https://api.revisioncheck.com/v1/subusers/confirm/" + user.confirmSubuserCode + "'>here</a> to verify your account</p>\
                <p>Thank You</p>";
          // setup email data with unicode symbols
          let mailOptions = {
            from: '"Revision Check" <noreply@revisioncheck.com>', // sender address
            to: body.email, // list of receivers
            subject: 'Invite to join Revision Check', // Subject line
            html: text // html body
          };

          // send mail with defined transport object
          transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
              return console.log(error);
            }
          });
        });
        res.json(user.toPublicJSON());
      }, function(e) {
        res.status(400).json(e);
      });
    });
  }

});
//GET All Sub User
app.get('/v1/users/subuser', middleware.requireAuthentication, function(req, res) {
  var where = {
    parentId: req.user.get('id')
  };

  db.user.findAll({where: where}).then(function(users) {
    usersArray = []
    users.forEach((user) => {
      usersArray.push(user.toPublicJSON());
    });
    res.json(usersArray);
  }, function(e) {
    res.status(500).send();
  });
});
//POST Resend Sub User Email
app.post('/v1/users/subuser/resend-email', middleware.requireAuthentication, function(req, res) {
  var body = _.pick(req.body, "email");
  var attributes = {};

  if (body.hasOwnProperty('email')) {

    db.user.findOne({
      where: {
        email: body.email
      }
    }).then(function(user) {
      nodemailer.createTestAccount((err, account) => {

        var text = "You have been invited to join <strong>Revision Check</strong> by " + body.email + "\
            <br><br>\
            <p>Please click <a href='https://revisioncheck.com/newteammember.php?joinCode=9pS8HDHeh9ngsSM" + user.confirmSubuserCode + "'>here</a> to verify your account</p>\
            <p>Thank You</p>";
        // setup email data with unicode symbols
        let mailOptions = {
          from: '"Revision Check" <noreply@revisioncheck.com>', // sender address
          to: 'sshodges@gmail.com', // list of receivers
          subject: 'Invite to join Revision Check', // Subject line
          html: text // html body
        };

        // send mail with defined transport object
        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            return console.log(error);
          }
        });
      });
      res.json(user.toPublicJSON());
    }, function(e) {
      res.status(500).send();
    });
  }
});
//GET Retrieve Sub User by :id
app.get('/v1/users/subuser/:id', function(req, res) {
  var where = {
    id: parseInt(req.params.id, 10),
    parentId: req.user.get('id')
  };

  db.user.findOne({where: where}).then(function(user) {
    res.json(user.toPublicJSON());
  }, function(e) {
    res.status(500).send();
  });

});
//PUT Confirm Sub User Account
app.put('/v1/users/subuser/confirm/:confirmcode', function(req, res) {
  var body = _.pick(req.body, "name", "password");
  var attributes = {};
  attributes.confirmSubuserCode = null;
  attributes.active = true;
  attributes.name = body.name;
  attributes.password = body.password;

  db.user.findOne({
    where: {
      confirmSubuserCode: req.params.confirmcode
    }
  }).then(function(user) {
    if (user) {
      user.update(attributes).then(function(user) {
        res.json(user.toPublicJSON());
      }, function(e) {
        res.status(400).json(e);
      });
    } else {
      res.status(404).send();
    }
  }, function(e) {
    res.status(500).send();
  });
});
//PUT Update Sub User (Delete, Company)
app.put('/v1/users/subuser/:id', middleware.requireAuthentication, function(req, res) {
  var body = _.pick(req.body, "company", "name");

  db.user.findOne({
    where: {
      id: req.params.id
    }
  }).then(function(user) {
    if (user) {
      user.update(body).then(function(user) {
        res.json(user.toPublicJSON());
      }, function(e) {
        res.status(400).json(e);
      });
    } else {
      res.status(404).send();
    }
  }, function(e) {
    res.status(500).send();
  });
});
//PUT Confirm Email on New Account
app.put('/v1/users/confirm/:confirmcode', function(req, res) {

  var attributes = {};
  attributes.confirmEmailCode = null;
  attributes.active = true;

  db.user.findOne({
    where: {
      confirmEmailCode: req.params.confirmcode
    }
  }).then(function(user) {
    if (user) {
      user.update(attributes).then(function(user) {
        res.json(user.toPublicJSON());
      }, function(e) {
        res.status(400).json(e);
      });
    } else {
      res.status(404).send();
    }
  }, function(e) {
    res.status(500).send();
  });
});
//POST Forgot Password
app.put('/v1/users/forgot-password', function(req, res) {
  var body = _.pick(req.body, "email");
  var attributes = {};
  attributes.confirmForgotCode = generator.generate({length: 20, numbers: true});

  db.user.findOne({
    where: {
      email: body.email
    }
  }).then(function(user) {
    if (user) {
      user.update(attributes).then(function(user) {
        nodemailer.createTestAccount((err, account) => {

          var text = "Forgot your password for <strong>Revision Check?</strong>\
                    <br><br>\
                    <p>Please click <a href='https://revisioncheck.com/passwordreset?resetCode=" + user.confirmForgotCode + "'>here</a> to reset.</p>\
                    <p>Thank You</p>";
          // setup email data with unicode symbols
          let mailOptions = {
            from: '"Revision Check" <noreply@revisioncheck.com>', // sender address
            to: body.email, // list of receivers
            subject: 'Forgot Password | Revision Check', // Subject line
            html: text // html body
          };

          // send mail with defined transport object
          transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
              return console.log(error);
            }
          });
        });
        res.json(user.toPublicJSON());
      }, function(e) {
        res.status(400).json(e);
      });
    } else {
      res.status(404).send();
    }
  }, function(e) {
    res.status(500).send();
  });
});
//PUT Confirm Forgot Password
app.put('/v1/users/forgot-password/:confirmcode', function(req, res) {
  var body = _.pick(req.body, "password");
  var attributes = {};
  attributes.password = body.password;
  attributes.confirmForgotCode = null;

  db.user.findOne({
    where: {
      confirmForgotCode: req.params.confirmcode
    }
  }).then(function(user) {
    if (user) {
      user.update(attributes).then(function(user) {
        res.json(user.toPublicJSON());
      }, function(e) {
        res.status(400).json(e);
      });
    } else {
      res.status(404).send();
    }
  }, function(e) {
    res.status(500).send();
  });
});
//PUT Change Password
app.put('/v1/users/change-password', middleware.requireAuthentication, function(req, res) {
  var body = _.pick(req.body, "oldPassword", "newPassword");
  body.id = req.user.get('id');
  attributes = {};

  attributes.password = body.newPassword;

  db.user.isValidChange(body).then(function(user) {
    user.update(attributes).then(function(user) {
      res.json(user.toPublicJSON());
    })
  }, function(e) {
    res.status(401).send();
  });

});
//PUT Update User Details
app.put('/v1/users', middleware.requireAuthentication, function(req, res) {
  var body = _.pick(req.body, "company", "name");
  db.user.findOne({
    where: {
      id: req.user.get('id')
    }
  }).then(function(user) {
    if (user) {
      user.update(body).then(function(user) {
        res.json(user.toPublicJSON());
        attributes = {};
        attributes.company = body.company;
        db.user.update(attributes, {
          where: {
            parentId: req.user.get('id')
          }
        });
      }, function(e) {
        res.status(400).json(e);
      });
    } else {
      res.status(404).send();
    }
  }, function(e) {
    res.status(500).send();
  });
});

//FOLDERS ----------------------------------------------------------------------
//GET All Folders with :parent
app.get('/v1/folders/parent/:parent', middleware.requireAuthentication, function(req, res) {
  var query = req.query;
  var where = {
    userId: req.user.get('id'),
    parent: parseInt(req.params.parent, 10)
  };

  db.folder.findAll({where: where}).then(function(folders) {
    res.json(folders);
  }, function(e) {
    res.status(500).send();
  });
});
//GET All Folders with :id
app.get('/v1/folders/:id', middleware.requireAuthentication, function(req, res) {
  var query = req.query;
  var where = {
    userId: req.user.get('id'),
    id: parseInt(req.params.id, 10)
  };

  db.folder.findAll({where: where}).then(function(folders) {
    res.json(folders);
  }, function(e) {
    res.status(500).send();
  });
});
//GET Search Folder Names for {searchTerm}
app.get('/v1/folders/search/:searchTerm', middleware.requireAuthentication, function(req, res) {
  var searchTerm = unescape(req.params.searchTerm);

  db.folder.findAll({
    limit: 10,
    where: {
      userId: req.user.get('id'),
      name: db.Sequelize.where(db.Sequelize.fn('LOWER', db.Sequelize.col('name')), 'LIKE', '%' + searchTerm + '%')
    }
  }).then(function(folders) {
    res.json(folders);
  }),
  function(e) {
    res.status(500).send();
  };
});
//POST Add New Folder
app.post('/v1/folders', middleware.requireAuthentication, function(req, res) {
  var body = _.pick(req.body, "name", "parent");
  var attributes = {};

  if (body.hasOwnProperty('name')) {
    attributes.name = body.name;
    attributes.parent = body.parent;
  }

  db.folder.create(attributes).then(function(folder) {
    req.user.addFolder(folder).then(function() {
      return folder.reload();
    }).then(function(updatedFolder) {
      res.json(updatedFolder.toJSON());
    });
  }, function(e) {
    res.status(400).json(e);
  });
});
//PUT Edit Folder (Name, Parent)
app.put('/v1/folders/:id', middleware.requireAuthentication, function(req, res) {
  var folderId = parseInt(req.params.id, 10);
  var body = _.pick(req.body, "name", "parent");
  var attributes = {};

  if (body.hasOwnProperty('name')) {
    attributes.name = body.name;
  }
  if (body.hasOwnProperty('parent')) {
    attributes.parent = body.parent;
  }

  db.folder.findOne({
    where: {
      id: folderId,
      userId: req.user.get('id')
    }
  }).then(function(folder) {
    if (folder) {
      folder.update(attributes).then(function(folder) {
        res.json(folder.toJSON());
      }, function(e) {
        res.status(400).json(e);
      });
    } else {
      res.status(404).send();
    }
  }, function(e) {
    res.status(500).send();
  });
});
//POST Get All Children Folders
app.post('/v1/folders/children/:id', middleware.requireAuthentication, function(req, res) {
  var folderId = parseInt(req.params.id, 10);
  var ids = [folderId];
  var types = ["folder"];
  var count = 0;

  async.whilst(function() {
    return count <= ids.length;
  }, function(next) {
    where = {
      parent: ids[count]
    }
    db.folder.findAll({where}).then(function(folders) {
      folders.forEach((folder) => {
        ids.push(folder.id);
        types.push("folder");
      });
      count++;
      next();
    });
  }, function(err) {
    attributes = {}
    attributes.ids = ids
    res.json(ids);
  });

}, function(e) {
  res.status(500).send();
});
//DELETE Delete Folder
app.delete('/v1/folders/:id', middleware.requireAuthentication, function(req, res) {
  var folderId = parseInt(req.params.id, 10);
  db.folder.destroy({
    where: {
      id: folderId
    }
  }).then(function(folder) {
    res.json({"message": "folder deleted"});
  });
});

//DOCUMENTS --------------------------------------------------------------------
//GET All DOCUMENTS
app.get('/v1/documents', middleware.requireAuthentication, function(req, res) {
  db.document.findAll({
    where: {
      userId: req.user.get('id'),
      status: true
    }
  }).then(function(documents) {
    if (!!documents) {
      res.json(documents);
    } else {
      res.status(404).send();
    }
  }, function(e) {
    res.status(500).send();
  });
});
//GET All Archived DOCUMENTS
app.get('/v1/archives', middleware.requireAuthentication, function(req, res) {
  db.document.findAll({
    where: {
      userId: req.user.get('id'),
      status: false
    }
  }).then(function(documents) {
    if (!!documents) {
      res.json(documents);
    } else {
      res.status(404).send();
    }
  }, function(e) {
    res.status(500).send();
  });
});
//GET All Documents with :parent
app.get('/v1/documents/parent/:parent', middleware.requireAuthentication, function(req, res) {
  var where = {
    userId: req.user.get('id'),
    parent: parseInt(req.params.parent, 10),
    status: true
  };

  db.document.findAll({where: where}).then(function(documents) {
    res.json(documents);
  }, function(e) {
    res.status(500).send();
  });
});
//GET All Documents with :id
app.get('/v1/documents/:id', function(req, res) {
  var documentId = parseInt(req.params.id, 10);

  db.document.findOne({
    where: {
      id: documentId,
      status: true
    }
  }).then(function(document) {
    if (!!document) {
      res.json(document.toJSON());
    } else {
      res.status(404).send();
    }
  }, function(e) {
    res.status(500).send();
  });
});
//GET Search Document Names for {searchTerm}
app.get('/v1/documents/search/:searchTerm', middleware.requireAuthentication, function(req, res) {
  var searchTerm = unescape(req.params.searchTerm);

  db.document.findAll({
    limit: 10,
    where: {
      userId: req.user.get('id'),
      name: db.Sequelize.where(db.Sequelize.fn('LOWER', db.Sequelize.col('name')), 'LIKE', '%' + searchTerm + '%')
    }
  }).then(function(documents) {
    res.json(documents);
  }),
  function(e) {
    res.status(500).send();
  };
});
//GET Search Document & Folder Names for {searchTerm}
app.get('/v1/documents/folders/search/:searchTerm', middleware.requireAuthentication, function(req, res) {
  var searchTerm = unescape(req.params.searchTerm);
  var where = {
      userId: req.user.get('id'),
      name: db.Sequelize.where(db.Sequelize.fn('LOWER', db.Sequelize.col('name')), 'LIKE', '%' + searchTerm + '%')
    }

    db.document.findAll({limit: 10, where: where}).then(function(documents) {
      db.folder.findAll({limit: 10, where: where}).then(function(folders) {
        searchArr = {}
        searchArr.documents = documents;
        searchArr.folders = folders
        res.json(searchArr);
      }),
      function(e) {
        res.status(500).send();
      };
    }),
    function(e) {
      res.status(500).send();
    };
  });
  //POST Add New Document
  app.post('/v1/documents', middleware.requireAuthentication, function(req, res) {
    var body = _.pick(req.body, "name", "parent");
    var attributes = {};

    if (body.hasOwnProperty('name')) {
      attributes.name = body.name;
    }

    if (body.hasOwnProperty('parent')) {
      attributes.parent = body.parent;
    }

    db.document.create(attributes).then(function(document) {
      req.user.addDocument(document).then(function() {
        return document.reload();
      }).then(function(updatedDocument) {
        res.json(document.toJSON());
      });
    }, function(e) {
      res.status(400).json(e);
    });
  });
  //PUT Update Document (Name, Status, Parent, etc)
  app.put('/v1/documents/:id', middleware.requireAuthentication, function(req, res) {
    var documentId = parseInt(req.params.id, 10);
    var body = _.pick(req.body, "name", "parent", "status");
    var attributes = {};

    if (body.hasOwnProperty('name')) {
      attributes.name = body.name;
    }
    if (body.hasOwnProperty('parent')) {
      attributes.parent = body.parent;
    }
    if (body.hasOwnProperty('status')) {
      attributes.status = body.status;
    }

    db.document.findOne({
      where: {
        id: documentId,
        userId: req.user.get('id')
      }
    }).then(function(document) {
      if (document) {
        document.update(attributes).then(function(document) {
          res.json(document.toJSON());
        }, function(e) {
          res.status(400).json(e);
        });
      } else {
        res.status(404).send();
      }
    }, function(e) {
      res.status(500).send();
    });
  });
  //PUT Archive Document with parent
  app.put('/v1/documents/parent/:parent', middleware.requireAuthentication, function(req, res) {
    var parentId = parseInt(req.params.parent, 10);
    var attributes = {};
    attributes.status = false;

    db.document.update({
      status: false,
      parent: 0
    }, {
      where: {
        parent: parentId
      }
    }).then(function() {
      res.json({"message": "documents archived"});
    }, function(e) {
      res.status(500).send();
    });
  });

  //REVISIONS --------------------------------------------------------------------
  //GET Revisions by :documentId
  app.get('/v1/revisions/:documentId', middleware.requireAuthentication, function(req, res) {
    var documentId = parseInt(req.params.documentId, 10);
    var where = {
      documentId: documentId,
      userId: req.user.get('id')
    };

    db.revision.findAll({where: where}).then(function(revisions) {
      res.json(revisions);
    }, function(e) {
      res.status(500).send();
    });
  });
  //PUT Update Revision
  app.put('/v1/revisions/:id', middleware.requireAuthentication, function(req, res) {
    var id = parseInt(req.params.id, 10);
    var body = _.pick(req.body, "name");
    var attributes = {};

    if (body.hasOwnProperty('name')) {
      attributes.name = body.name;
    }

    db.revision.findOne({
      where: {
        id: id,
        userId: req.user.get('id')
      }
    }).then(function(revision) {
      if (revision) {
        revision.update(attributes).then(function(revision) {
          res.json(revision.toJSON());
        }, function(e) {
          res.status(400).json(e);
        });
      } else {
        res.status(404).send();
      }
    }, function(e) {
      res.status(500).send();
    });
  });
  //POST Add New Revision
  app.post('/v1/revisions/:documentId', middleware.requireAuthentication, function(req, res) {
    var documentId = parseInt(req.params.documentId, 10);
    var uCode = shortid.generate();
    var body = _.pick(req.body, "name");
    var attributes = {};

    if (body.hasOwnProperty('name')) {
      attributes.name = body.name;
      attributes.latest = true;
      attributes.documentId = documentId;
      attributes.uniqueCode = uCode;
    }

    //Check if Revision name exists
    db.revision.count({
      where: {
        documentId: documentId,
        name: attributes.name
      }
    }).then(function(nameCount) {
      if (nameCount == 0) {
        //Check if unique code exists
        db.revision.count({
          where: {
            uniqueCode: uCode
          }
        }).then(function(uniqueCode) {
          if (uniqueCode == 0) {
            //Change all other revisions to false
            db.revision.update({
              latest: false
            }, {
              where: {
                documentId: documentId,
                userId: req.user.get('id')
              },
              returning: true,
              plain: true
            }).then(function(revisions) {
              if (revisions) {} else {
                res.status(404).send();
              }
            });

            //Insert revision into DB
            db.revision.create(attributes).then(function(revision) {
              req.user.addRevision(revision).then(function() {
                return revision.reload();
              }).then(function(updatedRevision) {
                res.json(revision.toJSON());
              });
            }, function(e) {
              res.status(400).json(e);
            });

          } else {
            var errors = {
              error: {
                text: "randomly generated revision code already exists, try again"
              }
            };
            res.json(errors);
          }
        });
      } else {
        var errors = {
          error: {
            text: "revision name already exists for this document"
          }
        };
        res.json(errors);
      }
    });

  });
  //GET Search Revisions by {revcode}
  app.get('/v1/revcodes/:revcode', cors(), function(req, res) {
    var revCode = req.params.revcode;
    var where = {
      uniqueCode: revCode
    };

    db.revision.findOne({where: where}).then(function(revision) {
      res.json(revision);
    }, function(e) {
      res.status(500).send();
    });
  });

  //Misc. ------------------------------------------------------------------------
  //GET Find All Breadcrumbs (Maybe not needed?)

  //Run App
  db.sequelize.sync({}).then(function() {
    app.listen(PORT, function() {
      console.log('Express Listening on Port ' + PORT);
    });
  });
