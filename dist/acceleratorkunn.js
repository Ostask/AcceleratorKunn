!function(t,i){if("object"==typeof exports&&"object"==typeof module)module.exports=i();else if("function"==typeof define&&define.amd)define([],i);else{var e=i();for(var n in e)("object"==typeof exports?exports:t)[n]=e[n]}}(self,(function(){return(()=>{"use strict";var t={d:(i,e)=>{for(var n in e)t.o(e,n)&&!t.o(i,n)&&Object.defineProperty(i,n,{enumerable:!0,get:e[n]})},o:(t,i)=>Object.prototype.hasOwnProperty.call(t,i),r:t=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})}},i={};function e(t){var i=/([0-9]+)\s*([a-zA-z%]*)/gi.exec(t);return i?{num:parseFloat(i[1])||0,unit:"px"!==i[2]&&"%"!==i[2]?"px":i[2]}:{num:0,unit:"px"}}function n(){return{width:document.body.clientWidth,height:document.body.clientHeight}}function o(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",i=arguments.length>1&&void 0!==arguments[1]?arguments[1]:n().width;if(!t)return{num:0,originUnit:"px"};var o=e(t);return"px"===o.unit?{num:o.num,originUnit:o.unit}:"%"===o.unit?{num:o.num*parseFloat(i)/100,originUnit:o.unit}:void 0}function r(t){var i=arguments.length>1&&void 0!==arguments[1]?arguments[1]:n().width;return"px"===t.originUnit?t.num+t.originUnit:"%"===t.originUnit?100*parseFloat(t.num)/parseFloat(i)+t.originUnit:void 0}function h(t,i){var e=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);i&&(n=n.filter((function(i){return Object.getOwnPropertyDescriptor(t,i).enumerable}))),e.push.apply(e,n)}return e}function s(t){for(var i=1;i<arguments.length;i++){var e=null!=arguments[i]?arguments[i]:{};i%2?h(Object(e),!0).forEach((function(i){l(t,i,e[i])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(e)):h(Object(e)).forEach((function(i){Object.defineProperty(t,i,Object.getOwnPropertyDescriptor(e,i))}))}return t}function l(t,i,e){return i in t?Object.defineProperty(t,i,{value:e,enumerable:!0,configurable:!0,writable:!0}):t[i]=e,t}function a(t,i){if(!(t instanceof i))throw new TypeError("Cannot call a class as a function")}function u(t,i){for(var e=0;e<i.length;e++){var n=i[e];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}t.r(i),t.d(i,{Accelerator:()=>d,VueAccelerator:()=>f});var c=function(){function t(i){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};if(a(this,t),!i)throw Error("Accelerator 必须绑定一个dom元素");if(!i.parentNode)throw Error("Accelerator 必须绑定一个有父元素");this.config=s(s({},{id:t.ID,x:t.x,y:t.y,width:t.width,height:t.height,autoCount:t.autoCount}),e),this.domEl=i,this.parentEl=i.parentNode,this.parentElWidth=this.parentEl.clientWidth,this.parentElHeight=this.parentEl.clientHeight,this.id=null,this.x=null,this.y=null,this.width=null,this.height=null,this.autoCount=!1,this.watchParentInterval=null,this._init()}var i,e;return i=t,(e=[{key:"_init",value:function(){console.log("初始化咯"),this._computedConfig(this.config),console.log(this.x,this.y,this.width,this.height),this.parentEl.style.position="relative",this.parentEl.style.overflow="hidden",this._setStyle(),this.autoCount&&this._updateStaticConfig(),t.ID++,t._instanceList.push(this),console.log(t._instanceList),this.watchParentInterval=setInterval(this.resize.bind(this),300)}},{key:"resize",value:function(){var t=this.parentEl.clientWidth,i=this.parentEl.clientHeight;t==this.parentElWidth&&i==this.parentElHeight||(console.log("父元素大小变了啊喂"),this.parentElWidth=this.parentEl.clientWidth,this.parentElHeight=this.parentEl.clientHeight,this._computedConfig(this.config),this._setStyle())}},{key:"_computedConfig",value:function(t){this.id=t.id,this.x=o(t.x,this.parentElWidth),this.y=o(t.y,this.parentElHeight),this.width=o(t.width,this.parentElWidth),this.height=o(t.height,this.parentElHeight),this.autoCount=t.autoCount}},{key:"_setStyle",value:function(){this.domEl.style.position="absolute",this.domEl.style.left=this.x.num+"px",this.domEl.style.top=this.y.num+"px",this.domEl.style.width=this.width.num+"px",this.domEl.style.height=this.height.num+"px"}},{key:"_updateStaticConfig",value:function(){var i=this.x.num+this.width.num,e=this.y.num;i+this.width.num>this.parentElWidth&&(i=0,e=this.y.num+this.height.num),t.x=r({num:i,originUnit:this.x.originUnit},this.parentElWidth),t.y=r({num:e,originUnit:this.y.originUnit},this.parentElHeight),t.width=r(this.width,this.parentElWidth),t.height=r(this.height,this.parentElHeight)}},{key:"destroy",value:function(){var i=this;clearInterval(this.watchParentInterval),this.watchParentInterval=null;var e=t._instanceList.findIndex((function(t){return i.id===t.id}));console.log(e),t._instanceList.splice(e,1),console.log(t._instanceList)}}])&&u(i.prototype,e),t}();c.ID=1,c.x=0,c.y=0,c.width="100px",c.height="100px",c.autoCount=!1,c._instanceList=[],c.setStaticConfig=function(t){c.x=t.x||c.x,c.y=t.y||c.y,c.width=t.width||c.width,c.height=t.height||c.height,c.autoCount=t.autoCount||c.autoCount},c.destroyAll=function(){for(var t=0;t<c._instanceList.length;t++)c._instanceList[t].destroy(),t--},window.Accelerator=c;const d=c;var p={bind:function(t,i){t.ackun=new d(t,i)}};const f={install:function(t){t.directive("accelerator",p)}};return i})()}));