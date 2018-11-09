
import util from '/utils/util'
import urls from '/utils/urls'
import network from '/utils/network'
Page({
  data: {
    catlist:[],
    currentindex:0,
    goodlist:[],
    imgsrc:'',
    catname:''
},
  onLoad() {
    this.getCatList();
  },
toGoodDetail(e){
  
  const id=e.target.dataset.id;
  console.log(id)
  my.navigateTo({
  url: '../goodDetail/goodDetail?id='+id
})
},
getCatList:function(){//
 my.showLoading({
     content: '加载中...',
     delay: 0,
   });
   var that=this;
   const myparams =new Object();
  network.post({
     url: urls.cat,
     params: myparams,
     success: (data) => {
      this.getGoodList(data.result[0].id)
       that.setData({
         length:data.result.length,
          catlist: data.result,
          catname:data.result[0].catName
        });
      },
      fail: () => {
        console.log(111)
      },
  })
//console.log(this.catList)
},

getGoodList:function(id){
   my.showLoading({
     content: '加载中...',
     delay: 0,
   });
   var that=this;
   const myparams =new Object();
   myparams.pageSize=100;
   myparams.pageNo=1;
   myparams.cid=id;
  network.post({
     url: urls.goodlist,
     params: myparams,
     success: (data) => {
       console.log('hahah')
      console.log(data);
      this.setData({
        imgsrc:data.imgSrc
      })
       that.setData({
          goodlist:data.result
        });
         my.hideLoading();
      },
      fail: () => {
        console.log(111)
         my.hideLoading();
      },
  })
},
change(e){
  this.setData({
    currentindex:e.target.dataset.index,
    catname:e.target.dataset.cat,
  })
  this.getGoodList(e.target.dataset.id)
}
});
