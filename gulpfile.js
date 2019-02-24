const gulp = require("gulp");
const gutil = require("gulp-util");
const sass = require("gulp-sass");
const base64Inline = require("gulp-base64-inline");
const browserify = require("browserify");
const source = require("vinyl-source-stream");
const tsify = require("tsify");
const buffer = require("vinyl-buffer");
const fs = require("fs");
const pathUtils = require("path");
const terser = require("gulp-terser");


const path = {
	out: "bin/build",
	tsEntryPoint: "src/app/app.ts",
	scssFiles: "res/styles/app/**/*.scss",
	scssEntryPoint: "res/styles/app/**/*.scss",
	externalOut: "external",
	externalConfig: "external-config.json",
};

const config = {
	sass: (debug)=> ({
		outputStyle: !debug ? "compressed" : undefined,
	}),
	babel: (debug) => ({
		presets: !debug ? ["@babel/env"] : [],
		extensions: [".ts"],
	}),
	browserify: (debug, entryPoint) => ({
		debug,
		entries: [entryPoint],
		extensions: [".babel"],
		cache: {},
		packageCache: {},
		plugin: "tsify",
	}),
	external: JSON.parse(fs.readFileSync(path.externalConfig)),
};

function buildTs(entryPoint, out, debug) {
	const stream = browserify(config.browserify(debug, entryPoint))
		.plugin(tsify)
		.transform("brfs");
	if (!debug) {
		stream.transform("babelify", config.babel(debug));
	}
	let errors = [];
	return stream
		.bundle()
		.on("error", (error) => {
			errors.push(error.message)
		})
		.on("end", () => {
			if (errors.length) {
				throw errors.join('\n');
			}
		})
		.pipe(source("index.js"))
		.pipe(buffer())
		.pipe(debug ? gutil.noop() : terser())
		.pipe(gulp.dest(out));
}

function buildScss(entryPoint, out, debug) {
	return gulp.src(entryPoint)
		.pipe(sass(config.sass(debug)))
		.pipe(base64Inline())
		.pipe(gulp.dest(out));
}

gulp.task("build-external", () => {
	const buildPromises = [];
	for (const externalConf of config.external) {
		const externalDir = pathUtils.join(path.externalOut, externalConf.name.toLowerCase().replace(/[-_.]/g, ""));
		buildPromises.push(buildTs(externalConf.tsEntryPoint, externalDir, gutil.env.debug));
		buildPromises.push(buildScss(externalConf.scssEntryPoint, externalDir, gutil.env.debug));
	}
	return Promise.all(buildPromises);
});

gulp.task("compile-ts", () => {
	return buildTs(
		path.tsEntryPoint,
		path.out,
		gutil.env.debug
	)
});

gulp.task("compile-scss", () => {
	return buildScss(path.scssEntryPoint, path.out, gutil.env.debug);
});

gulp.task("watch-scss", ["compile-scss"], () => {
	gutil.env.debug = true;
	gulp.watch(path.scssFiles, ["compile-scss"]).on('error', error => console.log(error));
});

gulp.task("build", ["compile-ts", "compile-scss"]);
gulp.task("watch", ["watch-scss"]);
gulp.task("default", ["build", "watch"]);