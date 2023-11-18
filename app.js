const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const bodyparser = require('body-parser');

const port = 80;

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/contactdance', { useNewUrlParser: true, useUnifiedTopology: true });


//define mongoose schema
var contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    desc: String
});
var contact = mongoose.model('contact', contactSchema);

//EXPRESS SPECIFIC STUFF
app.use(express.static('../static'));  //for serving static file
app.use(express.urlencoded());


//PUG SPECIFIC STUFF
app.set('view engine', 'pug');  //set the template engine as pug
app.set('views', path.join(__dirname, 'views'));    //Set the views directory


//ENDPOINTS
app.get('/', (req, res) => {
    res.status(200).render('home.pug');
});

app.get('/contact', (req, res) => {
    res.status(200).render('contact.pug');
});

app.post('/contact', (req, res) => {
    var myData = new contact(req.body);
    myData.save().then(() => {
        res.send("This item has been saved to the database")
    }).catch(() => {
        res.status(400).send("Item was not save to the database")
    })

    // res.status(200).render('contact.pug');

});


//START THE SERVER
app.listen(port, () => {
    console.log(`The application is started successfully on port ${port}`);
})