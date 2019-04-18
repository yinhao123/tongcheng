!function() {
    require("./../../../../common.js"), wx.webpackJsonp.apply(null, arguments);
}([ 16 ], {
    122: function(t, e, n) {
        var s = n(0), i = "page/bus/webapp/insurance/insurance";
        Page({
            data: {
                insLists: [],
                defIns: {},
                title: "",
                detail: "",
                showPop: !1,
                defInsMulti: [],
                codeIndex: -1,
                insLink: ""
            },
            btnSelectIns: function(t) {
                var e, n, a = parseInt(t.currentTarget.dataset.pid), o = parseInt(t.currentTarget.dataset.code), r = this.data.insLists, u = this.data.defInsMulti;
                for (n = 0; n < r.length; n++) {
                    var c = r[n];
                    if (o == c.code) for (var d, f = 0; f < c.value.length; f++) if ((d = c.value[f]).pubID == a) {
                        e = d;
                        break;
                    }
                }
                4 == e.insCode && s.setEvent(i, "DD023", "^交通意外险名称:[" + e.pubName + "];售卖价格:[￥" + e.insCusPayTc + "/份]^"), 
                6 == e.insCode && s.setEvent(i, "DD024", "^手机遗失险名称:[" + e.pubName + "];售卖价格:[￥" + e.insCusPayTc + "/份]^"), 
                2 == e.insCode && s.setEvent(i, "DD025", "^目的地保障险名称:[" + e.pubName + "];售卖价格:[￥" + e.insCusPayTc + "/份]^"), 
                u.forEach(function(t, n) {
                    o == t.insCode && u.splice(n, 1, e);
                }), this.setData({
                    defInsMulti: u
                }), -1 < this.data.codeIndex && this.btnConfirm();
            },
            btnSwitchSelectIns: function(t) {
                var e, n, a = this, o = this.data.insLists, r = t.currentTarget.dataset.instype, u = this.data.defInsMulti;
                a.data.insLists.forEach(function(t, n) {
                    if (r == t.code) {
                        var s;
                        e = a.data.insLists[n].isCheck, a.setData((s = {}, s["insLists[" + n + "].isCheck"] = !e, 
                        s));
                    }
                });
                for (var c, d = 0; d < o.length; d++) if (c = o[d], r == c.code) for (var f, h = 0; h < c.value.length; h++) if (f = c.value[h], 
                !e == !!f.pubID) {
                    n = f;
                    break;
                }
                4 == n.insCode && s.setEvent(i, "DD023", "^交通意外险:[" + (e ? "关" : "开") + "]^"), 6 == n.insCode && s.setEvent(i, "DD024", "^手机遗失险:[" + (e ? "关" : "开") + "]^"), 
                2 == n.insCode && s.setEvent(i, "DD025", "^目的地保障险:[" + (e ? "关" : "开") + "]^"), 
                u.forEach(function(t, e) {
                    r == t.insCode && u.splice(e, 1, n);
                }), this.setData({
                    defInsMulti: u
                }), -1 < this.data.codeIndex && this.btnConfirm();
            },
            btnInsDetail: function(t) {
                var e, n = this, a = this.data.insLists, o = parseInt(t.currentTarget.dataset.pid), r = o ? "" : t.currentTarget.dataset.code;
                for (e = 0; e < a.length; e++) {
                    for (var u, c = a[e], d = 0; d < c.value.length; d++) if (u = c.value[d], o && u.pubID == o) {
                        this.setData({
                            title: u.insName,
                            detail: u.insContent,
                            insLink: u.link || "",
                            showPop: !0
                        }), s.setEvent(i, "DD022", "^保险名称:[" + u.pubName + "]^");
                        break;
                    }
                    r && r == c.code && c.value.forEach(function(t) {
                        t.pubID && (n.setData({
                            title: t.insName,
                            detail: t.insContent,
                            insLink: t.link || "",
                            showPop: !0
                        }), s.setEvent(i, "DD022", "^保险名称:[" + t.pubName + "]^"));
                    });
                }
            },
            bntToggleInsType: function(t) {
                var e = this, n = t.currentTarget.dataset.instype;
                e.data.insLists.forEach(function(t, a) {
                    if ((t.insCode || t.code) == n) {
                        var o, r = e.data.insLists[a].isShrink;
                        e.setData((o = {}, o["insLists[" + a + "].isShrink"] = !r, o)), r || s.setEvent(i, "DD021");
                    }
                });
            },
            btnClosePop: function() {
                this.setData({
                    showPop: !1
                });
            },
            btnConfirm: function() {
                s.setEvent(i, "DD026"), wx.setStorageSync("bus_insuranceDefMulti", this.data.defInsMulti), 
                wx.navigateBack();
            },
            onLoad: function() {
                var t = wx.getStorageSync("bus_insuranceLists"), e = wx.getStorageSync("bus_insuranceDefMulti"), n = wx.getStorageSync("bus_insurance_style_2");
                t.forEach(function(t, n) {
                    t.isShrink = !1, 2 == t.value.length && t.value.forEach(function(s) {
                        s.pubID && (t.validInsPrice = s.insCusPayTc), e[n].pubID == s.pubID && (t.isCheck = !!s.pubID), 
                        s.pubID && s.shortDescribe && (t.shortDescribe = s.shortDescribe);
                    });
                }), this.setData({
                    insLists: t,
                    defInsMulti: e,
                    codeIndex: n && -1 < n.index ? n.index : -1
                });
            },
            onShow: function() {
                var t = [];
                this.data.insLists.forEach(function(e) {
                    var n = {};
                    n.insCode = e.insCode, n.insName = e.insName, n.insuranceList = [], e.value.forEach(function(t) {
                        n.insuranceList.push({
                            id: t.pubID,
                            price: t.insCusPayTc
                        });
                    }), t.push(n);
                }), s.setEvent(i, "DD036", "^保险JSON字符串：" + JSON.stringify(t) + "^");
            },
            goDetailLink: function(t) {
                var e = t.currentTarget.dataset.link;
                wx.navigateTo({
                    url: "/pages/webview/webview?src=" + encodeURIComponent(e)
                });
            },
            onShareAppMessage: function() {
                return {
                    title: "买车票就上同程汽车票！省心、更放心！",
                    path: "/pages/index/index"
                };
            }
        });
    }
}, [ 122 ]);