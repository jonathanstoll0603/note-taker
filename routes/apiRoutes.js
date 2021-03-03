const notesData = require('../db/db');

// Exports all of our app.get methods for our API database calls as a function to be used in server.js
module.exports = (app) => {
  
  // JSON data page of the notes that have been stored in the db.json file. 
  app.get('/api/notes', (req, res) => {
    // res.sendFile(path.join(__dirname, '../db/db.json'));
    res.json(notesData);
  });

  app.post('/api/notes', (req, res) => {
    notesData.push(req.body);
    res.json(true);
  });

};