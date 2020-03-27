let ruixin;
let rxTestAddCallback;
let rxTextConfigCallback;//初始化js框架
let rxUserInfoCallback;//初始化js框架
let rxFail;
let rxHideWebCallback;
import RuixinApi from '../assets/js/libs/RuixinOpenAPI.js'

ruixin =  new RuixinApi();

//初始化js框架  获取认证信息方法
export function getRxConfig (callback) {
    var params = { 
        "appId": "111", 
        "accessToken": "222", 
        "success": "config", 
        "fail": "config" 
    };
    rxTextConfigCallback = callback;
    ruixin.config(params);
}
window.config = function(msg){
    rxTextConfigCallback(msg);
}

//判断手机系统
export function getUserAgent(){
    let userAgentMsg = '';
    if(ruixin.isInAndroid()){//android
        userAgentMsg = 'android';
        return userAgentMsg;
    }
    if(ruixin.isInIOS()){//ios
        userAgentMsg = 'ios';
        return userAgentMsg;
    }
}

//获取当前用户Token
export function getRxUserInfo (callback, fail) {
    var params = { 
        "success": "getUserInfo", 
        "fail": "commonCallback" 
    };
    rxUserInfoCallback = callback;
    rxFail = fail;
    ruixin.getUserInfo(params);
}
window.getUserInfo = function(msg){
    rxUserInfoCallback(msg);
}
window.commonCallback= function(msg){
    rxFail(msg);
}

//隐藏页面标题
export function rxhideWebViewTitle (callback) {
    var params = { 
        "success": "hideWebViewTitle", 
    };
    rxHideWebCallback = callback;
    ruixin.hideWebViewTitle(params);
}
window.hideWebViewTitle = function(msg){
    rxHideWebCallback(JSON.stringify(msg));
}


    