"use strict";

/* Подключение пакетов */

var gulp = require("gulp");
var del = require("del");
var rename = require("gulp-rename");
var imagemin = require("gulp-imagemin");
var webp = require("gulp-webp");
var svgstore = require("gulp-svgstore");
var posthtml = require("gulp-posthtml");
var include = require("posthtml-include");
var plumber = require("gulp-plumber");
var sourcemap = require("gulp-sourcemaps");
var sass = require("gulp-sass");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var csso = require("gulp-csso");
var server = require("browser-sync").create();

/* Очистка build */

gulp.task("clean", function () {
  return del("build");
});

/* Копирование файлов проетка в build */

gulp.task("copy", function () {
  return gulp.src([
    "source/fonts/**/*.{woff,woff2}",
    "source/js/**",
    "!source/**/README"
  ], {
    base: "source"
  })
  .pipe(gulp.dest("build"));
});

/* Копирование полифиллов в build */

gulp.task('copy-modules', function () {
  return gulp.src([
    "node_modules/picturefill/dist/picturefill.min.js",
    "node_modules/svg4everybody/dist/svg4everybody.min.js"
  ])
  .pipe(gulp.dest('build/js'));
});

/* Оптимизация изображений */

gulp.task("images", function () {
  return gulp.src([
      "source/img/**/*.{png,jpg,svg}",
      "!source/img/**/icon-*.svg"
    ])
    .pipe(imagemin([
      imagemin.optipng({optimizationLevel: 3}),
      imagemin.mozjpeg({progressive: true}),
      imagemin.svgo()
    ]))
    .pipe(gulp.dest("build/img"));
});

gulp.task("webp", function () {
  return gulp.src("source/img/**/*.{png,jpg}")
    .pipe(webp({quality: 90}))
    .pipe(gulp.dest("build/img"));
});

gulp.task("sprite", function () {
  return gulp.src("source/img/**/icon-*.svg")
    .pipe(imagemin([
      imagemin.svgo()
    ]))
    .pipe(svgstore({
      inlineSvg: true
    }))
    .pipe(rename("icons.svg"))
    .pipe(gulp.dest("build/img"));
});

/* Сборка css */

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
    .pipe(gulp.dest("build/css"));
});

/* Сборка html */

gulp.task("html", function () {
  return gulp.src("source/*.html")
    .pipe(posthtml([
      include()
    ]))
    .pipe(gulp.dest("build"));
});

/* Запуск live-сервера */

gulp.task("server", function () {
  server.init({
    server: "build/",
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch("source/sass/**/*.scss", gulp.series("css"));
  gulp.watch("source/img/icon-*.svg", gulp.series("sprite", "refresh"));
  gulp.watch("source/*.html", gulp.series("html", "refresh"));
});

/* Обновление live-сервера */

gulp.task("refresh", function (done) {
  server.reload();
  done();
});


/* Сборка проекта */

gulp.task("build", gulp.series(
  "clean",
  "copy",
  "copy-modules",
  "images",
  "webp",
  "sprite",
  "css",
  "html"
));

/* Старт проекта */

gulp.task("start", gulp.series("build", "server"));
