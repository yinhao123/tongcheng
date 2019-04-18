!function() {
    require("./../../common.js"), wx.webpackJsonp.apply(null, arguments);
}([ 5 ], {
    102: function(t, e, a) {
        var o = a(0), r = function(t) {
            return t && t.__esModule ? t : {
                default: t
            };
        }(a(1)), i = getApp();
        Page({
            data: {
                pageNum: 1,
                orderList: [],
                backUpOrderList: [],
                totalPage: 0,
                noData: !1,
                isFirstLoad: !0,
                userInfo: {},
                orderStatus: [ "全部订单", "待支付", "待出行" ],
                activeIndex: 0
            },
            onLoad: function(t) {
                i.globalData.onLoadPts = t;
                var e = wx.getStorageSync("wxuserinfo");
                (0, o.isEmpty)(e) ? wx.navigateTo({
                    url: "/pages/getAuthInfo/getAuthInfo"
                }) : this.setData({
                    userInfo: e.userInfo
                }), this.getOrderList();
            },
            onShow: function() {
                i.globalData.isAuth && (i.globalData.isAuth = !1, this.onLoad(i.globalData.onLoadPts));
                var t = wx.getStorageSync("wxuserinfo");
                this.setData({
                    userInfo: (0, o.isEmpty)(t) ? {} : t.userInfo
                });
            },
            onPullDownRefresh: function() {
                this.setData({
                    orderList: [],
                    backUpOrderList: [],
                    pageNum: 1,
                    noData: !1,
                    isFirstLoad: !0,
                    activeIndex: 0
                }), this.getOrderList();
            },
            onReachBottom: function() {
                this.data.pageNum > this.data.totalPage || (this.setData({
                    pageNum: this.data.pageNum + 1
                }), this.getOrderList(), console.log("onReachBottom", this.data.pageNum));
            },
            hideLoading: function() {
                wx.stopPullDownRefresh(), (0, o.hideLoading)();
            },
            getOrderList: function(t) {
                var e = this;
                (0, o.loading)(), (0, o.$http)(r.default.getOrderList, {
                    page: this.data.pageNum,
                    pageSize: 200,
                    orderSort: t
                }).then(function(t) {
                    return e.hideLoading(), t.orderList.length ? (e.data.orderList = e.data.orderList.concat(t.orderList), 
                    void e.setData({
                        orderList: e.data.orderList,
                        backUpOrderList: JSON.parse(JSON.stringify(e.data.orderList)),
                        totalPage: t.pageInfo.totalPage,
                        isFirstLoad: !1
                    })) : (e.setData({
                        noData: !0,
                        isFirstLoad: !1
                    }), !1);
                }).catch(function() {
                    e.hideLoading(), e.data.orderList.length && e.setData({
                        noData: !0
                    }), e.setData({
                        isFirstLoad: !1
                    });
                });
            },
            goOrderDetail: function(t) {
                var e = t.currentTarget.dataset, a = this.data.orderList[e.index];
                wx.navigateTo({
                    url: "/pages/bus/webapp/orderdetail/orderdetail?orderSerialId=" + a.orderSerialId
                });
            },
            goHome: function() {
                wx.switchTab({
                    url: "/pages/index/index"
                });
            },
            fnShowAgreement: function() {
                wx.navigateTo({
                    url: "/pages/aboutTC/aboutTC"
                });
            },
            selectedTab: function(t) {
                var e = t.currentTarget.dataset, a = this.data, o = [];
                0 == e.index ? o = a.backUpOrderList : (o = a.backUpOrderList.filter(function(t) {
                    return t.orderSort == e.index;
                })).sort(function(t, e) {
                    return +new Date((t.dptDateTime || "").replace(/-/g, "/")) > +new Date((e.dptDateTime || "").replace(/-/g, "/"));
                }), this.setData({
                    activeIndex: e.index,
                    orderList: o
                });
            },
            onShareAppMessage: function() {
                return {
                    title: "买车票就上同程汽车票！省心、更放心！",
                    path: "/pages/index/index"
                };
            },
            formBookingBtn: function(t) {
                var e = t.detail.formId;
                console.log(e), (0, o.saveFormid)(e, "订单列表", "", "订单列表");
            }
        });
    }
}, [ 102 ]);