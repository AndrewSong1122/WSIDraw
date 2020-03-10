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

const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');

const s3 = new aws.S3({
  accessKeyId: api.AWSAccessKeyId,
  secretAccessKey: api.AWSSecretKey
});

var upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: 'wsidraw',
        key: function (req, file, cb) {
            console.log(file);
            var name = file.originalname;
            var type = name.substring(name.lastIndexOf('.'), name.length);
            cb(null, req.params.id + type);
        }
    })
});

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

app.post('/api/upload/:id', upload.array('submission',1), function (req, res, next) {
    res.status(201).end();
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});