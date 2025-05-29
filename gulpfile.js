const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const rename = require('gulp-rename');
const sourcemaps = require('gulp-sourcemaps');
const livereload = require('gulp-livereload');
const zip = require('gulp-zip');
const pump = require('pump');

// File paths
const paths = {
    styles: {
        src: 'assets/css/**/*.css',
        dest: 'assets/built/'
    },
    scripts: {
        src: 'assets/js/**/*.js',
        dest: 'assets/built/'
    },
    images: {
        src: 'assets/images/**/*',
        dest: 'assets/built/images/'
    }
};

// PostCSS plugins
const processors = [
    autoprefixer(),
    cssnano()
];

// Compile CSS
function styles(done) {
    pump([
        gulp.src(paths.styles.src),
        sourcemaps.init(),
        postcss(processors),
        rename({suffix: '.min'}),
        sourcemaps.write('.'),
        gulp.dest(paths.styles.dest),
        livereload()
    ], done);
}

// Process main CSS file
function processMainCSS(done) {
    pump([
        gulp.src('assets/css/screen.css'),
        sourcemaps.init(),
        postcss(processors),
        rename('screen.css'),
        sourcemaps.write('.'),
        gulp.dest(paths.styles.dest),
        livereload()
    ], done);
}

// Compile JavaScript
function scripts(done) {
    pump([
        gulp.src([
            'assets/js/main.js'
        ]),
        sourcemaps.init(),
        concat('main.js'),
        gulp.dest(paths.scripts.dest),
        rename({suffix: '.min'}),
        uglify(),
        sourcemaps.write('.'),
        gulp.dest(paths.scripts.dest),
        livereload()
    ], done);
}

// Process cyber fireworks script
function processFireworksJS(done) {
    pump([
        gulp.src('assets/js/cyber-fireworks.js'),
        sourcemaps.init(),
        rename('cyber-fireworks.js'),
        gulp.dest(paths.scripts.dest),
        rename({suffix: '.min'}),
        uglify(),
        sourcemaps.write('.'),
        gulp.dest(paths.scripts.dest),
        livereload()
    ], done);
}

// Copy images
function images(done) {
    pump([
        gulp.src(paths.images.src),
        gulp.dest(paths.images.dest)
    ], done);
}

// Watch files
function watchFiles() {
    livereload.listen();
    gulp.watch(paths.styles.src, styles);
    gulp.watch('assets/css/screen.css', processMainCSS);
    gulp.watch('assets/js/main.js', scripts);
    gulp.watch('assets/js/cyber-fireworks.js', processFireworksJS);
    gulp.watch(paths.images.src, images);
    gulp.watch(['*.hbs', 'partials/**/*.hbs'], gulp.series(reload));
}

// Reload
function reload(done) {
    livereload.reload();
    done();
}

// Clean built files - simplified version without del
function clean(done) {
    // Simple clean - just create the directory if it doesn't exist
    const fs = require('fs');
    const path = require('path');
    
    const builtDir = path.join(__dirname, 'assets', 'built');
    if (!fs.existsSync(builtDir)) {
        fs.mkdirSync(builtDir, { recursive: true });
    }
    
    done();
}

// Create ZIP for Ghost upload
function zipFiles(done) {
    const packageInfo = require('./package.json');
    const filename = packageInfo.name + '-' + packageInfo.version + '.zip';
    
    pump([
        gulp.src([
            '**',
            '!node_modules', '!node_modules/**',
            '!assets/css/**', // Exclude source CSS
            '!assets/js/**/*.js', '!assets/js/**/*.map', // Exclude source JS except built files
            'assets/built/**', // Include built files
            '!gulpfile.js',
            '!package-dev.json',
            '!package-lock.json',
            '!yarn.lock',
            '!*.zip'
        ]),
        zip(filename),
        gulp.dest('./')
    ], done);
}

// Build task
const build = gulp.series(clean, gulp.parallel(processMainCSS, scripts, processFireworksJS, images));

// Default task
const defaultTask = gulp.series(build, watchFiles);

// Export tasks
exports.styles = styles;
exports.scripts = scripts;
exports.images = images;
exports.clean = clean;
exports.build = build;
exports.zip = zipFiles;
exports.watch = watchFiles;
exports.default = defaultTask; 