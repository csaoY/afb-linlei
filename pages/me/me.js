Page({
  data: {},
  onLoad() {},
  toMyOreder(){
    my.navigateTo({
      url:"../myOrder/myOrder"
    });
  },
  toHelp(){
     my.navigateTo({
      url:"../help/help"
    });
  },
  call(){
     my.makePhoneCall({ number: '400-862-5151' });
  }
});
