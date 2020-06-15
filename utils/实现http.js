// 原生JS封装 ajax(jQ版本)
~ function (window) {
  function AJAX(options) {
    return new AJAX.prototype.init(options);
  }
  function init(options = {}){
    let {
      url,
      method = 'GET',
      data = null,
      dataType = 'JSON',
      async = true,
      cache = true,
      success,
      error
    } = options;
    //=>MOUNT 把配置项挂载到实例上
    ['url', 'method', 'data', 'dataType', 'async', 'cache', 'success', 
    'error'].forEach(item => {
      this[item] = eval(item);
    });
  }
  
  AJAX.prototype = {
    constructor: AJAX,
    init,
    sendAjax(){
      this.handleCache();
      this.handleData();
      //send
      let {method, url, async, error, success} = this;
      //SEND发送请求
      let xhr = new XMLHttpRequest();
      xhr.open(method, url, async);
      xhr.onreadystatechange = () => {
        if(xhr.readyState === 4){
          if(!/^(2|3)\d{2}$/.test(xhr.status)){
            error && error(xhr.statusText, xhr)
          }
          //处理DATA-TYPE
          let result = this.handleDataType(xhr);
          success && success(result, xhr);
        }
      };
      xhr.send();
    },
    handleDataType(xhr) { 
      let dataType = this.dataType.toUpperCase(),
          result = xhr.responseText;
      switch (dataType) {
        case 'TEXT':
          break;
        case 'JSON':
          result = JSON.parse(result);
          break;
        case 'XML':
          result = xhr.responseXML;
          break;
      }  
      return result;    
    },
    handleCache() {
      let {url, method, cache} = this;
      if(/^GET$/i.test(method) && cache==false){
        url += `${this.check()}=${+(new Date())}`;
      }
    },
    handleData() {
      let {data, method} = this;
      if(!data) return;
      if(typeof data === 'object'){
        //如果是一个对象，我们把它转换为x-www-form-urlencoeded模式
        for(let key in data){
          if(data.hasOwnProperty(key)){
            str += `${key}=${data[key]}`;
          }
        }
        data=str.substring(0,str.length);
      }
      if(/^(GET|DELETE|HEAD|TRACE|OPTIONS)$/i.test(method)){
        this.url += `${this.check()}${data}`;
        this.data = null;
        return;
      }
      this.data = data; //POST处理方式
    },
    check() {
      return this.url.indexOf('?')>-1?'&':'?';
    }
  }
  init.prototype = AJAX.prototype;

  window.ajax = AJAX;
}(window)


// 基于Promise用原生JS手撸Ajax(axios版本)
~ function (window) {
  //设置默认的参数配置项  
  let _default = {
    method: 'GET',
    url: '',
    baseURL: '',
    headers: {},
    dataType: 'JSON',
    data: null, //POST系列
    params: null, //GET系列
    cache: true
  };
  //基于Promise设计模式管理Ajax
  let ajaxPromise = function axios() {
    let {
      url,
      baseURL,
      data,
      dataType,
      headers,
      cache,
      params
    } = options;
    //=>把传递的参数进一步进行处理
    if(/^(GET|DELETE|HEAD|OPTIONS)$/.test(method)){
      //GET参数
      if(params) {
        url += `${ajaxPromise.check(url)}${ajaxPromise.formatData(params)}`
      }
      if(cache === false){
        url += `${ajaxPromise.check(url)}_=${+(new Date())}`
      }
      data= null;//GET系列请求主体为空
    }else{
      //POST系列
      if(data){
        data = ajaxPromise.formatData(data);
      }
    }
    //=>基于Promise发送Ajax
    return new Promise((resolve, reject) => {
      let xhr = new XMLHttpRequest();
      xhr.open(method, `${baseURL}${url}`);
      if(headers != null && typeof headers === 'object'){
        for(let attr in headers){
          if(headers.hasOwnProperty(attr)){
            let val = headers[attr];
            if(/[\u4e00-\u9fa5]/.test(val)){
              val = encodeURIComponent(val);
            }
            xhr.setRequestHeader(attr, headers[attr]);
          }
        }
      }
      //=>如果headers存在，我们需要设置请求头
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4){
          if(/^(2|3)\d{2}$/.test(xhr.status)){
            let result = xhr.responseText;
            dataType = dataType.toUpperCase();
            dataType === 'JSON'?result = JSON.parse(result):(dataType === 'XML'?result = xhr.responseXML : null);
            resolve(result, xhr);
            return;
          }
          reject(xhr.statusText, xhr);
        }
      }
      xhr.send(data);
    })
  }

  ajaxPromise.defaults = _default;

  ajaxPromise.formatData = function formatData(){
    let str = ``;
    for(let attr in obj) {
      if(obj.hasOwnProperty(attr)){
        str += `${attr}=${obj[attr]}&`;
      }
      return str.substring(0, str.length-1)
    }
  }

  ajaxPromise.check = function check(url){
    return url.indexOf('?')>-1?'&':'?';
  }

  //GET系列 
  ['get', 'delete', 'head', 'options'].forEach(item => {
    ajaxPromise[item] = (url, options = {}) => {
      options = {
        ..._default,
        ...options, 
        url, 
        method: item.toUpperCase()
      };
      return ajaxPromise(options);
    }
  })
  //POST系列
  ['post', 'put', 'patch'].forEach(item => {
    ajaxPromise[item] = (url, data = {}, options = {}) => {
      options = {
        ..._default,
        ...options, 
        url, 
        method: item.toUpperCase(),
        data
      };
      return ajaxPromise(options);
    }
  })

  window.ajaxPromise = ajaxPromise;
}(window)
