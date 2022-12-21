import express from 'express';
import configViewEngine from './config/viewEngine';
import initWebRoute from './route/web';
// import connectDB from './config/connectDB';
require('dotenv').config();
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// setup view engine ejs
configViewEngine(app);
// init Route
initWebRoute(app);

// connectDB;


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
})