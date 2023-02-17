const express = require('express');

const { getFile, uploadFile, getSingleFile, updateFile , deleteFile } = require('../controllers/fileController')

const router = express.Router();

router.route('/get').get(getFile);
router.route("/get/:id").get(getSingleFile);
router.route('/upload').post(uploadFile);
router.route('/file/:id').put(updateFile).delete(deleteFile)

module.exports = router