const express = require("express");
const admin = require('firebase-admin');
const serviceAccount = require("./service-account-file.json");
const cors = require('cors');

const app = express();

var firebaseApp = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

app.use(cors());


app.get("/fetchUsers", (req, res) => {
    firebaseApp.auth()
        .listUsers(1000)
        .then((listUsersResult) => {
            var allValidemails = [];
            listUsersResult.users.forEach((userRecord) => {
                let user = userRecord.toJSON();
                if (user.email?.includes(req.query.serachTerm) && req.query.serachTerm != "" && user.email != req.query.currentUserEmail) {
                    allValidemails.push({ email: user.email, name: user.displayName, photoURL: user.photoURL });
                }
            });

            res.json(allValidemails);
        })
        .catch((error) => {
            console.log('Error listing users:', error);
        });
})

app.listen(3000);

// const app = require("./netlify/functions/firebaseAdminFunction.js");

// app.listen(3000, () => console.log('Local app listening on port 3000!'));