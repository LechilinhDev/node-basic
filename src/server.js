import express from 'express';
import configViewEngine from './config/viewEngine';
import initWebRoute from './route/web';
import initAPIRoute from './route/api';
// import connectDB from './config/connectDB';
require('dotenv').config();
var morgan = require('morgan')
const app = express();
const port = process.env.PORT || 8081;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(morgan('combined'))
// setup view engine ejs
configViewEngine(app);


// init Route
initWebRoute(app);

// init API Route
initAPIRoute(app);


// midedleware 404 erro!
app.use((req, res, next) => {

    if (res.status(404).statusCode === 404) {
        return res.render('404.ejs');
    };
    next();
})
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
})