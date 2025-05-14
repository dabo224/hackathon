module.exports = (app) => {
    const nodemailer = require('nodemailer');
    const { sequelize } = require('../config/sequelize');
    const bcrypt = require('bcrypt');
    const jwt = require('jsonwebtoken');
    const User = require('../model/user')(sequelize);

    const JWT_SECRET = 'votre_secret_jwt'; // À remplacer par une vraie clé secrète

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

            // Génération du token JWT
            const token = jwt.sign(
                { id: user.id, titre: user.titre, nom: user.nom },
                JWT_SECRET,
                { expiresIn: '2h' }
            );

            // (Optionnel) Envoi d'un e-mail de connexion réussie
            /*
            let transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'abdoulayeabdallah430@gmail.com',
                    pass: '62345034'
                }
            });

            let mailOptions = {
                from: 'abdoulayeabdallah430@gmail.com',
                to: email,
                subject: 'Connexion réussie',
                text: 'Vous vous êtes connecté avec succès à votre compte.'
            };

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.error('Erreur lors de l\'envoi de l\'e-mail:', error);
                } else {
                    console.log('E-mail envoyé:', info.response);
                }
            });
            */

            res.status(200).json({ 
                message: 'Connexion réussie !',
                token
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erreur lors de la connexion' });
        }
    });
}