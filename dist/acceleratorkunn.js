!function(t,e){if("object"==typeof exports&&"object"==typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var i=e();for(var n in i)("object"==typeof exports?exports:t)[n]=i[n]}}(self,(function(){return(()=>{"use strict";var t={d:(e,i)=>{for(var n in i)t.o(i,n)&&!t.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:i[n]})},o:(t,e)=>Object.prototype.hasOwnProperty.call(t,e),r:t=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})}},e={};function i(t){return(i="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function n(t){var e=/(\-*[0-9]+\.*[0-9]*)\s*([a-zA-z%]*)/gi.exec(t);return e?{num:parseFloat(e[1])||0,unit:"px"!==e[2]&&"%"!==e[2]?"px":e[2]}:{num:0,unit:"px"}}function r(){return{width:document.body.clientWidth,height:document.body.clientHeight}}function s(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:r().width;if(!t)return{num:0,originUnit:"px"};var i=n(t);return"px"===i.unit?{num:i.num,originUnit:i.unit}:"%"===i.unit?{num:i.num*parseFloat(e)/100,originUnit:i.unit}:void 0}function o(t,e){var i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:r().width;return"px"===e?t+e:"%"===e?100*parseFloat(t)/parseFloat(i)+e:void 0}function a(t){return t.offsetWidth}function h(t){return t.offsetHeight}function l(t){var e=getComputedStyle(t);return"absolute"===e.position?e.left:""}function d(t){var e=getComputedStyle(t);return"absolute"===e.position?e.top:""}function c(t){var e=";"===t[t.length-1]?t:t+";";return"-ms-"+e+"-moz-"+e+"-webkit-"+e+"-o-"+e+e}function u(t){t.stopPropagation(),t.preventDefault()}function g(t){var e=[];return e.push({x:t.x,y:t.y}),e.push({x:t.x,y:t.yCenter}),e.push({x:t.x,y:t.y1}),e.push({x:t.xCenter,y:t.y}),e.push({x:t.xCenter,y:t.y1}),e.push({x:t.x1,y:t.y}),e.push({x:t.x1,y:t.yCenter}),e.push({x:t.x1,y:t.y1}),e}function f(t){t.stopPropagation(),t.preventDefault(),document.body.appendChild(Accelerator._selectBox),Accelerator._origin={x:t.pageX,y:t.pageY},Accelerator._hasSelectBox=!0,Accelerator._selectBox.style.top=t.pageY+"px",Accelerator._selectBox.style.left=t.pageX+"px",Accelerator._selectBox.style.width=0,Accelerator._selectBox.style.height=0}function p(t){if(t.preventDefault(),Accelerator._hasSelectBox){var e=t.pageX-Accelerator._origin.x,i=t.pageY-Accelerator._origin.y;e<0&&(e=0),i<0&&(i=0),Accelerator._selectBox.style.width=e+"px",Accelerator._selectBox.style.height=i+"px",Accelerator._selectedNum=0;for(var n=0;n<Accelerator._instanceList.length;n++){var r=Accelerator._instanceList[n];s=r.domEl,o=Accelerator._selectBox,void 0,void 0,void 0,void 0,void 0,void 0,void 0,void 0,void 0,void 0,h=(a=s.getBoundingClientRect()).left,l=a.top,d=a.width,c=a.height,g=(u=o.getBoundingClientRect()).left,f=u.top,p=u.width,m=u.height,h>g+p||h+d<g||l>f+m||l+c<f?(r.resizeable&&r.hideControl(),r.setUnActive()):(r.resizeable&&r.showControl(),r.setActive(),Accelerator._selectedNum++)}}var s,o,a,h,l,d,c,u,g,f,p,m}function m(t){Accelerator._hasSelectBox&&(document.body.removeChild(Accelerator._selectBox),Accelerator._hasSelectBox=!1,Accelerator._selectBox.style.width=0,Accelerator._selectBox.style.height=0)}function y(t,e,i){if(!i.dragOutable){var n=i.parentElWidth-i.width,r=i.parentElHeight-i.height;t<0&&(t=0),t>n&&(t=n),e<0&&(e=0),e>r&&(e=r)}i.x=t,i.y=e,i.x1=t+i.width,i.y1=e+i.height,i.xCenter=t+i.width/2,i.yCenter=e+i.height/2}function v(t){t.stopPropagation(),this.dragOrign.x=t.pageX,this.dragOrign.y=t.pageY,this.isdragging=!0,this.domEl.style.userSelect="none",this.emit("dragStart",{target:this,event:t})}function x(t){var e=this.x,i=this.y;if(this.active){switch(t.keyCode){case 38:i-=1;break;case 40:i+=1;break;case 37:e-=1;break;case 39:e+=1}this.constructor._selectedNum<=1?(y(e,i,this),this._setStyle(),this._updatePositionConfig(),this.helpAxis&&this.countAxisLine(),this.emit("dragMove",{target:this,event:t})):(this.x=e,this.y=i,this.x1=e+this.width,this.y1=i+this.height,this.xCenter=e+this.width/2,this.yCenter=i+this.height/2,this._setStyle(),this._updatePositionConfig(),this.emit("dragMove",{target:this,event:t}))}}function b(t){if(this.isdragging){this.domEl.classList.add("ac_dragging");var e=t.pageX-this.dragOrign.x,i=t.pageY-this.dragOrign.y;if(this.constructor._selectedNum<=1){y(this.x+e,this.y+i,this);var n=!1;this.adsort&&(n=this.countAdsorb(t,e,i)),n||(this.dragOrign.x=t.pageX,this.dragOrign.y=t.pageY),this._setStyle(),this._updatePositionConfig(),this.helpAxis&&this.countAxisLine(),this.emit("dragMove",{target:this,event:t})}else this.constructor.dragActive(e,i,t),this.dragOrign.x=t.pageX,this.dragOrign.y=t.pageY}}function w(t){this.isdragging&&(this.domEl.classList.remove("ac_dragging"),this.isdragging=!1,this.domEl.style.userSelect="auto",this.helpAxis&&this.hideAxisLine(),this.emit("dragEnd",{target:this,event:t}))}function E(t){this.isdragging&&(this.domEl.classList.remove("ac_dragging"),this.isdragging=!1,this.domEl.style.userSelect="auto",this.helpAxis&&this.hideAxisLine(),this.emit("dragEnd",{target:this,event:t}))}function C(t){this.active&&(this.domEl.classList.remove("ac_dragging"),this.helpAxis&&this.hideAxisLine(),this.emit("dragEnd",{target:this,event:t}))}function _(t){var e;t.dragable&&(t.dragHandler?("string"==typeof t.dragHandler&&(t.dragButton=t.domEl.querySelector(t.dragHandler)),e=t.dragHandler,("object"===("undefined"==typeof HTMLElement?"undefined":i(HTMLElement))?e instanceof HTMLElement:e&&"object"===i(e)&&1===e.nodeType&&"string"==typeof e.nodeName)&&(t.dragButton=t.dragDom)):t.dragButton=t.domEl,t.bindMousedown=v.bind(t),t.dragButton.addEventListener("mousedown",t.bindMousedown),t.bindMouseMove=b.bind(t),window.addEventListener("mousemove",t.bindMouseMove),t.bindMouseLeave=w.bind(t),window.addEventListener("mouseleave",t.bindMouseLeave),t.bindMouseUp=E.bind(t),window.addEventListener("mouseup",t.bindMouseUp),t.bindKeydown=x.bind(t),window.addEventListener("keydown",t.bindKeydown),t.bindKeyup=C.bind(t),window.addEventListener("keyup",t.bindKeyup))}function A(t){t.dragButton.removeEventListener("mousedown",t.bindMousedown),window.removeEventListener("mousemove",t.bindMouseMove),window.removeEventListener("mouseleave",t.bindMouseLeave),window.removeEventListener("mouseup",t.bindMouseUp),window.removeEventListener("keydown",t.bindKeydown),window.removeEventListener("keyup",t.bindKeyup)}function z(){for(var t=0;t<this.resizeHandle.length;t++)this.resizeHandle[t].style.display="block"}function O(){for(var t=0;t<this.resizeHandle.length;t++)this.resizeHandle[t].style.display="none"}function L(t,e,i){u(t),i.resizeOrign.x=t.pageX,i.resizeOrign.y=t.pageY,i.isdragging=!1,i.resizeMode=e,i.domEl.style.userSelect="none",i.emit("zoomStart",{target:i,type:i.resizeMode,event:t})}function H(t){u(t),this.hideControl(),this.setUnActive(),this.constructor._selectedNum=0}function S(t,e,i,n){var r;return r=e?Math.max(s(e,n).num,t):Math.max(0,t),i&&(r=Math.min(s(i,n).num,t)),r}function M(t,e){var i=e.y+t,n=e.height-t,r=i+n;if(!e.dragOutable){var s=r,o=r;i=Math.min(s,Math.max(0,i)),n=Math.min(o,Math.max(0,n))}n=S(n,e.minHeight,e.maxHeight,e.parentElHeight),e.y=i,e.height=n,e.y1=i+n,e.yCenter=i+n/2}function U(t,e){var i=e.height+t;if(!e.dragOutable){var n=e.parentElHeight-e.y;i=Math.min(n,Math.max(0,i))}i=S(i,e.minHeight,e.maxHeight,e.parentElHeight),e.height=i,e.y1=e.y+i,e.yCenter=e.y+i/2}function W(t,e){var i=e.x+t,n=e.width-t,r=i+n;if(!e.dragOutable){var s=r,o=r;i=Math.min(s,Math.max(0,i)),n=Math.min(o,Math.max(0,n))}n=S(n,e.minWidth,e.maxWidth,e.parentElWidth),e.x=i,e.width=n,e.x1=i+n,e.xCenter=i+n/2}function k(t,e){var i=e.width+t;if(!e.dragOutable){var n=e.parentElWidth-e.x;i=Math.min(n,Math.max(0,i))}i=S(i,e.minWidth,e.maxWidth,e.parentElWidth),e.width=i,e.x1=e.x+i,e.xCenter=e.x+i/2}function P(t){if(this.resizeMode){this.domEl.classList.add("ac_resizing");var e=t.pageX-this.resizeOrign.x,i=t.pageY-this.resizeOrign.y;switch(this.resizeMode){case"tl":M(i,this),W(e,this);break;case"tm":M(i,this);break;case"tr":M(i,this),k(e,this);break;case"mr":k(e,this);break;case"br":U(i,this),k(e,this);break;case"bm":U(i,this);break;case"bl":U(i,this),W(e,this);break;case"ml":W(e,this)}this.resizeOrign.x=t.pageX,this.resizeOrign.y=t.pageY,this._setStyle(),this._updatePositionConfig(),this.helpAxis&&this.countAxisLine(),this.emit("zoomMove",{target:this,type:this.resizeMode,event:t})}}function j(t){this.resizeMode&&(this.domEl.classList.remove("ac_resizing"),this.resizeMode=null,this.domEl.style.userSelect="auto",this.helpAxis&&this.hideAxisLine(),this.emit("zoomEnd",{target:this,type:this.resizeMode,event:t}))}function B(t){if(!t.resizeable)return!1;var e=function(t,e){var i="border:1px solid #8c8c8c;border-radius:50%;width:10px;height:10px;background-color:#fff;position:absolute;display:none;";e.resizeClass&&(i="position:absolute;display:none;");var n=document.createElement("div"),r=document.createElement("div"),s=document.createElement("div"),o=document.createElement("div"),a=document.createElement("div"),h=document.createElement("div"),l=document.createElement("div"),d=document.createElement("div");return e.resizeClass&&(n.classList=e.resizeClass,r.classList=e.resizeClass,s.classList=e.resizeClass,o.classList=e.resizeClass,a.classList=e.resizeClass,h.classList=e.resizeClass,l.classList=e.resizeClass,d.classList=e.resizeClass),n.style.cssText=i+"top:0;left:0;cursor:nw-resize;"+c("transform:translate(-50%,-50%)"),r.style.cssText=i+"top:0;left:50%;cursor:n-resize;"+c("transform:translate(-50%,-50%)"),s.style.cssText=i+"top:0;right:0;cursor:ne-resize;"+c("transform:translate(50%,-50%)"),o.style.cssText=i+"top:50%;right:0;cursor:e-resize;"+c("transform:translate(50%,-50%)"),a.style.cssText=i+"bottom:0;right:0;cursor:se-resize;"+c("transform:translate(50%,50%)"),h.style.cssText=i+"bottom:0;left:50%;cursor:s-resize;"+c("transform:translate(-50%,50%)"),l.style.cssText=i+"bottom:0;left:0;cursor:sw-resize;"+c("transform:translate(-50%,50%)"),d.style.cssText=i+"top:50%;left:0;cursor:w-resize;"+c("transform:translate(-50%,-50%)"),{control_tl:n,control_tm:r,control_tr:s,control_mr:o,control_br:a,control_bm:h,control_bl:l,control_ml:d}}(t.domEl,t),i=e.control_tl,n=e.control_tm,r=e.control_tr,s=e.control_mr,o=e.control_br,a=e.control_bm,h=e.control_bl,l=e.control_ml,d=t.domEl;t.resizeHandle=[i,n,r,s,o,a,h,l],t.showControl=z,t.hideControl=O,i.addEventListener("mousedown",(function(e){L(e,"tl",t)})),n.addEventListener("mousedown",(function(e){L(e,"tm",t)})),r.addEventListener("mousedown",(function(e){L(e,"tr",t)})),s.addEventListener("mousedown",(function(e){L(e,"mr",t)})),o.addEventListener("mousedown",(function(e){L(e,"br",t)})),a.addEventListener("mousedown",(function(e){L(e,"bm",t)})),h.addEventListener("mousedown",(function(e){L(e,"bl",t)})),l.addEventListener("mousedown",(function(e){L(e,"ml",t)})),t.bindResizeMove=P.bind(t),window.addEventListener("mousemove",t.bindResizeMove),t.bindResizeUp=j.bind(t),window.addEventListener("mouseup",t.bindResizeUp),t.bindUnActive=H.bind(t),window.addEventListener("mousedown",t.bindUnActive),d.appendChild(i),d.appendChild(n),d.appendChild(r),d.appendChild(s),d.appendChild(o),d.appendChild(a),d.appendChild(h),d.appendChild(l)}function T(t){for(var e=0;e<t.resizeHandle.length;e++)t.domEl.removeChild(t.resizeHandle[e]);t.resizeHandle=[],window.removeEventListener("mousemove",t.bindResizeMove),window.removeEventListener("mouseup",t.bindResizeUp),window.removeEventListener("mousedown",t.bindUnActive)}function N(t){return function(t){if(Array.isArray(t))return I(t)}(t)||function(t){if("undefined"!=typeof Symbol&&null!=t[Symbol.iterator]||null!=t["@@iterator"])return Array.from(t)}(t)||function(t,e){if(t){if("string"==typeof t)return I(t,e);var i=Object.prototype.toString.call(t).slice(8,-1);return"Object"===i&&t.constructor&&(i=t.constructor.name),"Map"===i||"Set"===i?Array.from(t):"Arguments"===i||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(i)?I(t,e):void 0}}(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function I(t,e){(null==e||e>t.length)&&(e=t.length);for(var i=0,n=new Array(e);i<e;i++)n[i]=t[i];return n}function D(){var t=[],e=[{value:this.x,list:[]},{value:this.xCenter,list:[]},{value:this.x1,list:[]}],i=[{value:this.y,list:[]},{value:this.yCenter,list:[]},{value:this.y1,list:[]}];if(!this.parentEl.querySelector(".ac_line")){console.log(this.axisColor);for(var n=0;n<3;n++){var r=document.createElement("div");r.classList="ac_line x_line x_line_"+n,r.style.cssText="background:"+this.axisColor+";width:1px;position:absolute;display:none;z-index:9999;",this.parentEl.appendChild(r);var s=document.createElement("div");s.classList="ac_line y_line y_line_"+n,s.style.cssText="background:"+this.axisColor+";height:1px;position:absolute;display:none;z-index:9999;",this.parentEl.appendChild(s)}}if(this.constructor._instanceList.length<2)return!1;for(var o=0;o<this.constructor._instanceList.length;o++){var a=this.constructor._instanceList[o];a.parentEl===this.parentEl&&a.id!==this.id&&t.push.apply(t,N(g(a)))}if(!(t.length>0))return!1;t.push.apply(t,N(g(this)));for(var h=0;h<e.length;h++)for(var l=e[h].value,d=0;d<t.length;d++)l===t[d].x&&e[h].list.push(t[d]);for(var c=0;c<i.length;c++)for(var u=i[c].value,f=0;f<t.length;f++)u===t[f].y&&i[c].list.push(t[f]);for(var p=0;p<e.length;p++)if(e[p].list.length>=4){var m=e[p].value,y=e[p].list.map((function(t){return t.y})),v=Math.min.apply(Math,N(y)),x=Math.max.apply(Math,N(y)),b=this.parentEl.querySelector(".x_line_"+p);b.style.left=m+"px",b.style.top=v+"px",b.style.height=x-v+"px",b.style.display="block"}else this.parentEl.querySelector(".x_line_"+p).style.display="none";for(var w=0;w<i.length;w++)if(i[w].list.length>=4){var E=i[w].value,C=i[w].list.map((function(t){return t.x})),_=Math.min.apply(Math,N(C)),A=Math.max.apply(Math,N(C)),z=this.parentEl.querySelector(".y_line_"+w);z&&(z.style.top=E+"px",z.style.left=_+"px",z.style.width=A-_+"px",z.style.display="block")}else{var O=this.parentEl.querySelector(".y_line_"+w);O&&(O.style.display="none")}}function R(){for(var t=0;t<3;t++){var e=this.parentEl.querySelector(".x_line_"+t);e&&(e.style.display="none")}for(var i=0;i<3;i++){var n=this.parentEl.querySelector(".y_line_"+i);n&&(n.style.display="none")}}function $(){for(var t=this.parentEl.getElementsByClassName("ac_line");t.length>0;)this.parentEl.removeChild(t[0])}function X(t){return function(t){if(Array.isArray(t))return Y(t)}(t)||function(t){if("undefined"!=typeof Symbol&&null!=t[Symbol.iterator]||null!=t["@@iterator"])return Array.from(t)}(t)||function(t,e){if(t){if("string"==typeof t)return Y(t,e);var i=Object.prototype.toString.call(t).slice(8,-1);return"Object"===i&&t.constructor&&(i=t.constructor.name),"Map"===i||"Set"===i?Array.from(t):"Arguments"===i||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(i)?Y(t,e):void 0}}(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function Y(t,e){(null==e||e>t.length)&&(e=t.length);for(var i=0,n=new Array(e);i<e;i++)n[i]=t[i];return n}function q(t,e,i){if(this.constructor._instanceList.length<2)return!1;for(var n=[],r=[],s=0;s<this.constructor._instanceList.length;s++){var o=this.constructor._instanceList[s];o.parentEl===this.parentEl&&o.id!==this.id?r.push.apply(r,X(g(o))):o.parentEl===this.parentEl&&o.id==this.id&&n.push.apply(n,X(g(o)))}if(0==r.length)return!1;for(var a=!1,h="",l=0;l<n.length;l++){for(var d=n[l].x,c=n[l].y,u=0;u<r.length;u++){var f=r[u].x;if(Math.abs(d-f)<=5){var p=d-f;a=!0,h+="x",this.x=this.x-p,this.xCenter=this.x+this.width/2,this.x1=this.x+this.width;break}}for(var m=0;m<r.length;m++){var y=r[m].y;if(Math.abs(c-y)<=5){var v=c-y;a=!0,h+="y",this.y=this.y-v,this.yCenter=this.y+this.height/2,this.y1=this.y+this.height;break}}if(a)break}return"x"==h&&(Math.abs(e)>5&&(this.dragOrign.x=t.pageX),this.dragOrign.y=t.pageY),"y"==h&&(Math.abs(i)>5&&(this.dragOrign.y=t.pageY),this.dragOrign.x=t.pageX),"xy"==h&&(Math.abs(e)>5&&(this.dragOrign.x=t.pageX),Math.abs(i)>5&&(this.dragOrign.y=t.pageY)),!!a}function K(t,e){for(var i=0;i<e.length;i++){var n=e[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}function F(t){return(F="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function V(t,e){var i=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),i.push.apply(i,n)}return i}function G(t){for(var e=1;e<arguments.length;e++){var i=null!=arguments[e]?arguments[e]:{};e%2?V(Object(i),!0).forEach((function(e){J(t,e,i[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(i)):V(Object(i)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(i,e))}))}return t}function J(t,e,i){return e in t?Object.defineProperty(t,e,{value:i,enumerable:!0,configurable:!0,writable:!0}):t[e]=i,t}function Q(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function Z(t,e){for(var i=0;i<e.length;i++){var n=e[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}function tt(t,e){return(tt=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}function et(t,e){return!e||"object"!==F(e)&&"function"!=typeof e?function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t):e}function it(t){return(it=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}t.r(e),t.d(e,{Accelerator:()=>rt,VueAccelerator:()=>at});var nt=function(t){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&tt(t,e)}(u,t);var e,i,n,r,c=(n=u,r=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}(),function(){var t,e=it(n);if(r){var i=it(this).constructor;t=Reflect.construct(e,arguments,i)}else t=e.apply(this,arguments);return et(this,t)});function u(t){var e,i=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};if(Q(this,u),e=c.call(this),!t)throw Error("Accelerator 必须绑定一个dom元素");if(!t.parentNode)throw Error("Accelerator 必须有父元素");var n=a(t),r=h(t),s=l(t),o=d(t);return e.config=G(G({},{id:u.ID,x:s||u.x,y:o||u.y,width:n||u.width,height:r||u.height,minWidth:u.minWidth||0,minHeight:u.minHeight||0,maxWidth:u.maxWidth||null,maxHeight:u.maxHeight||null,autoCount:u.autoCount,dragable:u.dragable,dragOutable:u.dragOutable,resizeable:u.resizeable,helpAxis:u.helpAxis,adsort:u.adsort,axisColor:u.axisColor,resizeClass:u.resizeClass,dragHandler:u.dragHandler}),i),e.config.id=u.ID,e.domEl=t,e.parentEl=t.parentNode,e.parentElWidth=a(e.parentEl),e.parentElHeight=h(e.parentEl),e.id=null,e.x=null,e.y=null,e.width=null,e.height=null,e.minWidth=null,e.minHeight=null,e.maxWidth=null,e.maxHeight=null,e.autoCount=!1,e.dragable=!0,e.dragOutable=!0,e.resizeable=!0,e.helpAxis=!0,e.adsort=!0,e.axisColor=null,e.resizeClass=null,e.dragHandler=null,e.x1=null,e.y1=null,e.xCenter=null,e.yCenter=null,e.xUnit=null,e.yUnit=null,e.widthUnit=null,e.heightUnit=null,e.dragOrign={x:0,y:0},e.resizeOrign={x:0,y:0},e.isdragging=!1,e.resizeMode=null,e.active=!1,e.resizeHandle=[],e.watchParentInterval=null,e._init(),e}return e=u,(i=[{key:"_init",value:function(){var t;this._computedConfig(this.config),console.log(this),"absolute"===getComputedStyle(this.parentEl).position||(this.parentEl.style.position="relative"),this.parentEl.style.overflow="visible",this._setStyle(),this.autoCount&&this._updateStaticConfig(),0==u._instanceList.length&&u.addEvent(),u.ID++,u._instanceList.push(this),this.watchParentInterval=setInterval(this.resize.bind(this),300),this.bindSelect=this.select.bind(this),this.domEl.addEventListener("mousedown",this.bindSelect),_(this),B(this),(t=this).countAxisLine=D,t.hideAxisLine=R,t.removeAxisLine=$,function(t){t.countAdsorb=q}(this)}},{key:"_computedConfig",value:function(t){this.id=t.id;var e=s(t.x,this.parentElWidth);this.x=e.num,this.xUnit=e.originUnit;var i=s(t.y,this.parentElHeight);this.y=i.num,this.yUnit=i.originUnit;var n=s(t.width,this.parentElWidth),r=s(t.minWidth,this.parentElWidth);if(this.width=Math.max(n.num,r.num),t.maxWidth){var o=s(t.maxWidth,this.parentElWidth);this.width=Math.min(this.width,o.num)}this.widthUnit=n.originUnit;var a=s(t.height,this.parentElHeight),h=s(t.minHeight,this.parentElHeight);if(this.height=Math.max(h.num,a.num),t.maxWidth){var l=s(t.maxHeight,this.parentElHeight);this.height=Math.min(this.height,l.num)}this.heightUnit=a.originUnit,this.minWidth=t.minWidth,this.minHeight=t.minHeight,this.maxWidth=t.maxWidth,this.maxHeight=t.maxHeight,this.autoCount=t.autoCount,this.dragable=t.dragable,this.dragOutable=t.dragOutable,this.resizeable=t.resizeable,this.helpAxis=t.helpAxis,this.adsort=t.adsort,this.axisColor=t.axisColor,this.resizeClass=t.resizeClass,this.dragHandler=t.dragHandler,this.x1=this.x+this.width,this.y1=this.y+this.height,this.xCenter=this.x+this.width/2,this.yCenter=this.y+this.height/2}},{key:"_setStyle",value:function(){this.domEl.style.position="absolute",this.domEl.style.left=this.x+"px",this.domEl.style.top=this.y+"px",this.domEl.style.width=this.width+"px",this.domEl.style.height=this.height+"px"}},{key:"_updatePositionConfig",value:function(){this.config.x=o(this.x,this.xUnit,this.parentElWidth),this.config.y=o(this.y,this.yUnit,this.parentElHeight),this.config.width=o(this.width,this.widthUnit,this.parentElWidth),this.config.height=o(this.height,this.heightUnit,this.parentElHeight),this.emit("update",{target:this})}},{key:"_updateStaticConfig",value:function(){var t=this.x+this.width,e=this.y;t+this.width>this.parentElWidth&&(t=0,e=this.y+this.height),u.x=o(t,this.xUnit,this.parentElWidth),u.y=o(e,this.yUnit,this.parentElHeight),u.width=o(this.width,this.widthUnit,this.parentElWidth),u.height=o(this.height,this.heightUnit,this.parentElHeight),u.minWidth=this.minWidth,u.minHeight=this.minHeight,u.maxWidth=this.maxWidth,u.maxHeight=this.maxHeight,u.autoCount=this.autoCount,u.dragable=this.dragable,u.dragOutable=this.dragOutable,u.resizeable=this.resizeable,u.helpAxis=this.helpAxis,u.adsort=this.adsort}},{key:"attr",value:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"",i=F(t),n=this.dragable,r=this.resizeable,s=this.resizeClass,o=this.axisColor,a=this.dragHandler;if("string"===i){if(!e&&!1!==e)return this.config[t];"id"!=t&&(this.config[t]=e)}else"object"===i&&(t.id&&delete t.id,this.config=G(G({},this.config),t));this.config.axisColor||(this.config.axisColor=u.axisColor),this._computedConfig(this.config),this._setStyle(),this.dragable!=n&&(this.dragable?_(this):A(this)),this.dragHandler!=a&&(this.dragHandler?_(this):A(this)),this.resizeable!=r&&(this.resizeable?B(this):T(this)),this.axisColor!=o&&this.removeAxisLine(),this.resizeClass!=s&&(T(this),B(this)),this.emit("update",{target:this})}},{key:"resize",value:function(){var t=a(this.parentEl),e=h(this.parentEl);t==this.parentElWidth&&e==this.parentElHeight||(this.parentElWidth=t,this.parentElHeight=e,this._computedConfig(this.config),this._setStyle(),this.emit("resize",{target:this}))}},{key:"select",value:function(t){t&&t.stopPropagation(),this.constructor._selectedNum<=1&&this.constructor.setActive(this)}},{key:"setActive",value:function(){this.domEl.classList.add("ac_active"),this.active=!0,this.emit("select",{target:this})}},{key:"setUnActive",value:function(){this.domEl.classList.remove("ac_active"),this.active=!1}},{key:"changeToPx",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[];"string"==typeof t&&(t=[t]),0==t.length?(this.xUnit="px",this.yUnit="px",this.widthUnit="px",this.heightUnit="px"):("x".indexOf(t)>-1&&(this.xUnit="px"),"y".indexOf(t)>-1&&(this.yUnit="px"),"width".indexOf(t)>-1&&(this.widthUnit="px"),"height".indexOf(t)>-1&&(this.heightUnit="px")),this._updatePositionConfig()}},{key:"changeToPercent",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[];"string"==typeof t&&(t=[t]),0==t.length?(this.xUnit="%",this.yUnit="%",this.widthUnit="%",this.heightUnit="%"):("x".indexOf(t)>-1&&(this.xUnit="%"),"y".indexOf(t)>-1&&(this.yUnit="%"),"width".indexOf(t)>-1&&(this.widthUnit="%"),"height".indexOf(t)>-1&&(this.heightUnit="%")),this._updatePositionConfig()}},{key:"destroy",value:function(){var t=this;this.emit("beforeDestroy",{target:this}),clearInterval(this.watchParentInterval),A(this),T(this),this.domEl.removeEventListener("mousedown",this.bindSelect),this.watchParentInterval=null;var e=u._instanceList.findIndex((function(e){return t.id===e.id}));u._instanceList.splice(e,1),0==u._instanceList.length&&u.removeEvent(),this.emit("destroyed",{target:this})}}])&&Z(e.prototype,i),u}(function(){function t(){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.handlers={}}var e,i;return e=t,(i=[{key:"on",value:function(t,e){void 0===this.handlers[t]&&(this.handlers[t]=[]),this.handlers[t].push(e)}},{key:"emit",value:function(t,e){e.target||(e.target=this),this.handlers[t]instanceof Array&&this.handlers[t].forEach((function(t){t(e)}))}},{key:"off",value:function(t,e){if(this.handlers[t]instanceof Array){for(var i=this.handlers[t],n=0,r=i.length;n<r&&i[n]!==e;n++);i.splice(n,1)}}}])&&K(e.prototype,i),t}());!function(t){t.ID=1,t.x=0,t.y=0,t.width="200px",t.height="200px",t.minWidth="0px",t.minHeight="0px",t.autoCount=!1,t.dragable=!0,t.dragOutable=!0,t.resizeable=!0,t.helpAxis=!0,t.adsort=!0,t.axisColor="#f557ff",t.resizeClass="",t._instanceList=[],t._selectBox=document.createElement("div"),t._selectBox.classList="ac_select_box";var e=document.createElement("style");e.innerHTML=".ac_select_box {\n        border:1px dashed #aaaaaa;\n        position:absolute;\n        pointer-events: none;\n        z-index:9999;\n    }",document.head.appendChild(e),t._origin={x:0,y:0},t._hasSelectBox=!1,t._selectedNum=0,t.setStaticConfig=function(e){t.x=e.x||t.x,t.y=e.y||t.y,t.width=e.width||t.width,t.height=e.height||t.height,t.minWidth=e.minWidth||t.minWidth,t.minHeight=e.minHeight||t.minHeight,e.maxWidth&&(t.maxWidth=e.maxWidth),e.maxHeight&&(t.maxHeight=e.maxHeight),e.dragHander&&(t.dragHander=e.dragHander),t.autoCount=e.autoCount||t.autoCount,t.dragable=e.dragable||t.dragable,t.dragOutable=e.dragOutable||t.dragOutable,t.resizeable=e.resizeable||t.resizeable,t.helpAxis=e.helpAxis||t.helpAxis,t.adsort=e.adsort||t.adsort,t.axisColor=e.axisColor||t.axisColor,t.resizeClass=e.resizeClass||t.resizeClass},t.setActive=function(e){for(var i=0;i<t._instanceList.length;i++){var n=t._instanceList[i];n.id!==e.id?(n.resizeable&&n.hideControl(),n.setUnActive(),t._selectedNum=0):(n.resizeable&&n.showControl(),n.setActive(),t._selectedNum=1)}},t.destroyAll=function(){for(var e=0;e<t._instanceList.length;e++)t._instanceList[e].destroy(),e--},t.dragActive=function(e,i,n){for(var r=0;r<t._instanceList.length;r++){var s=t._instanceList[r];if(s.active){var o=s.x+e,a=s.y+i;s.x=o,s.y=a,s.x1=o+s.width,s.y1=a+s.height,s.xCenter=o+s.width/2,s.yCenter=a+s.height/2,s._setStyle(),s._updatePositionConfig(),s.emit("dragMove",{target:s,event:n})}}},t.addEvent=function(){window.addEventListener("mousedown",f),window.addEventListener("mousemove",p),window.addEventListener("mouseup",m)},t.removeEvent=function(){window.removeEventListener("mousedown",f),window.removeEventListener("mousemove",p),window.removeEventListener("mouseup",m)}}(nt),window.Accelerator=nt;const rt=nt;var st={inserted:function(t,e,i){var n={};e.value&&(e.value.autoCount||!1===e.value.autoCount)||(n.autoCount=!0),e.value&&(confog=e.value),t.ackun=new rt(t,n),t.ackun.on("dragMove",(function(t){i.context[e.expression]=t.target.config})),t.ackun.on("zoomMove",(function(t){i.context[e.expression]=t.target.config}))},update:function(t,e){t.ackun.attr(e.value)},unbind:function(t){t.ackun.destroy()}},ot={render:function(t){return t("div",{ref:"acceleratorRef"},this.$slots.default)},props:{width:{type:[String,Number],default:"200px"},height:{type:[String,Number],default:"200px"},x:[String,Number],y:[String,Number],minWidth:[String,Number],minHeight:[String,Number],maxWidth:[String,Number],maxHeight:[String,Number],autoCount:Boolean,dragable:Boolean,dragOutable:Boolean,resizeable:Boolean,helpAxis:Boolean,adsort:Boolean,axisColor:String,resizeClass:String,dragHandler:String},data:function(){return{Ac:null}},mounted:function(){var t=this,e={};this.width&&(e.width=this.width),this.height&&(e.height=this.height),this.x&&(e.x=this.x),this.y&&(e.y=this.y),(this.autoCount||!1===this.autoCount)&&(e.autoCount=this.autoCount),(this.dragable||!1===this.dragable)&&(e.dragable=this.dragable),(this.dragOutable||!1===this.dragOutable)&&(e.dragOutable=this.dragOutable),(this.resizeable||!1===this.resizeable)&&(e.resizeable=this.resizeable),(this.helpAxis||!1===this.helpAxis)&&(e.helpAxis=this.helpAxis),(this.adsort||!1===this.adsort)&&(e.adsort=this.adsort),this.axisColor&&(e.axisColor=this.axisColor),this.resizeClass&&(e.resizeClass=this.resizeClass),this.dragHandler&&(e.dragHandler=this.dragHandler),this.Ac=new rt(this.$refs.acceleratorRef,e),this.$emit("created",{target:this.Ac}),this.Ac.on("destroyed",(function(e){t.$emit("destroyed",e)})),this.Ac.on("beforeDestroy",(function(e){t.$emit("beforeDestroy",e)})),this.Ac.on("dragStart",(function(e){t.$emit("dragStart",e)})),this.Ac.on("dragMove",(function(e){t.$emit("dragMove",e)})),this.Ac.on("dragEnd",(function(e){t.$emit("dragEnd",e)})),this.Ac.on("zoomStart",(function(e){t.$emit("zoomStart",e)})),this.Ac.on("zoomMove",(function(e){t.$emit("zoomMove",e)})),this.Ac.on("zoomEnd",(function(e){t.$emit("zoomEnd",e)})),this.Ac.on("resize",(function(e){t.$emit("seresizelect",e)})),this.Ac.on("update",(function(e){t.$emit("update",e)})),this.Ac.on("select",(function(e){t.$emit("select",e)}))},watch:{width:function(t,e){t!==e&&this.Ac.attr("width",t)},height:function(t,e){t!==e&&this.Ac.attr("height",t)},x:function(t,e){t!==e&&this.Ac.attr("x",t)},y:function(t,e){t!==e&&this.Ac.attr("y",t)},minWidth:function(t,e){t!==e&&this.Ac.attr("minWidth",t)},minHeight:function(t,e){t!==e&&this.Ac.attr("minHeight",t)},maxWidth:function(t,e){t!==e&&this.Ac.attr("maxWidth",t)},maxHeight:function(t,e){t!==e&&this.Ac.attr("maxHeight",t)},autoCount:function(t,e){t!==e&&this.Ac.attr("autoCount",t)},dragable:function(t,e){t!==e&&this.Ac.attr("dragable",t)},dragOutable:function(t,e){t!==e&&this.Ac.attr("dragOutable",t)},resizeable:function(t,e){t!==e&&this.Ac.attr("resizeable",t)},helpAxis:function(t,e){t!==e&&this.Ac.attr("helpAxis",t)},adsort:function(t,e){t!==e&&this.Ac.attr("adsort",t)},axisColor:function(t,e){t!==e&&this.Ac.attr("axisColor",t)},resizeClass:function(t,e){t!==e&&this.Ac.attr("resizeClass",t)},dragHandler:function(t,e){t!==e&&this.Ac.attr("dragHandler",t)}},beforDestroy:function(){this.Ac.destroy()}};const at={install:function(t){t.directive("accelerator",st),t.component("accelerator",ot)}};return e})()}));