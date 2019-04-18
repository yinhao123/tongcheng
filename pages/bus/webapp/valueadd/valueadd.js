!function() {
    require("./../../../../common.js"), wx.webpackJsonp.apply(null, arguments);
}([ 11 ], {
    130: function(e, t, s) {
        var a = s(0), i = "page/bus/webapp/valueadd/valueadd";
        Page({
            data: {
                isAdult: !0,
                slectedVAList: [],
                slectedVAItem: {},
                showPop: !1
            },
            btnSelectService: function(e) {
                for (var t, s = parseInt(e.currentTarget.dataset.sid), n = this.data.slectedVAList, r = 0; r < n.length; r++) if (n[r].serviceId == s) {
                    t = n[r], a.setEvent(i, "DD032", "^优选服务名称:[" + n[r].serviceName + "]^优选服务价格[" + n[r].sellPrice + "]^");
                    break;
                }
                this.setData({
                    slectedVAItem: t
                }), this.data.isAdult ? wx.setStorageSync("bus_optimizationDefault", t) : wx.setStorageSync("bus_extremeDefault", t), 
                setTimeout(function() {
                    wx.navigateBack();
                }, 100);
            },
            btnValueaddDetail: function(e) {
                for (var t = this.data.slectedVAList, s = parseInt(e.currentTarget.dataset.pid), n = 0; n < t.length; n++) if (t[n].serviceId == s) {
                    this.setData({
                        title: t[n].serviceName,
                        detail: t[n].serviceDetail,
                        showPop: !0
                    }), a.setEvent(i, "DD031", "^优选服务名称:[" + t[n].serviceName + "]^");
                    break;
                }
            },
            btnClosePop: function() {
                this.setData({
                    showPop: !1
                });
            },
            onLoad: function() {
                var e = wx.getStorageSync("bus_isAdult"), t = e ? wx.getStorageSync("bus_optimizationLists") : wx.getStorageSync("bus_extremeLists"), s = e ? wx.getStorageSync("bus_optimizationDefault") : wx.getStorageSync("bus_extremeDefault");
                this.setData({
                    isAdult: e,
                    slectedVAList: t,
                    slectedVAItem: s
                });
            },
            onShow: function() {
                var e = [];
                this.data.slectedVAList.forEach(function(t) {
                    e.push({
                        serviceName: t.serviceName,
                        sellPrice: t.sellPrice
                    });
                }), a.setEvent(i, "DD037", "^优选||至尊服务JSON字符串：" + JSON.stringify(e) + "^");
            },
            onShareAppMessage: function() {
                return {
                    title: "买车票就上同程汽车票！省心、更放心！",
                    path: "/pages/index/index"
                };
            }
        });
    }
}, [ 130 ]);