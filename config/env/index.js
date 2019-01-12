/**
 * Created by Wiener_zyj on 2017/7/17.
 */
var fs = require('fs');
var config = {
    port:process.env.PORT || 10901,
    session:{
        secrets:'Wiener-zyj'
    }
}
module.exports = config;