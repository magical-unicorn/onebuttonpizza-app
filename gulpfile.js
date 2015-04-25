var gulp = require('gulp');
var wiredep = require('wiredep');

gulp.task('default', function() {
  // place code for your default task here
});

gulp.task('bower', function () {
	wiredep({ src: 'index.html' });
});

var sass = require('gulp-sass');
 
gulp.task('sass', function () {
    gulp.src('./sass/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('./css'));
});
