// server.js

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

console.log("Current directory:", __dirname);
console.log("Files in current directory:", fs.readdirSync(__dirname));
console.log("Files in ../backend/route:", fs.readdirSync(path.join(__dirname, '../backend/route')));
const summarizeRoute = require('../backend/route/summarizeRoute');
const authRoute = require('../backend/route/authRoute');

const app = express();
app.use(cors());
app.use(express.json());
//const fs = require('fs');
//console.log(fs.readdirSync('../backend/route'));

const MONGO_URL = 
"mongodb+srv://ranjanirithu206:KS0pwc1jwcIxmZu0@cluster0.8mgcr.mongodb.net/MEAN?retryWrites=true&w=majority";


 

mongoose.connect( MONGO_URL, {
  family: 4
})
  .then(() => console.log("Mongo DB connected"))
  .catch(error => console.log(error));

app.use('/api/auth', authRoute);
app.use('/api/summarize', summarizeRoute);

//const PORT = 9000;
const PORT = process.env.PORT || 9000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
