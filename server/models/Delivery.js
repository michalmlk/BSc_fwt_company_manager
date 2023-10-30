module.exports = (Sequelize, DataTypes) => {
    const Delivery = Sequelize.define(
        'Delivery',
        {
            id: {
                primaryKey: true,
                type: DataTypes.INTEGER,
                allowNull: false,
                validate: {
                    notEmpty: true,
                },
            },
            product: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: true,
                },
            },
            employeeId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                validate: {
                    notEmpty: true,
                },
            },
            deadLine: {
                type: DataTypes.DATE,
                allowNull: false,
            },
            destination: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: true,
                },
            },
            startPoint: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: true,
                },
            },
            currentStep: {
                type: DataTypes.ENUM(
                    'started',
                    'loaded',
                    'in_progress',
                    'unloaded',
                    'finalized'
                ),
            },
        },
        {
            timestamps: false,
        }
    );
    return Delivery;
};
