/**
 * @module: nd-storage
 * @author: crossjs <liwenfu@crossjs.com> - 2015-01-14 16:56:02
 */

'use strict';

/**
 * ====================================================================
 * window.localStorage的相关处理
 *
 * 1、存储一个内容到本地
 * 2、读取一个本地存储
 * 3、移除一个本地存储
 * 4、移除全部本地存储
 * 5、获取所有本地存储的key
 * ====================================================================
 */
module.exports = (function() {

  var localStorage = window.localStorage;

  /**
   * 将数据进行本地存储（只能存储字符串信息）
   */
  function _set(key, value) {
    //待存储的数据
    localStorage.setItem(key, value);
  }

  /**
   * 提取本地存储的数据
   */
  function _get(key) {
    //结果
    return localStorage.getItem(key);
  }

  /**
   * 移除某一项本地存储的数据
   */
  function _remove(key) {
    localStorage.removeItem(key);
  }

  /**
   * 清除所有本地存储的数据
   */
  function _clear() {
    localStorage.clear();
  }

  /**
   * 获取所有的本地存储数据对应的key
   */
  function _keys() {
    var result = [],
      key, i, n;

    for (i = 0, n = localStorage.length; i < n; i++) {
      key = localStorage.key(i);
    }

    return result;
  }

  return {
    get: _get,
    set: _set,
    remove: _remove,
    clear: _clear,
    keys: _keys
  };

})();
