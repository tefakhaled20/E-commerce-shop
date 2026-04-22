const multer =require('multer')

const uuid = require('uuid').v4;

const upload = multer({
    storage: multer.memoryStorage(),
});

const configuredMulterMiddleware = upload.single('image');

module.exports = configuredMulterMiddleware;
