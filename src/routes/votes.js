const { sequelize } = require('../config/sequelize');
const Signalisation = require('../model/signalisation')(sequelize);
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Configuration de multer pour stocker les images dans /uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadDir = path.join(__dirname, '../../uploads');
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const upload = multer({ storage: storage });

module.exports = (app) => {
    // Créer une signalisation
    app.post('/signalisation', upload.single('photo'), async (req, res) => {
        try {
            const { description, latitude, longitude, userID } = req.body;
            const photo = req.file ? req.file.filename : null;

            await Signalisation.create({
                description,
                photo,
                latitude,
                longitude,
                userID: parseInt(userID, 10)
            });

            res.status(201).json({ message: 'Signalisation enregistrée avec succès !' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erreur lors de l\'enregistrement' });
        }
    });

    // Récupérer toutes les signalisations
    app.get('/signalisation', async (req, res) => {
        try {
            const signalisations = await Signalisation.findAll();
            res.render('gestionSignalisation', { signalisations });
        } catch (error) {
            console.error(error);
            res.status(500).send('Erreur lors de la récupération des signalisations');
        }
    });

    // Modifier une signalisation
    app.post('/signalisation/edit/:id', upload.single('photo'), async (req, res) => {
        try {
            const { description, latitude, longitude } = req.body;
            const id = req.params.id;
            const signalisation = await Signalisation.findByPk(id);

            if (!signalisation) {
                return res.status(404).json({ message: 'Signalisation non trouvée' });
            }

            let photo = signalisation.photo;
            if (req.file) {
                photo = req.file.filename;
            }

            await signalisation.update({
                description,
                latitude,
                longitude,
                photo
            });

            res.redirect('/signalisation');
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erreur lors de la modification' });
        }
    });

    // Supprimer une signalisation
    app.post('/signalisation/delete/:id', async (req, res) => {
        try {
            const id = req.params.id;
            const signalisation = await Signalisation.findByPk(id);

            if (!signalisation) {
                return res.status(404).json({ message: 'Signalisation non trouvée' });
            }

            await signalisation.destroy();
            res.redirect('/signalisation');
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erreur lors de la suppression' });
        }
    });
};