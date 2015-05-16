var gulp = require('gulp');
var bower = require('gulp-bower');
var sass = require('gulp-sass');
var prefix = require('gulp-autoprefixer');
var connect = require('gulp-connect');


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
gulp.task('watch', function () {
    gulp.watch(['./public/*.html']);
});
gulp.task('server', ['bower','sass','connect', 'watch']);