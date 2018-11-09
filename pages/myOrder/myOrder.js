import util from '/utils/util'
import urls from '/utils/urls'
import network from '/utils/network'
let pageNo=1;
let list=[];
let hasmore=true;
let state=1;
const limit=5;
Page({
  data: {
    loaded:false,
    err:false,
    hasmore:true,
    currentIndex:0,
    cancel:false,
    cancelOrderReason:['想要重新下单','商品价格较贵','等待时机较长','是想了解下单流程','不想要了'], 
    reasonIdx:0,
    opid:"",//正在操作的orderId
    list:[],
    state:1,
    showNav:false
      },
  onLoad() {
    
    console.log(566)
    hasmore=true;
    pageNo=1;
    state=1;
    list=[];
      this.getcode()
    // this.orderList()
     //console.log(hasmore)

  },
  onShow(){
  console.log('2333')
    if(this.data.showNav==true){
      hasmore=true;
      pageNo=1;
      list=[];
      this.getcode()
    }
      
  },
    getcode(){
       my.showLoading({
     content: '加载中...',
     delay: 0,
   });
         const that=this;
        my.getAuthCode({  
      scopes: 'auth_user', 
      success: (res) => { 
       this.getAlipayUserInfo(res.authCode);
         },
         fail:()=>{
           my.hideLoading()
            this.setData({
            err:false
           })
         }
          });

  },
    getAlipayUserInfo(code){
      console.log(code+'答应了')
    const that=this
     const myparams =new Object();
   myparams.code=code;
  network.post({
     url: urls.getAlipayUserInfo,
     params: myparams,
     success: (data) => {
       console.log('11+')
       this.orderList()
  },
  fail:()=>{
    console.log('12+')
     my.hideLoading()
    this.setData({
      err:false
    })
  }
  })
  },
  orderList(){
    console.log(pageNo)
    const that=this
     const myparams1 =new Object();
     myparams1.currentPage=pageNo;
     myparams1.queryStatus=state;
      myparams1.limit=limit
      console.log(JSON.stringify(myparams1))
     if(hasmore){
       hasmore=false;
  network.post({
     url: urls.orderList,
     params: myparams1,
     success: (data) => {
       console.log('2+')
       console.log(pageNo)
//console.log(data.result)
       const newList=data.result||[];
           if(newList.length>0){
          that.setData({
              showNav:true
            })
          }
//console.log(newList)
if(newList.length==limit){
  hasmore=true;
}
  for (var i = 0; i <newList.length; i++) {
          list.push(newList[i])
        }
       // console.log(list)
      that.setData({
        imgsrc:data.imgSrc,
        list:list,
        loaded:true,
        err:false
      })
      console.log(that.data.list==false)
      console.log([]==false)
      pageNo++;
      my.hideLoading();
      },
      fail: () => {
        console.log('3+')
    this.setData({
         loaded:true,
         err:true,
      })
      my.hideLoading();
      },
  })
     }

  },
  backToIndex(){
     my.switchTab({
     url:'../linlei/linlei'
   })
  },
getList(e){//点击顶部
 my.showLoading({
   });
  this.setData({
    currentIndex:e.target.dataset.idx,
    state:e.target.dataset.state
  })
  if(state==e.target.dataset.state){
    //console.log('hhah');
    my.hideLoading();
    return;
  }
  state=e.target.dataset.state;
  list=[];
  hasmore=true; 
  pageNo=1;
  this.orderList();
  
},


redo(){//系统异常，重试
    my.showLoading({
     content: '加载中...',
     delay: 0,
   });
      console.log(1)
    hasmore=true;
    pageNo=1;
    state=1;
    list=[];
      this.getcode()
   
 /* network.post({
     url: urls.orderList,
     params: myparams1,
     success: (data) => {
         my.stopPullDownRefresh()
      this.setData({
        imgsrc:data.imgSrc,
        list:data.result,
        loaded:true,
        err:false
      })
      my.hideLoading();
      },
      fail: () => {
          my.stopPullDownRefresh()
      
    this.setData({
         loaded:true,
         err:true,
      })
      my.hideLoading();
     
      },
  })*/
},
toOrderDeteil(e){
 // console.log(e.target.dataset.orderId);
  my.navigateTo({
    url:"../orderDetail/orderDetail?orderId="+e.target.dataset.orderId
  });

},
onReachBottom(){
  this.orderList()
},
cancelOrder(e){
  this.setData({
    cancel:true,
    opid:e.target.dataset.orderId
  })
  //console.log(this.data.opid)
  
},
cancelcancel(){
  this.setData({
    cancel:false
  })
},
confirmcancel(e){
  my.showLoading({
  });
   const myparams =new Object();
   myparams.orderId=this.data.opid;
   myparams.orderMark=this.data.cancelOrderReason[this.data.reasonIdx];
   //console.log(myparams)
   
  network.post({
     url: urls.cancelOrder,
     params: myparams,
     success: (data) => {
         list=[];
  hasmore=true; 
  pageNo=1;
  this.setData({
    cancel:false
  })
  
  this.orderList();

       
  },
  fail: ()=>{

  }
  })

},
selectReason(e){
  this.setData({
    reasonIdx:e.target.dataset.index
  })
},
confirmCollect(){
  const that=this;
    my.showLoading({
  });
   const myparams =new Object();
  // console.log(that.data.orderId)
   myparams.orderId=that.data.orderId;
   console.log(myparams)
   
  network.post({
     url: urls.collectGoods,
     params: myparams,
     success: (data) => {
      // console.log(data)
      my.hideLoading();
              list=[];
          hasmore=true; 
         pageNo=1;
      that.orderList(that.data.orderId)
      that.setData({
         collectBox:false,
      })
  //that.orderList();  
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
collectGood(e){//确认收货
this.setData({
  collectBox:true,
  orderId:e.target.dataset.orderId
})},
toObtain(e){
  my.navigateTo({
    url:"../logistics/logistics?orderId="+e.target.dataset.orderId
  })
},
  toBill(e){

        my.navigateTo({
          url:"../bill/bill?orderId="+e.target.dataset.orderId
        });
      },
        back(e){
    my.navigateTo({
     url:"../back/back?orderno="+e.target.dataset.orderNo+"&guige="
     +e.target.dataset.guige+"&goodsName="+e.target.dataset.name+"&imgSrc="+e.target.dataset.src+"&thumbImg="+e.target.dataset.img
    })
  },
  call(){
     my.makePhoneCall({ number: '400-862-5151' });
  }
});
