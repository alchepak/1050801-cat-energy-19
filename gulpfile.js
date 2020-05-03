"use strict";

/* Подключение пакетов */

var gulp = require("gulp");
var del = require("del");
var plumber = require("gulp-plumber");
var sourcemap = require("gulp-sourcemaps");
var sass = require("gulp-sass");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var csso = require("gulp-csso");
var rename = require("gulp-rename");
var server = require("browser-sync").create();

/* Очистка build */

gulp.task("clean", function () {
  return del("build");
});

/* Копирование файлов проетка в build */

gulp.task("copy", function () {
  return gulp.src([
    "source/fonts/**/*.{woff,woff2}",
    "source/img/**",
    "source/js/**"
  ], {
    base: "source"
  })
  .pipe(gulp.dest("build"));
});

/* Копирование полифиллов в build */

gulp.task('copy-picturefill', function () {
  return gulp.src("node_modules/picturefill/dist/picturefill.min.js")
    .pipe(gulp.dest('build/js'));
});

gulp.task('copy-svg4everybody', function () {
  return gulp.src("node_modules/svg4everybody/dist/svg4everybody.min.js")
    .pipe(gulp.dest('build/js'));
});

gulp.task("css", function () {
  return gulp.src("source/sass/style.scss")
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(csso())
    .pipe(rename("style.min.css"))
    .pipe(sourcemap.write("."))
    .pipe(gulp.dest("build/css"))
    .pipe(server.stream());
});

gulp.task("server", function () {
  server.init({
    server: "source/",
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch("source/sass/**/*.scss", gulp.series("css"));
  gulp.watch("source/img/*.svg").on("change", server.reload);
  gulp.watch("source/js/*.js").on("change", server.reload);
  gulp.watch("source/*.html").on("change", server.reload);
});

gulp.task("start", gulp.series("css", "server"));
