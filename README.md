# nd-storage

[![spm version](http://spmjs.io/badge/nd-storage)](http://spmjs.io/package/nd-storage)

> 基于浏览器的缓存策略

```javascript
  /**
   * 全浏览器支持的本地存储方案：
   * fork form: http://www.baidufe.com/component/browser-storage/index.html
   *
   * !!! important !!!
   * 0.1.0 版本完全重写接口
   *
   * @detail
   * 1、支持HTML5的浏览器，采用原生localStorage进行存储
   * 2、IE7及其以下版本，采用UserData进行存储
   * 3、在以上两种都不支持的浏览器中，采用cookie进行存储
   *
   * @API
   * 1、Storage.set    //设置本地存储
   * 2、Storage.get    //获取本地存储
   * 3、Storage.remove //移除本地存储
   * 4、Storage.clear  //清空所有本地存储
   * 5、Storage.Keys   //获取所有本地存储的key
   *
   */
 ```

## 安装

```bash
$ spm install nd-storage --save
```

## 使用

```js
var Storage = require('nd-storage');
// use Storage
```
## 开发

### 本地 Web 服务

```bash
grunt
```

浏览器中访问 http://127.0.0.1:8851

### 生成/查看 API 文档

```bash
grunt doc
grunt
```

浏览器中访问 http://127.0.0.1:8851/doc

### 代码检查与单元测试

```bash
grunt test
```

### 发布组件到 SPM 源

```bash
grunt publish
```
