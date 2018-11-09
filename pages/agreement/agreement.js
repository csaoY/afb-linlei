Page({
  data: {},
  onLoad(option) {
    console.log(option.info==undefined)
    if(option.info==undefined){
 this.setData({
      info:''
    })
    }else{
  this.setData({
      info:JSON.parse(option.info)
    })
    }
  
 
  },
});
