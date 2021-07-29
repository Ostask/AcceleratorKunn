import Accelerator from "../accelerator"

const directive = {
    // 当被绑定的元素插入到 DOM 中时……
    inserted: function (el,binding) {
       el.ackun = new Accelerator(el,binding.value)
    },
    update: function(el,binding) {
        el.ackun.destroy()
        el.ackun = new Accelerator(el,binding.value)
    },
    unbind: function(el) {
        el.ackun.destroy()
    }
}

const vueAccelerator = {
    install:function(Vue){
        Vue.directive('accelerator',directive)
    }
}

export default vueAccelerator

