module.exports = function (sequelize, DataTypes) {
    return sequelize.define('document', {
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
          defaultValue: 0,
          validate: {
              len: [1, 250]
          }
        },
        status: {
          type: DataTypes.BOOLEAN,
          defaultValue: true
        }
    });
};
