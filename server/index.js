const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/../client/dist'));

const fetch = require('node-fetch');
global.fetch = fetch;

const Unsplash = require('unsplash-js').default;
const toJson = require("unsplash-js").toJson;
const api = require('../config.js');
const unsplash = new Unsplash({ accessKey: api.UNSPLASH_ACCESS_KEY});

app.get('/api/randompic', (req, res) => {
  unsplash.photos.getRandomPhoto()
  .catch((err) => {
    res.status(500).end('Error with Unsplash API');
  })
  .then(toJson)
  .then((json) => {
    res.status(200).json({
      prompt: json.alt_description,
      username: json.user.username,
      userprofile: json.user.links.html,
      photoraw: json.urls.raw,
      photofull: json.urls.full,
      photoregular: json.urls.regular,
      photosmall: json.urls.small,
      photothumb: json.urls.thumb
    });
  });
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});