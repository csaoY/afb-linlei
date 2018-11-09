Page({
  data: {},
  onLoad(option) {
     this.setData({
      outOrderNo:option.outOrderNo,
      orderNo:option.zmOrderNo,
      amount:option.amount,//分期租金金额
     credit_amount:option.credit_amount,//芝麻信用免押金
      deposit:option.deposit,//总押金
      installmentDate:option.installmentDate//租期
        
    })
  },
  toLinlei(){
   my.switchTab({
     url:'../linlei/linlei'
   })
  },
  toOrder(){
    my.navigateTo({
      url:"../orderDetail/orderDetail?orderno="+this.data.outOrderNo
    });

  }
});
