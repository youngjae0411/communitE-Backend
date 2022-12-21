const multer = require('multer');
const multerS3 = require('multer-s3');
const aws = require('aws-sdk');
require('dotenv').config();
aws.config.loadFromPath(__dirname + '/../config/s3.json');

const s3 = new aws.S3();
const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: 'communitepost',
        acl: 'public-read',
        contentType: multerS3.AUTO_CONTENT_TYPE,
        key: function (req, file, cb) {
            console.log(file);
            cb(null, `${Date.now()}_${file.originalname}`);
        },
    }),
});
module.exports = upload;
