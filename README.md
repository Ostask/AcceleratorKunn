最近看了《某科学的一方通行》，突然就很喜欢一方通行大爷的性格和爽朗的笑声，于是打算写一个小插件碰瓷一下一方通行大爷的名字。

## 功能
1. 定位
2. 拖拽(可用键盘上下左右键控制)(可通过选框多选拖拽)
3. 缩放
4. 参考线
5. 吸附
![](https://cdn.JsDelivr.net/gh/Ostask/img-bed//2021020806.gif)
![](https://cdn.JsDelivr.net/gh/Ostask/img-bed//20210208061.gif)
![](https://cdn.JsDelivr.net/gh/Ostask/img-bed//2021020810.gif)

## 安装
- npm install acceleratorkunn
- 然后就可以使用了,需要传入一个DOM对象，这个`DOM`对象必须要拥有父元素
```js
import {Accelerator} from 'acceleratorkunn'

const domEl = document.createElement('div')
document.body.appendChild(domEl)

new Accelerator(domEl)
```

- 如果是在`vue`中使用的话有更加简单的方式：
```js
import { VueAccelerator } from 'acceleratorkunn'

Vue.use(VueAccelerator)
```
然后就会全局注册一个`v-accelerator`的`vue`指令，和一个`accelerator`组件。

指令使用方法：
```html
<div v-accelerator></div>
```

组件使用方法：
```html
<accelerator></accelerator>
```
更复杂的用法后面再讲。

## 参数
`new Accelerator(domEl,config)`接收两个参数：
- `domEl` : 之前解释过，这个参数必须是一个DOM对象，而且必须拥有父元素。必填。
- `config` : 配置，(Object)

### `config.x` 
**（String | Number) 默认值：'0px'**  
`domEl`的`x`坐标，等同于绝对定位中的`left`。这个值可以是数字，也可以是字符串，但只支持'px'和'%'两种单位，没有单位则默认是'px'，例：10,'10','10px','20%'等等。 
- 注意，当单位是'%'的时候，如果父元素的尺寸发生改变，`domEl`的`x`坐标会根据百分比来重新计算改变位置,例：父元素宽度为800px,设x为20%，那么此时domEl的left应该是160px。当父元素宽度变为1000px时，此时domEl的left会重新计算变成200px。
- 注意，当没有传这个参数时，如果domEl本身就是绝对定位元素，会优先取该元素的`left`值,单位为'px'

### `config.y`
**（String | Number） 默认值：'0px'**  
`domEl`的`y`坐标，等同于绝对定位中的`top`。这个值可以是数字，也可以是字符串，但只支持'px'和'%'两种单位，没有单位则默认是'px'，例：10,'10','10px','20%'等等。 
- 注意，当单位是'%'的时候，如果父元素的尺寸发生改变，`domEl`的`y`坐标会根据百分比来重新计算改变位置。例：父元素高度为800px,设y为20%，那么此时domEl的top应该是160px。当父元素高度变为1000px时，此时domEl的top会重新计算变成200px。
- 注意，当没有传这个参数时，如果domEl本身就是绝对定位元素，会优先取该元素的`top`值,单位为'px'

### `config.width` 
**(String | Number) 默认值：'200px'**  
`domEl`的宽度。这个值可以是数字，也可以是字符串，但只支持'px'和'%'两种单位，没有单位则默认是'px'，例：10,'10','10px','20%'等等。 
- 注意，当单位是'%'的时候，如果父元素的尺寸发生改变，`domEl`的宽度会根据百分比来重新计算改变位置。例：父元素宽度为800px,设width为20%，那么此时domEl的宽度应该是160px。当父元素宽度变为1000px时，此时domEl的宽度会重新计算变成200px。
- 注意，当没有传这个参数时，会优先取domEl元素的宽度width,单位为'px'

### `config.height` 
**(String | Number) 默认值：'200px'**  
`domEl`的高度。这个值可以是数字，也可以是字符串，但只支持'px'和'%'两种单位，没有单位则默认是'px'，例：10,'10','10px','20%'等等。 
- 注意，当单位是'%'的时候，如果父元素的尺寸发生改变，`domEl`的高度会根据百分比来重新计算改变位置。例：父元素高度为800px,设width为20%，那么此时domEl的高度应该是160px。当父元素宽度变为1000px时，此时domEl的高度会重新计算变成200px。
- 注意，当没有传这个参数时，会优先取domEl元素的高度height,单位为'px'

### `config.minWidth` 
**（String | Number) 默认值：'0px'**  
`domEl`的最小宽度。这个值可以是数字，也可以是字符串，但只支持'px'和'%'两种单位，没有单位则默认是'px'，例：10,'10','10px','20%'等等。
- 注意，`minWidth`的优先级高于`width`，也就是说如果，width比minWidth还要小，那domEl的宽度就会取minWidth的值

### `config.minHeight` 
**（String | Number) 默认值：'0px'**  
`domEl`的最小高度。这个值可以是数字，也可以是字符串，但只支持'px'和'%'两种单位，没有单位则默认是'px'，例：10,'10','10px','20%'等等。
- 注意，`minHeight`的优先级高于`height`，也就是说如果，height比minHeight还要小，那domEl的高度就会取minHeight的值

