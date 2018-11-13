var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var lessMiddleware = require('less-middleware');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var storyRouter = require('./routes/story');

var index = express();

index.use(logger('dev'));
index.use(express.json());
index.use(express.urlencoded({ extended: false }));
index.use(cookieParser());
index.use(lessMiddleware(path.join(__dirname, 'public')));
index.use(express.static(path.join(__dirname, 'public')));

index.use('/', indexRouter);
index.use('/story', storyRouter);

module.exports = index;
