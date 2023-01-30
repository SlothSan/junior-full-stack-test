require('dotenv').config()
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors')
const mongoose = require('mongoose');

//Set up default mongoose connection
const mongoDB = `mongodb://root:password@localhost:27017/dogs?authSource=admin&readPreference=primary&ssl=false`;
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.error(err));

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


const indexRouter = require('./routes/index');
const dogsRouter = require('./routes/dogs');
const userRouter = require('./routes/users');


const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.use('/', indexRouter);
app.use('/dogs', dogsRouter);
app.use('/users', userRouter)

module.exports = app;
