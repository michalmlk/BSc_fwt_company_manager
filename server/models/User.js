module.exports = (Sequelize, DataTypes) => {
    const User = Sequelize.define('User', {
        id: {
            primaryKey: true,
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        userName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });
    return User;
};
