express = require('express');
var bodyParser = require('body-parser');
var _ = require('underscore');
var db = require('./db.js');
var bcrypt = require('bcryptjs');
var middleware = require('./middleware.js')(db);
var shortid = require('shortid32');
var cors = require('cors');

var app = express();
var PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));
var corsOptions =
{
    "origin": "*",
    "methods": "GET,HEAD,PUT,PATCH,POST, DELETE",
    "preflightContinue": true,
    "optionsSuccessStatus": 204,
    "exposedHeaders":"Auth"
};

app.use(cors(corsOptions));

//Main Api Route
app.get('/api', function (req, res) {
    res.send('Welcome to the Revision Check API');
});

//FOLDERS -------------------------------------------------------------------------------
//GET All Folders with :parent
app.get('/api/folders/:parent', middleware.requireAuthentication, function (req, res) {
    var query =  req.query;
    var where = {
        userId: req.user.get('id'),
        parent: parseInt(req.params.parent, 10)
    };

    db.folder.findAll({where: where}).then(function (folders){
        res.json(folders);
    }, function (e){
        res.status(500).send();
    });
});

//POST Folder
app.post('/api/folders', middleware.requireAuthentication, function(req, res) {
    var body = _.pick(req.body,"name");
    var attributes = {};

    if (body.hasOwnProperty('name')){
        attributes.name = body.name;
        attributes.parent = parseInt(req.params.parent, 10);
    }

    db.folder.create(attributes).then(function (folder) {
        req.user.addDocument(folder).then(function () {
            return folder.reload();
        }).then(function (updatedDocument) {
            res.json(folder.toJSON());
        });
    }, function(e){
        res.status(400).json(e);
    });
});

//PUT Document Name
app.put('/api/folders/name/:id', middleware.requireAuthentication, function (req, res) {
    var folderId =  parseInt(req.params.id, 10);
    var name = _.pick(req.name,"name");
    var attributes = {};

    if (name.hasOwnProperty('name')){
        attributes.name = body.name;
    }

    db.folder.findOne({
        where: {
            id: folderId,
            userId: req.user.get('id')
        }
    }).then(function (folder) {
        if (folder){
            folder.update(attributes).then(function (folder) {
                res.json(folder.toJSON());
            }, function(e){
                res.status(400).json(e);
            });
        } else {
            res.status(404).send();
        }
    }, function (e) {
        res.status(500).send();
    });
});

//PUT Folders Name
app.put('/api/folders/parent/:id', middleware.requireAuthentication, function (req, res) {
    var folderId =  parseInt(req.params.id, 10);
    var parent = _.pick(req.parent,"parent");
    var attributes = {};

    if (parent.hasOwnProperty('parent')){
        attributes.parent = body.parent;
    }

    db.folder.findOne({
        where: {
            id: folderId,
            userId: req.user.get('id')
        }
    }).then(function (folder) {
        if (folder){
            folder.update(attributes).then(function (folder) {
                res.json(folder.toJSON());
            }, function(e){
                res.status(400).json(e);
            });
        } else {
            res.status(404).send();
        }
    }, function (e) {
        res.status(500).send();
    });
});

//DOCUMENTS -------------------------------------------------------------------------------

//GET All Documents with :parent
app.get('/api/documents/:parent', middleware.requireAuthentication, function (req, res) {
    var query =  req.query;
    var where = {
        userId: req.user.get('id'),
        parent: parseInt(req.params.parent, 10)
    };

    db.document.findAll({where: where}).then(function (documents){
        res.json(documents);
    }, function (e){
        res.status(500).send();
    });
});

//GET One Document
app.get('/api/documents/:id', middleware.requireAuthentication, function (req, res) {
    var documentId =  parseInt(req.params.id, 10);

    db.document.findOne({
        where: {
            id: documentId,
            userId: req.user.get('id')
        }
    }).then(function (document) {
        if (!!document){
            res.json(document.toJSON());
        } else {
            res.status(404).send();
        }
    }, function (e) {
        res.status(500).send();
    });
});

