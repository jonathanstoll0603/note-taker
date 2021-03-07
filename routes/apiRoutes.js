const fs = require('fs');
const uniqid = require('uniqid');
// Exports all of our app.get methods for our API database calls as a function to be used in server.js
module.exports = (app) => {
  
  let notesData = [];

  // JSON data page of the notes that have been stored in the db.json file. 
  app.get("/api/notes", function(err, res) {
    try {
      // reads the notes from json file
      notesData = fs.readFileSync("./db/db.json", "utf8");
      // parse it so notesData is an array of objects
      notesData = JSON.parse(notesData);
  
      // error handling
    } catch (err) {
      console.log(err);
    }
    console.log("GET request for /api/notes was successful.");

    // send object to the browser
    res.json(notesData);
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
      res.json(JSON.parse(notesData));
    });
  });

  app.delete("/api/notes/:id", function(req, res) {
    try {
      //  reads the json file
      notesData = fs.readFileSync("db/db.json", "utf8");

      // parse the data to get an array of the objects
      notesData = JSON.parse(notesData);

      // delete the old note from the array object
      notesData = notesData.filter((note) => {
        return note.id != req.params.id;
      });
      // make it string(stringify)so you can write it to the file
      notesData = JSON.stringify(notesData);

      // write the new notes to the file
      fs.writeFile("db/db.json", notesData, "utf8", function(err) {
        // error handling
        if (err) throw err;
      });
  
      console.log("DELETE request was successful.");
      // turn it back into an array object and send to the client
      res.send(JSON.parse(notesData));
  
      // handles errors
    } catch (err) {
      throw err;
    }
  });
};