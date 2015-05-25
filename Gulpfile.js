var gulp = require('gulp');
var bower = require('gulp-bower');
var sass = require('gulp-sass');
var prefix = require('gulp-autoprefixer');
var connect = require('gulp-connect');
var git = require('gulp-git');
var replace = require('gulp-replace');
var clean = require('gulp-clean');

var paths = {

    styles: {
        files: './dev/scss/*.scss',
        dest: './public/css/'
    }

};

var displayError = function(error) {

    // Initial building up of the error
    var errorString = '[' + error.plugin + ']';
    errorString += ' ' + error.message.replace("\n",''); // Removes new line at the end

    // If the error contains the filename or line number add it to the string
    if(error.fileName)
        errorString += ' in ' + error.fileName;

    if(error.lineNumber)
        errorString += ' on line ' + error.lineNumber;

    // This will output an error like the following:
    // [gulp-sass] error message in file_name on line 1
    console.error(errorString);
};

gulp.task('sass', function (){
    // Taking the path from the above object
    gulp.src(paths.styles.files)
        // Sass options - make the output compressed and add the source map
        // Also pull the include path from the paths object
        .pipe(sass({
            outputStyle: 'compressed',
            sourceComments: 'map'
        }))
        // If there is an error, don't stop compiling but use the custom displayError function
        .on('error', function(err){
            displayError(err);
        })
        // Pass the compiled sass through the prefixer with defined
        .pipe(prefix(
            'last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'
        ))
        // Funally put the compiled sass into a css file
        .pipe(gulp.dest(paths.styles.dest))
});
gulp.task('copy', function()
{
    gulp.src('dev/js/**/*')
        .pipe(gulp.dest('public/js'));
    gulp.src('dev/fonts/**/**')
        .pipe(gulp.dest('public/fonts/'));
    gulp.src('dev/assets/**/**')
        .pipe(gulp.dest('public/assets/'))
});
gulp.task('bower', function() {
    return bower()
        .pipe(gulp.dest('public/lib/'))
});
gulp.task('default', ['bower','sass'], function() {
    // Watch the files in the paths object, and when there is a change, fun the functions in the array
    gulp.watch(paths.styles.files, ['sass'])
        // Also when there is a change, display what file was changed, only showing the path after the 'sass folder'
        .on('change', function(evt) {
            console.log(
                '[watcher] File ' + evt.path.replace(/.*(?=sass)/,'') + ' was ' + evt.type + ', compiling...'
            );
        });

});
gulp.task('connect', function() {
    connect.server({
        root: 'public',
        livereload: true,
        host : 'localhost'
    });
});
gulp.task('replace-bump',function(){
    /*gulp.src(['dev/js/shim.js'])
        .pipe(replace(/shim\=[A-z0-9]+/g, '$1foo'))
        .pipe(gulp.dest('build/file.txt'));*/
    git.exec({args : 'log -n 1 | head -n 1 | sed -e \'s/^commit //\' | head -c 8'}, function (err, stdout) {
        var lastVersion = stdout;
        gulp.src(['dev/js/shim.js'])
         .pipe(replace(/bump\=[A-z0-9]+/g, 'bump=' + lastVersion))
         .pipe(gulp.dest('dev/js'));

        gulp.src(['dev/js/config/run.js'])
            .pipe(replace(/version \: \'[A-z0-9]+\'/g, 'version : \'' +lastVersion + '\''))
            .pipe(gulp.dest('dev/js/config'));


    });
});
gulp.task('watch', function () {
    gulp.watch(['dev/**/*.scss'],['sass']);
    gulp.watch(['dev/js/**/*.js','dev/js/**/*.html'], ['copy'])
        .on('change', function(evt) {
            console.log(
                '[watcher] File ' + evt.path.replace(/.*(?=sass)/,'') + ' was ' + evt.type + ', compiling...'
            );
        });
});
gulp.task('server', ['bower','sass','copy','connect', 'watch']);