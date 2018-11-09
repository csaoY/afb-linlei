import util from '/utils/util'
import urls from '/utils/urls'
import network from '/utils/network'
Page({
  data: {
    agreen:false,//是否同意用户协议
    tipsShow:false,
    mianmi:false,//显示免密弹窗
    zijin:false,//显示资金弹窗
    yiwai:false
  },
  onLoad(option) {
    this.getinfo(option.outOrderNo,option.zmOrderNo);
    this.setData({
      logoImg:option.logoImg,
      outOrderNo:option.outOrderNo,
      orderNo:option.zmOrderNo,
      name:option.name,//
      amount:option.amount,//分期租金金额
      count:option.count,//商品数量
      deposit:option.deposit,//总押金
      installmentCount:option.installmentCount,//分期数
      rentAmount:option.rentAmount,
      selectedgoodstr:option.selectedgoodstr,
      installmentDate:option.installmentDate//租期   
    })
  },
  submitOrder(){
    const that=this
    if(!this.data.agreen){
      this.setData({
        tipsShow:true
      })
      setTimeout(function(){
        that.setData({
          tipsShow:false
        })
      },3000)
      return;
    }
   my.showLoading({
  content: '加载中...',
   });
   console.log((that.data.orderNo))
    my.zmRentTransition({      
      creditRentType:"signPay",/*信用租固定 */
      outOrderNo:that.data.outOrderNo,/** 外部订单号*/
      zmOrderNo:that.data.orderNo,/** 芝麻订单号*/
      success: (res) => {
        
      console.log(urls.zhima)
     const myparams =new Object();
       myparams.orderNo=that.data.outOrderNo
       network.post({
     url: urls.zhima,
     params: myparams,
     success:(data)=>{
          my.hideLoading();
           my.navigateTo({
                // 跳转订单下单结果页
               url: '../successOrder/successOrder?zmOrderNo='+that.data.orderNo+'&outOrderNo='+that.data.outOrderNo
               +'&amount='+that.data.amount+'&installmentDate='+that.data.installmentDate+'&deposit='+that.data.deposit
               +'&credit_amount='+that.data.info.credit_amount
            })
     },
     fail(err){
       console.log(111)
          my.hideLoading();
 my.navigateTo({
                   // 跳转订单下单结果页
                  url: '../failOrder/failOrder?text=出错了，请重试'
               }) 
     }
     })
  /*   if(res.order_status=="SUCCESS"&&res.error_code=="SUCCESS"){
       my.hideLoading();
            my.navigateTo({
                // 跳转订单下单结果页
               url: '../successOrder/successOrder?zmOrderNo='+that.data.orderNo+'&outOrderNo='+that.data.outOrderNo
               +'&amount='+that.data.amount+'&installmentDate='+that.data.installmentDate+'&deposit='+that.data.deposit
               +'&credit_amount='+that.data.info.credit_amount
            })
     }else{ 
       console.log('哈哈哈哈哈哈')
       console.log(res)
         my.hideLoading();
        //my.alert({ title: 'fail: ' + JSON.stringify(res)});
         my.navigateTo({
                   // 跳转订单下单结果页
                  url: '../failOrder/failOrder?text=出错了请重试'
               }) 
     }*/
      },
      fail: (res) => {
       console.log(1233)
        
         my.hideLoading();
         console.log(111)
        console.log(res);
        //my.alert({ title: 'fail: ' + JSON.stringify(res)});
         my.navigateTo({
                   // 跳转订单下单结果页
                  url: '../failOrder/failOrder?text=出错了请重试'
               }) 
       }
     });
  },
  agreen(){
    this.setData({
      agreen:!this.data.agreen
    })
    //console.log(this.data.agreen)
  },
  getinfo(orderNo,aliOrderNo){//获取地址，免押金额等信息 
  const that=this
     const myparams =new Object();
     myparams.orderNo=orderNo;
     myparams.aliOrderNo=aliOrderNo;
       network.post({
     url: urls.determineOrder,
     params: myparams,
     success: (data) => {
       //console.log(data)
       console.log('hahah')
      that.setData({
        info:data.result,
      })
      //console.log(typeof(data.result.credit_amount*1))
      //console.log(''*1)
      //console.log(data.result.credit_amount)
      if(data.result.credit_amount){
        that.setData({
          state:true//免押金额不为0，状态为免押
        })
      }
      if(!data.result.credit_amount){
        that.setData({
          state:false//状态为不免押
        })
      }
  },
  fail:(err)=>{
  my.alert({
         title:"失败了"
       });
        }
      })
     },
  pay(orderNo){//下单成功以后请求接口//已废弃接口
  console.log('哎')
    const that=this
     const myparams =new Object();
     myparams.orderNo=orderNo;
       network.post({
     url: urls.pay,
     params: myparams,
     success: (data) => {
        my.hideLoading();
        my.navigateTo({
                // 跳转订单下单结果页
               url: '../successOrder/successOrder?zmOrderNo='+that.data.orderNo+'&outOrderNo='+that.data.outOrderNo
               +'&amount='+that.data.amount+'&installmentDate='+that.data.installmentDate+'&deposit='+that.data.deposit
               +'&credit_amount='+that.data.info.credit_amount
            })
       },
       
        fail:(err)=>{
           my.hideLoading();
          console.log(err+'哈哈哈哈')
           my.navigateTo({
                   // 跳转订单下单结果页
                  url: '../failOrder/failOrder?text=出错了，请重试'
               }) 
          }
       })

  },
  closeBox(){
    this.setData({
      mianmi:false,
      zijin:false,
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
   xieyi(){
     my.navigateTo({
       url:"../agreement/agreement"
     });
   },
     yiwai(){
    this.setData({
      yiwai:true
    })
  },
});
