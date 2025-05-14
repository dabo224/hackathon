const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Signalisation = sequelize.define('Signalisation', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        photo: {
            type: DataTypes.STRING,
            allowNull: true
        },
        latitude: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        longitude: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        userID : {
            type:DataTypes.INTEGER,
            allowNull:false
        }
    }, {
        tableName: 'signalisation',
        timestamps: false
    });

    Signalisation.associate = (models) => {
        Signalisation.belongsTo(models.User, { foreignKey: 'userID' });
    };
    return Signalisation;

}