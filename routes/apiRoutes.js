const fs = require('fs');
const uniqid = require('uniqid');
// Exports all of our app.get methods for our API database calls as a function to be used in server.js
module.exports = (app) => {
  
  let notesData = [];

  // JSON data page of the notes that have been stored in the db.json file. 
  app.get('/api/notes', (req, res) => {

    notesData = fs.readFileSync('./db/db.json');
    notesData = JSON.parse(notesData);
    res.json(notesData)
  });

  app.get('/api/notes/:id', (req, res) => {
    const noteID = req.params.id;

    notesData.forEach(note => {
      if (note === noteID) {
        res.json(notesData)
      } else {
        return console.log('err')
      }
    })

    console.log(noteID);
  });

  app.post('/api/notes', (req, res) => {
    // Reads the json database and then parses it
    notesData = fs.readFileSync('./db/db.json');
    notesData = JSON.parse(notesData);

    // setting a new variable equal to the json body in order to automatically add a inique ID key to each note that is posted by the user
    const addNoteID = req.body;
    // adds a key of id to the json post that is equal to a unique id set by the uniqid npm package
    addNoteID.id = uniqid();

    // pushes the raw request body into the database and then stringifies it
    notesData.push(req.body);
    notesData = JSON.stringify(notesData);

    // writes the new information into the json database which will be displayed to the user
    fs.writeFile('./db/db.json', notesData, (err) => {
      if (err) throw err;
      console.log('Data pushed to db.json file.');

      // send json object back to client (through api http)
      res.json(notesData);
    });
  });
};