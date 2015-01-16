/**
 * @module: nd-storage
 * @author: crossjs <liwenfu@crossjs.com> - 2015-01-14 16:56:02
 */

'use strict';

/**
 * ====================================================================
 * cookie的相关处理
 *
 * 1、存储一个内容到本地
 * 2、读取一个本地存储
 * 3、移除一个本地存储
 * 4、移除全部本地存储
 * 5、获取所有本地存储的key
 * ====================================================================
 */

module.exports = (function() {

  /**
   * 判断某key是否合法
   * @param key
   * @return {Boolean}
   * @private
   */
  var _isValidKey = function(key) {
    return /^[^\x00-\x20\x7f\(\)<>@,;:\\\"\[\]\?=\{\}\/\u0080-\uffff]+$/.test(key);
  };

  /**
   * 获取存储在cookie中的内容
   * @param key cookie-key
   * @return {String}
   * @private
   */
  var _get = function(key) {
    var value, reg, m;

    if (_isValidKey(key)) {
      reg = new RegExp('(^| )' + key + '=([^;\/]*)([^;\x24]*)(;|\x24)');
      m = reg.exec(document.cookie);

      if (m) {
        value = m[2];
      }
    }

    return value ? decodeURIComponent(value) : null;
  };

  /**
   * 存储cookie
   *
   * @param key cookie-key
   * @param value cookie-value
   * @private
   */
  var _set = function(key, value) {
    if (!_isValidKey(key)) {
      return;
    }

    if (typeof value === 'string') {
      value = encodeURIComponent(value);
    }

    var maxage = (value === null) ? -1 : 86400000 * 30;

    document.cookie = key + '=' + value +
      ('; expires=' + new Date(new Date().getTime() + maxage).toUTCString()) +
      (location.protocol === 'https' ? '; secure' : '');
  };

  /**
   * 移除掉某一个存储
   * @param key
   * @private
   */
  var _remove = function(key) {
    var value = _get(key);

    if (value !== null) {
      _set(key, null);
    }
  };

  /**
   * 清除掉所有
   * @private
   */
  var _clear = function() {
    document.cookie = '';
  };

  /**
   * 获取所有的存储key
   * @private
   */
  var _keys = function() {
    var keys = [];

    if (!document.cookie) {
      return keys;
    }

    var m,
      regex = /(?:^| ) ?(.+?)=.+?(?:$|;)/gm,
      cookie = document.cookie;

    while((m = regex.exec(cookie))) {
      keys.push(m[1]);
    }

    return keys;
  };

  return {
    get: _get,
    set: _set,
    remove: _remove,
    clear: _clear,
    keys: _keys
  };

})();
