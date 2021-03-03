const path = require('path');

// Exports all of our app.get methods for our html pages as a function to be used in server.js
module.exports = (app) => {

  // for the home page
  app.get('/home', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
  });

  // for the notes page
  app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/notes.html'));
  });

  // If no matching route is found default to home
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
  });
  
};