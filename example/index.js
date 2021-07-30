import { Accelerator } from "../src/index.js"

window.onload = () => {
    const domEl = document.querySelector('#addDom')
    let ac 
    let flag = true
    document.querySelector('#add').onclick = () => {
        ac && ac.destroy()
        ac = new Accelerator(domEl,{
            width:'20%',
            height:'20%'
        })
        ac.attr({
            x:'10%',
            y:'10%'
        })
    }
    document.querySelector('#set').onclick = () => {
        console.log('click')
        flag = !flag
        ac.attr('x','70%')
    }
    document.querySelector('#clear').onclick = () => {
        ac.destroy()
    }
}