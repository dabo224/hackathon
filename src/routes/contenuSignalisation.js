const { sequelize, Signalisation, User } = require('../config/sequelize');


module.exports = (app) => {
    app.get('/signalisations', async (req, res) => {
        
            const signalisations = await Signalisation.findAll({
                include: [{ model: User, attributes: ['nom', 'email', 'titre'] }]
            });
            res.json({ signalisations });
        // } catch (error) {
        //     console.error(error);
        //     res.status(500).send('Erreur lors de la récupération des signalisations');
        // }
    });
};