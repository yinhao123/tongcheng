!function() {
    require("./../../common.js"), wx.webpackJsonp.apply(null, arguments);
}([ 7 ], {
    104: function(n, t, a) {
        var o = a(28), e = getApp();
        Page({
            data: {},
            getUserInfo: function(n) {
                var t = n.detail;
                t.userInfo && (wx.setStorageSync("wxuserinfo", t), (0, o.getUnionId)().then(function() {
                    e.globalData.isAuth = !0, wx.navigateBack();
                }).catch(function() {}));
            },
            onLoad: function() {}
        });
    }
}, [ 104 ]);