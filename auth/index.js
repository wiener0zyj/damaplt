/**
 * Created by Wiener_zyj on 2017/11/12.
 */
var auth = require('./auth.service');
var express = require('express');
var passport = require('passport');
var router = express.Router();

router.post('/',function(req,res,next){
    passport.authenticate('local',function(err,user,info){
        if(err){
            return res.status(401).send();
        }
        if(info){
            return res.status(403).send(info);
        }
        var token = auth.signToken(user.uid);
    })
});

module.exports = router;