import express, { Router } from 'express';
import homeController from '../controller/homeController';
import multer from 'multer';
import path from 'path';
var approot = require('app-root-path');
let router = express.Router();


const storage = multer.diskStorage({
    destination: function (req, file, cb) {

        cb(null, approot + "/src/public/image/");
    },

    // By default, multer removes file extensions so let's add them back
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const imageFilter = function (req, file, cb) {
    // Accept images only
    if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
        req.fileValidationError = 'Only image files are allowed!';
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
};

let upload = multer({ storage: storage, fileFilter: imageFilter });
let uploadMultipleFile = multer({ storage: storage, fileFilter: imageFilter }).array('multiple_images', 3);

const initWebRoute = (app) => {
    router.get('/', homeController.getHomePage);

    router.get('/detail/:name/:userId', homeController.getDetailPage);
    app.post('/create-new-user', homeController.createNewUser);
    router.post('/deleteUser', homeController.deleteUser);
    router.get('/editUser/:id', homeController.editUser);
    router.post('/updateUser', homeController.updateUser);
    router.get('/uploadFile', homeController.uploadFile);
    router.post('/upload-profile-pic', upload.single('profile_pic'), homeController.handleUploadFile)
    router.post('/upload-multiple-images', (req, res, next) => {
        uploadMultipleFile(req, res, (err) => {
            if (err instanceof multer.MulterError) {
                return res.send('Vượt quá giới hạn !')
            } else if (req.fileValidationError) {
                return res.send(req.fileValidationError);
            } else if (err) {
                return res.send('Lỗi không xác định!')
            }
            else {
                next();
            }


        })
    }, homeController.handleUploadMultipleFile)
    return app.use('/', router);
}

module.exports = initWebRoute;