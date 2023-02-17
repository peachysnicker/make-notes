const express = require('express');
const path = require('path');
const fs = require('fs');
const notes = require('./db/db.json') || [];

const app = express();
const PORT = process.env.port || 3001;

// /api/notes should read the db.json file and return all saved notes as JSON
app.get('/api/notes', (req, res) => {
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
      if (err) throw err;
      //Parses the data and returns all saved notes
      const notes = JSON.parse(data);
      res.json(notes);
    });
  });

// POST the new note
app.post('/api/notes', (req, res) => {
    console.info(`${req.method} request has been received to add your note`);

    const { title, text } = req.body;

    if (title && text) {
        const newNote = {
            title,
            text,
        };

        const response = {
            status: 'success',
            body: newNote,
        };

    console.log(response);

    res.status(201).json(response);

    } else {

    res.status(500).json('Error in saving your note');
    }
});

//retrieving previous saved notes from the db.json database
app.post('/api/notes', (req, res) => {
    console.log(req.body);
    fs.readFile('./db/db.json', 'utf8', (err, response) => {
      if (err) throw err;
      const previousNotes = JSON.parse(response);
      previousNotes.push({
        title: req.body.title,
        text: req.body.text,
        id: id++,
      });
      fs.writeFile('db/db.json', JSON.stringify(oldNotes, null, 4), (err) => {
        if (err) throw err;
        res.json(previousNotes);
      })
    });
  });

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

//create GET * should return the index.html file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + 'index.html'));
});


//create ROUTE GET /notes should return the notes.html file.
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname + '/public/notes.html'));
});


//order matters this * route needs to be at the bottom
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});


//attempt to delete


//set up listen for port
app.listen(PORT, () => {
    console.log(`Your app is listening at http://localhost:${PORT}`);
});


