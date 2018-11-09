import util from '/utils/util'
import urls from '/utils/urls'
import network from '/utils/network'
Page({
  data: {},
  onLoad(option) {
    this.getBill(option.orderId)
  },
  getBill(orderId){
     const myparams =new Object();
        myparams.orderId=orderId;
  network.post({
     url: urls.bill,
     params: myparams,
     success: (data) => {
       console.log(data.result)
       this.setData({
         imgSrc:data.imgSrc,
         info:data.result
       })
      
      },
      fail: () => {
      
    this.setData({
      
      })
     
     
      },
     
  })


  }
});
