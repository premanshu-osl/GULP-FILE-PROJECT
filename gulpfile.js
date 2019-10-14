const { task, src, dest, watch, series, parallel} = require('gulp');
const autoprefixer = require('gulp-autoprefixer');
const sass = require('gulp-sass');
const csscomb = require('gulp-csscomb');
const sourcemaps = require('gulp-sourcemaps');
const bless = require('gulp-bless');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const babel = require('gulp-babel'); 

const files = {
  scssPath: 'src/sass/**/*.{scss, sass}',
  jsPath: 'src/js/**/*.js'
}

const prefixerOptions = {
  browsers: ['last 2 versions']
};

const environment = {
  presets: ['@babel/env']
}

function scssTask() {
  return src(files.scssPath)
  .pipe(sourcemaps.init())
  .pipe(sass())
  .pipe(autoprefixer(prefixerOptions))
  .pipe(csscomb())
  .pipe(sourcemaps.write('.'))
  .pipe(dest('dist/css/')
  .pipe(bless())
  .pipe(dest('dist/splitCSS'))
  );
}

function jsTask(){
  return src([
      files.jsPath
      ])
      .pipe(sourcemaps.init())
      .pipe(babel(environment))
      .pipe(concat('combined.js'))
      .pipe(uglify())
      .pipe(sourcemaps.write('.'))
      .pipe(dest('dist/js/')
  );
}


function watchTask() {
  watch([files.scssPath, files.jsPath],
    parallel(scssTask, jsTask));
}

exports.build = series(
  parallel(scssTask, jsTask),
  watchTask
);

exports.default = series(
  parallel(scssTask, jsTask)
);