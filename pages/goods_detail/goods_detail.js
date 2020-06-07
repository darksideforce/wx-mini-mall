// pages/goods_detail/goods_detail.js
import {request} from '../../request/index'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsObj:{}
  },
  GoodsInfo:{},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const {goods_id} = options
    console.log(goods_id)
    this.getgoodsdetail(goods_id)
  },
  getgoodsdetail(goods_id){
    request({
      url:"/goods/detail",data:{goods_id}
    }).then((res)=>{
      const goodsObj = res.data.message
      this.GoodsInfo = goodsObj
      this.setData({
        goodsObj:{
          goods_name:goodsObj.goods_name,
          goods_price:goodsObj.goods_price,
          goods_introduce:goodsObj.goods_introduce,
          pics:goodsObj.pics
          //只赋值需要的属性
        }
      }) 
    })
  },
  handlePreviewImage(e){
    const urls = this.GoodsInfo.pics.map(v=>v.pics_mid)
    const current = e.currentTarget.dataset.url
    wx.previewImage({
      current:current,
      urls:urls,
    })
  },
  //点击添加进购物车
  addCart(){
    //刚开始时，微信自带缓存内肯定无值，这样取值会返回一个空数组,若有值则返回值
    let cart=wx.getStorageSync('cart')||[];
    let index = cart.findIndex(v=>v.goods_id===this.GoodsInfo.goods_id)
    //将cart与goodsInfo做对比，返回两者goods_id一样的位置
    if(index===-1){
      //若不存在，则说明当前没有一样的商品，执行将商品推入cart数组中的操作
      this.GoodsInfo.num=1
      cart.push(this.GoodsInfo)
    }else{
      //如果有，则将cart中商品数据的数量加一
      cart[index].num++
    }
    //最终重新将cart数组存入储存中
    wx.setStorageSync('cart',cart)
    wx.showToast({
      title: '添加成功',
      icon: 'success',
      mask:true
    });
      
  }
})