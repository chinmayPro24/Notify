const express = require('express');
const webpush = require('web-push');
const path = require('path');
const port = process.env.PORT || 3000;

const app = express();

app.use(express.static(path.join(__dirname, "client")))

app.use(express.json());

const publicVapidKey = "BGPSqgNsCesMrhDnipxU3xrbegczSXLXrvwU7bHIgwt74a8aWjZmuqvX3kRJ8ovTU9iZtCC0FJC_Nruo-Jz_Ers";
const privateVapidKey = "9i0iMVtkn6xIYJr-h1KCtZmU5U1_Ae9CVNxYxi5KAtg";

webpush.setVapidDetails('mailto:chinmaykulthe897@gmail.com', publicVapidKey, privateVapidKey)

app.post('/subscribe', (req,res) => {
    const subscription = req.body;

    res.status(201).json({});

    const payload = JSON.stringify({title: 'Notify'});

    webpush.sendNotification(subscription, payload).catch(err => console.log(err));
});

app.listen(port, () => {
    console.log("Server Started");
});