### `config.maxWidth` 
**（String | Number) 默认值：undefined**  
`domEl`的最大宽度。这个值可以是数字，也可以是字符串，但只支持'px'和'%'两种单位，没有单位则默认是'px'，例：10,'10','10px','20%'等等。
- 注意，`maxWidth`的优先级高于`width`，也就是说如果，width比minWidth还要大，那domEl的宽度就会取maxWidth的值

### `config.maxHeight` 
**（String | Number） 默认值：undefined**  
`domEl`的最大高度。这个值可以是数字，也可以是字符串，但只支持'px'和'%'两种单位，没有单位则默认是'px'，例：10,'10','10px','20%'等等。
- 注意，`maxHeight`的优先级高于`height`，也就是说如果，height比maxHeight还要大，那domEl的高度就会取maxHeight的值

### `config.dragable`
**（Boolean）默认值 true**  
`domEl`是否可拖拽

### `config.dragOutable`
**（Boolean） 默认值 true**  
`domEl`是否可拖拽出父元素

### `config.resizeable` 
**（Boolean） 默认值 true**  
`domEl`是否可改变大小

### `config.helpAxis` 
**（Boolean） 默认值 true**  
`domEl`拖拽时是否显示辅助线。
- 注意：必须要在同一个父元素下有两个以上Accelerator实例绑定的子元素，才会显示出辅助线

### `config.adsort`   
**（Boolean） 默认值 true**  
`domEl`拖拽时是否自动吸附，当前拖拽元素离相同父元素下的任意其他 Accelerator实例绑定的子元素 距离小于5px时，会自动吸附上去。

### `config.axisColor`  
**（String） 默认值: #f557ff**
辅助线的颜色。

### `config.resizeClass` 
**（String）默认值 ：''**  
缩放控制柄的css class，可以用来自定义控制柄的大小，颜色，描边等样式。

### `config.dragHandler`
**（String | HTMLElement) 默认值 ：''**  
拖拽控制柄，可以传css或者id值，例如：'.abc','#abc',也可以直接传一个HTMLElement。

