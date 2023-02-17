const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.port || 3001;


// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

//create GET * should return the index.html file.
// '/' is my root but must change to *
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});


//create ROUTE GET /notes should return the notes.html file.

app.get('./notes', (req, resp) => res.json(db.json));


//set up listen for port

app.listen(PORT, () => {
    console.log(`Your app is listening at http://localhost:${PORT}`);
});


