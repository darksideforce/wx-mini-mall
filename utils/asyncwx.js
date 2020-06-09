export const getSetting=()=>{
  return new Promise((resolve,reject)=>{
    wx.getSetting({
      success: (result) => {
        resolve(result)
      },
      fail:(err)=>{
        reject(err)
      }
    });
  })
}

export const chooseAddress=()=>{
  return new Promise((resolve,reject)=>{
    wx.chooseAddress({
      success: (result) => {
        resolve(result)
      },
      fail: (err) => {
        reject(err)
      },
    });
      
  })
}

export const openSetting=()=>{
  return new Promise((resolve,reject)=>{
    wx.openSetting({
      success: (result) => {
        resolve(result)
      },
      fail: (err) => {
        reject(err)
      },
    });
  })
}
/**
 * promise形式的showModal
 * @param {object} param0参数 
 */
export const showModal=(message)=>{
  return new Promise((resolve,reject)=>{
    wx.showModal({
      title: '提示',
      content: message,
      success: (result) => {
        if (result.confirm) {
          resolve(result) 
        }
      },
      fail: (err) => {
        reject(err)
      }
    });
      
  })
}

export const showToast=({title})=>{
  return new Promise((resolve,reject)=>{
    wx.showModal({
      title: title,
      icon:'none',
      success: (res) => {
        resolve(res)
      },
      fail: (err) => {
        reject(err)
      }
    });
      
  })
}