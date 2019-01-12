var express          = require('express');
var path             = require('path');
var router           = express.Router();
var mongoose         = require('mongoose');
var auth             = require('../auth/auth.service');

//数据类型
require('../MongoControl/model');
let zx_Account = mongoose.model("accounts");



/* Get home page */
router.get('/',  auth.authCookieToken, function(req, res, next){
        res.render('home', {});
});


module.exports = router;
