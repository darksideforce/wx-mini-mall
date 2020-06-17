import {request} from '../../request/index'
Page({
  /**
   * 页面的初始数据
   */
  data: {
    swiperList:[],
    cateList:[],
    floorList:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //调用一个网络请求方法
    // wx.request({
    //     url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata',
    //     success: (result) => {
    //       this.setData({
    //         swiperList:result.data.message
    //       })
    //     },
    //   });
    this.getSwiperList()
    this.getCateList()
    this.getfloorList()
  },
getSwiperList(){
  request({url: '/home/swiperdata'}).then((result)=>{
      this.setData({
        swiperList:result.data.message
      })
    })
},
getCateList(){
  request({url:'/home/catitems'}).then((result)=>{
    let results = result.data.message;
    results[0].navigator_url = results[0].navigator_url.replace(/main/,'category')
    this.setData({
      cateList:results
    })
  })
},
getfloorList(){
  request({url:'/home/floordata'}).then((result)=>{
    let results = result.data.message
    console.log(results.length)
    for(let i=0;i<results.length;i++){
      let itemfornow = results[i].product_list
      console.log(itemfornow)
      //双层循环替换url地址
      for(let b=0;b<itemfornow.length;b++){
        itemfornow[b].navigator_url = itemfornow[b].navigator_url.replace(/goods_list/,'goods_list/goods_list')
      }
    }
    this.setData({
      floorList:results
    })
  })
},
})