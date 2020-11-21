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

const app = express();

// ======================================================================================
// Middleware
app.use(bodyParser.json());
app.use(cors());

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

// GET ALL CLASSES
app.get('/api/classes', (req, res) => {
	let classes = [];
	db.collection('classes').get().then((snapshot) =>{
		snapshot.forEach((doc) => {
			console.log(doc.id, '=>', doc.data());
				classes.push(
					{
						id: doc.id,
						title: doc.data().title,
						createdBy: doc.data().createdBy,
						description: doc.data().description,
						category: doc.data().category,
						price: doc.data().price,
						startDate: doc.data().startDate,
						endDate: doc.data().endDate,
					}
				)
		});
		res.status(200).json({
			fetchedClasses: classes,
		});
	});
});
