
module.exports = (app) => {
    const { sequelize } = require('../config/sequelize');
    const bcrypt = require('bcrypt');
    const User = require('../model/user')(sequelize);

    app.get('/login', (req, res) => {
        res.render('login');
    });

    app.post('/login', async (req, res) => {
        try {
            const { email, motdepasse } = req.body;
            // Vérification de l'utilisateur dans la base de données
            const user = await User.findOne({ where: { email } });
            if (!user) {
                return res.status(401).json({ message: 'Utilisateur non trouvé' });
            }

            // Vérification du mot de passe
            const match = await bcrypt.compare(motdepasse, user.motdepasse);
            if (!match) {
                return res.status(401).json({ message: 'Mot de passe incorrect' });
            }

            // Authentification réussie
            req.session.userId = user.id; // Stocke l'ID de l'utilisateur dans la session
            res.status(200).json({ message: 'Connexion réussie !' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erreur lors de la connexion' });
        }
    });
}