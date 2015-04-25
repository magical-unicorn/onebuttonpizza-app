var gulp = require('gulp');
var wiredep = require('wiredep');

gulp.task('default', function() {
  // place code for your default task here
});

gulp.task('bower', function () {
	wiredep({ src: 'index.html' });
});
