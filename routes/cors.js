const express = require('express');
const cors = require('cors');
const app = express();

const whitelist = ['http://localhost:3000', 'http://localhost:5000','https://lib-manage.herokuapp.com/','https://lib-manage.herokuapp.com:3000','https://lib-manage.herokuapp.com:5000'];
var corsOptionsDelegate = (req, callback) => {
    var corsOptions;
    console.log(req.header('Origin'));
    corsOptions = { origin: true };
    callback(null, corsOptions);
};

exports.cors = cors();
exports.corsWithOptions = cors(corsOptionsDelegate);