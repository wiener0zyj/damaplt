/**
 * Created by Wiener_zyj on 2018/12/18.
 */
let mongoose = require('mongoose');
let autoIncrement = require('mongoose-auto-increment');     //自增ID模块
autoIncrement.initialize(mongoose.connection);              //初始化

//1. 用户账户数据类型
let schema_Account = mongoose.Schema({
    name:String,
    telephone:String,
    password:String,
    createtime:{type:Date, default:Date.now},
});
let zx_Account = mongoose.model('accounts', schema_Account);