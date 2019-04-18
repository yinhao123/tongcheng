!function() {
    require("./../../common.js"), wx.webpackJsonp.apply(null, arguments);
}([ 7 ], {
    104: function(n, t, a) {
        var o = a(28), e = getApp();
        Page({
            data: {},
            getUserInfo: function(n) {
                var t = n.detail;
                console.log("getUserInfo");
                console.log()
                t.userInfo && (wx.setStorageSync("wxuserinfo", t), 
                (0, o.getUnionId)().then(function() {
                    e.globalData.isAuth = !0, wx.navigateBack();
                }).catch(function() {}));
            },

          byCodeGetOpenid: function()
           {
            var that = this;
            // 登录
            wx.login({
              success: res => {
                // 发送 res.code 到后台换取 openId, sessionKey, unionId
                if (res.code) {
                  console.log("code");
                  console.log(res.code);
                  // 发起网络请求
                  wx.request({
                    url: "http://ticket-api.toqidian.com/api/login",
                    method:"POST",
                    header:{
                      'content-type':'application/x-www-form-urlencoded'
                    },
                    data: {
                      code: res.code
                    },
                    success(res) {
                      console.log("请求成功后，获取到的信息");
                      console.log(res)
                      //将这个openid保存在本地缓存中
                      wx.setStorage({
                        key: 'userid',
                        data: res.data.user_id
                      })

                      wx.navigateBack({
                        
                      })
                      
                    }
                  })
                } else {
                  console.log('登录失败！' + res.errMsg);

                  wx.showToast({
                    title: '系统出bug了',
                    icon: 'none',
                    duration: 2000
                  })

                }
              }
            })
          },

            onLoad: function() {
              // 从Storage中获取userID
              let userid = wx.getStorageSync("userid");
              // 查看是否授权
              wx.getSetting({
                success(res) {
                  if (res.authSetting['scope.userInfo']) {
                    // 已经授权，可以直接调用 getUserInfo 获取头像昵称
                    wx.getUserInfo({
                      success(res) {
                        console.log("userinfo");
                        console.log(res.userInfo)
                        wx.request({
                          url: 'http://ticket-api.toqidian.com/api/userinfo',
                          method:"POST",

                          data:{
                            user_id:userid,
                            nickname:res.nickname,
                            avatarUrl:res.avatarUrl
                          }
                        })
                      }
                    })
                  }
                }
              })

              wx.login({
                success(res) {
                  if (res.code) {
                    // 发起网络请求
                    wx.request({
                      url: 'http://ticket-api.toqidian.com/api/login',
                      method:"POST",
                      data: {
                        code: res.code
                      },
                      success:function(res){
                        console.log("成功请求到数据!");
                        console.log(res);
                      }
                    })
                  } else {
                    console.log('登录失败！' + res.errMsg)
                  }
                }
              })
         
            },

           
        });
    }
}, [ 104 ]);