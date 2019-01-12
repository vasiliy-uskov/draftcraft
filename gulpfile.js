const gulp = require("gulp");
const gutil = require("gulp-util");
const sass = require("gulp-sass");
const base64Inline = require("gulp-base64-inline");
const browserify = require("browserify");
const source = require('vinyl-source-stream');
const tsify = require("tsify");
const buffer = require('vinyl-buffer');


const path = {
	out: "bin/build",
	tsEntryPoint: "src/app.ts",
	scssFiles: "res/styles/**/*.scss",
	scssEntryPoint: "res/styles/styles.scss",
};

const config = {
	sass: (debug)=> ({
		outputStyle: !debug ? "compressed" : undefined,
	}),
	babel: (debug) => ({
		presets: !debug ? ["@babel/env"] : [],
		extensions: ['.ts'],
		minified: !debug,
	}),
	browserify: (debug) => ({
		debug,
		entries: [path.tsEntryPoint],
		extensions: ['.babel'],
		cache: {},
		packageCache: {},
	})
};

gulp.task("compile-ts", () => {
	return browserify(config.browserify(gutil.env.debug))
		.plugin(tsify)
		.transform("brfs")
		.transform("babelify", config.babel(gutil.env.debug))
		.bundle()
		.on('error', (error) => {
			console.log(error.message);
		})
		.pipe(source('index.js'))
		.pipe(buffer())
		.pipe(gulp.dest(path.out));
});

gulp.task("compile-scss", () => {
	gulp.src(path.scssEntryPoint)
		.pipe(sass(config.sass(gutil.env.debug)))
		.pipe(base64Inline())
		.pipe(gulp.dest(path.out));
});

gulp.task("watch-scss", ["compile-scss"], () => {
	gutil.env.debug = true;
	gulp.watch(path.scssFiles, ["compile-scss"]);
});

gulp.task("build", ["compile-ts", "compile-scss"]);
gulp.task("watch", ["watch-scss"]);
gulp.task("default", ["build", "watch"]);