### `config.autoCount`
**（Boolean） 默认值 false**  
当实例化一个Accelerator类后，能够根据上一个实例的参数推断出下一个实例的位置大概在哪里：  
- 宽度和高度继承上一个实例的宽高
- 水平方向平铺过去，如果水平方向放不下了就换行  
![](https://cdn.jsdelivr.net/gh/Ostask/img-bed//2021020729.gif)

## 实例方法
### attr(attrName,attrValue)
更改属性值。建议更改属性都通过这个方法来更改，不然很容易出现dom元素不会重新渲染正确位置的bug
- attrName (String, Object) 必填
- attrValue (any)
1. attrName为String,attrValue为空时，返回值传入的 attrName 的属性值,例：
```js
const Ac = new accelerator(domEl,{x:'10%'})
console.log(Ac.attr('x')) //10%
```
2. attrName为String,attrValue不为空时，将 实例中该属性的属性值更新为 attrValue,例：
```js
const Ac = new accelerator(domEl,{x:'10%'})
Ac.attr('x','100px')
console.log(Ac.config.x) //100px
```
3. 如果attrName传入的是一个Object对象，就将这个对象的值更新到config上，例：
```js
const Ac = new accelerator(domEl,{x:'10%'})
Ac.attr({
    x:'20%',
    y:'20%'
})
console.log(Ac.config.x) //20%
console.log(Ac.config.y) //20%
```

### resize()
有时候父元素大小改变了，但是domEl的大小没有改变时，可以手动调用这个方法。

### select()
手动激活这个元素，但是同一时间内，有且只能有一个元素处于激活状态，想要多选目前要用选框（如果觉得不好用就留言我后面改）

### changeToPx(attrName) 
- attrName (String | Array) 可传入'x','y','width','height'或者它们组合的数组
初始化的时候传入的单位是'%'，但是后来不想让它们响应父元素大小，可以调用这个方法将单位转换为'px'
```js
const Ac = new accelerator(domEl,{x:'10%'}) //父元素大小为1000px
//Ac.changeToPx(['x','y'])
//Ac.changeToPx()
Ac.changeToPx('x')
console.log(Ac.config.x) //'100px'
```

### changeToPercent(attrName) 
- attrName (String | Array) 可传入'x','y','width','height'或者它们组合的数组
初始化的时候传入的单位是'px'，但是后来想让它们响应父元素大小，可以调用这个方法将单位转换为'%'
```js
const Ac = new accelerator(domEl,{x:'100px'}) //父元素大小为1000px
//Ac.changeToPercent(['x','y'])
//Ac.changeToPercent()
Ac.changeToPercent('x')
console.log(Ac.config.x) //'10%'
```

### destroy()
销毁实例

## Accelerator静态方法
### Accelerator.destroyAll()
销毁所有的Accelerator实例。

### Accelerator.setStaticConfig(config)
- config和`new Accelerator(domEl,config)`中的config一致
设置Accelerator的config的默认值

## 实例属性
### config
当前的配置参数，会根据拖拽和改变大小实时改变。

### id
当前实例具有一个唯一id,这个id不允许用户改变。

### domEl
实例绑定的dom元素

### parentEl
实例绑定的dom元素的父元素

### parentElWidth
父元素宽度

### parentElHeight
父元素高度

### x
当前实际的x值，即dom元素left值，和config.x不同，这个值是'px'单位的实际的left值。
例：
父元素宽度为1000px，config.x为10%，x为100px

### y
当前实际的y值，即dom元素top值，和config.y不同，这个值是'px'单位的实际的top值。

### width
当前实际的width值，即dom元素width值，和config.width不同，这个值是'px'单位的实际的width值。

### height = null //高度
当前实际的height值，即dom元素height值，和config.height不同，这个值是'px'单位的实际的height值。

### minWidth
配置的最小宽度

### minHeight
配置的最小高度

### maxWidth
配置的最大宽度

### maxHeight
配置的最大高度

### autoCount
是否自动计算下一个位置的值

### dragable
是否允许拖拽

### dragOutable
是否允许拖拽超出父元素

### resizeable 
是否允许改变大小

### helpAxis
是否显示辅助线

### adsort 
是否自动吸附

### axisColor
辅助线颜色

### resizeClass
控制柄css样式

### dragHandler
配置的拖拽控制柄

### xCenter 
domEl的中心点x值

### yCenter
domEl的中心点y值

### active
当前对象是否激活

## 一些关键的css样式
### ac_line
辅助线的css
### x_line
竖线辅助线（注意x是指x坐标为固定值，所以书竖线）
### x_line_0, x_line_1, x_line_2
第1,2,3条竖向辅助线
### y_line 
横线辅助线
### y_line_0, y_line_1, y_line_2
第1,2,3条横线辅助线   
### ac_resizing
正在调整大小中
### ac_dragging
正在拖动中
### ac_active
当前对象激活
### ac_select_box
多选的选框样式，可以使用这个class加上!important来覆盖默认的样式

## 事件
### destroyed
实例被销毁事件,带有一个事件对象e
```js
const Ac = new Accelerator(domEl)
Ac.on('destroyed',function(e) {
    console.log(e)
})
Ac.destroy()
```

### beforeDestroy
实例即将被销毁

### dragStart
开始拖拽

### dragMove
正在拖拽

### dragEnd
拖拽结束

### zoomStart
开始缩放大小

### zoomMove
正在缩放大小

### zoomEnd
缩放大小结束

### resize
父元素大小改变

### update
config被更新,拖拽和缩放同样会触发这个事件

### select
对象激活，和点击事件无异

## 在Vue中使用v-accelerator指令
首先先注册指令
```js
import { VueAccelerator } from 'acceleratorkunn'
Vue.use(VueAccelerator)
```
然后就会将`v-accelerator`注册成为全局指令。
```html
<div v-accelerator="config"></div>
```
其中config这个参数和实例化时传入的config是一样的，这个值可传也可以不传。在拖拽和缩放的时候，config的值会实时改变。

## 在Vue中使用accelerator组件
```html
<accelerator
    v-show="show"
    :x = 'x'
    :y = 'y'
    :width = 'width'
    :height = 'height'
    :minWidth = 'minWidth'
    :minHeight = 'minHeight'
    :maxWidth = 'maxWidth'
    :maxHeight = 'maxHeight'
    :autoCount = 'autoCount'
    :dragable = 'dragable'
    :dragOutable = 'dragOutable'
    :resizeable = 'resizeable'
    :helpAxis = 'helpAxis'
    :adsort = 'adsort'
    :axisColor = 'axisColor'
    :resizeClass = 'resizeClass'
    :dragHandler = 'dragHandler'
    @created = 'createdHandler'
    @update = 'updateHandler'
    @destroyed = 'destroyedHandler'
    @beforeDestroy = 'beforeDestroyHandler'
    @dragStart = 'dragStartHandler'
    @dragMove = 'dragMoveHandler'
    @dragEnd = 'dragEndHandler'
    @zoomStart = 'zoomStartHandler'
    @zoomMove = 'zoomMoveHandler'
    @zoomEnd = 'zoomEndHandler'
    @resize = 'resizeHandler'
    @select = 'selectHandler'
>
    <!-- 中间可以是别的任何元素-->
</accelerator>
```

## 结语
我开发这个插件的时候，把自己开发的过程记录在了博客里，看到这里的同学要是还有哪里不会的可以去看看，顺便帮我点个小星星呗~
<a href="http://knif.gitee.io/daodao-knowledge/pages/38a8d4/">一方通行开发记录</a>