Page({
  data: {},
  onLoad(option) {
    this.setData({
      text:option.text,
      outOrderNo:option.outOrderNo,
      zmOrderNo:option.zmOrderNo
    })
  },
  Re(){
   my.navigateBack({
     
   });
  }
 
});
