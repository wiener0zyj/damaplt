/**
 * Created by Wiener_zyj on 2019/1/12.
 */
var express         = require('express');
var url              = require('url');
var qs               = require('querystring');
var jwt              = require('jsonwebtoken');
var router           = express.Router();
var expressJwt       = require('express-jwt');
var config           = require('../config/env');
var mongoose        = require('mongoose');
var async            = require('async');
var http             = require('http');
var multer           = require('multer');
var path             = require('path');
var fs               = require('fs');
var nodemailer       = require("nodemailer");
var smtpTransport    = require('nodemailer-smtp-transport');
var auth             = require('../auth/auth.service');
var crypto           = require('crypto');
var qr               = require('qr-image');
var md5              = require('md5');
const https          = require('https');

//测试一下
router.get('/loveit',
    function(req, res, next){
        res.json({name:123});
        res.end();
    }
);

module.exports = router;