module.exports = function (sequelize, DataTypes) {
    return sequelize.define('revision', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1, 250]
            }
        },
        documentId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                len: [1, 250]
            }
        },
        latest: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        uniqueCode: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });
};