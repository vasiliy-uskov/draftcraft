const gulp = require("gulp");
const uglify = require("gulp-uglify");

gulp.task("compile-ts", () => {
	const browserify = require("browserify");
	const source = require('vinyl-source-stream');
	const tsify = require("tsify");
	const sourcemaps = require('gulp-sourcemaps');
	var buffer = require('vinyl-buffer');
	const babelify = require("babelify");
	return browserify({
		basedir: '.',
		debug: false,
		entries: ['src/app.ts'],
		cache: {},
		packageCache: {}
	})
	.plugin(tsify)
		.transform(babelify.configure({
			presets: ["es2015"],
			extensions: ['.js', '.ts']
		}
	)).bundle().on('error', (error) => {
			console.log(error.message);
		})
	.pipe(source('index.js'))
	.pipe(buffer())
	.pipe(sourcemaps.init({loadMaps: true}))
	.pipe(uglify())
	.pipe(sourcemaps.write('./'))
	.pipe(gulp.dest("bin/build"));
});

gulp.task("compile-scss", () => {
	const scss = require("gulp-scss");
	const cssBase64 = require("gulp-css-base64");
	const fs = require("fs");
	const gutil = require("gulp-util");
	const expandJsTpl = () => {
		const cssFilePath = "./bin/build/styles.css";
		const outStylesPath = "./bin/build/styles.js";
		const templatePath = "./res/styles.tpl";
		const styles = fs.readFileSync(cssFilePath, "utf-8");
		fs.unlink(cssFilePath, (error) => {
			if (error) {console.log(error);}
		});
		const styleTemplate = fs.readFileSync(templatePath, "utf-8");
		fs.writeFileSync(outStylesPath, styleTemplate.replace(/{STYLES}/g, styles.replace(/\"/g, "\\\"")));
		gulp.src(outStylesPath).pipe(uglify()).on('error',(err) => {
			gutil.log(gutil.colors.red('[Error]'), err.toString());
		}).pipe(gulp.dest((file) => file.base));
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