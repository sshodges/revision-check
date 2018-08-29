module.exports = function (sequelize, DataTypes) {
    return sequelize.define('folder', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                len: [1, 250]
            }
        },
        parent: {
          type: DataTypes.INTEGER,
          allowNull: false,
          defaultValue: 0,
          validate: {
              len: [1, 250]
          }
        }
    });
};
