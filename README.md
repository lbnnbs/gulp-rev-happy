# gulp-rev3

> 给资源文件添加文件指纹
>
> `a.png` → `a-f7ee61d96b.png`（文件名方式）
>
> `a.png` → `a.png?_v_=f7ee61d96b`（url参数方式）

## Install
```bash
$ npm install --save-dev gulp-rev3
```
## Usage

```js
const gulp = require('gulp');
const rev3 = require('gulp-rev3');

// 为image计算文件指纹并保存对应关系到manifest，然后输出到dist文件夹
gulp.task('image', function () {
    return gulp.src('src/**/*.{png,jpg,gif,ico}')
            .pipe(rev3({
                query: true,
            }))
            .pipe(gulp.dest('dist'))
            .pipe(rev3.manifest())
            .pipe(gulp.dest('.'));
});

// 为js计算文件指纹并保存对应关系到manifest
gulp.task('js', function () {
    return gulp.src('src/js/**/*.js')
            .pipe(rev3({
                query: true,
            }))
            .pipe(rev3.manifest())
            .pipe(gulp.dest('.'));
});

// 为css计算文件指纹并保存对应关系到manifest
gulp.task('css', function () {
    return gulp.src('src/css/**/*.css')
            .pipe(rev3({
                query: true,
            }))
            .pipe(rev3.manifest())
            .pipe(gulp.dest('.'));
});

// 为html计算文件指纹并保存对应关系到manifest
gulp.task('html', function () {
    return gulp.src('src/**/*.html')
            .pipe(rev3({
                query: true,
            }))
            .pipe(rev3.manifest())
            .pipe(gulp.dest('.'));
});

// 使用文件指纹对应关系文件manifest，更新css，js，html里面的文件链接
gulp.task('default', gulp.series('image', 'css', 'js', 'html', function () {
    return gulp.src('src/**/*.{css,js,html}')
            .pipe(rev3.update())
            .pipe(gulp.dest('dist'));
}));

## 设计思路
**gulp-rev3** 修改自 **gulp-rev** , **gulp-rev-collector** 和 **gulp-rev2** ，主要实现如下：

1. 根据文件的内容 `file.contents` 生成文件指纹（`hash`值）；

2. 根据前面生成的文件指纹集合成一张`（源文件，构建文件）`映射对照表（并保存在清单文件 rev-manifest.json 中）；

3. 根据前面生成的映射对照表级联更新存在引用的父文件；

## 配置项

### rev3([opts])

#### query

Type: `boolean`<br>
Default: `false`

设置文件指纹的关联方式，`true` 通过url参数关联 `a.png` → `a.png?_v_=f7ee61d96b`，`false` 通过文件名关联 `a.png` → `a-f7ee61d96b.png`。

