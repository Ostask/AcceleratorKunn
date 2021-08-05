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

const component = {
    render: function(createElement) {
        return createElement(
            'div',
            {
                ref:'acceleratorRef'
            },
            this.$slots.default
        )
    },
    props:{
        width:{
            type:[String,Number],
            default:'200px'
        },
        height:{
            type:[String,Number],
            default:'200px'
        },
        x:[String,Number],
        y:[String,Number],
        autoCount:Boolean,
        dragable:Boolean,
        dragOutable:Boolean,
        resizeable:Boolean,
        helpAxis:Boolean,
        adsort:Boolean
    },
    data() {
        return {
            Ac:null
        }
    },
    mounted() {
        const config = {
            
        }
        if(this.width) {
            config.width = this.width
        }
        if(this.height) {
            config.height = this.height
        }
        if(this.x) {
            config.x = this.x
        }
        if(this.y) {
            config.y = this.y
        }
        if(this.autoCount || this.autoCount === false) {
            config.autoCount = this.autoCount
        }
        if(this.dragable || this.dragable === false) {
            config.dragable = this.dragable
        }
        if(this.dragOutable || this.dragOutable === false) {
            config.dragOutable = this.dragOutable
        }
        if(this.resizeable || this.resizeable === false) {
            config.resizeable = this.resizeable
        }
        if(this.helpAxis || this.helpAxis === false) {
            config.helpAxis = this.helpAxis
        }
        if(this.adsort || this.adsort === false) {
            config.adsort = this.adsort
        }

        console.log('config',config)
        this.Ac = new Accelerator(this.$refs.acceleratorRef,config)

        this.Ac.on('destroyed',(e) => {
            this.$emit('destroyed',e)
        })
        this.Ac.on('beforeDestroy',(e) => {
            this.$emit('beforeDestroy',e)
        })
        this.Ac.on('dragStart',(e) => {
            this.$emit('dragStart',e)
        })
        this.Ac.on('dragMove',(e) => {
            this.$emit('dragMove',e)
        })
        this.Ac.on('dragEnd',(e) => {
            this.$emit('dragEnd',e)
        })
        this.Ac.on('zoomStart',(e) => {
            this.$emit('zoomStart',e)
        })
        this.Ac.on('zoomMove',(e) => {
            this.$emit('zoomMove',e)
        })
        this.Ac.on('zoomEnd',(e) => {
            this.$emit('zoomEnd',e)
        })
        this.Ac.on('resize',(e) => {
            this.$emit('seresizelect',e)
        })
        this.Ac.on('update',(e) => {
            this.$emit('update',e)
        })
        this.Ac.on('select',(e) => {
            this.$emit('select',e)
        })
    },
    watch: {
        width(newVal,oldVal){
            if(newVal !== oldVal) {
                this.Ac.attr('width',newVal)
            }
        },
        height(newVal,oldVal){
            if(newVal !== oldVal) {
                this.Ac.attr('height',newVal)
            }
        },
        x(newVal,oldVal){
            if(newVal !== oldVal) {
                this.Ac.attr('x',newVal)
            }
        },
        y(newVal,oldVal){
            if(newVal !== oldVal) {
                this.Ac.attr('y',newVal)
            }
        },
        autoCount(newVal,oldVal){
            if(newVal !== oldVal) {
                this.Ac.attr('autoCount',newVal)
            }
        },
        dragable(newVal,oldVal){
            if(newVal !== oldVal) {
                this.Ac.attr('dragable',newVal)
            }
        },
        dragOutable(newVal,oldVal){
            if(newVal !== oldVal) {
                this.Ac.attr('dragOutable',newVal)
            }
        },
        resizeable(newVal,oldVal){
            if(newVal !== oldVal) {
                this.Ac.attr('resizeable',newVal)
            }
        },
        helpAxis(newVal,oldVal){
            if(newVal !== oldVal) {
                this.Ac.attr('helpAxis',newVal)
            }
        },
        adsort(newVal,oldVal){
            if(newVal !== oldVal) {
                this.Ac.attr('adsort',newVal)
            }
        }
    },
    beforDestroy(){
        this.Ac.destroy()
    }
}

const vueAccelerator = {
    install:function(Vue){
        Vue.directive('accelerator',directive)
        Vue.component('accelerator',component)
    }
}

export default vueAccelerator

