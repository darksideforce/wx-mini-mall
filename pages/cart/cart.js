import {openSetting,getSetting,chooseAddress,showModal,showToast} from "../../utils/asyncwx"
// pages/cart/cart.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address:{},
    cart:{},
    allchecked:true,
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
    const cart = wx.getStorageSync('cart')||[]
    //const allchecked = cart.length?cart.every(v=>v.checked):falsee
    this.setData({
      address,
    })
    this.setCart(cart)
  },
  //点击打开购物车事件
  //原本写法
  // handleChooseAddress(){
  //   wx.getSetting({
  //     //获取用户当前的设置情况，只会出现用户请求过的权限
  //     success: (result) => {
  //       const scopedAddress = result.authSetting['scope.address']
  //       //authSetting中包含了用户的授权情况
  //       if(scopedAddress===true||scopedAddress===undefined){
  //         //查看授权情况，如果已经授权或者从未授权过，就重新发起选择地址请求,从未请求过的权限值为undefined
  //         wx.chooseAddress({
  //           success: (result1) => {
  //             console.log(result1)
  //           },
  //         })    
  //       }
  //       else if(scopedAddress===false){
  //         wx.openSetting({
  //           //发起打开设置界面的请求，这里只会返回
  //           success: (result2) => {
  //             wx.chooseAddress({
  //               success:(result3)=>{
  //                 console.log(result3)
  //               }
  //             })
  //           },
  //         }); 
  //       }
  //     },
  //   });   
  // }
  //封装后的写法
  // handleChooseAddress(){
  //   getSetting().then((result)=>{
  //     const scopedAddress = result.authSetting['scope.address']
  //     if(scopedAddress===true||scopedAddress===undefined){
  //       chooseAddress().then((result)=>{
  //         console.log(result)
  //       })
  //     }
  //     else{
  //       openSetting().then(result=>console.log(result))
  //     }
  //   })
  // }
  //包装在async函数里的写法
    async handleChooseAddress(){
      try{
        const res1 = await getSetting();
        const scopedAddress= res1.authSetting['scope.address']
        if(scopedAddress===true||scopedAddress===undefined){
        }
        else{
          await openSetting();
        }
        const res2 = await chooseAddress();
        res2.all = res2.provinceName+res2.cityName+res2.countyName+res2.detailInfo
        wx.setStorageSync('address', res2);
      }
      catch(error){
        console.log(error)
      }
    },
    itemchange(e){
      const goods_id = e.currentTarget.dataset.id
      let {cart}=this.data;
      let index = cart.findIndex(v=>v.goods_id===goods_id);
      cart[index].checked=!cart[index].checked
      this.setCart(cart)
      
    },
    //把计算底部总价格的代码进行封装。
    setCart(cart){
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
      })
      wx.setStorageSync('cart',cart)
    },
    handlechooseAll(){
      let {cart} = this.data
      let{allchecked}= this.data
      allchecked=!allchecked
      console.log(allchecked)
      cart.forEach(v=>v.checked=allchecked)
      this.setCart(cart)
      this.setData({
        allchecked
      })
    },
    operationtap(e){
      const goods_id = e.currentTarget.dataset.index;
      const operation = e.currentTarget.dataset.operation
      let {cart} = this.data;
      let index = cart.findIndex(v=>v.goods_id===goods_id);
      if(cart[index].num===1&&operation===-1){
        // wx.showModal({
        //   title: '提示',
        //   content: '你是否要删除',
        //   success: (result) => {
        //     if (result.confirm) {
        //       cart.splice(index,1);
        //       this.setCart(cart)
        //     }
        //     else if (result.cancel){
        //       console.log('用户点击取消')
        //     }
        //   },
        // }); 
        const message = '你是否要删除'
        showModal(message).then((result)=>{
          if(result.confirm){
            cart.splice(index,1)
            this.setCart(cart)
          }
          else if(result.reject){
            console.log('用户点击取消')
          }
        })
      }
      else{
        cart[index].num += operation
        this.setCart(cart)
      }
    },
    handlepay(){
      let address = this.data.address
      let totalNum = this.data.totalNum
      if(!address.userName){
          showToast({title:'您还没有选择收货地址'});
        return
      };
      if(totalNum==0){
        showToast({title:'您还没有选择商品'})
        return
      }
      wx.navigateTo({
        url: '/pages/pay/pay'
    })
  }
})