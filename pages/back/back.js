import util from '/utils/util'
import urls from '/utils/urls'
import network from '/utils/network'
//var idx;
Page({
  data: {
    pvShow:false,
    arr1:["上门取件","快递"],//归还方式数组
    idx:0//归还方式的index值
  },
  onLoad(option) {
    this.setData({
      info:option
    })
    console.log(this.data.info)

  },
  onShow(){
    const that=this;
    my.getStorage({
  key: 'address',
  success: function(res) {
   that.setData({
     address:res.data
   })
   //console.log(res.data)
   //console.log('hahahh')
  },
  fail: function(res){
    return;
  }
});
  },
  onChange(e) {
    //console.log(e.detail.value[0]);
    idx=e.detail.value[0]
  },
  showPv:function(){
    //console.log(1)
    this.setData({
      pvShow:true,
    })
  },
  hidePv:function(){
    this.setData({
      pvShow:false,
    })
  },
  selectArea(){
    my.navigateTo({
      url:"../selectArea/selectArea"
    });
  },
  ok(){
    this.setData({
      idx
    })
    this.hidePv()
    
  },
  formSubmit(e){
    //console.log(111)
     //console.log('form发生了submit事件，携带数据为：', e.detail.value)
     if( e.detail.value.expressCompany==''){
my.showToast({
  type: 'none',
  content: '请输入物流公司',
  duration: 3000,
});
return ;
     }
      if( e.detail.value.expressNo==''){
my.showToast({
  type: 'none',
  content: '请输入物流公司',
  duration: 3000,
});
return;
     }
     this.setData({
       obj:e.detail.value,
       backBox:true
     })
      
  },
  cancelBack(){
     this.setData({
       backBox:false
     })
  },
  confirmBack(){
    console.log(urls.back)
    
    my.showLoading({
      content:"正在申请还机"
    });
        const that=this
     const myparams =that.data.obj;
      myparams.orderNo=that.data.info.orderno;
      myparams.returnType="express";
      myparams.returnAddress="深圳市福田区泰然九路海松大厦b座901"
  network.post({
     url: urls.back,
     params: myparams,
     success: (data) => {
       this.setData({
         backBox:false
       })
      my.hideLoading();
      my.showToast({
        content:"申请还机成功，为你跳转订单详情页",
        complete:()=>{
 my.navigateBack({
        
      });
        }
      })
     
  },
  fail:()=>{
    my.hideLoading();
    my.alert({
  title: '',
  content: '出现错误，请稍后重试或联系客服人员',
  buttonText: '我知道了',
});

  }
  })

  }
});
