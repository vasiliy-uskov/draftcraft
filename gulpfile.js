const gulp = require("gulp");
const uglify = require("gulp-uglify");
const scss = require("gulp-scss");
const base64Inline = require("gulp-base64-inline");
const browserify = require("browserify");
const source = require('vinyl-source-stream');
const tsify = require("tsify");
const buffer = require('vinyl-buffer');


const paths = {
	outPath: "bin/build",
	tsEntryPoint: "src/app.ts",
	scssEntryPoint: "res/styles/styles.scss",
};

const config = {
	scss: {
		noCache: true,
			tmpPath: "",
			style: "compressed"
	},
	babel: {
		presets: ["@babel/env"],
			extensions: ['.ts'],
			minified: true,
	},
	browserify: {
		debug: false,
		entries: [paths.tsEntryPoint],
		extensions: ['.babel'],
		cache: {},
		packageCache: {},
	}
};

gulp.task("compile-ts", () => {
	return browserify(config.browserify)
		.plugin(tsify)
		.transform("brfs")
		.transform("babelify", config.babel)
		.bundle()
		.on('error', (error) => {
			console.log(error.message);
		})
		.pipe(source('index.js'))
		.pipe(buffer())
		.pipe(uglify())
		.pipe(gulp.dest(paths.outPath));
});

gulp.task("compile-scss", () => {
	gulp.src(paths.scssEntryPoint)
		.pipe(scss(config.scss))
		.pipe(base64Inline())
		.pipe(gulp.dest(paths.outPath));
});

gulp.task("build", ["compile-ts", "compile-scss"]);
gulp.task("default", ["build"]);