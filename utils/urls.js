const url="https://sit.linlei.net"
//const url="https://m.linlei.net"

module.exports={
    cat:url+'/api/route.htm?method=commodity.getALLChidCategorys',
    goodlist:url+'/api/route.htm?method=commodity.commodityList',
    gooddetail:url+'/api/route.htm?method=commodity.getCommodityDetail',
    PropertiesList:url+'/api/route.htm?method=commodity.commodityPropertiesList',
    area:url+'/api/route.htm?method=base.area',
    getAlipayUserInfo:url+'/api/route.htm?method=user.getAlipayUserInfo',
    submissionorder:url+'/api/route.htm?method=trade.submissionorder',
    determineOrder:url+'/api/route.htm?method=trade.determineOrder',
    pay:url+'/api/route.htm?method=trade.pay',
    orderList:url+"/api/route.htm?method=trade.list",
    orderDetail:url+"/api/route.htm?method=trade.getOrderDetails",
    bill:url+"/api/route.htm?method=trade.queryBill",
    cancelOrder:url+"/api/route.htm?method=trade.cancel",
    collectGoods:url+"/api/route.htm?method=trade.determineCollectGoods",//确认收货
    obtainExpressInfo:url+"/api/route.htm?method=trade.obtainExpressInfo",//物流详情
    back:url+"/api/route.htm?method=trade.returExpress",
    zhima:url+"/api/route.htm?method=trade.getOrderStatus"
}