//POST Document
app.post('/api/documents', middleware.requireAuthentication, function(req, res) {
    var body = _.pick(req.body,"name", "parent");
    var attributes = {};

    console.log(body);

    if (body.hasOwnProperty('name')){
        attributes.name = body.name;
    }

    if (body.hasOwnProperty('parent')){
        attributes.parent = body.parent;
    }


    db.document.create(attributes).then(function (document) {
        req.user.addDocument(document).then(function () {
            return document.reload();
        }).then(function (updatedDocument) {
            res.json(document.toJSON());
        });
    }, function(e){
      console.log(attributes)
        res.status(400).json(e);
    });
});

//PUT Document Name
app.put('/api/documents/name/:id', middleware.requireAuthentication, function (req, res) {
    var documentId =  parseInt(req.params.id, 10);
    var name = _.pick(req.name,"name");
    var attributes = {};

    if (name.hasOwnProperty('name')){
        attributes.name = body.name;
    }

    db.document.findOne({
        where: {
            id: documentId,
            userId: req.user.get('id')
        }
    }).then(function (document) {
        if (document){
            document.update(attributes).then(function (document) {
                res.json(document.toJSON());
            }, function(e){
                res.status(400).json(e);
            });
        } else {
            res.status(404).send();
        }
    }, function (e) {
        res.status(500).send();
    });
});

//PUT Document Parent
app.put('/api/documents/parent/:id', middleware.requireAuthentication, function (req, res) {
    var documentId =  parseInt(req.params.id, 10);
    var parent = _.pick(req.parent,"parent");
    var attributes = {};

    if (parent.hasOwnProperty('parent')){
        attributes.parent = body.parent;
    }

    db.document.findOne({
        where: {
            id: documentId,
            userId: req.user.get('id')
        }
    }).then(function (document) {
        if (document){
            document.update(attributes).then(function (document) {
                res.json(document.toJSON());
            }, function(e){
                res.status(400).json(e);
            });
        } else {
            res.status(404).send();
        }
    }, function (e) {
        res.status(500).send();
    });
});

//REVISIONS -------------------------------------------------------------------------------
//GET Revisions
app.get('/api/revisions/:documentId', middleware.requireAuthentication, function (req, res) {
    var documentId =  parseInt(req.params.documentId, 10);
    var where = {
        documentId: documentId,
        userId: req.user.get('id')
    };

    db.revision.findAll({where: where}).then(function (revisions){
        res.json(revisions);
    }, function (e){
        res.status(500).send();
    });
});

//GET Revision by Revcode
app.get('/api/revcodes/:revcode', cors(), function (req, res) {
    var revCode =  req.params.revcode;
    var where = {
        uniqueCode: revCode
    };

    db.revision.findOne({where: where}).then(function (revision){
        res.json(revision);
    }, function (e){
        res.status(500).send();
    });
});

//POST Revision
app.post('/api/revisions/:documentId', middleware.requireAuthentication, function(req, res) {
    var documentId =  parseInt(req.params.documentId, 10);
    var uCode = shortid.generate();
    var body = _.pick(req.body,"name");
    var attributes = {};

    if (body.hasOwnProperty('name')){
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
    }).then(function (nameCount) {
        if (nameCount == 0){
            //Check if unique code exists
            db.revision.count({
                where: {
                    uniqueCode: uCode
                }
            }).then(function (uniqueCode) {
                if(uniqueCode == 0){
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
                    }).then(function (revisions) {
                        if (revisions){
                            console.log('');
                        } else {
                            res.status(404).send();
                        }
                    });

                    //Insert revision into DB
                    db.revision.create(attributes).then(function (revision) {
                        req.user.addRevision(revision).then(function () {
                            return revision.reload();
                        }).then(function (updatedRevision) {
                            res.json(revision.toJSON());
                        });
                    }, function(e){
                        res.status(400).json(e);
                    });

                } else {
                    var errors = {error : {
                        text: "randomly generated revision code already exists, try again"
                    }};
                    res.json(errors);
                }
            });
        }
        else {
            var errors = {error : {
                text: "revision name already exists for this document"
            }};
            res.json(errors);
        }
    });

});


