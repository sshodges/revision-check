var Sequelize = require('sequelize');
var env = process.env.NODE_ENV || 'development';

var sequelize;

if(env === 'production'){
    sequelize = new Sequelize(process.env.DATABASE_URL, {
      dialect: 'postgres'
    });
} else {
    sequelize = new Sequelize(undefined, undefined, undefined, {
        "dialect": "sqlite",
        "storage": __dirname + "/data/dev-revision-check-api.sqlite"
    });
}


var db = {};

db.folder = sequelize.import(__dirname + '/models/folder.js');
db.document = sequelize.import(__dirname + '/models/document.js');
db.revision = sequelize.import(__dirname + '/models/revision.js');
db.user = sequelize.import(__dirname + '/models/user.js');

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.folder.belongsTo(db.user);
db.document.belongsTo(db.user);
db.revision.belongsTo(db.user);
db.revision.belongsTo(db.document);
db.user.hasMany(db.folder);
db.user.hasMany(db.document);
db.user.hasMany(db.revision);
db.folder.hasMany(db.document);
db.document.hasMany(db.revision);

module.exports = db;
