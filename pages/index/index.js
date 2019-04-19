!function() {
    require("./../../common.js"), wx.webpackJsonp.apply(null, arguments);
}([ 6 ], {
    98: function(t, e, a) {
        function i(t) {
            return t && t.__esModule ? t : {
                default: t
            };
        }
        var n = i(a(25)), s = (a(99), i(a(27))), o = a(0), r = i(a(5)), d = i(a(1)), y = a(14), c = (getApp(), 
        a(0), !0);
        Page({
            data: {
                userInfo: {},
                date: "",
                datetime: "",
                week: "",
                bannerImgs: [],
                saleDayObj: {},
                depCity: {
                    name: "上海",
                    id: "1325",
                    showName: "上海",
                    station: "",
                    stationId: ""
                },
                desCity: {
                    name: "苏州",
                    id: "1229",
                    showName: "苏州",
                    station: "",
                    stationId: ""
                },
                refid: wx.getStorageSync("refid") || "",
                busRecentData: [],
                announceList: [],
                showUserAgreement: !1
            },
            onLoad: function() {
                this.setData({
                    showUserAgreement: !~~wx.getStorageSync("showUserAgreement")
                }), this.data.showUserAgreement && wx.hideTabBar({
                    animation: !0
                }), this.fnIsShowAgreementPop(), setTimeout(function() {
                    c = !1;
                }, 450), this.initCityData(), this.getSaleDay(), this.getAnnounceList(), this.getBannerData();
            },
            onShow: function() {
                this.initCalendar(), c || this.initCityData(), this.initHistoryData();
            },
            goCalendar: function() {
                var t = this.data;
                wx.navigateTo({
                    url: "../calendar/calendar?selectedDate=" + t.datetime + "&saleDay=" + JSON.stringify(t.saleDayObj)
                });
            },
            initCalendar: function() {
                var t = wx.getStorageSync("selectedDate"), e = (0, o.formatNumber)(t.month), a = (0, 
                o.formatNumber)(t.day), i = (0, o.isEmpty)(t) ? -1 : (0, s.default)([ t.year, e, a ].join("-")).time();
                if (t && 0 < i - (0, s.default)().time()) this.setData({
                    date: (0, s.default)([ t.year, e, a ].join("-")).format("nn"),
                    week: "周" + t.week,
                    recentdate: t.recentdate || "",
                    datetime: [ t.year, e, a ].join("-")
                }); else {
                    var n = (0, s.default)();
                    this.setData({
                        date: n.format("nn"),
                        week: "周" + n.format("w"),
                        recentdate: "今天",
                        datetime: n.format("l")
                    }), wx.setStorageSync("selectedDate", {
                        day: n.date(),
                        month: n.month(),
                        recentdate: "今天",
                        week: n.format("w"),
                        year: n.year()
                    });
                }
            },
            initCityData: function() {
                var t = wx.getStorageSync("busDepCity"), e = wx.getStorageSync("busDesCity");
                c && r.default.setEvent(y.index, "DLSY07", "^出发城市:" + t.name + "^到达城市:" + e.name + "^"), 
                (0, o.isEmpty)(t) || this.setData({
                    depCity: t
                }), (0, o.isEmpty)(e) || this.setData({
                    desCity: e
                }), this.getSaleDay();
            },
            initHistoryData: function() {
                var t = wx.getStorageSync("busRecentData");
                this.setData({
                    busRecentData: t
                });
            },
            changeCity: function() {
                this.setData({
                    depCity: this.data.desCity,
                    desCity: this.data.depCity
                }), this.getSaleDay(), wx.setStorageSync("busDepCity", this.data.depCity), wx.setStorageSync("busDesCity", this.data.desCity), 
                r.default.setEvent(y.index, "DLSY02", "");
            },
            getSaleDay: function() {
                var t = this, e = this.data;
                (0, o.$http)(d.default.busGetSaleDay, {
                    departure: e.depCity.name,
                    destination: e.desCity.name
                }).then(function(e) {
                    console.log(e), wx.setStorageSync("busSaleDays", e), wx.setStorageSync("busNormalSaleDays", e.saleDay), 
                    t.setData({
                        saleDayObj: e
                    });
                }).catch(function() {
                    t.setData({
                        saleDayObj: {}
                    }), wx.setStorageSync("busSaleDays", {}), wx.setStorageSync("busNormalSaleDays", 0);
                });
            },
            goDepCity: function() {
                var t = this.data;
                wx.navigateTo({
                    url: "../city/city?selectedCity=" + t.depCity.showName
                });
            },
            goDesCity: function() {
                var t = this.data;
                wx.navigateTo({
                    url: "../city/city?selectedCity=" + t.desCity.showName + "&depCity=" + JSON.stringify(t.depCity)
                });
            },
            setLocCityData: function(t) {
                var e = wx.getStorageSync("busRecentData") || [], a = e.findIndex(function(e) {
                    return e.depCity.id == t.depCity.id && e.desCity.id == t.desCity.id;
                });
                -1 < a && e.splice(a, 1), e.unshift({
                    depCity: t.depCity,
                    desCity: t.desCity
                }), e = e.slice(0, 3), wx.setStorageSync("busRecentData", e);
            },
            getAnnounceList: function() {
                var t = this, e = this.data;
                (0, o.$http)(d.default.getAnnounceList, {
                    departureCityName: e.depCity.name,
                    departureStationName: e.depCity.station ? e.depCity.station.replace(/-/, "") : "",
                    pageType: "firstPage",
                    projectId: 0,
                    supplierId: "",
                    channelId: ""
                }).then(function(e) {
                    t.setData({
                        announceList: (0, o.isEmpty)(e) ? [] : e
                    });
                }).catch(function() {
                    t.setData({
                        announceList: []
                    });
                });
            },
            showNotice: function(t) {
                var e = t.currentTarget.dataset;
                (0, o.alert)(e.title, "温馨提示", !1, "", "我知道了");
            },
            getBannerData: function() {
                var t = this;
                this.data;
                (0, o.$http)(d.default.getAdvertListById, {
                    projectId: 1,
                    advertid: "001",
                    channelId: ""
                }).then(function(e) {
                    t.setData({
                        bannerImgs: e || []
                    });
                }).catch(function() {});
            },
            goPage: function(t) {
                var e = t.currentTarget.dataset, a = this.data.bannerImgs[e.index], i = (0, o.isEmpty)(a) ? "" : a.link;
                wx.navigateTo({
                    url: "/pages/webview/webview?src=" + encodeURIComponent(i)
                });
            },



            
            // 搜索汽车票按钮按钮，跳转到汽车票列表上
            goList: function(t) {
                var e = this.data;
                t.detail;
               
                    var a = "/pages/bus/webapp/list/list?fromcity=" + e.depCity.name + "&tocity=" + e.desCity.name + "&date=" + e.datetime + "&saledays=" + e.saleDayObj.saleDay + "&wxrefid=" + e.refid;
                    a = "/pages/bus/webapp/list/list?fromcity=" + e.depCity.name + "&tocity=" + e.desCity.name + "&date=" + e.datetime + "&fromstation=" + (e.depCity.searchName || "") + "&tostation=" + (e.desCity.searchName || "") + "&pid=&bfCityId=" + e.depCity.id + "&btCityId=" + e.desCity.id, 
                    this.setLocCityData(e), r.default.setEvent(y.index, "DLSY05", "^出发城市:" + e.depCity.name + "^到达城市:" + e.desCity.name + "^渠道Refid:[" + e.refid + "]^"), 
                    wx.navigateTo({
                        url: a
                    });
               
            },
            setRecentCity: function(t) {
                var e = t.currentTarget.dataset.index, a = this.data.busRecentData[e];
                this.setData((0, n.default)({}, a)), wx.setStorageSync("busDepCity", a.depCity), 
                wx.setStorageSync("busDesCity", a.desCity);
            },
            fnIsShowAgreementPop: function() {
                wx.getStorageSync("isShowAgreementPop");
            },
            onShareAppMessage: function() {
                return {
                    title: "买车票就上同程汽车票！省心、更放心！",
                    path: "/pages/index/index"
                };
            },
            btnAgree: function() {
                this.setData({
                    showUserAgreement: !1
                }), wx.showTabBar({
                    animation: !0
                }), wx.setStorageSync("showUserAgreement", 1);
            },
            fnShowAgreement: function(t) {
                var e = t.currentTarget.dataset;
                wx.navigateTo({
                    url: "/pages/userAgreement/userAgreement?id=" + e.id
                });
            },
            formBookingBtn: function(t) {
                var e = t.detail.formId;
                console.log(e), (0, o.saveFormid)(e, "首页", "", "首页");
            },
            btnShipUv: function() {
                r.default.setEvent(y.index, "DLSY06", "^推荐内容:船票^");
            }
        });
    }
}, [ 98 ]);