//USER Section
//POST User (SIGN UP)
app.post('/api/users', function(req, res) {
    var body = _.pick(req.body,"email", "password");
    db.user.create(body).then(function (user) {
        res.json(user.toPublicJSON());
    }, function(e){
        res.status(400).json(e);
    });
});

//POST User Login
app.post('/api/users/login', function(req, res) {
    var body = _.pick(req.body,"email", "password");

    db.user.isValid(body).then(function (user) {
        var token = user.generateToken('authentication');
        if(token){
            res.header('Auth', token).json(user.toPublicJSON());
        } else {
            res.status(401).send();
        }
    }, function (e) {
        res.status(401).send();
    });

});

//POST User Log Off


//Run App
db.sequelize.sync({}).then(function () {
    app.listen(PORT, function () {
        console.log('Express Listening on Port ' + PORT);
    });
});

















//PUT Document
//PUT Revision

//Archive Document
//Revert to previous Revision


//GET Revision Status



/*
// GET /todos?complete=true
app.get('/api/todos', middleware.requireAuthentication, function (req, res) {
    var query =  req.query;
    var where = {
        userId: req.user.get('id')
    };

    if (query.hasOwnProperty("completed") && query.completed === "true"){
        where.completed = true;
    } else if (query.hasOwnProperty("completed") && query.completed === "false"){
        where.completed = false;
    }

    if (query.hasOwnProperty('q') && query.q.length > 0){
        where.description =  {
            $like: '%' + query.q + '%'
        };
    }

    db.todo.findAll({where: where}).then(function (todos){
        res.json(todos);
    }, function (e){
        res.status(500).send();
    });
    //
    //
    // res.json(filteredTodos)
});

// GET /todos/id
app.get('/api/todos/:id', middleware.requireAuthentication, function (req, res) {
    var todoId =  parseInt(req.params.id, 10);

    db.todo.findOne({
        where: {
            id: todoId,
            userId: req.user.get('id')
        }
    }).then(function (todo) {
        if (!!todo){
            res.json(todo.toJSON());
        } else {
            res.status(404).send();
        }
    }, function (e) {
        res.status(500).send();
    });

});

//POST
app.post('/api/todos', middleware.requireAuthentication, function(req,res) {
    var body = _.pick(req.body,"description", "completed");

    db.todo.create(body).then(function (todo) {

        req.user.addTodo(todo).then(function () {
            return todo.reload();
        }).then(function (updatedTodo) {
            res.json(todo.toJSON());
        });
    }, function(e){
        res.status(400).json(e);
    });
});

// DELETE
app.delete('/api/todos/:id', middleware.requireAuthentication, function (req, res) {
    var todoId =  parseInt(req.params.id, 10);

    db.todo.destroy({
        where: {
            id: todoId,
            userId: req.user.get('id')
        }
    }).then(function (rowsDeleted) {
        if (rowsDeleted === 0){
            res.status(404).json({
                error: "no todo with that id"
            });
        } else {
            res.status(204).send();
        }
    }, function (e) {
        res.status(500).send()
    });

});

//PUT
app.put('/api/todos/:id', middleware.requireAuthentication, function (req, res) {
    var todoId =  parseInt(req.params.id, 10);
    var body = _.pick(req.body,"description", "completed");
    var attributes = {};

    if (body.hasOwnProperty('completed')){
        attributes.completed = body.completed;
    }

    if (body.hasOwnProperty('description')){
        attributes.description = body.description;
    }

    db.todo.findOne({
        where: {
            id: todoId,
            userId: req.user.get('id')
    }
    }).then(function (todo) {
        if (todo){
            todo.update(attributes).then(function (todo) {
                res.json(todo.toJSON());
            }, function(e){
                res.status(400).json(e);
            });
        } else {
            res.status(404).send();
        }
    }, function (e) {
        res.status(500).send();
    });

});

*/
