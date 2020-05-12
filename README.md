# gulp-rev-happy  
  
> 给资源文件添加文件指纹  
>  
> `a.png` → `a-f7ee61d96b.png`（文件名方式）  
>  
> `a.png` → `a.png?_v_=f7ee61d96b`（url参数方式）  
  
## Install  
```bash  
$ npm install --save-dev gulp-rev-happy  
```  
## Usage1 使用url参数方式构建文件指纹（目前未解决url本身带参数问题）  
  
var gulp = require('gulp');  
var rev = require('gulp-rev-happy');  
  
gulp.task('image', function () {  
    return gulp.src('src/**/*.{png,jpg,gif,ico}')  
            // 给image文件计算并添加指纹  
            .pipe(rev({  
                query: true, // url参数方式构建文件指纹  
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
  
  
  
## Usage2 使用文件改名方式构建文件指纹（推荐）  
  
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
  
  
  
## 设计思路  
**gulp-rev** 修改自 **gulp-rev** , **gulp-rev-collector** 和 **gulp-rev2** ，主要实现如下：  
  
1. 根据文件的内容 `file.contents` 生成文件指纹（`hash`值）；  
  
2. 根据前面生成的文件指纹集合成一张`（源文件，构建文件）`映射对照表（并保存在清单文件 rev-manifest.json 中）；  
  
3. 根据前面生成的映射对照表级联更新存在引用的父文件；  
  
## 配置项  
  
### rev([opts])  
  
#### query  
  
Type: `boolean`<br>  
Default: `false`  
  
设置文件指纹的关联方式，`true` 通过url参数关联 `a.png` → `a.png?_v_=f7ee61d96b`，`false` 通过文件名关联 `a.png` → `a-f7ee61d96b.png`。  
  
