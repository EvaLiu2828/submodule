//判断设备类型
export function devicePlatform (){
    let u = navigator.userAgent;
    let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
    let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
    return isAndroid?'android':isiOS?'ios':'';
}

//判断iphone类型 普通iphone和iphoneX有UI显示区别
export function deviceModal (){
    return /iphone/gi.test(navigator.userAgent) && (screen.height == 812 && screen.width == 375)
}