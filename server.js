//Required libraries 
const express = require('express');
const app = express();
const fs = require('fs');
const uuid = require('./helpers/uuid');

const port = process.env.PORT || 3001;

// Middleware for parsing JSON and url-encoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// GET Route for index.html - file is transfered in response
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

// GET Route for notes.html - file is transfered as response
app.get('/notes', (req, res) => {
  res.sendFile(__dirname + '/public/notes.html');
});

//function to read db.json file
function notesFunction() {
  const database = fs.readFileSync('./db/db.json', 'utf8');
  return JSON.parse(database);
}

//GET route for api notes and read db.json file to show saved notes
app.get('/api/notes', (req, res) => {
    const notes = notesFunction();
    res.json(notes);
});

//POST route to save note on req body add db.json
app.post('/api/notes', (req, res) => {
  console.log(req.body);
  let notes = notesFunction() 
    notes.push({
      title: req.body.title,
      text: req.body.text,
      id: uuid(),
    });
    fs.writeFile('db/db.json', JSON.stringify(notes, null, 4), (err) => {
      if (err) throw err;
      res.json(notes);
    })
});

// DELETE Route for a specific tip
app.delete('/api/notes/:id', (req, res) => {
  const noteID = req.params.id;

   let notes = notesFunction()
   
    notes = notes.filter((note) => note.id !== noteID);

    fs.writeFile('db/db.json', JSON.stringify(notes), (err) => {
      if (err) throw err;
      res.json(notes);
    })
});

//Starts the server
app.listen(port, () => console.log(`Server started at port ${port}`));
