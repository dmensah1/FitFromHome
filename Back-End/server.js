const express = require('express');
const cors = require('cors');
const bodyParser = require("body-parser");

// Firebase
const admin = require('firebase-admin');
const serviceAccount = require('./service-account.json');
admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
	databaseURL: "https://fitfromhome-65477.firebaseio.com"
});
const db = admin.firestore();

// API Routes
const ClassRoutes = require('./API/classRoutes.js');

const app = express();

// ======================================================================================
// Middleware
app.use(bodyParser.json());
app.use(cors());

// ======================================================================================
// Use Routes
app.use('/api/classes', ClassRoutes);

// ======================================================================================
// Start Server
const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Backend Server listening on port ${port}`));

// GET ALL PROFILES
app.get('/api/profiles', (req, res) => {
	db.collection('profiles').get().then(snapshot =>{
		snapshot.forEach((doc) => {
			console.log(doc.id, '=>', doc.data());
		});
	});
});

module.exports = app;

