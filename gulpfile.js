// ==============================================================================
// Gulpfile for danilucaci.com
// V1.0.0
// Using gulp4 and hugo
// run with npm script
// ==============================================================================

const gulp = require("gulp");
const del = require("del");
const browserSync = require("browser-sync");
const babel = require("gulp-babel");
const sass = require("gulp-sass");
const autoprefixer = require("gulp-autoprefixer");
const sourcemaps = require("gulp-sourcemaps");

// -------------------------------------------------------------------------------
// CSS Stuff
// -------------------------------------------------------------------------------

// Builds Sass

gulp.task("build:styles", function(done) {
  return gulp
    .src(["./src/styles/**/*.scss"])
    .pipe(
      sass({
        outputStyle: "expanded",
      })
    )
    .pipe(sourcemaps.init())
    .pipe(
      autoprefixer({
        cascade: false,
        grid: false,
        flexbox: "no-2009",
      })
    )
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest("./"))
    .pipe(browserSync.stream());
  done();
});

gulp.task("clean:styles", function(done) {
  // Delete previous css files from public/
  del(["./main.css"]);
  done();
});

// -------------------------------------------------------------------------------
// JS Stuff
// -------------------------------------------------------------------------------

// JS copy and minify
gulp.task("build:js", function(done) {
  return gulp
    .src("./src/js/main.js")
    .pipe(
      babel({
        presets: [["es2015"]],
      })
    )
    .pipe(gulp.dest("./"))
    .pipe(browserSync.stream());
  done();
});

// -------------------------------------------------------------------------------
// The server
// -------------------------------------------------------------------------------

// Live reloading
gulp.task("serve", function() {
  browserSync.init({
    server: {
      baseDir: "./",
    },
    notify: {
      styles: {
        top: "auto",
        bottom: "32px",
        left: "0",
        right: "auto",
      },
    },
    files: ["./"],
    port: 4000,
    open: false, //don't open a new tab on execution
  });
});

// Reloads the browser when changes are detected
gulp.task("serve:reload", function(done) {
  browserSync.reload();
  done();
});

// -------------------------------------------------------------------------------
// Watching
// -------------------------------------------------------------------------------

// Watching for individual files types
gulp.task("watch:styles", function() {
  gulp.watch(
    ["./src/styles/**/*.scss", "./src/styles/*.scss"],
    gulp.series("clean:styles", "build:styles")
  );
});

gulp.task("watch:js", function() {
  gulp.watch("./src/js/main.js", gulp.series("build:js", "serve:reload"));
});

// Dev Watch task
gulp.task("watch", gulp.parallel("watch:js", "watch:styles"));

// -------------------------------------------------------------------------------
// Build assets (css, js, images, fonts)
// -------------------------------------------------------------------------------

gulp.task("build:assets", gulp.parallel("build:js", "build:styles"));

// -------------------------------------------------------------------------------
// npm script controlled tasks
//
// build:prod doesn't run serve and watch tasks
// build:dev runs serve and watch tasks
// build:dev:preview runs serve and watch tasks with --buildDrafts --buildFuture
// -------------------------------------------------------------------------------

gulp.task(
  "build:dev",
  gulp.series(
    "build:assets",
    gulp.parallel("serve", "watch") // run serve and watch in parallel so i can get browser injection
  )
);
