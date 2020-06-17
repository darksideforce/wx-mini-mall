// pages/goods_list/goods_list.js
import {request} from '../../request/index'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs:[
      {
        id:0,
        value:'综合',
        isActive:true
      },
      {
        id:1,
        value:'销量',
        isActive:false
      },
      {
        id:2,
        value:'价格',
        isActive:false
      },
    ],
    goodsList:[],
    imageurls:'../../icons/照相机.png'
    //默认的图片不显示时路径
  },
  //请求的数据头类型
  params:{
    query:'',
    cid:'',
    pagenum:1,
    pagesize:10
  },
  TotalPages:1,
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.params.cid=options.cid||'',
    this.params.query = options.query||'',
    this.getGoodsList()

  },
  tabsItemChange(e){
    //接受子元素传来的点击事件（Tabs）
    const{index}=e.detail;
    let {tabs} = this.data;
    tabs.forEach((v,i)=>i===index?v.isActive=true:v.isActive=false);
    this.setData({
      tabs
    })
  },
  getGoodsList(){
    //网络请求
    request({
      url:'/goods/search',data:this.params
    }).then(res=>{
      const total = res.data.message.total
      this.TotalPages = Math.ceil(total/this.params.pagesize)
      //计算总页码
      this.setData({
        goodsList:[...this.data.goodsList,...res.data.message.goods]
      })
    })
    wx.stopPullDownRefresh();
  },
  onReachBottom(){
    //触发再次请求数据
    if(this.params.pagenum>=this.TotalPages){
      wx.showToast({
        title: '没有了',
      }) 
    }
    else{
      this.params.pagenum++;
      this.getGoodsList()

    }
  },
  onPullDownRefresh(){
    this.setData({
      goodsList:[],
    })
    this.params.pagenum=1;
    this.getGoodsList();
    wx.showToast({
      title:'刷新成功！'
    })
  },
})