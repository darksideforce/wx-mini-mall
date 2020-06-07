// pages/category/category.js
import {request} from '../../request/index'
Page({

  data: {
    leftMenuList:[],
    rightContent:[],
    currentindex:0,
    backTop:0,
  },
  cates:[],
  onLoad: function (options) {
    const Cates = wx.getStorageSync('cates');
    console.log(this.Cates)
    console.log(Cates)
    if(!Cates){
      this.getCats();
    }
    else{
      //有旧的数据就重新获取
      if(Date.now()-Cates.time>1000*10){
        //重新发送请求
        this.getCats()
      }
      //可以使用旧的数据
      else{
        this.Cates=Cates.data;
        //为什么在这里需要使用Cate而不是已经有了的cates，因为这是使用旧的数据，旧的数据页面创建后并没有请求，所以cates此时是一个空的数组
        let leftMenuList = this.Cates.map(v=>v.cat_name);
        let rightContent = this.Cates[0].children;
        //使用map函数挨个将cates的项赋给leftMenuList
        this.setData({
          leftMenuList,
          rightContent
        })
      }
    } 
  },
  //获取分类页面数据
  getCats(){
    request({
      //url:'https://api-hmugo-web.itheima.net/api/public/v1/categories'
      url:'/categories'
    }).then(res=>{
      this.cates = res.data.message;
      wx.setStorageSync('cates', {time:Date.now(),data:this.cates});
      let leftMenuList = this.cates.map(v=>v.cat_name);
      let rightContent = this.cates[0].children;
      //使用map函数挨个将cates的项赋给leftMenuList
      this.setData({
        leftMenuList,
        rightContent
      })
    })
  },
  handleItemTap(e){
    const {index}=e.currentTarget.dataset;
    //console.log(this.cates)
    let rightContent = this.cates[index].children;
    this.setData({
      currentindex:index,
      rightContent,
      backTop:0
      //点击后滚动的y轴位置
    })
  }
})