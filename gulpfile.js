const gulp = require("gulp");
const uglify = require("gulp-uglify");

gulp.task("compile-ts", () => {
	var browserify = require("browserify");
	var source = require('vinyl-source-stream');
	var tsify = require("tsify");
	var sourcemaps = require('gulp-sourcemaps');
	var streamify = require('gulp-streamify');
	const babel = require("gulp-babel");
	return browserify({
		basedir: '.',
		debug: true,
		entries: ['src/app.ts'],
		cache: {},
		packageCache: {}
	}).plugin(tsify)
		.bundle()
		.pipe(source('index.js'))
		.pipe(streamify(babel({presets: ["es2015"]})))
		.pipe(streamify(sourcemaps.init({loadMaps: true})))
		.pipe(streamify(uglify()))
		.pipe(streamify(sourcemaps.write('./')))
		.pipe(gulp.dest("bin/build"));
});

gulp.task("compile-scss", () => {
	const scss = require("gulp-scss");
	const cssBase64 = require("gulp-css-base64");
	const fs = require("fs");
	const expandJsTpl = () => {
		const cssFilePath = "./bin/build/styles.css";
		const outStylesPath = "./bin/build/styles.js";
		const templatePath = "./res/styles.tpl";
		const styles = fs.readFileSync(cssFilePath, "utf-8");
		fs.unlink(cssFilePath, (error) => {
			if (error) {console.log(error);}
		});
		const styleTemplate = fs.readFileSync(templatePath, "utf-8");
		fs.writeFileSync(outStylesPath, styleTemplate.replace(/{STYLES}/g, styles));
		gulp.src(outStylesPath).pipe(uglify()).pipe(gulp.dest((file) => file.base));
	};
	gulp.src("res/styles/styles.scss")
		.pipe(scss({
			noCache: true,
			tmpPath: "",
			style: "compressed"
		}))
		.pipe(cssBase64())
		.pipe(gulp.dest("bin/build")).on("end", expandJsTpl);
});

gulp.task("build", ["compile-ts", "compile-scss"]);