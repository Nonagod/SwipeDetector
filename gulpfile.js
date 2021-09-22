let {
    TARGET_FILE_NAME,
    TARGET_FOLDER_PATH,
    SOURCE_FILE_PATH
} = require( './_resources/gulp/settings.js' ),
gulp = require('gulp'),
webpack = require('webpack-stream');

gulp.task('default', function() {
    return gulp.src( SOURCE_FILE_PATH )
        .pipe(webpack({
            mode: 'production',
            output: {
                filename: TARGET_FILE_NAME,
            },
        }))
        .pipe(gulp.dest( TARGET_FOLDER_PATH ));
});