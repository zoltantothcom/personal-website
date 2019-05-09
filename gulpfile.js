var pug      = require('gulp-pug'),
    gulp     = require('gulp'),
		less     = require('gulp-less'),
		babel    = require('gulp-babel'),
    clean    = require('gulp-clean-css'),
    uglify   = require('gulp-uglify'),
    rename   = require('gulp-rename'),
    jshint   = require('gulp-jshint'),
		stylish  = require('jshint-stylish'),
    browSync = require('browser-sync').create();

gulp.task('lint', function(done) {
	return gulp.src('./src/javascript/*.js')
		.pipe(jshint('.jshintrc'))
		.pipe(jshint.reporter(stylish));
});

gulp.task('script', gulp.series('lint', function(done) {
	gulp.src(['./src/javascript/script.js'])
		.pipe(babel({
			presets: ['@babel/preset-env']
		}))
		.pipe(uglify())
		.pipe(rename({ 
			suffix: '.min' 
		}))
		.pipe(gulp.dest('./build'))
		.pipe(browSync.stream());

	done();
}));

gulp.task('markup', function(done) {
	gulp.src('./src/index.pug')
		.pipe(pug({
			pretty: true
		}))
		.pipe(gulp.dest('./build'))
		.pipe(browSync.stream());

	done();
});

gulp.task('styles', function(done) {
	gulp.src('./src/styles/styles.less')
		.pipe(less())
		.pipe(clean({ 
			compatibility: 'ie9' 
		}))
		.pipe(rename({ 
			suffix: '.min' 
		}))
		.pipe(gulp.dest('./build'))
		.pipe(browSync.stream());

	done();
});

gulp.task('images', function(done) {
	return gulp.src(['src/images/**/*']).pipe(gulp.dest('build/images'));
});

// static Server + watching less/html files
gulp.task('serve', gulp.series('script', 'markup', 'styles', 'images', 'lint', function(done) {
	browSync.init({
			server: './build',
			online: false
	});

	gulp.watch('src/styles/*.less', gulp.series('styles'));
	gulp.watch('src/**/*.pug', gulp.series('markup'));
	gulp.watch('src/*.pug', gulp.series('markup'));
	gulp.watch('src/javascript/*.js', gulp.series('script'));

	done();
}));

gulp.task('default', gulp.series('script', 'markup', 'styles', 'images', 'lint'));
gulp.task('live', gulp.series('serve'));
