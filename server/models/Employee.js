module.exports = (Sequelize, DataTypes) => {
    const Employee = Sequelize.define('Employee', {
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
        age: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        truckId: {
            type: DataTypes.INTEGER,
        },
    });

    return Employee;
};
