const { task, src, dest, watch, series, parallel} = require('gulp');
const autoprefixer = require('gulp-autoprefixer');
const sass = require('gulp-sass');
const csscomb = require('gulp-csscomb');
const sourcemaps = require('gulp-sourcemaps');
const bless = require('gulp-bless');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify'); 

const files = {
  scssPath: 'src/sass/**/*.{scss, sass}',
  jsPath: 'src/js/**/*.js'
}

const prefixerOptions = {
  browsers: ['last 2 versions']
};

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
      .pipe(concat('combined.js'))
      .pipe(uglify())
      .pipe(dest('dist')
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