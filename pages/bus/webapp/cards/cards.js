!function() {
    require("./../../../../common.js"), wx.webpackJsonp.apply(null, arguments);
}([ 18 ], {
    127: function(e, a, t) {
        var s = t(5);
        t(0);
        Page({
            data: {
                cardMsg: [],
                selectCode: {},
                pageDate: [],
                pageselectCode: {},
                code: "",
                canUseNumber: 0,
                cannotUseNumber: 0,
                hasSelected: !1,
                isUseShow: !0,
                isUnUseShow: !1,
                circle: [ "", "", "", "", "", "", "", "", "", "", "", "" ],
                havePerferInfo: !1,
                showTips: !1,
                alreadyShow: !1
            },
            isEmptyObject: function(e) {
                for (var a in e) return !1;
                return !0;
            },
            onLoad: function(e) {
                var a = this;
                e && !!e.havePerferInfo && a.setData({
                    havePerferInfo: "1" == e.havePerferInfo
                });
                try {
                    var t = wx.getStorageSync("bus_selectCode") || {}, s = wx.getStorageSync("bus_cardMsg");
                } catch (e) {}
                this.isEmptyObject(t) || !t.code ? this.setData({
                    selectCode: t,
                    cardMsg: s,
                    pageDate: s,
                    pageselectCode: t,
                    canUseNumber: s.canUseNumber,
                    cannotUseNumber: s.cannotUseNumber,
                    code: ""
                }) : this.setData({
                    selectCode: t,
                    cardMsg: s,
                    pageDate: s,
                    pageselectCode: t,
                    canUseNumber: s.canUseNumber,
                    cannotUseNumber: s.cannotUseNumber,
                    code: t.code
                }), this.renderPage();
            },
            renderPage: function() {
                var e = this, a = !1, t = e.data.pageDate, s = t.cannotUseList, i = t.canUseList;
                if (0 < e.data.pageDate.canUseNumber && (i.forEach(function(e) {
                    new Date().getTime(), new Date(e.receiveTime.replace(/-/g, "/")).getTime(), new Date(e.expiredTime.replace(/-/g, "/")).getTime();
                    e.validity = "有效期至" + e.expiredTime.substr(0, 10);
                }), e.setData({
                    pageDate: t
                })), e.isEmptyObject(e.data.pageselectCode)) {
                    for (var c = 0, n = e.data.pageDate.canUseList.length; c < n; c++) t.canUseList[c].hasSelected = "", 
                    t.canUseList[c].expiredTime = t.canUseList[c].expiredTime.substr(0, 10);
                    e.setData({
                        pageDate: t,
                        hasSelected: !1
                    });
                } else {
                    for (var c = 0, n = e.data.pageDate.canUseList.length; c < n; c++) e.data.pageDate.canUseList[c].code == e.data.pageselectCode.code ? (t.canUseList[c].hasSelected = "hasSelected", 
                    t.canUseList[c].expiredTime = t.canUseList[c].expiredTime.substr(0, 10), a = !0) : (t.canUseList[c].hasSelected = "", 
                    t.canUseList[c].expiredTime = t.canUseList[c].expiredTime.substr(0, 10));
                    e.setData({
                        pageDate: t,
                        hasSelected: a
                    });
                }
                0 < e.data.pageDate.cannotUseNumber && (s.forEach(function(e) {
                    var a = new Date().getTime(), t = (new Date(e.receiveTime.replace(/-/g, "/")).getTime(), 
                    new Date(e.expiredTime.replace(/-/g, "/")).getTime());
                    e.validity = "有效期至" + e.expiredTime.substr(0, 10), e.reason = a > t ? "pastdue" : "notmatch";
                }), i.forEach(function(e) {
                    if (!e.isCanUse) {
                        new Date().getTime(), new Date(e.receiveTime.replace(/-/g, "/")).getTime(), new Date(e.expiredTime.replace(/-/g, "/")).getTime();
                        e.validity = "有效期至" + e.expiredTime.substr(0, 10), e.reason = "notmatch";
                    }
                }), e.setData({
                    pageDate: t
                }));
            },
            useShow: function() {
                this.setData({
                    isUseShow: !0,
                    isUnUseShow: !1
                });
            },
            rejectShow: function() {
                this.setData({
                    isUseShow: !1,
                    isUnUseShow: !0
                });
            },
            chooseCards: function(e) {
                var a, t, s = this, i = e.currentTarget.dataset, c = i.index;
                if ("-1" != c) {
                    for (var n = 0, d = this.data.pageDate.canUseList.length; n < d; n++) n == c ? "hasSelected" == (t = this.data.pageDate.canUseList[n].hasSelected) ? (this.data.code = "", 
                    this.data.pageDate.canUseList[n].hasSelected = " ", t = " ", a = {}) : (this.data.code = i.code, 
                    this.data.pageDate.canUseList[n].hasSelected = "hasSelected", t = "hasSelected", 
                    a = this.data.pageDate.canUseList[n], s.data.havePerferInfo && !s.data.alreadyShow && (s.setData({
                        showTips: !0,
                        alreadyShow: !0
                    }), setTimeout(function() {
                        s.setData({
                            showTips: !1
                        });
                    }, 3e3))) : this.data.pageDate.canUseList[n].hasSelected = " ";
                    this.setData({
                        pageDate: this.data.pageDate,
                        hasSelected: "hasSelected" == t,
                        pageselectCode: a
                    });
                } else {
                    for (var n = 0, d = this.data.pageDate.canUseList.length; n < d; n++) this.data.pageDate.canUseList[n].hasSelected = "";
                    this.setData({
                        pageDate: this.data.pageDate,
                        hasSelected: !1,
                        pageselectCode: {}
                    });
                }
                wx.setStorageSync("bus_cardCode", s.data.code), wx.setStorageSync("bus_selectCode", s.data.pageselectCode);
            },
            submitBtn: function() {
                s.setEvent("page/bus/webapp/cards/cards", "DLDD08", "^优惠券名称:[" + (this.data.pageselectCode.code || "") + "]^"), 
                wx.navigateBack();
            },
            onShareAppMessage: function() {
                return {
                    title: "买车票就上同程汽车票！省心、更放心！",
                    path: "/pages/index/index"
                };
            }
        });
    }
}, [ 127 ]);