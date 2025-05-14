const { Sequelize } = require('sequelize');
const userModel = require('../model/user');
const signalisationModel = require('../model/signalisation');

const sequelize = new Sequelize('hackathon', 'root', '', {
    host: 'localhost',
    dialect: 'mariadb',
    port: 3306,
    logging: false,
});

// Instanciation des modèles
const User = userModel(sequelize);
const Signalisation = signalisationModel(sequelize);

// Déclaration des associations
User.hasMany(Signalisation, { foreignKey: 'userID' });
Signalisation.belongsTo(User, { foreignKey: 'userID' });

// Fonction pour vérifier la connexion et synchroniser la base
const initDB = async () => {
    try {
        await sequelize.sync({ force: true });
        console.log('Connexion à la base de données réussie !');
    } catch (error) {
        console.error('Impossible de se connecter à la base de données :', error);
    }
};

module.exports = { sequelize, initDB, User, Signalisation };