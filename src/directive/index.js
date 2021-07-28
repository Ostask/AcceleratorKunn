import Accelerator from "../accelerator"

export default {
    // 当被绑定的元素插入到 DOM 中时……
    bind: function (el,binding) {
       el.ackun = new Accelerator(el,binding)
    }
}