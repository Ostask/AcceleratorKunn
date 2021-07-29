import { Accelerator } from "../src/index.js"

window.onload = () => {
    Accelerator.setStaticConfig({
        x:'0%',
        y:'4%',
        width:'20%',
        height:'30%'
    })
    document.querySelector('#add').onclick = () => {
        const dom = document.createElement('div')
        dom.style.background = '#ff0000'
        dom.classList = 'addDom'
        document.body.appendChild(dom)
        const a = new Accelerator(dom,{
            autoCount: true
        })
        dom.onclick = function() {
            a.destroy()
        }
    }
    document.querySelector('#clear').onclick = () => {
        let list = document.getElementsByClassName('addDom')
        console.log(list)
        // for(let i = 0;i < list.length; i++){
        //     var parent = list[i].parentElement;
        //     parent.removeChild(list[i]);
        //     i--
        // }
        Accelerator.destroyAll()
    }
}