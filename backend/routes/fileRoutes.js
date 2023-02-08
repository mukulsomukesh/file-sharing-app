const express = require('express');

const { getFile, uploadFile, getSingleFile } = require('../controllers/fileController')


const router = express.Router();

router.route('/get').get(getFile);
router.route("/get/:id").get(getSingleFile);
router.route('/upload').post(uploadFile);


module.exports = router