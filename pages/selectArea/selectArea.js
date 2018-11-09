import util from '/utils/util'
import urls from '/utils/urls'
import network from '/utils/network'
var myArea={};
Page({
  data: {
    length:0
  },
  onLoad() {
    this.getArea()
  },
  getArea(){
    my.showLoading({
     content: '加载中...',
     delay: 0,
   });
   var that=this;
   const myparams =new Object();
  network.post({
     url: urls.area,
     params: myparams,
     success: (data) => {
      console.log(data.result)
      that.setData({
        prolist:data.result,
        currentIndex:0,
        issel:true
      })
      my.hideLoading();
      //console.log(that.data.arealist[0])
      },
      fail: () => {
        console.log(111)
      },
  })
  },
  selectPro(e){
    console.log(e.currentTarget.dataset.city)
    myArea.pro=e.currentTarget.dataset.pro
    delete myArea["city"]
    delete myArea["area"]
     const arr=Object.keys(myArea)  
    this.setData({
      citylist:e.currentTarget.dataset.city,
      currentIndex:1,
      length:arr.length,
      myArea,
      issel:true
    })
     //console.log(this.data.citylist)
  },
  selectCity(e){
    myArea.city=e.currentTarget.dataset.city
     delete myArea["area"]
     const arr=Object.keys(myArea)
this.setData({
      arealist:e.currentTarget.dataset.area,
      currentIndex:2,
      length:arr.length,
      myArea,
      issel:true
    })
    console.log(this.data.arealist)
  },
  selectArea(e){
     myArea.area=e.currentTarget.dataset.area;
      const arr=Object.keys(myArea);
      this.setData({
      length:arr.length,
      myArea,
      issel:true
    })
    const a=myArea.pro+myArea.city+myArea.area;
    console.log(a)
    my.setStorage({
      key:'address',
      data:a,
      success:function(){
        my.navigateBack({//返回
       delta:1
       })
      }
    })

    
  },
  changeIndex(e){
    this.setData({
      currentIndex:e.currentTarget.dataset.index,
      issel:false
    })
    

  }

  
});
