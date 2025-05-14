const { User, Signalisation } = require('../config/sequelize');

module.exports = (app) => {
    app.get('/etat', async (req, res) => {
        try {
            const utilisateurs = await User.findAll();
            const signalisations = await Signalisation.findAll({
                include: [{ model: User, attributes: ['nom', 'email', 'titre'] }]
            });
            res.render('gestion', { utilisateurs, signalisations });
        } catch (error) {
            console.error(error);
            res.status(500).send('Erreur lors de la récupération des données');
        }
    });
};