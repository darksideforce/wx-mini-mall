import {openSetting,getSetting,chooseAddress,showModal,showToast} from "../../utils/asyncwx"
// pages/cart/cart.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    address:{},
    cart:{},
    totalPrice:0,
    totalNum:0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  onShow:function(){
    const address = wx.getStorageSync('address');
    let cart = wx.getStorageSync('cart')||[]
    cart = cart.filter(v=>v.checked)
    //使用filter做一次筛选
    let totalPrice = 0;
    let totalNum = 0;
    let allchecked = true;
    cart.forEach(v => {
      if(v.checked){
        totalPrice+=v.num*v.goods_price;
        totalNum+=v.num;
      }
      else{
        allchecked=false;
        //把是否全选中的判断放在这
      }
    });
    allchecked = cart.length != 0 ?allchecked :false
    this.setData({
      cart,
      allchecked,
      totalPrice,
      totalNum,
      address,
    })
    wx.setStorageSync('cart',cart)
  },
})