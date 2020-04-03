var gettimes = (new Date()).valueOf();
var api = {
	
    /*host: "https://ydjwyf.zjjcy.gov.cn/api/", //正式地址
    pagelink:'https://ydjwyf.zjjcy.gov.cn:7091/jwlaws/',//app内嵌地址*/
    
    //host: "http://192.168.3.101:8091/api/",//测试	
   	// host:"http://192.168.4.95:9092/",//测试	  
    //  host:"http://api.dev.totalapp.cn:8880/api/",//测试	
     host:"http://pcapi.dev.totalapp.cn:8880/pcapi/api/",
   	// host:"http://api.dev.totalapp.cn:8880/api/",//测试	
    pagelink:'http://static.dev.totalapp.cn:8880/jwlaws/',//app内嵌地址/测试地址
    appkey:"6KScA4O5jLDlpWo7kpT3",//测试
	aval:"WrUAQap1baaUkxAAPPURIoBtI24mcPY7",//测试
	
	
	
	
    /*host: "https://api.zjjcy.gov.cn/api/", //正式地址
    pagelink:'https://static.zjjcy.gov.cn:8081/jwlaws/',//app内嵌地址
    appkey:"DYOOorwERPXCu1m5QkQd",//正式
	aval:native.appS(),//正式*/
   
   
    
    
    //host: "http://192.168.3.101:8091/api/",//测试	
    //host: "http://192.168.3.8:9099",//那金玉
    //host:"http://192.168.3.11:9091/",//袁峰
    //host:"http://192.168.3.10:9099/",//李玉鹏
    //host:"http://192.168.3.4:9099/",//王明明
    hostqinbin:"http://192.168.4.12:9092/",//覃斌
    
    //apikey:"?appKey=DYOOorwERPXCu1m5QkQd&timestamp="+gettimes+"&sign=1111111111&nonce="+gettimes,//key
    //apikey:"?appKey=6KScA4O5jLDlpWo7kpT3&timestamp="+gettimes+"&sign=1111111111&nonce="+gettimes,//key
    //apikey:"",//key
    
    
    getListForPage:"jwpublic/lawsRegulations/getListForPage",//列表
    getqueryDetail:"jwpublic/lawsRegulations/queryDetail",//详情
}

const ajax = function(host,urlapi, postData,method, self, callBack){
    axios.defaults.timeout = 20000;
    axios.request({
        headers: {
          
        	'Content-Type':'application/json',
        	'userCode':1234567123,
          'deviceNumber':'dev',
          // "Access-Control-Allow-Origin":"*"
        },
      // withCredentials: true, //允许跨域
      // credentials:'include',
    	changeOrigin:true,
        method:method,
        url: host + urlapi,
        data: postData, 
    }).then(function (response) {
      
        if (response.status == 200) {
          // console.log(getCookie('accessToken'))
          callBack(response.data, getkeyFun(postData))
        	//console.log('请求成功',response.data.success);
            //接口返回正常状态
            // if (response.data.success == true) {
            // }else{
            //     if (self) {
            //         alert(response.data.message); 
            //     }else{
            //         alert(response.data.message); 
            //     }
            // }
        } else {
        	alert('请求失败！');
        }
    }).catch(function (error) {
    	console.log(error)
    	alert('服务器内部错误！');
    });
    
    
}
function getCookie(name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== '') {
      let cookies = document.cookie.split(';');
      for (let i = 0; i < cookies.length; i++) {
          let cookie = cookies[i].trim();
          // 判断这个cookie的参数名是不是我们想要的
          if (cookie.substring(0, name.length + 1) === (name + '=')) {
              cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
              break;
          }
      }
  }
  return cookieValue;
}
function getkeyFun(postData){
  let arr = [];
	let obj = {};
	let newobj = {};
	let newheader='';
	
	let newdata={};
	let str='';
	let newkeys='';
	let apikeys="";
	
	let gettimes = (new Date()).valueOf();
	let numstr=randomWord(false, 30);
	
	let sign="appKey="+api.appkey+"&nonce="+numstr+"&timestamp="+gettimes;//key
    
    arr=sign.split("&");
	for(var i=0; i<arr.length; i++){
		obj[arr[i].split("=")[0]] = decodeURIComponent(arr[i].split("=")[1]);
	}
	Object.keys(obj).sort().map(key => {
	  newobj[key]=obj[key]
	})
    newheader=JSON.stringify(newobj).substring(1,JSON.stringify(newobj).length-1).replace(/,/g,'&').replace(/"/g,'').replace(/:/g,'=')
	if(JSON.stringify(postData) != "{}"){
		Object.keys(postData).sort().map(key => {
		  newdata[key]=postData[key]
		})
		str=JSON.stringify(newdata).substring(1,JSON.stringify(newdata).length-1).replace(/,/g,'&').replace(/"/g,'').replace(/:/g,'=')
		newkeys=newheader+str+api.aval;
	}else{
		newkeys=newheader+api.aval;
  } 
  apikeys="?appKey="+api.appkey+"&nonce="+numstr+"&timestamp="+gettimes+"&sign="+md5(newkeys); 

  return apikeys;
}


function randomWord(randomFlag, min, max){
  var str = "",
    range = min,
    arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
  // 随机产生
  if(randomFlag){
    range = Math.round(Math.random() * (max-min)) + min;
  }
  for(var i=0; i<range; i++){
    pos = Math.round(Math.random() * (arr.length-1));
    str += arr[pos];
  }
  return str;
}
