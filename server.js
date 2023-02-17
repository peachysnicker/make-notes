const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.port || 3001;


// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

//create ROUTE GET /notes should return the notes.html file.

//create GET * should return the index.html file.