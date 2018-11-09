import hex_md5 from './md5'
// GET请求
function GET(_requestHandler) {
  request('GET', _requestHandler);
}
// POST请求
function POST(_requestHandler) {
  request('POST', _requestHandler);
}

function request(_method, _requestHandler) {
   _requestHandler.params.channel = 1;
    _requestHandler.params.os = 'zfbMiniProgram';
     _requestHandler.params.v = '1.0';
     var newObj=Object.assign({},_requestHandler.params,GetRequest(_requestHandler.url))
     let sortObj=objKeySort(newObj);  
     const index=_requestHandler.url.indexOf("?");
    let url=_requestHandler.url.substring(0,_requestHandler.url.lastIndexOf("?")); 
     console.log(url)
      var sortString=''
    for ( var k in sortObj){
       sortString+=sortString.length==0?k+'='+sortObj[k]:'&'+k+'='+sortObj[k]
      url+=url.indexOf('?')==-1?'?'+k+'='+sortObj[k]:'&'+k+'='+sortObj[k]
    } 
    sortString+='&key='+'8a2af6465a6b2417015a6b3608be0003'
     url+='&sign='+hex_md5(sortString).toUpperCase( )
    
  my.httpRequest({
    url:url,
    method: _method, // OPTIONS, GET, HEAD, POST
    // header: {}, // 设置请求的 header
    success: (res) => {
      if(res.data.success){
        console.log(res)
         _requestHandler.success(res.data);
         return;
      }
      if(!res.data.success){
        console.log(res.data.msg)
          _requestHandler.fail(res.data);
      }
    },
    fail: (err) => {
      console.log(err)
      _requestHandler.fail(err);
    },
    complete: () => {
      // complete
    },
  });
}
function objKeySort(obj) {//排序的函数
    var newkey = Object.keys(obj).sort();
　　//先用Object内置类的keys方法获取要排序对象的属性名，再利用Array原型上的sort方法对获取的属性名进行排序，newkey是一个数组
    var newObj = {};//创建一个新的对象，用于存放排好序的键值对
    for (var i = 0; i < newkey.length; i++) {//遍历newkey数组
        newObj[newkey[i]] = obj[newkey[i]];//向新创建的对象中按照排好的顺序依次增加键值对
    }
    return newObj;//返回排好序的新对象
}
function GetRequest(url) { //提取接口参数
 const index=url.indexOf("?");
 url=url.substring(index,url.length);
 console.log(url)
var theRequest = new Object(); 
if (url.indexOf("?") != -1) { 
var str = url.substr(1); 
var strs = str.split("&"); 
for(var i = 0; i < strs.length; i ++) { 
theRequest[strs[i].split("=")[0]]=unescape(strs[i].split("=")[1]); 
} 
} 
return theRequest; 
} 


module.exports = {
  get: GET,
  post: POST,
};
