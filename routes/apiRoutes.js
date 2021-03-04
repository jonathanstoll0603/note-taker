const fs = require('fs');
const uniqid = require('uniqid');
// Exports all of our app.get methods for our API database calls as a function to be used in server.js
module.exports = (app) => {
  
  const notesData = [];

  // JSON data page of the notes that have been stored in the db.json file. 
  app.get('/api/notes', (req, res) => {

    // reads from the db.json file and stores it in a variable
    notesData = fs.readFileSync('../db/db.json');
    // parses the db.json file and places it into an the empty notesdata array
    notesData = JSON.parse(notesData)

    console.log('Request for API data successful.')

    res.json(notesData);

  })
  // .catch((err) => console.error(err));

  app.post('/api/notes', (req, res) => {
    // notesData.push(req.body);
    // res.json(true);
  });

};