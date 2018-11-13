const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const lessMiddleware = require('less-middleware');
const logger = require('morgan');
const PORT = process.env.PORT || 5000;

const indexRouter = require('./routes/index');
const storyRouter = require('./routes/story');


express().use(logger('dev'))
    .use(express.json())
    .use(express.urlencoded({extended: false}))
    .use(cookieParser())
    .use(lessMiddleware(path.join(__dirname, 'public')))
    .use(express.static(path.join(__dirname, 'public')))
    .use('/', indexRouter)
    .use('/story', storyRouter)
    .listen(PORT, () => console.log(`Listening on ${ PORT }`));

