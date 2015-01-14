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
  function _set(storageInfo) {
    //待存储的数据
    var storageInfo = storageInfo || {};

    localStorage.setItem(storageInfo.key, storageInfo.value);

    // 如果指定了生命周期，则单独作为一个key来存储
    if (storageInfo.expires) {
      var expires;

      //如果设置项里的expires为数字，则表示数据的能存活的毫秒数
      if ('number' === typeof storageInfo.expires) {
        expires = new Date();
        expires.setTime(expires.getTime() + storageInfo.expires);
      }

      localStorage.setItem(storageInfo.key + '.expires', expires);
    }
  }

  /**
   * 提取本地存储的数据
   */
  function _get(config) {
    //结果
    var result = null;

    if (typeof config === 'string') {
      config = {
        key: config
      };
    }

    result = localStorage.getItem(config.key);

    //过期时间判断，如果过期了，则移除该项
    if (result) {
      var expires = localStorage.getItem(config.key + '.expires');

      result = {
        value: result,
        expires: expires ? new Date(expires) : null
      };

      if (result && result.expires && result.expires < new Date()) {
        result = null;

        localStorage.removeItem(config.key);
        localStorage.removeItem(config.key + '.expires');
      }
    }

    return result ? result.value : null;
  }

  /**
   * 移除某一项本地存储的数据
   */
  function _remove(config) {
    localStorage.removeItem(config.key);
    localStorage.removeItem(config.key + '.expires');
  }

  /**
   * 清除所有本地存储的数据
   */
  function _clearAll() {
    localStorage.clear();
  }

  /**
   * 获取所有的本地存储数据对应的key
   */
  function _getAllKeys() {
    var result = [],
      key;

    for (var i = 0, len = localStorage.length; i < len; i++) {
      key = localStorage.key(i);

      if (!/.+\.expires$/.test(key)) {
        result.push(key);
      }
    }

    return result;
  }

  return {
    get: _get,
    set: _set,
    remove: _remove,
    clearAll: _clearAll,
    getAllKeys: _getAllKeys
  };

})();
