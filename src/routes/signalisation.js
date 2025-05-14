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
app.post('/signalisation', upload.single('photo'), async (req, res) => {
    try {
        const { description, latitude, longitude, userID } = req.body;
        console.log(req.body)
        console.log('userID reçu:', userID); // Vérification

        const photo = req.file ? req.file.filename : null;

        await Signalisation.create({
            description,
            photo,
            latitude,
            longitude,
            userID: 1
        });

        res.status(201).json({ message: 'Signalisation enregistrée avec succès !' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de l\'enregistrement' });
    }
});};