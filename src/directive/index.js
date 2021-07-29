import Accelerator from "../accelerator"

const directive = {
    // 当被绑定的元素插入到 DOM 中时……
    bind: function (el,binding) {
       el.ackun = new Accelerator(el,binding)
    }
}

const vueAccelerator = {
    install:function(Vue){
        Vue.directive('accelerator',directive)
    }
}

export default vueAccelerator

