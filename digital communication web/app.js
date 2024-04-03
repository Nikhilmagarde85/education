// app.js

// Import necessary modules
const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/file_upload_demo', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Error connecting to MongoDB:', err));

// Define schema and model for storing file details
const fileSchema = new mongoose.Schema({
    title: String,
    fileName: String,
    fileType: String
});
const File = mongoose.model('File', fileSchema);

// Multer storage configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});
const upload = multer({ storage: storage });

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Handle file upload
app.post('/upload', upload.single('file'), async (req, res) => {
    try {
        const newFile = new File({
            title: req.body.title,
            fileName: req.file.filename,
            fileType: req.file.mimetype
        });
        await newFile.save();
        res.send('File uploaded successfully!');
    } catch (err) {
        console.error('Error uploading file:', err);
        res.status(500).send('Error uploading file');
    }
});

// Fetch and serve file from the database
app.get('/file/:id', async (req, res) => {
    try {
        const file = await File.findById(req.params.id);
        if (!file) {
            return res.status(404).send('File not found');
        }
        const filePath = path.join(__dirname, 'uploads', file.fileName);
        res.download(filePath);
    } catch (err) {
        console.error('Error fetching file:', err);
        res.status(500).send('Error fetching file');
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
