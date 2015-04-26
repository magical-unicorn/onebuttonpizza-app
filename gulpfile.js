var gulp = require('gulp');
var wiredep = require('wiredep');

gulp.task('default', ['bower','sass']);

gulp.task('bower', function () {
	wiredep({ src: 'index.html' });
	wiredep({src: 'sass/main.scss'});
});

var sass = require('gulp-sass');
 
gulp.task('sass', function () {
    gulp.src('./sass/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('./css'));
});
