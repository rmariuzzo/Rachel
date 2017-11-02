"use strict";function createApi(t){var e=t;return{list:function(t,r){return _list(t,_extends({},e,r))},get:function(t,r){return _get(t,_extends({},e,r))},post:function(t,r){return _post(t,_extends({},e,r))},put:function(t,r){return _put(t,_extends({},e,r))},del:function(t,r){return _del(t,_extends({},e,r))}}}function _list(t,e){if("string"!=typeof t)throw new Error("the path must be a string");return function(){return request(t,_extends({},e,{method:"GET"}))}}function _get(t,e){if("string"!=typeof t)throw new Error("the path must be a string");return function(e,r){request(t,_extends({},r,{method:"GET",id:e}))}}function _post(t,e){if("string"!=typeof t)throw new Error("the path must be a string");return function(e,r){request(t,_extends({},r,{method:"POST",data:e}))}}function _put(t,e){if("string"!=typeof t)throw new Error("the path must be a string");return function(e,r,n){request(t,_extends({},n,{method:"PUT",id:e,data:r}))}}function _del(t,e){if("string"!=typeof t)throw new Error("the path must be a string");return function(e,r){request(t,_extends({},r,{method:"DELETE",id:e}))}}function request(t,e){if(void 0!==e.id&&(t=formatUri(t,{id:e.id})),void 0!==e.data&&(t=formatUri(t,e.data)),e.prefix&&(t=prefix+t),e.cache&&request.cache[t]&&!e.force)return Promise.resolve(request.cache[t]);if(!1===e.multiple&&request.queue[t])return request.queue[t];var r={method:e.method,headers:{"Content-Type":"application/json"}};return e.data&&(r.body=JSON.stringify(e.data)),fetcher[t]=fetch(t,r).then(function(t){if(t.ok)return t;throw new Error("bad status code: "+t.status)}).then(function(t){return t.json()}).then(function(t){return e.extract?t[e.extract]:t}).then(function(r){return e.cache&&(request.cache[t]=r),delete request.queue[t],r})}function formatUri(t,e){return t.replace(/:(\w+)/g,function(t,r){return e[r]})}Object.defineProperty(exports,"__esModule",{value:!0});var asyncGenerator=function(){function t(t){this.value=t}function e(e){function r(o,u){try{var i=e[o](u),s=i.value;s instanceof t?Promise.resolve(s.value).then(function(t){r("next",t)},function(t){r("throw",t)}):n(i.done?"return":"normal",i.value)}catch(t){n("throw",t)}}function n(t,e){switch(t){case"return":o.resolve({value:e,done:!0});break;case"throw":o.reject(e);break;default:o.resolve({value:e,done:!1})}(o=o.next)?r(o.key,o.arg):u=null}var o,u;this._invoke=function(t,e){return new Promise(function(n,i){var s={key:t,arg:e,resolve:n,reject:i,next:null};u?u=u.next=s:(o=u=s,r(t,e))})},"function"!=typeof e.return&&(this.return=void 0)}return"function"==typeof Symbol&&Symbol.asyncIterator&&(e.prototype[Symbol.asyncIterator]=function(){return this}),e.prototype.next=function(t){return this._invoke("next",t)},e.prototype.throw=function(t){return this._invoke("throw",t)},e.prototype.return=function(t){return this._invoke("return",t)},{wrap:function(t){return function(){return new e(t.apply(this,arguments))}},await:function(e){return new t(e)}}}(),_extends=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var r=arguments[e];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(t[n]=r[n])}return t};request.cache={},request.queue={},exports.createApi=createApi,exports.list=_list,exports.get=_get,exports.post=_post,exports.put=_put,exports.del=_del;