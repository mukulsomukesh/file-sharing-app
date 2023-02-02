const express = require('express');

const { getFile, uploadFile } = require('../controllers/fileController')


const router = express.Router();

router.route('/get').get(getFile);
router.route('/upload').post(uploadFile);



module.exports = router