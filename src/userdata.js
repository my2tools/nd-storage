/**
 * @module: nd-storage
 * @author: crossjs <liwenfu@crossjs.com> - 2015-01-14 16:56:02
 */

'use strict';

/**
 * ====================================================================
 * userData的相关处理
 *
 * 1、存储一个内容到本地
 * 2、读取一个本地存储
 * 3、移除一个本地存储
 * 4、移除全部本地存储
 * 5、获取所有本地存储的key
 * ====================================================================
 */

module.exports = (function() {

  //所有的key
  var _clearAllKey = '_ND.ALL.KEY_';

  /**
   * 创建并获取这个input:hidden实例
   * @return {HTMLInputElement} input:hidden实例
   * @private
   */
  function _getInstance() {
    //把UserData绑定到input:hidden上
    var _input = null;
    //是的，不要惊讶，这里每次都会创建一个input:hidden并增加到DOM树种
    //目的是避免数据被重复写入，提早造成“磁盘空间写满”的Exception
    _input = document.createElement('input');
    _input.type = 'hidden';
    _input.addBehavior('#default#userData');
    document.body.appendChild(_input);
    return _input;
  }

  /**
   * 将数据通过UserData的方式保存到本地，文件名为：文件名为：config.key[1].xml
   * @param {Object} config 待存储数据相关配置
   * @cofnig {String} key 待存储数据的key
   * @config {String} value 待存储数据的内容
   * @config {String|Object} [expires] 数据的过期时间，可以是数字，单位是毫秒；也可以是日期对象，表示过期时间
   * @private
   */
  function __setItem(config) {
    try {
      var input = _getInstance();
      //创建一个Storage对象
      var storageInfo = config || {};
      //设置过期时间
      if (storageInfo.expires) {
        var expires;
        //如果设置项里的expires为数字，则表示数据的能存活的毫秒数
        if ('number' === typeof storageInfo.expires) {
          expires = new Date();
          expires.setTime(expires.getTime() + storageInfo.expires);
        }
        input.expires = expires.toUTCString();
      }

      //存储数据
      input.setAttribute(storageInfo.key, storageInfo.value);
      //存储到本地文件，文件名为：storageInfo.key[1].xml
      input.save(storageInfo.key);
    } catch (e) {}
  }

  /**
   * 将数据通过UserData的方式保存到本地，文件名为：文件名为：config.key[1].xml
   * @param {Object} config 待存储数据相关配置
   * @cofnig {String} key 待存储数据的key
   * @config {String} value 待存储数据的内容
   * @config {String|Object} [expires] 数据的过期时间，可以是数字，单位是毫秒；也可以是日期对象，表示过期时间
   * @private
   */
  function _set(config) {
    //保存有效内容
    __setItem(config);

    //下面的代码用来记录当前保存的key，便于以后clearAll
    var result = _get({
      key: _clearAllKey
    });

    if (result) {
      result = {
        key: _clearAllKey,
        value: result
      };
    } else {
      result = {
        key: _clearAllKey,
        value: ''
      };
    }

    if (!(new RegExp('(^|\\|)' + config.key + '(\\||$)', 'g')).test(result.value)) {
      result.value += '|' + config.key;
      //保存键
      __setItem(result);
    }
  }

  /**
   * 提取本地存储的数据
   * @param {String} config 待获取的存储数据相关配置
   * @cofnig {String} key 待获取的数据的key
   * @return {String} 本地存储的数据，获取不到时返回null
   * @example
   * qext.LocalStorage.get({
   *      key : "username"
   * });
   * @private
   */
  function _get(config) {
    try {
      var input = _getInstance();

      //载入本地文件，文件名为：config.key[1].xml
      input.load(config.key);

      //取得数据
      return input.getAttribute(config.key) || null;
    } catch (e) {
      return null;
    }
  }

  /**
   * 移除某项存储数据
   * @param {Object} config 配置参数
   * @cofnig {String} key 待存储数据的key
   * @private
   */
  function _remove(config) {
    try {
      var input = _getInstance();

      //载入存储区块
      input.load(config.key);

      //移除配置项
      input.removeAttribute(config.key);

      //强制使其过期
      var expires = new Date();
      expires.setTime(expires.getTime() - 1);
      input.expires = expires.toUTCString();
      input.save(config.key);

      //从allkey中删除当前key
      //下面的代码用来记录当前保存的key，便于以后clearAll
      var result = _get({
        key: _clearAllKey
      });

      if (result) {
        result = result.replace(new RegExp('(^|\\|)' + config.key + '(\\||$)', 'g'), '');
        result = {
          key: _clearAllKey,
          value: result
        };

        //保存键
        __setItem(result);
      }

    } catch (e) {}
  }

  //移除所有的本地数据
  function _clearAll() {
    var result = _get({
      key: _clearAllKey
    });

    if (result) {
      var allKeys = result.split('|');
      var count = allKeys.length;

      for (var i = 0; i < count; i++) {
        if (!!allKeys[i]) {
          _remove({
            key: allKeys[i]
          });
        }
      }
    }
  }

  /**
   * 获取所有的本地存储数据对应的key
   * @return {Array} 所有的key
   * @private
   */
  function _getAllKeys() {
    var result = [];
    var keys = _get({
      key: _clearAllKey
    });
    if (keys) {
      keys = keys.split('|');
      for (var i = 0, len = keys.length; i < len; i++) {
        if (!!keys[i]) {
          result.push(keys[i]);
        }
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
