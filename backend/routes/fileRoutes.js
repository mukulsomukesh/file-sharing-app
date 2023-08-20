const express = require('express');

const { getFile, uploadFile, getSingleFile, updateFile , deleteFile, checkFilePassword } = require('../controllers/fileController')

const router = express.Router();

router.route('/get').get(getFile);
router.route("/get/:id").get(getSingleFile);
router.route('/upload').post(uploadFile);
router.route('/file/:id').put(updateFile).delete(deleteFile)
router.route('/download/file/validate/:id').post(checkFilePassword)

module.exports = router