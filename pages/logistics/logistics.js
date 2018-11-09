import util from '/utils/util'
import urls from '/utils/urls'
import network from '/utils/network'
Page({
  data: {
     item: {
      index: 0,
      msg: 'this is a template',
      time: '2016-09-15',
      err:false,
      list:[],
      loaded:false
    }
  },
  onLoad(option) {
    this.getInfo(option.orderId)

  },
  getInfo(orderId){
      const myparams =new Object();
      myparams.orderId=orderId
  network.post({
     url: urls.obtainExpressInfo,
     params: myparams,
     success: (data) => {
       console.log(data.result)
       let list=data.result||[];
       for(var i=0;i<list.length;i++){
         list[i].time=list[i].time.split(" ")
       }
       this.setData({
         list,
         err:false,
         loaded:true
       })
  //that.orderList();  
  },
   fail:(data)=>{
      this.setData({
         err:false
       })

   }
 
  })
  },
  copy(){
    my.setClipboard({
      text:this.data.list[0].orderNo,
      success:()=>{
        my.showToast({
          content:"复制成功",
           duration:2000,
        });
      }
    })
  }
});
