var gulp = require("gulp");
var sass = require('gulp-sass');
var inlineSource = require('gulp-inline-source');
var uncache = require('gulp-uncache');
var minifyHTML = require('gulp-minify-html');
var uglify = require('gulp-uglify');

gulp.task("js", function(){
	gulp.src("dev/*.js")
		.pipe(uglify({
			preserveComments:'some',
		}))
		.pipe(gulp.dest("./"));
});

gulp.task("html", function(){
	gulp.src("dev/*.html")
		.pipe(inlineSource({
			compress: false,
			pretty: false}))
		.pipe(uncache({
			append: "hash",
			srcDir: "dev",
		}))
		.pipe(minifyHTML({
			empty: true,
			conditionals: true,
			}))
		.pipe(gulp.dest("./"));
});

gulp.task("css", function(){
	gulp.src("dev/style.scss")
		.pipe(sass({outputStyle:"compressed"}))
		.pipe(gulp.dest("dev"));
});

//非同期なのでhtmlで問題が怒るかも
gulp.task("default", ["css", "js", "html"]);
