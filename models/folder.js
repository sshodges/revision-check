module.exports = function (sequelize, DataTypes) {
    return sequelize.define('folder', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1, 250]
            }
        },
        parent: {
          type: DataTypes.INTEGER,
          defaultValue: 0,
          validate: {
              len: [1, 250]
          }
        }
    });
};
