// pages/search/search.js
import {request} from '../../request/index'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goods:[],
    value:'',
  },
  //timer:0,
  onLoad: function (options) {
  },
  timer:null,
  handleinput(e){
    const {value} = e.detail
    if(!value.trim()){
      return
    }
    clearTimeout(this.timer)
    this.timeId = setTimeout(()=>{
      this.querysearch(value);
    },1000)
  },
  querysearch(query){
    request({url:'/goods/qsearch',data:{query}})
    .then((result)=>{
      const res = result.data.message;
      this.setData({
        goods:res
      })
    })
  },
  debounce(fn,wait){
    var timer = null;
    return function(){
        var context = this;
        var args = arguments;
        if(!timer){
            timer = setTimeout(function(){
                fn.apply(context,args);
                timer = null;
            },wait)
        }
    }
      //创建一个节流器
  },
  canceltap(){
    setTimeout(()=>{
      this.setData({
        goods:[],
        value:'',
      })
    },1200)
  }
})
