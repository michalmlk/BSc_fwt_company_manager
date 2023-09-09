module.exports = (Sequelize, DataTypes) => {
    const Truck = Sequelize.define(
        'Truck',
        {
            id: {
                primaryKey: true,
                type: DataTypes.INTEGER,
                allowNull: false,
                validate: {
                    notEmpty: true,
                },
            },
            model: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: true,
                },
            },
            registrationNumber: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: true,
                    is: /^[A-Za-z0-9]*$/,
                },
            },
            driverId: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            techState: {
                type: DataTypes.ENUM('available', 'serviced'),
            },
        },
        {
            timestamps: false,
        }
    );

    return Truck;
};
