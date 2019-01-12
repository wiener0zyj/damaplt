/**
 * Created by Wiener_zyj on 2017/11/12.
 */
var mongoose    = require('mongoose');
var passport    = require('passport');
var config       = require('../config/env');
var jwt         = require('jsonwebtoken');
var compose      = require('composable-middleware');
var expressJwt   = require('express-jwt');
var JwtStrategy  = require("passport-jwt").Strategy;
ExtractJwt        = require('passport-jwt').ExtractJwt;
var crypto        = require('crypto');
var https         = require('https');
const querystring = require('querystring');
var url           = require('url');
require('../MongoControl/model');
var zx_Account = mongoose.model("accounts");

/**
 * 生成token
 */
function signToken(uid){
    var token = jwt.sign({uid:uid},config.session.secrets,{expiresIn:'1y'});
    var token_coded = cipher(token);
    return token_coded;
}

var opts = {}
opts.jwtFromRequest = ExtractJwt.fromUrlQueryParameter("token");
opts.secretOrKey = config.session.secrets;

/**
 * 验证token
 */
function authToken(req, res, next){
    try{
        if(req.query && req.query.token){
            var token_decoded = decipher(req.query.token);
            console.log('请求的jwt:' + token_decoded);
            jwt.verify(token_decoded,config.session.secrets,function(err,decoded) {
                //在这里根据验证的结果去执行任务
                if(err == null){
                    console.log(decoded);
                    req.jwtObj = decoded;
                    next();
                }else{
                    console.log("Error Catch: Invalid token!");
                    var result = {
                        status:2,
                        description:'token错误，请重新登陆',
                        result:{}
                    };
                    res.json(result);
                    res.end();
                }
            });
        }else{
            console.log('缺少token(jwt)字段');
            req.jwtObj = null;
            next();
        }
    }catch(ex){
        console.log('发现exception');
        console.error(ex);
        req.jwtObj = null;
        var result = {
            status:2,
            description:'token错误，请重新登陆',
            result:0
        };

        res.json(result);
        res.end();
    }
}
function authStateToken(req, res, next){
    try{
        if(req.query && req.query.state){
            var token_decoded = decipher(req.query.state);
            console.log('请求的jwt:' + token_decoded);
            jwt.verify(token_decoded,config.session.secrets,function(err,decoded) {
                //在这里根据验证的结果去执行任务
                if(err == null){
                    console.log(decoded);
                    req.jwtObj = decoded;
                    next();
                }else{
                    console.log("Error Catch: Invalid token!");
                    var result = {
                        status:2,
                        description:'token错误，请重新登陆',
                        result:{}
                    };
                    res.json(result);
                    res.end();
                }
            });
        }else{
            console.log('缺少token(jwt)字段');
            req.jwtObj = null;
            next();
        }
    }catch(ex){
        console.log('发现exception');
        console.error(ex);
        req.jwtObj = null;
        var result = {
            status:2,
            description:'token错误，请重新登陆',
            result:0
        };

        res.json(result);
        res.end();
    }
}
function authToken_return(token, callback){
    try{
        var token_decoded = decipher(token);
        jwt.verify(token_decoded,config.session.secrets,function(err,decoded) {
            //在这里根据验证的结果去执行任务
            if(err == null){
                console.log(decoded);
                var jwtObj = decoded;
                if (callback && typeof(callback) === "function") {
                    callback(err,decoded);
                }
                return jwtObj;
            }else{
                console.log("Error Catch: Invalid token!");
                if (callback && typeof(callback) === "function") {
                    callback(err,decoded);
                }
                return false;
            }
        });
    }catch(ex){
        console.log('发现exception');
        console.error(ex);
        return false;
    }
}
function authCookieToken(req, res, next){
    try{
        if(req.cookies && req.cookies.token){
            var token_decoded = decipher(req.cookies.token);
            console.log("req.cookies.token: " + req.cookies.token);
            console.log('请求的jwt:' + token_decoded);
            jwt.verify(token_decoded,config.session.secrets,function(err,decoded) {
                //在这里根据验证的结果去执行任务
                if(err == null){
                    console.log(decoded);
                    req.jwtObj = decoded;
                    next();
                }else{
                    console.log("Error Catch: Invalid token!");
                    var result = {
                        status:2,
                        description:'token错误，请重新登陆',
                        result:{}
                    };
                    res.json(result);
                    res.end();
                }
            });
        }else{
            console.log('缺少cookies token(jwt)字段');
            req.jwtObj = null;
            next();
        }
    }catch(ex){
        console.log('发现exception');
        console.error(ex);
        req.jwtObj = null;
        var result = {
            status:2,
            description:'token错误，请重新登陆',
            result:0
        };

        res.json(result);
        res.end();
    }
}

function cipher(buf) {
    var encrypted = "";
    var cip = crypto.createCipher('rc4', 'zhuanyedaipaihupai');
    encrypted += cip.update(buf, 'binary', 'hex');
    encrypted += cip.final('hex');
    return encrypted;
}

function decipher(encrypted) {
    var decrypted = "";
    var decipher = crypto.createDecipher('rc4', 'zhuanyedaipaihupai');
    decrypted += decipher.update(encrypted, 'hex', 'binary');
    decrypted += decipher.final('binary');
    return decrypted;
}

exports.signToken = signToken;
exports.authToken = authToken;
exports.authStateToken = authStateToken;
exports.authToken_return = authToken_return;
exports.authCookieToken = authCookieToken;
//加密
exports.cipher = cipher;
//解密
exports.decipher = decipher;