var gulp = require('gulp');
var durandal = require('gulp-durandal');

gulp.task('durandal', function (cb) {
	durandal({
		baseDir: 'app',
		main: 'main.js',
		output: 'main-build.js',
		almond: false,
		minify: true,
		verbose: false
	})
	.pipe(gulp.dest('app'));
});
