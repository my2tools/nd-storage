/**
 * @module: nd-storage
 * @author: crossjs <liwenfu@crossjs.com> - 2015-01-14 16:56:02
 */

'use strict';

/**
 * 全浏览器支持的本地存储方案：
 *
 * @detail
 * 1、支持HTML5的浏览器，采用原生localStorage进行存储
 * 2、IE7及其以下版本，采用UserData进行存储
 * 3、在以上两种都不支持的浏览器中，采用cookie进行存储
 *
 * @API
 * 1、Storage.set //设置本地存储
 * 2、Storage.get //获取本地存储
 * 3、Storage.remove //移除本地存储
 * 4、Storage.clearAll //清空所有本地存储
 * 5、Storage.getAllKeys //获取所有本地存储的key
 *
 * @homepage    http://www.baidufe.com/component/browser-storage/index.html
 * @author zhaoxianlie (xianliezhao@foxmail.com)
 */

module.exports = ('localStorage' in window) && (window.localStorage.getItem) ?
  require('./src/localStorage.js') :
    /msie/.test(navigator.userAgent.toLowerCase()) ?
      require('./src/userdata.js') :
        require('./src/cookie.js');
