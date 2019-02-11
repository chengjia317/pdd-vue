import axios from 'axios'

// 封装get post请求
export default function ajax(url='',params={},type='GET'){
  // 定义 promise对象
  let promise;
  return new Promise((resolve,reject)=>{
    // 请求方式
    if(type==='GET'){
      // 拼接字符串
      let  paramsStr=''
      Object.keys(params).forEach(key=>{
        paramsStr+=key+'='+params[key]+'&'
      })
      if(paramsStr!==''){
        paramsStr=paramsStr.substr(0,paramsStr.lastIndexOf('&'))
      }
      //完整路径
      url+='?'+paramsStr
      // 发起get请求
      promise=axios.get(url)
    }else if(type==='POST'){
      promise=axios.post(url,params)
    }
    // 返回结果
    promise.then((response)=>{
      resolve(response.data)
    }).catch(error=>{
      reject(error)
    })
  })
}















