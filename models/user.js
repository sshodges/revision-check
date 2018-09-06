var bcrypt = require('bcryptjs');
var _ = require('underscore');
var cryptojs = require('crypto-js');
var jwt = require('jsonwebtoken');

module.exports = function (sequelize, DataTypes) {
    var user = sequelize.define('user', {
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        parentId: {
          type: DataTypes.INTEGER,
          validate: {
              len: [1, 250]
          }
        },
        company: {
            type: DataTypes.STRING
        },
        firstName: {
            type: DataTypes.STRING
        },
        lastName: {
            type: DataTypes.STRING
        },
        active: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        confirmEmailCode: {
            type: DataTypes.STRING
        },
        confirmForgotCode: {
            type: DataTypes.STRING
        },
        confirmSubuserCode: {
            type: DataTypes.STRING
        },
        salt: {
            type: DataTypes.STRING
        },
        password_hash: {
            type: DataTypes.STRING
        },
        password: {
            type: DataTypes.VIRTUAL,
            allowNull: false,
            validate: {
                len: [6, 100]
            },
            set: function (value) {
                var salt = bcrypt.genSaltSync(10);
                var hashedPassword = bcrypt.hashSync(value, salt);

                this.setDataValue('password', value);
                this.setDataValue('salt', salt);
                this.setDataValue('password_hash', hashedPassword);
            }
        }
    }, {
        hooks: {
            beforeValidate: function (user, options){
                if(typeof user.email === 'string'){
                    user.email = user.email.toLowerCase();
                }
            }
        },
        classMethods: {
            isValid: function (body) {
                return new Promise(function (resolve, reject) {
                    if (typeof body.email !== 'string' || typeof body.password !== 'string'){
                        return reject();
                    }
                    body.email = body.email.toLowerCase();

                    user.findOne({
                        where: {
                            email: body.email
                       }
                    }).then(function (user) {
                        if (!user || !bcrypt.compareSync(body.password, user.get('password_hash'))){
                            return reject();
                        }

                        resolve(user);

                    }, function (e) {
                        reject();
                    });
                });
            },
            isValidChange: function (body) {
                return new Promise(function (resolve, reject) {
                    if (typeof body.oldPassword !== 'string' || typeof body.newPassword !== 'string'){
                        return reject();
                    }

                    user.findOne({
                        where: {
                            id: body.id
                       }
                    }).then(function (user) {
                        if (!user || !bcrypt.compareSync(body.oldPassword, user.get('password_hash'))){
                            return reject();
                        }

                        resolve(user);

                    }, function (e) {
                        reject();
                    });
                });
            },
            findByToken: function (token) {
                return new Promise (function (resolve, reject){
                    try {
                        var decodedJWT = jwt.verify(token, 'qwerty123');
                        var bytes = cryptojs.AES.decrypt(decodedJWT.token, 'abc123');
                        var tokenData = JSON.parse(bytes.toString(cryptojs.enc.Utf8));

                        user.findById(tokenData.id).then(function (user) {
                            if (user){
                                resolve(user);
                            } else {
                                reject();
                            }
                        }, function (e) {
                            reject();
                        });
                    } catch (error) {
                        reject();
                    }
                });
            }
        },
        instanceMethods: {
            toPublicJSON: function () {
                var json = this.toJSON();
                return _.pick(json, 'id', 'parentId', 'firstName', 'lastName', 'company', 'email', 'createdAt', 'updatedAt');
            },
            generateToken: function (type) {
                if(!_.isString(type)){
                    return undefined;
                }

                try {
                    var stringData = JSON.stringify({id: this.get('id'), type: type});
                    var encryptedData = cryptojs.AES.encrypt(stringData, 'abc123').toString();
                    var token = jwt.sign({
                        token: encryptedData
                    }, 'qwerty123');

                    return token;
                } catch (e) {
                    return undefined;
                }
            }
        }
    });

    return user;
};
