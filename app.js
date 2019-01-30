const express = require('express');
const router = express.Router();
const app = express();
const path = require('path');

require('dotenv').config();

const port = process.env.PORT || 3000;

const strava = new require('strava')({
   client_id: process.env.CLIENT_ID,
   client_secret: process.env.CLIENT_SECRET,
   redirect_uri: process.env.REDIRECT_URI,
   access_token: process.env.ACCESS_TOKEN,
});

/**
 * setup the views
 */
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// routes
app.use('/', (req, res) => {
   res.render('index', {title: 'title goes here'});
});

app.get('/user', (req, res) => {
   strava.athlete.get((err, result) => {
      res.send(result);
   });
});

app.listen(3000, () => {
   console.log(`SERVER is listening on port ${port}`);
});

module.exports = app;