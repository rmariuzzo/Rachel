!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?e(exports):"function"==typeof define&&define.amd?define(["exports"],e):e(t.Rachel={})}(this,function(t){"use strict";function e(t,e){if("string"!=typeof t)throw new Error("the path must be a string");return function(){return i(t,f({},e,{method:"GET"}))}}function n(t,e){if("string"!=typeof t)throw new Error("the path must be a string");return function(e,n){i(t,f({},n,{method:"GET",id:e}))}}function r(t,e){if("string"!=typeof t)throw new Error("the path must be a string");return function(e,n){i(t,f({},n,{method:"POST",data:e}))}}function o(t,e){if("string"!=typeof t)throw new Error("the path must be a string");return function(e,n,r){i(t,f({},r,{method:"PUT",id:e,data:n}))}}function u(t,e){if("string"!=typeof t)throw new Error("the path must be a string");return function(e,n){i(t,f({},n,{method:"DELETE",id:e}))}}function i(t,e){if(void 0!==e.id&&(t=c(t,{id:e.id})),void 0!==e.data&&(t=c(t,e.data)),e.prefix&&(t=prefix+t),e.cache&&i.cache[t]&&!e.force)return Promise.resolve(i.cache[t]);if(!1===e.multiple&&i.queue[t])return i.queue[t];var n={method:e.method,headers:{"Content-Type":"application/json"}};return e.data&&(n.body=JSON.stringify(e.data)),fetcher[t]=fetch(t,n).then(function(t){if(t.ok)return t;throw new Error("bad status code: "+t.status)}).then(function(t){return t.json()}).then(function(t){return e.extract?t[e.extract]:t}).then(function(n){return e.cache&&(i.cache[t]=n),delete i.queue[t],n})}function c(t,e){return t.replace(/:(\w+)/g,function(t,n){return e[n]})}!function(){function t(t){this.value=t}function e(e){function n(o,u){try{var i=e[o](u),c=i.value;c instanceof t?Promise.resolve(c.value).then(function(t){n("next",t)},function(t){n("throw",t)}):r(i.done?"return":"normal",i.value)}catch(t){r("throw",t)}}function r(t,e){switch(t){case"return":o.resolve({value:e,done:!0});break;case"throw":o.reject(e);break;default:o.resolve({value:e,done:!1})}(o=o.next)?n(o.key,o.arg):u=null}var o,u;this._invoke=function(t,e){return new Promise(function(r,i){var c={key:t,arg:e,resolve:r,reject:i,next:null};u?u=u.next=c:(o=u=c,n(t,e))})},"function"!=typeof e.return&&(this.return=void 0)}"function"==typeof Symbol&&Symbol.asyncIterator&&(e.prototype[Symbol.asyncIterator]=function(){return this}),e.prototype.next=function(t){return this._invoke("next",t)},e.prototype.throw=function(t){return this._invoke("throw",t)},e.prototype.return=function(t){return this._invoke("return",t)}}();var f=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(t[r]=n[r])}return t};i.cache={},i.queue={},t.createApi=function(t){var i=t;return{list:function(t,n){return e(t,f({},i,n))},get:function(t,e){return n(t,f({},i,e))},post:function(t,e){return r(t,f({},i,e))},put:function(t,e){return o(t,f({},i,e))},del:function(t,e){return u(t,f({},i,e))}}},t.list=e,t.get=n,t.post=r,t.put=o,t.del=u,Object.defineProperty(t,"__esModule",{value:!0})});