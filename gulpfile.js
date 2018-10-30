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
const sourcemaps = require("gulp-sourcemaps");

// -------------------------------------------------------------------------------
// JS Stuff
// -------------------------------------------------------------------------------

// JS copy and minify
gulp.task("build:js", function(done) {
  return gulp
    .src("./js/main.js")
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

gulp.task("watch:js", function() {
  gulp.watch("./js/main.js", gulp.series("build:js", "serve:reload"));
});

// Dev Watch task
gulp.task("watch", gulp.parallel("watch:js"));

// -------------------------------------------------------------------------------
// Build assets (css, js, images, fonts)
// -------------------------------------------------------------------------------

gulp.task("build:assets", gulp.parallel("build:js"));

// -------------------------------------------------------------------------------
// Move assets to public (css, js, images, fonts)
// -------------------------------------------------------------------------------

gulp.task("move:js", function(done) {
  return gulp
    .src("./js/main.js")
    .pipe(
      babel({
        presets: [["es2015"]],
      })
    )
    .pipe(gulp.dest("./public/js"));
  done();
});

gulp.task("move:index", function(done) {
  return gulp.src("./index.html").pipe(gulp.dest("./public/"));
  done();
});

gulp.task("move:recursos", function(done) {
  return gulp.src("./recursos/**/**").pipe(gulp.dest("./public/recursos/"));
  done();
});

gulp.task(
  "move:assets",
  gulp.parallel("move:js", "move:index", "move:recursos")
);

// -------------------------------------------------------------------------------
// npm script controlled tasks
//
// build:dev runs serve and watch tasks
// -------------------------------------------------------------------------------

gulp.task(
  "build:dev",
  gulp.series(
    "build:assets",
    gulp.parallel("serve", "watch") // run serve and watch in parallel so i can get browser injection
  )
);

gulp.task("build:prod", gulp.series("build:assets", "move:assets"));
