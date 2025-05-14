const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const User = sequelize.define('User', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nom: {
            type: DataTypes.STRING,
            allowNull: false
        },
        telephone: {
            type: DataTypes.STRING, // Utilise STRING pour les numéros de téléphone
            allowNull: true
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        motdepasse: { // Assure-toi d'utiliser ce nom dans le POST aussi
            type: DataTypes.STRING,
            allowNull: false
        },
        titre: { // Ajoute le champ titre si tu veux le stocker
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        tableName: 'users',
        timestamps: false
    });

    User.associate = (models) => {
        User.hasMany(models.Signalisation, { foreignKey: 'userID' });
    };
    return User;

}