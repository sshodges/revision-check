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
var md5 = require('md5');

var app = express();
var PORT = process.env.PORT || 3000;

const server = require('http').createServer(app);
var io = require('socket.io')(server, {
  pingTimeout: 60000
});

io.on('connection', function(socket) {
  socket.emit('connection:sid', socket.id);
  socket.on('join', function(room) {
    socket.join(room);
  });
});

//GLOBAL VARS
//Nodemailer Settings
let transporter = nodemailer.createTransport({
  host: 'mail.revisioncheck.com',
  port: 25,
  secure: false, // true for 465, false for other ports
  auth: {
    user: 'noreply@revisioncheck.com', // generated ethereal user
    pass: 'RevisionCheck2018' // generated ethereal password
  },
  tls: {
    rejectUnauthorized: false
  }
});
//Cors Settings
var corsOptions = {
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST, DELETE, OPTIONS',
  preflightContinue: true,
  optionsSuccessStatus: 204,
  exposedHeaders: 'Auth'
};

//USERS ------------------------------------------------------------------------
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));
app.use(cors(corsOptions));

//Main Api Route
app.get('/api', function(req, res) {
  res.send('Welcome to the Revision Check API');
});

//USERS ------------------------------------------------------------------------
//POST Sign Up
app.post('/v1/users', function(req, res) {
  var body = _.pick(req.body, 'email', 'password', 'name', 'company');
  body.confirmEmailCode = generator.generate({ length: 15, numbers: true });
  db.user.create(body).then(
    function(user) {
      nodemailer.createTestAccount((err, account) => {
        var text =
          `
      <!DOCTYPE html>
      <html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">

      <head>
          <title></title>
          <!--[if !mso]><!-- -->
          <meta http-equiv="X-UA-Compatible" content="IE=edge">
          <!--<![endif]-->
          <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style type="text/css">
              #outlook a {
                  padding: 0;
              }

              .ReadMsgBody {
                  width: 100%;
              }

              .ExternalClass {
                  width: 100%;
              }

              .ExternalClass * {
                  line-height: 100%;
              }

              body {
                  margin: 0;
                  padding: 0;
                  -webkit-text-size-adjust: 100%;
                  -ms-text-size-adjust: 100%;
              }

              table,
              td {
                  border-collapse: collapse;
                  mso-table-lspace: 0pt;
                  mso-table-rspace: 0pt;
              }

              img {
                  border: 0;
                  height: auto;
                  line-height: 100%;
                  outline: none;
                  text-decoration: none;
                  -ms-interpolation-mode: bicubic;
              }

              p {
                  display: block;
                  margin: 13px 0;
              }
          </style>
          <!--[if !mso]><!-->
          <style type="text/css">
              @media only screen and (max-width:480px) {
                  @-ms-viewport {
                      width: 320px;
                  }
                  @viewport {
                      width: 320px;
                  }
              }
          </style>
          <!--<![endif]-->
          <!--[if mso]><xml>  <o:OfficeDocumentSettings>    <o:AllowPNG/>    <o:PixelsPerInch>96</o:PixelsPerInch>  </o:OfficeDocumentSettings></xml><![endif]-->
          <!--[if lte mso 11]><style type="text/css">  .outlook-group-fix {    width:100% !important;  }</style><![endif]-->
          <!--[if !mso]><!-->
          <link href="https://fonts.googleapis.com/css?family=Ubuntu:300,400,500,700" rel="stylesheet" type="text/css">
          <style type="text/css">
              @import url(https://fonts.googleapis.com/css?family=Ubuntu:300,400,500,700);
          </style>
          <!--<![endif]-->
          <style type="text/css">
              @media only screen and (min-width:480px) {
                  .mj-column-per-100 {
                      width: 100%!important;
                  }
              }
          </style>
      </head>

      <body style="background: #FFFFFF;">
          <div class="mj-container" style="background-color:#FFFFFF;">
              <!--[if mso | IE]>      <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="600" align="center" style="width:600px;">        <tr>          <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">      <![endif]-->
              <div style="margin:0px auto;max-width:600px;">
                  <table role="presentation" cellpadding="0" cellspacing="0" style="font-size:0px;width:100%;" align="center" border="0">
                      <tbody>
                          <tr>
                              <td style="text-align:center;vertical-align:top;direction:ltr;font-size:0px;padding:9px 0px 9px 0px;">
                                  <!--[if mso | IE]>      <table role="presentation" border="0" cellpadding="0" cellspacing="0">        <tr>          <td style="vertical-align:top;width:600px;">      <![endif]-->
                                  <div class="mj-column-per-100 outlook-group-fix" style="vertical-align:top;display:inline-block;direction:ltr;font-size:13px;text-align:left;width:100%;">
                                      <table role="presentation" cellpadding="0" cellspacing="0" style="vertical-align:top;" width="100%" border="0">
                                          <tbody>
                                              <tr>
                                                  <td style="word-wrap:break-word;font-size:0px;padding:18px 6px 0px 6px;" align="left">
                                                      <table role="presentation" cellpadding="0" cellspacing="0" style="border-collapse:collapse;border-spacing:0px;" align="left" border="0">
                                                          <tbody>
                                                              <tr>
                                                                  <td style="width:354px;">
                                                                      <a href="https://revisioncheck.com" target="_blank"><img alt="" height="auto" src="https://revisioncheck.com/assets/img/logo.png" style="border:none;border-radius:0px;display:block;font-size:13px;outline:none;text-decoration:none;width:100%;height:auto;" width="354"></a>
                                                                  </td>
                                                              </tr>
                                                          </tbody>
                                                      </table>
                                                  </td>
                                              </tr>
                                          </tbody>
                                      </table>
                                  </div>
                                  <!--[if mso | IE]>      </td></tr></table>      <![endif]-->
                              </td>
                          </tr>
                      </tbody>
                  </table>
              </div>
              <!--[if mso | IE]>      </td></tr></table>      <![endif]-->
              <!--[if mso | IE]>      <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="600" align="center" style="width:600px;">        <tr>          <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">      <![endif]-->
              <div style="margin:0px auto;max-width:600px;">
                  <table role="presentation" cellpadding="0" cellspacing="0" style="font-size:0px;width:100%;" align="center" border="0">
                      <tbody>
                          <tr>
                              <td style="text-align:center;vertical-align:top;direction:ltr;font-size:0px;padding:9px 0px 9px 0px;">
                                  <!--[if mso | IE]>      <table role="presentation" border="0" cellpadding="0" cellspacing="0">        <tr>          <td style="vertical-align:top;width:600px;">      <![endif]-->
                                  <div class="mj-column-per-100 outlook-group-fix" style="vertical-align:top;display:inline-block;direction:ltr;font-size:13px;text-align:left;width:100%;">
                                      <table role="presentation" cellpadding="0" cellspacing="0" style="vertical-align:top;" width="100%" border="0">
                                          <tbody>
                                              <tr>
                                                  <td style="word-wrap:break-word;font-size:0px;padding:10px 10px 0px 12px;" align="left">
                                                      <div style="cursor:auto;color:#000000;font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:11px;line-height:1.5;text-align:left;">
                                                          <h3 style="line-height: 100%;"><span style="font-size:16px; margin-bottom: 15px;">Hello,</span></h3>
                                                          <h3 style="line-height: 100%;"><span style="font-size:20px; margin-bottom: 15px;">Thanks for joining <span style="color:#4caf50;">Revision</span> Check!</span></h3>
                                                          <h3 style="line-height: 100%;"><span style="font-size:16px;">Please confirm your email address to activate your account.</span></h3></div>
                                                  </td>
                                              </tr>
                                              <tr>
                                                  <td style="word-wrap:break-word;font-size:0px;padding:12px 12px 12px 12px;" align="left">
                                                      <table role="presentation" cellpadding="0" cellspacing="0" style="border-collapse:separate;width:auto;" align="left" border="0">
                                                          <tbody>
                                                              <tr>
                                                                  <td style="border:0px solid #000;border-radius:5px;color:#fff;cursor:auto;padding:10px 30px;" align="center" valign="middle" bgcolor="#4CAF50"><a href="https://revisioncheck.com/verifylogin?confirmcode=` +
          user.confirmEmailCode +
          `" style="text-decoration:none;background:#4CAF50;color:#fff;font-family:Arial, sans-serif;font-size:15px;font-weight:normal;line-height:120%;text-transform:none;margin:0px;" target="_blank">Confirm my email</a></td>
                                                              </tr>
                                                          </tbody>
                                                      </table>
                                                  </td>
                                              </tr>
                                          </tbody>
                                      </table>
                                  </div>
                                  <!--[if mso | IE]>      </td></tr></table>      <![endif]-->
                              </td>
                          </tr>
                      </tbody>
                  </table>
              </div>
              <!--[if mso | IE]>      </td></tr></table>      <![endif]-->
          </div>
      </body>

      </html>


      `;

        // var text = "Welcome to <strong>Revision Check!</strong>\
        //     <br><br>\
        //     <p>Please click <a href='https://revisioncheck.com/verifylogin?confirmcode=" + user.confirmEmailCode + "'>here</a> to verify your account</p>\
        //     <p>Thank You</p>";

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
    },
    function(e) {
      res.status(400).json(e);
    }
  );
});
//GET User
app.get('/v1/users', middleware.requireAuthentication, function(req, res) {
  var where = {
    id: req.user.get('id')
  };

  db.user.findOne({ where: where }).then(
    function(user) {
      res.json(user.toPublicJSON());
    },
    function(e) {
      res.status(500).send();
    }
  );
});
//POST Login
app.post('/v1/users/login', function(req, res) {
  var body = _.pick(req.body, 'email', 'password');

  db.user.isValid(body).then(
    function(user) {
      var token = user.generateToken('authentication');
      if (token) {
        res.header('Auth', token).json(user.toPublicJSON());
      } else {
        res.status(401).send();
      }
    },
    function(e) {
      res.status(401).json({ message: e });
      console.log(e);
    }
  );
});
//POST Add Sub User
app.post('/v1/users/subuser', middleware.requireAuthentication, function(
  req,
  res
) {
  var body = _.pick(req.body, 'email');
  var attributes = {};

  if (body.hasOwnProperty('email')) {
    attributes.email = body.email;
    attributes.parentId = req.user.get('id');
    attributes.password = generator.generate({ length: 20, numbers: true });
    attributes.confirmSubuserCode = generator.generate({
      length: 15,
      numbers: true
    });

    db.user
      .findOne({
        where: {
          id: attributes.parentId
        }
      })
      .then(
        function(user) {
          attributes.company = user.company;
        },
        function(e) {
          res.status(500).send();
        }
      )
      .then(function() {
        db.user.create(attributes).then(
          function(user) {
            nodemailer.createTestAccount((err, account) => {
              var text =
                'You have been invited to join <strong>Revision Check</strong> by ' +
                req.user.get('email') +
                "\
                <br><br>\
                <p>Please click <a href='https://api.revisioncheck.com/v1/subusers/confirm/" +
                user.confirmSubuserCode +
                "'>here</a> to verify your account</p>\
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
          },
          function(e) {
            res.status(400).json(e);
          }
        );
      });
  }
});
//GET All Sub User
app.get('/v1/users/subuser', middleware.requireAuthentication, function(
  req,
  res
) {
  var where = {
    parentId: req.user.get('id')
  };

  db.user.findAll({ where: where }).then(
    function(users) {
      usersArray = [];
      users.forEach(user => {
        usersArray.push(user.toPublicJSON());
      });
      res.json(usersArray);
    },
    function(e) {
      res.status(500).send();
    }
  );
});
//POST Resend Sub User Email
app.post(
  '/v1/users/subuser/resend-email',
  middleware.requireAuthentication,
  function(req, res) {
    var body = _.pick(req.body, 'email');
    var attributes = {};

    if (body.hasOwnProperty('email')) {
      db.user
        .findOne({
          where: {
            email: body.email
          }
        })
        .then(
          function(user) {
            nodemailer.createTestAccount((err, account) => {
              var text =
                'You have been invited to join <strong>Revision Check</strong> by ' +
                body.email +
                "\
            <br><br>\
            <p>Please click <a href='https://revisioncheck.com/newteammember.php?joinCode=9pS8HDHeh9ngsSM" +
                user.confirmSubuserCode +
                "'>here</a> to verify your account</p>\
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
          },
          function(e) {
            res.status(500).send();
          }
        );
    }
  }
);
//GET Retrieve Sub User by :id
app.get('/v1/users/subuser/:id', function(req, res) {
  var where = {
    id: parseInt(req.params.id, 10),
    parentId: req.user.get('id')
  };

  db.user.findOne({ where: where }).then(
    function(user) {
      res.json(user.toPublicJSON());
    },
    function(e) {
      res.status(500).send();
    }
  );
});

//GET Get Logged in User
app.get('/v1/users', middleware.requireAuthentication, function(req, res) {
  db.user
    .findOne({
      where: {
        id: req.user.get('id')
      }
    })
    .then(
      function(user) {
        if (user) {
          user.update(attributes).then(
            function(user) {
              res.json(user.toPublicJSON());
            },
            function(e) {
              res.status(400).json(e);
            }
          );
        } else {
          res.status(404).send();
        }
      },
      function(e) {
        res.status(500).send();
      }
    );
});

//PUT Confirm Sub User Account
app.put('/v1/users/subuser/confirm/:confirmcode', function(req, res) {
  var body = _.pick(req.body, 'name', 'password');
  var attributes = {};
  attributes.confirmSubuserCode = null;
  attributes.active = true;
  attributes.name = body.name;
  attributes.password = body.password;

  db.user
    .findOne({
      where: {
        confirmSubuserCode: req.params.confirmcode
      }
    })
    .then(
      function(user) {
        if (user) {
          user.update(attributes).then(
            function(user) {
              res.json(user.toPublicJSON());
            },
            function(e) {
              res.status(400).json(e);
            }
          );
        } else {
          res.status(404).send();
        }
      },
      function(e) {
        res.status(500).send();
      }
    );
});
//PUT Update Sub User (Delete, Company)
app.put('/v1/users/subuser/:id', middleware.requireAuthentication, function(
  req,
  res
) {
  var body = _.pick(req.body, 'company', 'name');

  db.user
    .findOne({
      where: {
        id: req.params.id
      }
    })
    .then(
      function(user) {
        if (user) {
          user.update(body).then(
            function(user) {
              res.json(user.toPublicJSON());
            },
            function(e) {
              res.status(400).json(e);
            }
          );
        } else {
          res.status(404).send();
        }
      },
      function(e) {
        res.status(500).send();
      }
    );
});
//PUT Confirm Email on New Account
app.put('/v1/users/confirm/:confirmcode', function(req, res) {
  var attributes = {};
  attributes.confirmEmailCode = null;
  attributes.active = true;

  db.user
    .findOne({
      where: {
        confirmEmailCode: req.params.confirmcode
      }
    })
    .then(
      function(user) {
        if (user) {
          user.update(attributes).then(
            function(user) {
              res.json(user.toPublicJSON());
            },
            function(e) {
              res.status(400).json(e);
            }
          );
        } else {
          res.status(404).send();
        }
      },
      function(e) {
        res.status(500).send();
      }
    );
});
//POST Forgot Password
app.put('/v1/users/forgot-password', function(req, res) {
  var body = _.pick(req.body, 'email');
  var attributes = {};
  attributes.confirmForgotCode = generator.generate({
    length: 20,
    numbers: true
  });

  db.user
    .findOne({
      where: {
        email: body.email
      }
    })
    .then(
      function(user) {
        if (user) {
          user.update(attributes).then(
            function(user) {
              nodemailer.createTestAccount((err, account) => {
                var text =
                  "Forgot your password for <strong>Revision Check?</strong>\
                    <br><br>\
                    <p>Please click <a href='https://revisioncheck.com/passwordreset?resetCode=" +
                  user.confirmForgotCode +
                  "'>here</a> to reset.</p>\
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
            },
            function(e) {
              res.status(400).json(e);
            }
          );
        } else {
          res.status(404).send();
        }
      },
      function(e) {
        res.status(500).send();
      }
    );
});
//PUT Confirm Forgot Password
app.put('/v1/users/forgot-password/:confirmcode', function(req, res) {
  var body = _.pick(req.body, 'password');
  var attributes = {};
  attributes.password = body.password;
  attributes.confirmForgotCode = null;

  db.user
    .findOne({
      where: {
        confirmForgotCode: req.params.confirmcode
      }
    })
    .then(
      function(user) {
        if (user) {
          user.update(attributes).then(
            function(user) {
              res.json(user.toPublicJSON());
            },
            function(e) {
              res.status(400).json(e);
            }
          );
        } else {
          res.status(404).send();
        }
      },
      function(e) {
        res.status(500).send();
      }
    );
});
//PUT Change Password
app.put('/v1/users/change-password', middleware.requireAuthentication, function(
  req,
  res
) {
  var body = _.pick(req.body, 'oldPassword', 'newPassword');
  body.id = req.user.get('id');
  attributes = {};

  attributes.password = body.newPassword;

  db.user.isValidChange(body).then(
    function(user) {
      user.update(attributes).then(function(user) {
        res.json(user.toPublicJSON());
      });
    },
    function(e) {
      res.status(401).send();
    }
  );
});
//PUT Update User Details
app.put('/v1/users', middleware.requireAuthentication, function(req, res) {
  var body = _.pick(req.body, 'company', 'name');
  db.user
    .findOne({
      where: {
        id: req.user.get('id')
      }
    })
    .then(
      function(user) {
        if (user) {
          user.update(body).then(
            function(user) {
              res.json(user.toPublicJSON());
              attributes = {};
              attributes.company = body.company;
              db.user.update(attributes, {
                where: {
                  parentId: req.user.get('id')
                }
              });
            },
            function(e) {
              res.status(400).json(e);
            }
          );
        } else {
          res.status(404).send();
        }
      },
      function(e) {
        res.status(500).send();
      }
    );
});

//FOLDERS ----------------------------------------------------------------------
//GET All Folders
app.get('/v1/folders', middleware.requireAuthentication, function(req, res) {
  var query = req.query;
  var where = {
    userId: req.user.get('id')
  };

  db.folder.findAll({ where: where }).then(
    function(folders) {
      res.json(folders);
    },
    function(e) {
      res.status(500).send();
    }
  );
});
//GET All Folders with :parent
app.get(
  '/v1/folders/parent/:parent',
  middleware.requireAuthentication,
  function(req, res) {
    var query = req.query;
    var where = {
      userId: req.user.get('id'),
      parent: parseInt(req.params.parent, 10)
    };

    db.folder.findAll({ where: where }).then(
      function(folders) {
        res.json(folders);
      },
      function(e) {
        res.status(500).send();
      }
    );
  }
);
//GET All Folders with :id
app.get('/v1/folders/:id', middleware.requireAuthentication, function(
  req,
  res
) {
  var query = req.query;
  var where = {
    userId: req.user.get('id'),
    id: parseInt(req.params.id, 10)
  };

  db.folder.findAll({ where: where }).then(
    function(folders) {
      res.json(folders);
    },
    function(e) {
      res.status(500).send();
    }
  );
});
//GET Search Folder Names for {searchTerm}
app.get(
  '/v1/folders/search/:searchTerm',
  middleware.requireAuthentication,
  function(req, res) {
    var searchTerm = unescape(req.params.searchTerm);

    db.folder
      .findAll({
        limit: 10,
        where: {
          userId: req.user.get('id'),
          name: db.Sequelize.where(
            db.Sequelize.fn('LOWER', db.Sequelize.col('name')),
            'LIKE',
            '%' + searchTerm + '%'
          )
        }
      })
      .then(function(folders) {
        res.json(folders);
      }),
      function(e) {
        res.status(500).send();
      };
  }
);
//POST Add New Folder
app.post('/v1/folders', middleware.requireAuthentication, function(req, res) {
  var body = _.pick(req.body, 'name', 'parent');
  var attributes = {};

  if (body.hasOwnProperty('name')) {
    attributes.name = body.name;
    attributes.parent = body.parent;
  }

  db.folder.create(attributes).then(
    function(folder) {
      req.user
        .addFolder(folder)
        .then(function() {
          return folder.reload();
        })
        .then(function(updatedFolder) {
          var room = md5(req.user.get('id'));
          io.sockets.in(room).emit('add folder', updatedFolder.toJSON());
          res.json(updatedFolder.toJSON());
        });
    },
    function(e) {
      res.status(400).json(e);
    }
  );
});
//PUT Edit Folder (Name, Parent)
app.put('/v1/folders/:id', middleware.requireAuthentication, function(
  req,
  res
) {
  var folderId = parseInt(req.params.id, 10);
  var body = _.pick(req.body, 'name', 'parent');
  var attributes = {};

  if (body.hasOwnProperty('name')) {
    attributes.name = body.name;
  }
  if (body.hasOwnProperty('parent')) {
    attributes.parent = body.parent;
  }

  db.folder
    .findOne({
      where: {
        id: folderId,
        userId: req.user.get('id')
      }
    })
    .then(
      function(folder) {
        if (folder) {
          folder.update(attributes).then(
            function(folder) {
              var room = md5(req.user.get('id'));
              io.sockets.in(room).emit('update folder', folder.toJSON());
              res.json(folder.toJSON());
            },
            function(e) {
              res.status(400).json(e);
            }
          );
        } else {
          res.status(404).send();
        }
      },
      function(e) {
        res.status(500).send();
      }
    );
});
//POST Get All Children Folders
app.post(
  '/v1/folders/children/:id',
  middleware.requireAuthentication,
  function(req, res) {
    var folderId = parseInt(req.params.id, 10);
    var ids = [folderId];
    var types = ['folder'];
    var count = 0;

    async.whilst(
      function() {
        return count <= ids.length;
      },
      function(next) {
        where = {
          parent: ids[count]
        };
        db.folder.findAll({ where }).then(function(folders) {
          folders.forEach(folder => {
            ids.push(folder.id);
            types.push('folder');
          });
          count++;
          next();
        });
      },
      function(err) {
        attributes = {};
        attributes.ids = ids;
        res.json(ids);
      }
    );
  },
  function(e) {
    res.status(500).send();
  }
);
//DELETE Delete Folder
app.delete('/v1/folders/:id', middleware.requireAuthentication, function(
  req,
  res
) {
  var folderId = parseInt(req.params.id, 10);
  db.folder
    .destroy({
      where: {
        id: folderId
      }
    })
    .then(function(folder) {
      var room = md5(req.user.get('id'));
      io.sockets.in(room).emit('delete folder', folderId);
      res.json({ message: 'folder deleted' });
    });
});

//DOCUMENTS --------------------------------------------------------------------
//GET Search Document & Folder
app.get('/v1/documents/folders', middleware.requireAuthentication, function(
  req,
  res
) {
  var where = {
    userId: req.user.get('id')
  };
  
  var documentWhere = {
    userId: req.user.get('id'),
    status: true
  };

  db.document.findAll({ where: documentWhere }).then(function(documents) {
    db.folder.findAll({ where: where }).then(function(folders) {
      for (var i = 0, len = documents.length; i < len; i++) {
        documents[i].type = 'document';
      }

      for (var i = 0, len = folders.length; i < len; i++) {
        folders[i].type = 'folder';
      }

      var data = folders.concat(documents);

      res.json(data);
    }),
      function(e) {
        res.status(500).send();
      };
  }),
    function(e) {
      res.status(500).send();
    };
});
//GET All DOCUMENTS
app.get('/v1/documents', middleware.requireAuthentication, function(req, res) {
  db.document
    .findAll({
      where: {
        userId: req.user.get('id'),
        status: true
      }
    })
    .then(
      function(documents) {
        if (!!documents) {
          res.json(documents);
        } else {
          res.status(404).send();
        }
      },
      function(e) {
        res.status(500).send();
      }
    );
});
//GET All Archived DOCUMENTS
app.get('/v1/archives', middleware.requireAuthentication, function(req, res) {
  db.document
    .findAll({
      where: {
        userId: req.user.get('id'),
        status: false
      }
    })
    .then(
      function(documents) {
        if (!!documents) {
          res.json(documents);
        } else {
          res.status(404).send();
        }
      },
      function(e) {
        res.status(500).send();
      }
    );
});
//GET All Documents with :parent
app.get(
  '/v1/documents/parent/:parent',
  middleware.requireAuthentication,
  function(req, res) {
    var where = {
      userId: req.user.get('id'),
      parent: parseInt(req.params.parent, 10),
      status: true
    };

    db.document.findAll({ where: where }).then(
      function(documents) {
        res.json(documents);
      },
      function(e) {
        console.log(e);
        res.status(500).send();
      }
    );
  }
);
//GET All Documents with :id
app.get('/v1/documents/:id', function(req, res) {
  var documentId = parseInt(req.params.id, 10);

  db.document
    .findOne({
      where: {
        id: documentId,
        status: true
      }
    })
    .then(
      function(document) {
        if (!!document) {
          res.json(document.toJSON());
        } else {
          res.status(404).send();
        }
      },
      function(e) {
        res.status(500).send();
      }
    );
});
//GET Search Document Names for {searchTerm}
app.get(
  '/v1/documents/search/:searchTerm',
  middleware.requireAuthentication,
  function(req, res) {
    var searchTerm = unescape(req.params.searchTerm);

    db.document
      .findAll({
        limit: 10,
        where: {
          userId: req.user.get('id'),
          name: db.Sequelize.where(
            db.Sequelize.fn('LOWER', db.Sequelize.col('name')),
            'LIKE',
            '%' + searchTerm + '%'
          )
        }
      })
      .then(function(documents) {
        res.json(documents);
      }),
      function(e) {
        res.status(500).send();
      };
  }
);
//GET Search Document & Folder Names for {searchTerm}
app.get(
  '/v1/documents/folders/search/:searchTerm',
  middleware.requireAuthentication,
  function(req, res) {
    var searchTerm = unescape(req.params.searchTerm);
    var where = {
      userId: req.user.get('id'),
      name: db.Sequelize.where(
        db.Sequelize.fn('LOWER', db.Sequelize.col('name')),
        'LIKE',
        '%' + searchTerm + '%'
      )
    };

    db.document.findAll({ limit: 10, where: where }).then(function(documents) {
      db.folder.findAll({ limit: 10, where: where }).then(function(folders) {
        searchArr = {};
        searchArr.documents = documents;
        searchArr.folders = folders;
        res.json(searchArr);
      }),
        function(e) {
          res.status(500).send();
        };
    }),
      function(e) {
        res.status(500).send();
      };
  }
);
//POST Add New Document
app.post('/v1/documents', middleware.requireAuthentication, function(req, res) {
  var body = _.pick(req.body, 'name', 'parent');
  var attributes = {};

  if (body.hasOwnProperty('name')) {
    attributes.name = body.name;
  }

  if (body.hasOwnProperty('parent')) {
    attributes.parent = body.parent;
  }

  db.document.create(attributes).then(
    function(document) {
      req.user
        .addDocument(document)
        .then(function() {
          return document.reload();
        })
        .then(function(updatedDocument) {
          var room = md5(req.user.get('id'));
          io.sockets.in(room).emit('add document', document.toJSON());
          res.json(document.toJSON());
        });
    },
    function(e) {
      res.status(400).json(e);
    }
  );
});
//PUT Update Document (Name, Status, Parent, etc)
app.put('/v1/documents/:id', middleware.requireAuthentication, function(
  req,
  res
) {
  var documentId = parseInt(req.params.id, 10);
  var body = _.pick(req.body, 'name', 'parent', 'status');
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

  db.document
    .findOne({
      where: {
        id: documentId,
        userId: req.user.get('id')
      }
    })
    .then(
      function(document) {
        if (document) {
          document.update(attributes).then(
            function(document) {
              var room = md5(req.user.get('id'));
              io.sockets.in(room).emit('update document', document.toJSON());
              res.json(document.toJSON());
            },
            function(e) {
              res.status(400).json(e);
            }
          );
        } else {
          res.status(404).send();
        }
      },
      function(e) {
        res.status(500).send();
      }
    );
});
//PUT Archive Document with parent
app.put(
  '/v1/documents/parent/:parent',
  middleware.requireAuthentication,
  function(req, res) {
    var parentId = parseInt(req.params.parent, 10);
    var attributes = {};
    attributes.status = false;

    db.document
      .update(
        {
          status: false,
          parent: 0
        },
        {
          where: {
            parent: parentId
          }
        }
      )
      .then(
        function(document) {
          var room = md5(req.user.get('id'));
          io.sockets.in(room).emit('archive document', document.toJSON());
          res.json({ message: 'documents archived' });
        },
        function(e) {
          res.status(500).send();
        }
      );
  }
);

//REVISIONS --------------------------------------------------------------------
//GET Revisions by :documentId
app.get('/v1/revisions/:documentId', middleware.requireAuthentication, function(
  req,
  res
) {
  var documentId = parseInt(req.params.documentId, 10);
  var where = {
    documentId: documentId,
    userId: req.user.get('id')
  };

  db.revision.findAll({ where: where, order: [['id', 'DESC']] }).then(
    function(revisions) {
      res.json(revisions);
    },
    function(e) {
      res.status(500).send();
    }
  );
});
//PUT Update Revision
app.put('/v1/revisions/:id', middleware.requireAuthentication, function(
  req,
  res
) {
  var id = parseInt(req.params.id, 10);
  var body = _.pick(req.body, 'name');
  var attributes = {};

  if (body.hasOwnProperty('name')) {
    attributes.name = body.name;
  }

  db.revision
    .findOne({
      where: {
        id: id,
        userId: req.user.get('id')
      }
    })
    .then(
      function(revision) {
        if (revision) {
          revision.update(attributes).then(
            function(revision) {
              var room = md5(req.user.get('id'));
              io.sockets.in(room).emit('update revision', revision.toJSON());
              res.json(revision.toJSON());
            },
            function(e) {
              res.status(400).json(e);
            }
          );
        } else {
          res.status(404).send();
        }
      },
      function(e) {
        res.status(500).send();
      }
    );
});
//POST Add New Revision
app.post(
  '/v1/revisions/:documentId',
  middleware.requireAuthentication,
  function(req, res) {
    var documentId = parseInt(req.params.documentId, 10);
    var uCode = shortid.generate();
    var body = _.pick(req.body, 'name', 'note');
    var attributes = {};

    if (body.hasOwnProperty('name')) {
      attributes.name = body.name;
      attributes.latest = true;
      attributes.documentId = documentId;
      attributes.uniqueCode = uCode;
    }
    
    if (body.hasOwnProperty('note')) {
      attributes.notes = body.note;
    }

    //Check if Revision name exists
    db.revision
      .count({
        where: {
          documentId: documentId,
          name: attributes.name
        }
      })
      .then(function(nameCount) {
        if (nameCount == 0) {
          //Check if unique code exists
          db.revision
            .count({
              where: {
                uniqueCode: uCode
              }
            })
            .then(function(uniqueCode) {
              if (uniqueCode == 0) {
                //Change all other revisions to false
                db.revision
                  .update(
                    {
                      latest: false
                    },
                    {
                      where: {
                        documentId: documentId,
                        userId: req.user.get('id')
                      },
                      returning: true,
                      plain: true
                    }
                  )
                  .then(function(revisions) {
                    if (revisions) {
                      var room = md5(req.user.get('id'));
                      io.sockets.in(room).emit('updated revision', revisions);
                    } else {
                      res.status(404).send();
                    }
                  });

                //Insert revision into DB
                db.revision.create(attributes).then(
                  function(revision) {
                    req.user
                      .addRevision(revision)
                      .then(function() {
                        return revision.reload();
                      })
                      .then(function(updatedRevision) {
                        var room = md5(req.user.get('id'));
                        io.sockets
                          .in(room)
                          .emit('add revision', revision.toJSON());
                        res.json(revision.toJSON());
                      });
                  },
                  function(e) {
                    res.status(400).json(e);
                  }
                );
              } else {
                var errors = {
                  error: {
                    text:
                      'randomly generated revision code already exists, try again'
                  }
                };
                res.json(errors);
              }
            });
        } else {
          var errors = {
            error: {
              text: 'revision name already exists for this document'
            }
          };
          res.json(errors);
        }
      });
  }
);
//GET Search Revisions by {revcode}
app.get('/v1/revcodes/:revcode', cors(), function(req, res) {
  var revCode = req.params.revcode;
  var where = {
    uniqueCode: revCode
  };

  db.revision.findOne({ where: where }).then(
    function(revision) {
      res.json(revision);
      var attributes = {};
      attributes.scans = revision.scans + 1;
      revision.update(attributes).then(
        function(revision) {},
        function(e) {
          res.status(400).json(e);
        }
      );
    },
    function(e) {
      res.status(500).send();
    }
  );
});

//Misc. ------------------------------------------------------------------------
//GET Find All Breadcrumbs (Maybe not needed?)

//Run App
db.sequelize.sync({}).then(function() {
  server.listen(PORT, function() {
    console.log('Express Listening on Port ' + PORT);
  });
});
