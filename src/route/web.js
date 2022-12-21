import express, { Router } from 'express';
import homeController from '../controller/homeController';
let router = express.Router();

const initWebRoute = (app) => {
    router.get('/', homeController.getHomePage);

    router.get('/detail/:name/:userId', homeController.getDetailPage);
    app.post('/create-new-user', homeController.createNewUser);
    router.post('/deleteUser', homeController.deleteUser);
    router.get('/editUser/:id', homeController.editUser);
    router.post('/updateUser', homeController.updateUser);
    return app.use('/', router);
}

module.exports = initWebRoute;