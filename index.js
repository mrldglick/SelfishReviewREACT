const express = require('express');
const morgan = require('morgan');
const errorHandler = require('./lib/errorHandler');
const app = express();
const { dbUri } = require('./config/environment');
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
mongoose.connect(dbUri);

const bodyParser = require('body-parser');
const Router = require('./config/routes');
// const { port, dbURI } = require('./config/environment');

// Needs above the router and morgan - And in json!
app.use(bodyParser.json());



app.use(morgan('dev'));


app.use('/api', Router);

// The error handler must go under the router
app.use(errorHandler);



app.listen(4000, () => console.log('Express is listening on port 4000'));
