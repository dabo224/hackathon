const { sequelize } = require('../config/sequelize');
const bcrypt = require('bcrypt');
const User = require('../model/user')(sequelize);

module.exports = (app) => {
    app.get('/inscription', (req, res) => {
        res.render('inscription');
    });

    app.post('/inscription', async (req, res) => {
        try {
            const { nom, telephone, email, motdepasse, titre } = req.body;
            // Hashage du mot de passe avec bcrypt
            const temphash = 10;
            const hashedPassword = await bcrypt.hash(motdepasse, temphash);

            const user = await User.create({ nom, telephone, email, motdepasse: hashedPassword, titre });
            console.log(user);
            res.status(201).json({ message: 'Inscription réussie !' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erreur lors de l\'inscription' });
        }
    });
}