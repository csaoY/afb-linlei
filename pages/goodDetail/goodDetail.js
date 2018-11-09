import util from '/utils/util'
import urls from '/utils/urls'
import network from '/utils/network'
 var selectedgood={};
 var goodstring=""
 var selectedgoodstr=""
Page({
  data: {
    imgsrc:"",
    imgs:[],
    modelShow:false,
    currentIndex:1,
    aboutShow:false,
    gooditem:{},
    propertiesList:[],
    propes:[],
    selectedgood:{},
    selectedgoodstr:'',
    albumimg:[],//商品相册
    thumbimg:[],//banner图
    resultObj:{},//选择所有选项之后得到的组合数组
    modeType:1,//保险选择状态，0代表分期，1代表一次性付清
      },
  onLoad(option) {
   // console.log(option.id);
    this.getDetail(option.id);
    this.PropertiesList(option.id)
  },
  onUnload(){
    selectedgood={};
  },
  showModel(){
    this.setData({
      modelShow:true
    })
  },
  hideall(){
     this.setData({
      modelShow:false,
      aboutShow:false
    })
  },
    hideModel(){
     this.setData({
      modelShow:false
    })
  },
  showTap1(){
    this.setData({
     currentIndex:1
    })

  },
   showTap2(){
    this.setData({
     currentIndex:2
    })
  },
   showTap3(){
    this.setData({
     currentIndex:3
    })
  },
  closeAbout(){
     this.setData({
      aboutShow:false
    })
  },
  showAbout(){
    this.setData({
      aboutShow:true
    })
  },
  submitOrder(){
     my.showLoading({
     content: '加载中...',
     delay: 0,
   });
    const that=this;
  my.getAuthCode({  
      scopes: 'auth_user', 
      success: (res) => { 
       // console.log(res)
        this.getAlipayUserInfo(res.authCode);//上传支付宝userid
         },
         fail:()=>{
           my.hideLoading()
         }
          });

  },
  getDetail(id){
   const that=this;
   const myparams =new Object();
   myparams.id=id;
  network.post({
     url: urls.gooddetail,
     params: myparams,
     success: (data) => {
      // console.log(data)
      let propes=data.result.commodity.propes;
         for (var i=0;i<propes.length;i++){
            for(var j=0;j<propes[i].value.length;j++){
              propes[i].value[j]=propes[i].value[j].split('|')
            }
          }         
       that.setData({
         serviceProps:data.result.commodity.serviceProps,
         serviceInstalmentPrice:data.result.commodity.serviceProps.serviceInstalmentPrice,
         serviceFullAmount:data.result.commodity.serviceProps.serviceFullAmount,
         gooditem:data.result.commodity.objs ,
         imgsrc:data.imgSrc,
         goodlist:data.result.commodity.propes,
         propes:propes,
         resultlist:data.result.commodity.objs.commodityItems,
         saleprice:data.result.commodity.objs.shopPrice ,
         salesnum:data.result.commodity.objs.quantity ,
         logoimg:data.result.commodity.objs.logoImg ,

        });    
         
        const albumImg=data.result.commodity.objs.albumImg.split(',');
        const thumbImg=data.result.commodity.objs.thumbImg.split(',');
        that.setData({
          albumimg:albumImg,//商品相册
          thumbimg:thumbImg,//banner图
        })
      
        if(that.data.serviceProps.serviceInstalmentPrice==0){//如果分期不存在
          that.setData({
            modeType:2
          })
        }
        if(that.data.serviceProps.serviceFullAmount==0){
          that.setData({
            modeType:1
          })
        }
      },
      fail: () => {

       my.alert({
         content:"数据获取失败",
         success: (res) => {
         my.navigateBack()
         },
       });
      },
  })
  },
  PropertiesList(id){
    var that=this;
   const myparams =new Object();
   myparams.commodityId=id;
  network.post({
     url: urls.PropertiesList,
     params: myparams,
     success: (data) => {
      //console.log(data);
      that.setData({
        propertieslist:data.result.propertiesList
      })
      },
      fail: () => {
       // console.log(111)
      },
  })
  },
  submissionorder(aliid,itemid,goodid){//生成商品订单
    const that=this;
   const myparams =new Object();
   myparams.aliid=aliid;
   myparams.goodsId=goodid;
   myparams.itemId=itemid;
   myparams.modeType=that.data.modeType;
   //console.log(myparams)
  network.post({
     url: urls.submissionorder,
     params: myparams,
     success: (data) => {
      //console.log(data.code);
      //console.log('hahahh')
     // return;
     
my.startZMCreditRent({
    category: "ZMSC_1_1_1",
    amount: data.result.totalRent,
    deposit:  data.result.deposit,
    out_order_no:  data.result.out_order_no,
    overdue_time: data.result.overdueTime,
    order_process_url: "alipays://platformapi/startapp?appId=2018050202621373&page='../myOrder/myOrder'",
    item_id: "2018050901000222123471795029",
    subject: {
        "products": [
            {   "count": data.result.count,   /** 商品件数 */
                "amount": data.result.stagesPrice,  /**分期总金额*/
                "deposit": data.result.deposit, /**总押金*/
                "installmentCount": data.result.installmentCount,  /**分期数*/
                "name": encodeURIComponent(data.result.name) /** 商品名 */
            }]
    },
    success: (res) => {
     // console.log(JSON.stringify(res))
      my.hideLoading()
      if(res.resultStatus==6001){
           return;
      }
       my.navigateTo({
               // 跳转至确定订单页
              url: '../confirmOrder/confirmOrder?zmOrderNo='+res.orderNo+
              '&outOrderNo='+res.outOrderNo
              +'&name='+data.result.name+'&amount='+data.result.amount+
              '&count='+data.result.count+'&deposit='+data.result.deposit
              +'&installmentCount='+data.result.installmentCount
              +'&rentAmount='+data.result.rentAmount+
              '&totalDeposit='+data.result.totalDeposit
              +'&selectedgoodstr='+selectedgoodstr+'&installmentDate='+data.result.installmentDate+'&logoImg='+that.data.imgsrc+that.data.logoimg
            }) 
              
    },
    fail: (res) => {
     // console.log(res)
       my.hideLoading()
    }
});
      },
      fail: (err) => {
       my.hideLoading();
        //console.log(err);
       //console.log(err.code)
      if(err.code==5029){
        my.navigateTo({
          url:"../failOrder/failOrder?text=你有正在进行的订单"
        });
      }

      },
  })
  },
  select(e){
     goodstring="";
     selectedgoodstr="";
    var that=this
    if(e.target.dataset.num==='0'){//如果该商品数量为0
       return;
    }
    if(selectedgood[e.target.dataset.idx]===e.target.dataset.val){//如果该商品已经被选择
     delete selectedgood[e.target.dataset.idx]
    }else{
     selectedgood[e.target.dataset.idx]=e.target.dataset.val;
    }
    const selectedgoodarr=Object.keys(selectedgood)
    selectedgoodarr.forEach(function(key){
     goodstring+= selectedgood[key]+";";
     selectedgoodstr+= selectedgood[key]+","
    });
    selectedgoodstr = selectedgoodstr.substr(0, selectedgoodstr.length - 1); 
    goodstring =goodstring.substr(0, goodstring.length - 1);   
    this.setData({
      goodstring,
      selectedgood,
      selectedgoodstr,
      sellength:selectedgoodarr.length
    })
      console.log(that.data.sellength==that.data.propes.length)
    if(selectedgoodarr.length===that.data.propes.length){
      //console.log(that.data.resultlist);
      for (var i=0;i<that.data.resultlist.length;i++){
        if(that.data.resultlist[i].propertieNames===selectedgoodstr){
          console.log(that.data.resultlist[i]);
          that.setData({
            saleprice:that.data.resultlist[i].shopPrice,
            salesnum:that.data.resultlist[i].salesNum,
            resultObj:that.data.resultlist[i],
            serviceInstalmentPrice:that.data.resultlist[i].serviceInstalmentPrice,
            serviceFullAmount:that.data.resultlist[i].serviceFullAmount,
            month:selectedgood[that.data.propes.length-1]
          }) 
          //console.log(selectedgood)
          return;
        }
      }
       that.setData({
            salesnum:0
          }) 
      return;
    }
  },
  getAlipayUserInfo(code){
    const that=this
     const myparams =new Object();
   myparams.code=code;
  network.post({
     url: urls.getAlipayUserInfo,
     params: myparams,
     success: (data) => {
       //console.log(data);
       //console.log('hhh')
      // console.log(data.result.aliid,that.data.resultObj.id,that.data.resultObj.commodityId)
       this.submissionorder(data.result.aliid,that.data.resultObj.id,that.data.resultObj.commodityId)
  },
  fail:()=>{
    my.hideLoading()
  }
  })
  },
  back(){
    my.navigateBack({
      
    });
  },
  selectService(e){//选择服务状态
  //console.log(e.target.dataset.type);
  this.setData({
    modeType:e.target.dataset.type
  })

  },
  toLinlei(){//返回首页
  my.navigateBack({})

  }
});
Array.prototype.del=function(index){  
        if(isNaN(index)||index>=this.length){  
            return false;  
        }  
        for(var i=0,n=0;i<this.length;i++){  
            if(this[i]!=this[index]){  
                this[n++]=this[i];  
            }  
        }  
        this.length-=1;  
    }; 




    
