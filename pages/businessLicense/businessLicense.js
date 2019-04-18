!function() {
    require("./../../common.js"), wx.webpackJsonp.apply(null, arguments);
}([ 10 ], {
    135: function() {
        Page({
            data: {
                curData: {},
                listData: {
                    1: {
                        title: "同程网络科技股份有限公司",
                        src: "//file.40017.cn/img140017cnproduct/touch/bus/wx_bus/mina-bus-app/tongchengwangluo.jpg"
                    },
                    2: {
                        title: "苏州创旅天下信息技术有限公司",
                        src: "//file.40017.cn/img140017cnproduct/touch/bus/wx_bus/mina-bus-app/chuanglvtianxia.jpg"
                    }
                }
            },
            onLoad: function(t) {
                var a = this.data.listData[+t.id];
                wx.setNavigationBarTitle({
                    title: a.title
                }), this.setData({
                    curData: a
                });
            }
        });
    }
}, [ 135 ]);