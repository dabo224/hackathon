const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('hackathon', 'root', '', {
    host: 'localhost',
    dialect: 'mariadb',
    port: 3306,
    logging: false,
});

// Déclare d'une fonction pour verifier la connexion à la base de données
const initDB = async () => {
    try {
        await sequelize.sync();
        console.log('Connexion à la base de données réussie !');
    } catch (error) {
        console.error('Impossible de se connecter à la base de données :', error);
    }
};

module.exports = { sequelize, initDB };