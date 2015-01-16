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
  var ALL_CLEAR_KEY = '_ALL_CLEAR_KEY_';

  /**
   * 创建并获取这个input:hidden实例
   * @return {HTMLInputElement} input:hidden实例
   * @private
   */
  function __getInstance() {
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
   * @param {String} key 待存储数据的key
   * @param {String} value 待存储数据的内容
   * @private
   */
  function __setItem(key, value) {
    try {
      var input = __getInstance();

      //存储数据
      input.setAttribute(key, value);

      //存储到本地文件，文件名为：key[1].xml
      input.save(key);
    } catch (e) {}
  }

  /**
   * 将数据通过UserData的方式保存到本地，文件名为：文件名为：config.key[1].xml
   * @param {String} key 待存储数据的key
   * @param {String} value 待存储数据的内容
   * @private
   */
  function _set(key, value) {
    //保存有效内容
    __setItem(key, value);

    //下面的代码用来记录当前保存的key，便于以后clear
    value = _get(ALL_CLEAR_KEY) || '';

    if (!(new RegExp('(^|\\|)' + key + '(\\||$)', 'g')).test(value)) {
      //保存键
      __setItem(ALL_CLEAR_KEY, value + '|' + key);
    }
  }

  /**
   * 提取本地存储的数据
   * @param {String} key 待获取的数据的key
   * @return {String} 本地存储的数据，获取不到时返回null
   * @private
   */
  function _get(key) {
    try {
      var input = __getInstance();

      //载入本地文件，文件名为：config.key[1].xml
      input.load(key);

      //取得数据
      return input.getAttribute(key) || null;
    } catch (e) {
      return null;
    }
  }

  /**
   * 移除某项存储数据
   * @param {String} key 待存储数据的key
   * @private
   */
  function _remove(key) {
    try {
      var input = __getInstance();

      //载入存储区块
      input.load(key);

      //移除配置项
      input.removeAttribute(key);

      //强制使其过期
      input.save(key);

      //从allkey中删除当前key
      //下面的代码用来记录当前保存的key，便于以后clear
      var value = _get(ALL_CLEAR_KEY);

      if (value) {
        value = value.replace(new RegExp('(^|\\|)' + key + '(\\||$)', 'g'), '');

        //保存键
        __setItem(ALL_CLEAR_KEY, value);
      }

    } catch (e) {}
  }

  //移除所有的本地数据
  function _clear() {
    var keys = _get(ALL_CLEAR_KEY),
      i, n;

    if (keys) {
      keys = keys.split('|');

      for (i = 0, n = keys.length; i < n; i++) {
        if (keys[i]) {
          _remove(keys[i]);
        }
      }
    }
  }

  /**
   * 获取所有的本地存储数据对应的key
   * @return {Array} 所有的key
   * @private
   */
  function _keys() {
    var keys = _get(ALL_CLEAR_KEY),
      i, n, result = [];

    if (keys) {
      keys = keys.split('|');

      for (i = 0, n = keys.length; i < n; i++) {
        if (keys[i]) {
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
    clear: _clear,
    keys: _keys
  };
})();
