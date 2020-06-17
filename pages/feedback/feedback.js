// pages/feedback/feedback.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs:[
      {
        id:0,
        value:'体验问题',
        isActive:true
      },
      {
        id:1,
        value:'商家投诉',
        isActive:false
      },
    ],
    chooses:[],
    textvalue:''
  },
  //接受子组件传来的index，并循环判断index并赋值
  tabsItemChange(e){
    //接受子元素传来的点击事件（Tabs）
    console.log(e)
    const{index}=e.detail;
    let {tabs} = this.data;
    tabs.forEach((v,i)=>i===index?v.isActive=true:v.isActive=false);
    //循环判断并赋值
    this.setData({
      tabs
    })
  },
  //引用api，添加图片，获取图片的路径并传值给子组件
  handleTapChange(e){
    
    console.log(this.chooses)
    wx.chooseImage({
      count: 9,
      //最大图片数量
      sizeType: ['original', 'compressed'],
      //图片的格式：原图，压缩
      sourceType: ['album', 'camera'],
      //图片的来源：相册、照相机
      success: (result) => {
        console.log(result)
        this.setData({
          chooses:[...this.data.chooses,...result.tempFilePaths]
        })
      },
      fail: () => {},
      complete: () => {}
    });
      
  },
  icontap(e){
    //删除数组的方法
    const {index} = e.currentTarget.dataset
    let chooses = this.data.chooses
    chooses.splice(index,1)
    this.setData({
      chooses
    })
  },
  textinput(e){
    const textvalue = e.detail.value
    this.setData({
      textvalue
    })
  },
  //上传事件
  uploadtext(){
    const {textvalue} = this.data
    const {chhooses} = this.data
    if(!textvalue.trim()){
      wx.wx.showToast({
        title: '输入不合法',
        icon: 'none',
        mask: true,
      });  
    }
    //上传的api不支持多个文件同时上传 
    chooses.forEach((v,i)=>{
      wx.uploadFile({
        url: '',
        filePath:v ,
        name: 'file',
        formData: {},
        success: (result) => {
          
        },
      });
    })
      
  }
})