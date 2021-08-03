/**
 * 
 * @param {*String} str 要提取数据的字符串比如 ‘10px’,'20%' ,目前只支持这两种单位
 * @returns 
 */
export function getNumAndUnit(str) {
    let reg = /([0-9]+\.*[0-9]*)\s*([a-zA-z%]*)/ig
    let res = reg.exec(str)
    if(res) {
        return {
            num: parseFloat(res[1]) || 0,
            unit: (res[2]!=='px' && res[2]!=='%') ? 'px' : res[2]
        }
    }else{
        return {
            num: 0,
            unit: 'px'
        }
    }
}

export function getWindowSize() {
    return {
        width: document.body.clientWidth,
        height: document.body.clientHeight      
    }
}

/**
 * 
 * @param {*} str 需要转换的 数值字符串 '10%','20%'
 * @param {*} refer 百分比时参考的100%长度
 * @returns  返回转换成px的数值,以及初始的单位
 */
export function unify(str = '', refer = getWindowSize().width) {
    if(!str) {
        return {
            num: 0,
            originUnit: 'px'
        } 
    }
    let numObj = getNumAndUnit(str)
    if(numObj.unit === 'px') {
        return {
            num: numObj.num,
            originUnit: numObj.unit
        }
    }else if(numObj.unit === '%'){
        return {
            num: numObj.num * parseFloat(refer) / 100,
            originUnit: numObj.unit
        }
    }
}

export function getSizeText(num, unit ,refer = getWindowSize().width) {
    if(unit === 'px') {
        return num + unit
    }else if(unit === '%'){
        return (parseFloat(num) * 100 / parseFloat(refer)) + unit
    }
}

export function getElWidth(domEl) {
    return domEl.offsetWidth
}

export function getElHeight(domEl) {
    return domEl.offsetHeight
}

export function getElX(domEl) {
    const cssStyle = getComputedStyle(domEl)
    let isAbsolute = cssStyle.position === 'absolute'
    if(isAbsolute) {
        let left = cssStyle.left
        return left
    }else{
        return ''
    }
}

export function getElY(domEl) {
    const cssStyle = getComputedStyle(domEl)
    let isAbsolute = cssStyle.position === 'absolute'
    if(isAbsolute) {
        let top = cssStyle.top
        return top
    }else{
        return ''
    }
}

export function addPrefix(cssText){
    const text = cssText[cssText.length - 1] === ';' ? cssText : cssText + ';'

    const ms = '-ms-' + text
    const moz = '-moz-' + text
    const webkit = '-webkit-' + text
    const o = '-o-' + text

    return ms + moz + webkit + o + text
}

export function prevent(e) {
    e.stopPropagation();
    e.preventDefault();
}
