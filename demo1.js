var gulp = require('gulp');
var rev = require('gulp-rev-happy');

// 图片完全不会引用其他文件
gulp.task('image', function () {
    return gulp.src('src/**/*.{png,jpg,gif,ico}')
            .pipe(rev()) // 给image文件计算并添加指纹
            .pipe(gulp.dest('dist')) // 将添加了文件指纹的image文件输出到dist文件夹
            .pipe(rev.manifest()) // 获取计算的image文件指纹
            .pipe(gulp.dest('.')); // 将计算的image文件的指纹保存到对应关系表manifest文件
});

// css会引用css和图片
gulp.task('css', gulp.series(
        'image',
        function () {
            return gulp.src('src/**/*.css')
                    .pipe(rev()) // 给css文件计算并添加指纹
                    .pipe(rev.manifest()) // 获取计算css文件指纹
                    .pipe(gulp.dest('.')) // 将计算的css文件的指纹保存到对应关系表manifest文件
                    ;
        },
        function () {
            return gulp.src('src/**/*.css')
                    .pipe(rev())
                    .pipe(rev.update()) // 使用文件指纹对应关系文件manifest，更新css里面的文件链接
                    .pipe(gulp.dest('dist')) // 将添加了文件指纹的css文件输出到dist文件夹
                    ;
        }

));

// js会引用任何文件
gulp.task('js', gulp.series(
        'css',
        function () {
            return gulp.src('src/**/*.js')
                    .pipe(rev())
                    .pipe(rev.manifest())
                    .pipe(gulp.dest('.'));
        },
        function () {
            return gulp.src('src/**/*.js')
                    .pipe(rev())
                    .pipe(rev.update())
                    .pipe(gulp.dest('dist'))
                    ;
        }
));

// html会引用任何文件
gulp.task('html', gulp.series(
        'js',
        function () {
            return gulp.src('src/**/*.html')
                    .pipe(rev())
                    .pipe(rev.manifest())
                    .pipe(gulp.dest('.'))
                    ;
        },
        function () {
            return gulp.src('src/**/*.html')
                    .pipe(rev())
                    .pipe(rev.update())
                    .pipe(gulp.dest('dist'))
                    ;
        }
));

// 使用文件指纹对应关系文件manifest，更新html里面的文件链接
gulp.task('default', gulp.series('html'));

