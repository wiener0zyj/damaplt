/**
 * Created by Wiener_zyj on 2017/5/21.
 */
var gulp = require('gulp');
var data = require('gulp-data');
var stylus = require('gulp-stylus');
var babel = require("gulp-babel");
var es2015 = require('babel-preset-es2015');
var react = require("gulp-react");//新加入的模块
var webpack = require("gulp-webpack");
var $ = require('gulp-load-plugins')();

// include, if you want to work with sourcemaps
var sourcemaps = require('gulp-sourcemaps');

gulp.task('default',function(){
    console.log('开始编译');
})

gulp.task('compress', function () {
    return gulp.src('./public/stylesheets/StylusDir/*.styl')
        .pipe(stylus({
            compress: true
        }))
        .pipe(gulp.dest('./public/stylesheets/'));
});

gulp.task("es6conv", function () {
    return gulp.src("./public/Components/*.jsx")// ES6 源码存放的路径
        .pipe(react({
            harmony: false,
            es6module: true
        }))                              // 解析jsx使用
        .pipe($.plumber())
        .pipe($.babel({presets:['es2015', 'react', "stage-0"]}))           //es6tojs的解析器
        .pipe(gulp.dest("./public/com")) //转换成 ES5 存放的路径
        .pipe(webpack({
            output:{
                filename: "all.js"
            },
            stats:{
                colors: true
            }
        }))
        .pipe(gulp.dest("./public/com")); //转换成 ES5 存放的路径
});

gulp.task('default',['compress']);