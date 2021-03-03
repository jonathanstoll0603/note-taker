const express = require('express');
const app = express();

const PORT = process.env.PORT || 8080;

// // Express middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public')); // sends all linked files simulataneously e.g. css/html

// Imports the app.get requests from our routes folder
require('./routes/htmlRoutes')(app);
require("./routes/apiRoutes")(app);

// Proves server is online
app.listen(PORT, () => {
  console.log(`App listening at http://localhost:${PORT}`)
});