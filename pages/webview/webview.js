!function() {
    require("./../../common.js"), wx.webpackJsonp.apply(null, arguments);
}([ 2 ], {
    105: function() {
        Page({
            data: {
                url: ""
            },
            onLoad: function(n) {
                this.setData({
                    url: n.src ? decodeURIComponent(n.src) : ""
                });
            },
            onShareAppMessage: function() {
                return {
                    title: "买车票就上在线预定汽车票！省心、更放心！",
                    path: "/pages/index/index"
                };
            }
        });
    }
}, [ 105 ]);