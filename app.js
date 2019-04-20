!function() {
    require("./common.js"), wx.webpackJsonp.apply(null, arguments);
}([ 26 ], {
    64: function(n, e, t) {
        var o = t(28);
        App({
            onLaunch: function(n) {
                console.log("OnLaunch", n), 
                this.getUserInfo(), 
                n.scene && (this.globalData.scene = n.scene), 
                wx.removeStorageSync("refid"), n.wxrefid ? wx.setStorageSync("refid", n.wxrefid) : wx.setStorageSync("refid", 319527329), 
                wx.onNetworkStatusChange(function(n) {
                    var e = -1 < [ "2g", "3g" ].indexOf(n.networkType);
                    n.isConnected && e ? wx.showToast({
                        title: "当前网络比较缓慢",
                        icon: "none",
                        duration: 2e3
                    }) : !n.isConnected && wx.showToast({
                        title: "当前网络已中断",
                        icon: "none",
                        duration: 2e3
                    });
                });
            },

            getUserInfo: function() {
                var n = this;
                // 获取openid然后
                (0, o.getOpenid)().then(function(e) {
                  console.log("GetUserInfo跳转到认证页面");
                    e.unionId || (n.globalData.isAuth = !0
                    // wx.navigateTo({
                    //     url: "/pages/getAuthInfo/getAuthInfo"
                    // })
                    );
                }).catch(function() {});
            },

          

            globalData: {
                userInfo: null,
                scene: null,
                isAuth: !1,
                onLoadPts: {},
                calendarCallback: function(n) {
                    n.success && n.success(ds);
                }
            }
        });
    }
}, [ 64 ]);