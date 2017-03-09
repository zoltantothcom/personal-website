var pkg      = require('./package.json'),
    pug      = require('gulp-pug'),
    gulp     = require('gulp'),
    less     = require('gulp-less'),
    clean    = require('gulp-clean-css'),
    uglify   = require('gulp-uglify'),
    rename   = require('gulp-rename'),
    header   = require('gulp-header'),
    jshint   = require('gulp-jshint'),
    stylish  = require('jshint-stylish'),
    browSync = require('browser-sync').create();

var banner = ['/**',
	' * Zoltan Toth personal portfolio v<%= pkg.version %>',
	' * <%= pkg.homepage %>',
	' */',
	''].join('\n');

// static Server + watching less/html files
gulp.task('serve', [ 'script', 'markup', 'styles', 'lint' ], function() {
    browSync.init({
        server: './dist',
        online: false
    });

    gulp.watch('src/styles/*.less', ['styles']);
    gulp.watch('src/*.pug', ['markup']);
	gulp.watch('src/javascript/*.js', ['script']);
});

gulp.task('script', ['lint'], function() {
	gulp.src(['./src/javascript/script.js'])
		.pipe(uglify())
		.pipe(header(banner, { 
			pkg: pkg 
		}))
		.pipe(rename({ 
			suffix: '.min' 
		}))
		.pipe(gulp.dest('./dist'))
		.pipe(browSync.stream());
});

gulp.task('markup', function() {
	gulp.src('./src/index.pug')
		.pipe(pug({
			pretty: true
		}))
		.pipe(gulp.dest('./dist'))
		.pipe(browSync.stream());
});

gulp.task('styles', function() {
	gulp.src('./src/styles/*.less')
		.pipe(less())
		.pipe(clean({ 
			compatibility: 'ie9' 
		}))
		.pipe(rename({ 
			suffix: '.min' 
		}))
		.pipe(gulp.dest('./dist'))
		.pipe(browSync.stream());
});

gulp.task('lint', function() {
	return gulp.src('./src/javascript/*.js')
		.pipe(jshint('.jshintrc'))
        .pipe(jshint.reporter(stylish));
});

gulp.task('default', ['serve']);