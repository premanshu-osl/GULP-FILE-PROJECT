const { task, src, dest, watch, series, parallel} = require('gulp');
const autoprefixer = require('gulp-autoprefixer');
const sass = require('gulp-sass');
const csscomb = require('gulp-csscomb');
const sourcemaps = require('gulp-sourcemaps');
const bless = require('gulp-bless');

const files = {
  scssPath: 'src/sass/**/*.scss'
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

function watchTask() {
  watch([files.scssPath],
    parallel(scssTask));
}

exports.build = series(
  parallel(scssTask),
  watchTask
);

exports.default = series(
  parallel(scssTask),
  watchTask
);