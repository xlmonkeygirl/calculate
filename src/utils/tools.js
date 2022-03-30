const debounce = (func, wait = 50) => {
    let timer = 0
    return function(...args) {
        if (timer) clearTimeout(timer)
        timer = setTimeout(() => {
            func.apply(this, args)
        }, wait)
    }
}

const throttle = (func, wait = 50) => {
    let lastTime = 0
    return function(...args) {
        let now = +new Date()
        if (now - lastTime > wait) {
            lastTime = now
            func.apply(this, args)
        }
    }
}

const fmoney = (s, n) => {
    n = n > 0 && n <= 20 ? n : 2;
    s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";
    let l = s.split(".")[0].split("").reverse(),
        r = s.split(".")[1],
        t = "";
    for (let i = 0; i < l.length; i++) {
        t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");
    }
    return t.split("").reverse().join("") + "." + r;
}

export {
    debounce,
    throttle,
    fmoney
}