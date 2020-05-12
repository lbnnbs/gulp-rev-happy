var gulp = require('gulp');
var rev = require('gulp-rev-happy');

gulp.task('image', function () {
    return gulp.src('src/**/*.{png,jpg,gif,ico}')
            // 给image文件计算并添加指纹
            .pipe(rev({
                query: true,
            }))
            .pipe(gulp.dest('dist')) // 将添加了文件指纹的image文件输出到dist文件夹
            .pipe(rev.manifest()) // 获取计算的image文件指纹
            .pipe(gulp.dest('.')); // 将计算的image文件的指纹保存到对应关系表manifest文件
});

gulp.task('js', function () {
    return gulp.src('src/js/**/*.js')
            .pipe(rev({
                query: true,
            }))
            .pipe(rev.manifest())
            .pipe(gulp.dest('.'));
});

gulp.task('css', function () {
    return gulp.src('src/css/**/*.css')
            .pipe(rev({
                query: true,
            }))
            .pipe(rev.manifest())
            .pipe(gulp.dest('.'));
});

gulp.task('html', function () {
    return gulp.src('src/**/*.html')
            .pipe(rev({
                query: true,
            }))
            .pipe(rev.manifest())
            .pipe(gulp.dest('.'));
});

// 使用文件指纹对应关系文件manifest，更新css，js，html里面的文件链接，然后输出到dist文件夹
gulp.task('default', gulp.series('image', 'css', 'js', 'html', function () {
    return gulp.src('src/**/*.{css,js,html}')
            .pipe(rev.update())
            .pipe(gulp.dest('dist'));
}));

