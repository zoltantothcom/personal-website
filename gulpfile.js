var pkg      = require('./package.json'),
    pug      = require('gulp-pug'),
    gulp     = require('gulp'),
    less     = require('gulp-less'),
    clean    = require('gulp-clean-css'),
    uglify   = require('gulp-uglify'),
    rename   = require('gulp-rename'),
    jshint   = require('gulp-jshint'),
    stylish  = require('jshint-stylish'),
    browSync = require('browser-sync').create();

// static Server + watching less/html files
gulp.task('serve', [ 'script', 'markup', 'styles', 'lint' ], function() {
    browSync.init({
        server: './docs',
        online: false
    });

    gulp.watch('src/styles/*.less', ['styles']);
    gulp.watch('src/**/*.pug', ['markup']);
    gulp.watch('src/*.pug', ['markup']);
	gulp.watch('src/javascript/*.js', ['script']);
});

gulp.task('script', ['lint'], function() {
	gulp.src(['./src/javascript/script.js'])
		.pipe(uglify())
		.pipe(rename({ 
			suffix: '.min' 
		}))
		.pipe(gulp.dest('./docs'))
		.pipe(browSync.stream());
});

gulp.task('markup', function() {
	gulp.src('./src/index.pug')
		.pipe(pug({
			pretty: true
		}))
		.pipe(gulp.dest('./docs'))
		.pipe(browSync.stream());
});

gulp.task('styles', function() {
	gulp.src('./src/styles/styles.less')
		.pipe(less())
		.pipe(clean({ 
			compatibility: 'ie9' 
		}))
		.pipe(rename({ 
			suffix: '.min' 
		}))
		.pipe(gulp.dest('./docs'))
		.pipe(browSync.stream());
});

gulp.task('lint', function() {
	return gulp.src('./src/javascript/*.js')
		.pipe(jshint('.jshintrc'))
        .pipe(jshint.reporter(stylish));
});

gulp.task('default', ['serve']);
