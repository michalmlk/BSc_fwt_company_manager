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
        phoneNumber: {
            type: DataTypes.BIGINT(11),
            allowNull: false,
            validate: {
                is: /[0-9]{9}/,
            },
        },
        email: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                is: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
            },
        },
        currentDeliveryId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            unique: true,
        },
        truckId: {
            type: DataTypes.INTEGER,
        },
    });

    return Employee;
};


