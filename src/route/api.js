import express, { Router } from 'express';
import APIController from '../controller/APIController';
let router = express.Router();

const initAPIRoute = (app) => {
    router.get('/users', APIController.getAllUser); // method GET Red data
    router.post('/create-user', APIController.createNewUser); // Post Create data
    router.put('/updateUser', APIController.updateUser); // Method PUT --> Update data
    router.delete('/delete-user/:id', APIController.deleteUser);//Method Delete --> delete data
    return app.use('/api/v1', router);
}

module.exports = initAPIRoute;