const express = require('express');
const path = require('path');


​
const app = express();
const PORT = 8080;
​
​
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const notes = [

]

app.listen(PORT, () => {
    console.log(`App listening on PORT ${PORT}`);
  });