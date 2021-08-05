import Accelerator from "../accelerator"

const directive ={
    // 当被绑定的元素插入到 DOM 中时……
    inserted: function (el,binding,vnode) {
       el.ackun = new Accelerator(el,binding.value)
       el.ackun.on('dragMove',(e) => {
        vnode.context[binding.expression] = e.target.config; 
       })
       el.ackun.on('zoomMove',(e) => {
        vnode.context[binding.expression] = e.target.config; 
       })
    },
    update: function(el,binding) {
        el.ackun.attr(binding.value)
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

