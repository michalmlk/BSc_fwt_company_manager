module.exports = (Sequelize, DataTypes) => {
    const Truck = Sequelize.define(
        'Truck',
        {
            id: {
                primaryKey: true,
                type: DataTypes.INTEGER,
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
            techState: {
                type: DataTypes.ENUM('available', 'serviced', 'delivery'),
            },
            techReviewDate: {
                type: DataTypes.DATE,
                allowNull: true,
            },
        },
        {
            timestamps: false,
        }
    );

    Truck.associate = (models) => {
        Truck.belongsTo(models.Employee);
    };

    return Truck;
};
