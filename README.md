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
  
[demo1](demo1.js)  
  
  
## Usage2 使用文件改名方式构建文件指纹（推荐）  
  
[demo2](demo2.js)  
  
  
  
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
  
