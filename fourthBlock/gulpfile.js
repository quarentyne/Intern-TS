const gulp = require("gulp");
const ts = require("gulp-typescript");
const tsProject = ts.createProject("tsconfig.json");
const sass = require('gulp-sass')(require('sass'));

const styleCSS = () => {
  return gulp.src('src/sass/*.scss')
    .pipe(sass())
    .pipe(gulp.dest("dist/css"))
}

const html = () => {
  return gulp.src('src/*.html')
    .pipe(gulp.dest("dist"));
}

const typeScriptModules = () => {
  return tsProject.src()
    .pipe(tsProject()).js
    .pipe(gulp.dest("dist"));
}

exports.default = gulp.series(html, typeScriptModules, styleCSS)