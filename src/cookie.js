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
   * @param config 存储信息
   * @config key cookie-key
   * @config decode 是否进行decode处理
   * @return {String}
   * @private
   */
  var _get = function(config) {
    var value = null;

    if (_isValidKey(config.key)) {
      var reg = new RegExp('(^| )' + config.key + '=([^;\/]*)([^;\x24]*)(;|\x24)'),
        result = reg.exec(document.cookie);

      if (result) {
        value = result[2] || null;
      }
    }

    if (('string' === typeof value) && config.decode !== false) {
      return decodeURIComponent(value);
    }

    return null;
  };

  /**
   * 存储cookie
   *
   * @param options {
   *     key : "",
   *     value : "",
   *     path : "",       // 默认存储在当前域名的根目录，如果要设置到每个页面的单独目录，请设置为："./"
   *     domain : "",
   *     expires : Date,
   *     secure : "secure",
   *     encode : true
   * }
   * @private
   */
  var _set = function(config) {
    if (!_isValidKey(config.key)) {
      return;
    }

    config = config || {};

    if (config.encode !== false) {
      config.value = encodeURIComponent(config.value);
    }

    // 计算cookie过期时间
    var expires = config.expires;
    if (!(expires instanceof Date)) {
      expires = new Date();
      if ('number' === typeof config.expires) {
        expires.setTime(expires.getTime() + config.expires);
      } else {
        // 在没有设置过期时间的情况下，默认：30day
        expires.setTime(expires.getTime() + 86400000 * 30);
      }
    }

    document.cookie = config.key + '=' + config.value +
      (config.path ? '; path=' + (config.path === './' ? '' : config.path) : '/') +
      (expires ? '; expires=' + expires.toGMTString() : '') +
      (config.domain ? '; domain=' + config.domain : '') +
      (config.secure ? '; secure' : '');
  };

  /**
   * 移除掉某一个存储
   * @param config
   * @config key
   * @private
   */
  var _remove = function(config) {
    var obj = _get(config);

    if (obj !== null) {
      config.value = null;
      config.expires = -1;
      _set(config);
    }
  };

  /**
   * 清除掉所有
   * @private
   */
  var _clearAll = function() {
    document.cookie = '';
  };

  /**
   * 获取所有的存储key
   * @private
   */
  var _getAllKeys = function() {
    var keys = [];
    var reg = /(^| )([^=; ]+)=([^;]*)(;|\x24)/igm;
    var localCookies = (document.cookie || '').match(reg);

    if (localCookies) {
      var items;

      for (var i = 0, len = localCookies.length; i < len; i++) {
        items = reg.exec(localCookies[i]);
        keys.push(items[2]); //第二项是key，第三项是value
      }
    }

    return keys;
  };

  return {
    get: _get,
    set: _set,
    remove: _remove,
    clearAll: _clearAll,
    getAllKeys: _getAllKeys
  };

})();
