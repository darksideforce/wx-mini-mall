let ajaxTime=0;
//开始时设置一个计时器计算当前执行的完成情况，需要设置在export外，即拥有独特的作用域
export const request=(params)=>{
  ajaxTime++
  //每次执行都将会将计数器加一
  wx.showLoading({
    title:'加载',
    mask:true
  })
  //一个toast
  const baseURL = 'https://api-hmugo-web.itheima.net/api/public/v1'
  return new Promise((resolve,reject)=>{
    wx.request({
      ...params,
      url:baseURL+params.url,
      success:(result)=>{
        resolve(result);
      },
      fail:(err)=>{
        reject(err);
      },
      complete:()=>{
        //每次执行完毕都将当前的ajaxTime减一
        ajaxTime--;
        if(ajaxTime===0){
          wx.hideLoading()
        }
      }
    })
  })
}