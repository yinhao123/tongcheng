!function() {
    require("./../../common.js"), wx.webpackJsonp.apply(null, arguments);
}([ 4 ], {
    134: function(t, e, i) {
        !function(t) {
            t && t.__esModule;
        }(i(0));
        Page({
            data: {
                list: [],
                typeName: ""
            },
            onLoad: function(t) {
                var e = t.name || "";
                this.setData({
                    typeName: e
                }), "su" === e ? (wx.setNavigationBarTitle({
                    title: "服务协议"
                }), this.setData({
                    list: [ {
                        title: "同程艺龙服务协议",
                        id: 1
                    }, {
                        title: "软件许可使用协议",
                        id: 3
                    }, {
                        title: "同程艺龙免责说明",
                        id: 4
                    }, {
                        title: "同程艺龙隐私政策",
                        id: 2
                    }, {
                        title: "汽车票产品预订协议",
                        id: 5
                    } ]
                })) : "bl" === e && (wx.setNavigationBarTitle({
                    title: "营业执照"
                }), this.setData({
                    list: [ {
                        title: "同程网络科技股份有限公司",
                        id: 1
                    }, {
                        title: "苏州创旅天下信息技术有限公司",
                        id: 2
                    } ]
                }));
            },
            fnShowAgreement: function(t) {
                var e = t.currentTarget.dataset;
                "su" === this.data.typeName ? wx.navigateTo({
                    url: "/pages/userAgreement/userAgreement?id=" + e.id
                }) : "bl" === this.data.typeName && wx.navigateTo({
                    url: "/pages/businessLicense/businessLicense?id=" + e.id
                });
            }
        });
    }
}, [ 134 ]);