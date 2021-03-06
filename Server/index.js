const fs = require('fs');
const path = require('path');

const express = require("express")
const app = express()
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const HttpError = require("./models/http-error")
const userRoutes = require("./routes/user-routes")
const announcementRoutes = require("./routes/announcement-routes")
const applicationRoutes = require("./routes/application-routes")
const reportRoutes = require("./routes/report-routes")
require("dotenv").config()

const connection_string = process.env.CONNECTION_STRING
const port = process.env.PORT || 8000

app.use(bodyParser.json());
app.use('/uploads', express.static('uploads'));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
  
    next();
  });


app.use('/api/user', userRoutes);
app.use('/api/announcement', announcementRoutes)
app.use('/api/application', applicationRoutes)
app.use('/api/report', reportRoutes)

app.use((req, res, next) => {
  const error = new HttpError('Could not find this route.', 404);
  throw error;
});


app.use((error, req, res, next) => {
    if (req.file) {
      fs.unlink(req.file.path, err => {
        console.log(err);
      });
    }
    if (res.headerSent) {
      return next(error);
    }
    res.status(error.code || 500);
    res.json({ message: error.message || 'An unknown error occurred!' });
  });


mongoose.connect(connection_string)
.then(() => console.log("Connection successful OK"))
.catch((err)=> console.error("Connection Failed : ",err.message))

app.listen(port, () =>{
    console.log(`Server running on port ${port} ... `)
})