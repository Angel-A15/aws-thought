const express = require('express');
const router = express.Router();
const multer = require('multer');
const AWS = require('aws-sdk');
const paramsConfig = require('../utils/params-config');


// function set to create temporary storage 
// container for images until ready for upload to s3 bucket
const storage = multer.memoryStorage({
    destination: function (req, file, callback) {
      callback(null, '');
    },
});

// function will store img data from post route 
// and single method to define a single img to be recieved
const upload = multer({ storage }).single('image');

// locks version number to prevent code from 
// breaking due to default version changes to the API
const s3 = new AWS.S3({
  apiVersion: '2006-03-01',
});

router.post('/image-upload', upload, (req, res) => {
    // params config
    router.post('/image-upload', upload, (req, res) => {
    const params = paramsConfig(req.file);
    // S3 service call
    });
    
    // S3 service call
    s3.upload(params, (err, data) => {
        if (err) {
          console.log(err);
          res.status(500).send(err);
        }
        res.json(data);
    });
});

module.exports = router;
