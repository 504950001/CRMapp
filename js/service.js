function postData(url, data, callback, waitingDialog) {  
    mui.ajax(url,{  
        data:'data='+JSON.stringify(data),  
        dataType:'json',  
        type:'post',  
        contentType:"application/x-www-form-urlencoded; charset=utf-8",  
        timeout:60000,  
        success:callback,  
        error:function(xhr,type,errorThrown){  
            waitingDialog.close();  
            mui.alert("<网络连接失败，请重新尝试一下>", "错误", "OK", null);  
        }  
    });  
}



//登录服务
//mui.web_query = function(func_url, params, onSuccess, onError, retry){
//  var onSuccess = arguments[2]?arguments[2]:function(){};
//  var onError = arguments[3]?arguments[3]:function(){};
//  var retry = arguments[4]?arguments[4]:3;
//  func_url = 'http://www.xxxxxx.com/ajax/?fn=' + func_url;
//  mui.ajax(func_url, {
//      data:params,
//      dataType:'json',
//      type:'post',
//      timeout:3000,
//      success:function(data){
//          if(data.err === 'ok'){
//              onSuccess(data);
//          }
//          else{
//              onError(data.code);
//          }
//      },
//      error:function(xhr,type,errorThrown){
//          retry--;
//          if(retry > 0) return mui.web_query(func_url, params, onSuccess, onError, retry);
//          onError('FAILED_NETWORK');
//      }
//  })
//};
//
//var onError = function(errcode){
//  switch(errcode){
//  case 'FAILED_NETWORK':
//      mui.toast('网络不佳');
//      break;
//  case 'INVALID_TOKEN':
//      wv_login.show();
//      break;
//  default:
//      console.log(errcode);
//  }
//};
//var params = {per:10, pageno:coms_current_pageno};
//mui.web_query('get_com_list', params, onSuccess, onError, 3);