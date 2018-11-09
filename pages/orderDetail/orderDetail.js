import util from '/utils/util'
import urls from '/utils/urls'
import network from '/utils/network'
 var orderId;
Page({
  data: {
        cancelOrderReason:['想要重新下单','商品价格较贵','等待时机较长','是想了解下单流程','不想要了'],
        reasonIdx:0,
        collectBox:false,
        orderId:"",
        loaded:false,
        yiwai:false,
        info:{}
        },
  onLoad(option) {
    const orderId=option.orderId||false;
    const orderno=option.orderno||false;
    this.getOrderDetail(orderId,orderno)
  },
  onShow(){
   console.log(this.data.info.orderNo)
   console.log(11)

  // this.getOrderDetail(this.data.info.orderNo)
  if(this.data.info.orderNo==true){
  this.getOrderDetail(this.data.info.orderNo)
  }
  //
  },
  getOrderDetail(orderId,orderno){
    my.showLoading({
    
    });
        const myparams =new Object();
        if(!!orderId){
          myparams.orderId=orderId;
        }
        if(!!orderno){
           myparams.orderNo=orderno;
        }
       
  network.post({
     url: urls.orderDetail,
     params: myparams,
     success: (data) => {
       my.hideLoading();
       console.log(data)
        console.log(data.result)
       
      this.setData({
        info:data.result,
        imgSrc:data.imgSrc,
        loaded:true,
      })
      my.hideLoading()
      },
      fail: () => {
      
    this.setData({
      
      })
     
     
      },
     
  })

  },
   toBill(e){
     console.log(orderId)
        my.navigateTo({
          url:"../bill/bill?orderId="+e.target.dataset.orderId
        });
      },
        closeBox(){
    this.setData({
      mianmi:false,
      zijin:false,
      qianshou:false,
      yiwai:false
    })
  },
  mianmi(){
    this.setData({
      mianmi:true
    })   
  },
   zijin(){
    this.setData({
      zijin:true
    })
   },
   cancelOrder(e){
  this.setData({
    cancel:true,
    opid:e.target.dataset.orderId
  })
  console.log(this.data.opid)
  
},
cancelcancel(){
  this.setData({
    cancel:false
  })
},
selectReason(e){
  this.setData({
    reasonIdx:e.target.dataset.index
  })
},
collectGood(e){//确认收货
this.setData({
  collectBox:true,
  orderId:e.target.dataset.orderId
})
console.log(this.data.orderId)

},
confirmCollect(){
  const that=this;
    my.showLoading({
  });
   const myparams =new Object();
   myparams.orderId=that.data.info.orderId;
   console.log(myparams)

  network.post({
     url: urls.collectGoods,
     params: myparams,
     success: (data) => {
       console.log(data)
      that.getOrderDetail(that.data.info.orderId)
      that.setData({
         collectBox:false,
      })
      my.hideLoading();
    // this.getOrderDetail(this.data.opid) 
  },
   fail:(data)=>{

   }
 
  })

},
cancelCollect(){
  this.setData({
     collectBox:false,
  })
},
confirmcancel(e){
  my.showLoading({
  });
   const myparams =new Object();
   myparams.orderId=this.data.opid;
   myparams.orderMark=this.data.cancelOrderReason[this.data.reasonIdx];
   console.log(myparams)
   
  network.post({
     url: urls.cancelOrder,
     params: myparams,
     success: (data) => {
     my.hideLoading();
     this.setData({
       cancel:false
     })
     this.getOrderDetail(this.data.opid)

       
  },
  fail:()=>{

  }
  })

},
toObtain(e){
  my.navigateTo({
    url:"../logistics/logistics?orderId="+e.target.dataset.orderId
  })
},
  qianshou(){
    this.setData({
      qinashou:true
    })
  },
    qianshou(){
      console.log(1111111)
    this.setData({
      qianshou:true
    })
  },
  call(){
     my.makePhoneCall({ number: '400-862-5151' });
  },
  back(){
    my.navigateTo({
     url:"../back/back?orderno="+this.data.info.orderNo+"&guige="
     +this.data.info.specifications+"&goodsName="+this.data.info.goodsName+"&imgSrc="+this.data.imgSrc+"&thumbImg="+this.data.info.thumbImg
    })
  },
  see(){
    my.navigateTo({
      url:"../agreement/agreement?info="+JSON.stringify(this.data.info)
    });
  },
  yiwai(){
    this.setData({
      yiwai:true
    })
  },
  collectGood(e){//确认收货
  this.setData({
  collectBox:true,
})},
});
