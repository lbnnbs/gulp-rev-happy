# gulp-rev-happy  
  
> 给资源文件添加文件指纹，改进自 [gulp-rev2](https://github.com/makemoretime/gulp-rev2)  
>  
> `a.png` → `a-f7ee61d96b.png`（文件名方式）  
>  
> `a.png` → `a.png?_v_=f7ee61d96b`（url参数方式）  
  
### 处理了rev2的一些问题：  
> 1、不能为html和js文件添加指纹  
> 2、多次调用update，导致的指纹累积 ?_v_=560396f564?_v_=560396f564  
> 3、如果原本的链接带了url参数，导致出现两个问号 ?_v_=560396f564?aaa=bbb  
> 4、同一个gulp的task中，生成manifest后马上调用update，因为require缓存不能读取刚生成的manifest  


## Install  
```bash  
$ npm install --save-dev gulp-rev-happy  
```  

## Usage1 使用url参数方式构建文件指纹  
  
[demo1](demo1.js)  
  
  
## Usage2 使用文件改名方式构建文件指纹  
  
[demo2](demo2.js)  
  
  
  
## 设计思路  
修改自 **gulp-rev** , **gulp-rev-collector** 和 **gulp-rev2** ，主要实现如下：  
  
1. 根据文件的内容 `file.contents` 生成文件指纹（`hash`值）；  
  
2. 根据前面生成的文件指纹集合成一张`（源文件，构建文件）`映射对照表（并保存在清单文件 rev-manifest.json 中）；  
  
3. 根据前面生成的映射对照表级联更新存在引用的父文件；  
  
## 配置项  
  
### rev([opts])  
  
#### query  
  
Type: `boolean`<br>  
Default: `false`  
  
设置文件指纹的关联方式，`true` 通过url参数关联 `a.png` → `a.png?_v_=f7ee61d96b`，`false` 通过文件名关联 `a.png` → `a-f7ee61d96b.png`。  
  
### 其他配置项同 [gulp-rev-collector](https://www.npmjs.com/package/gulp-rev-collector)  

collectedManifest 指定需要合并的manifest文件  

replaceReved 允许替换已经替换过的文件  

dirReplacements 目录替换  

revSuffix 文件指纹生成方式  

extMap 扩展名替换  