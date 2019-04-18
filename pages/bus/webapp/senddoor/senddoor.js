!function() {
    require("./../../../../common.js"), wx.webpackJsonp.apply(null, arguments);
}([ 13 ], {
    129: function(t, e, a) {
        getApp();
        var i = a(1).default, n = a(0), r = "page/bus/webapp/booking/booking";
        Page({
            data: {
                isEmptyRegion: !0,
                region: [],
                addName: "",
                phoneSpace: "",
                contactPhone: "",
                addressDetail: "",
                localDetail: {},
                freightPrice: {},
                phoneFocus: !1,
                addressFocus: !1
            },
            tmpData: {
                privince: {},
                regionA: "",
                regionB: "",
                regionC: ""
            },
            onLoad: function() {},
            onReady: function() {},
            onShow: function() {
                var t = this;
                try {
                    var e = wx.getStorageSync("bus_addressInfo"), a = wx.getStorageSync("bus_TicketInfo");
                    n.isEmpty(e) || (t.setData({
                        isEmptyRegion: !1,
                        region: e.region,
                        addName: e.addName,
                        phoneSpace: e.phoneSpace,
                        contactPhone: e.contactPhone,
                        addressDetail: e.addressDetail,
                        freightPrice: e.freightPrice
                    }), this.tmpData.regionA = e.region[0], this.tmpData.regionB = e.region[1]), this.data.localDetail = a;
                } catch (t) {}
                n.wxhttp(i.getCitiesByBLCP, {
                    id: 1e3
                }).then(function(e) {
                    e.header.isSuccess && !n.isEmpty(e.body) && (t.tmpData.privince = e.body);
                }).catch(function() {});
            },
            onHide: function() {},
            onUnload: function() {},
            onPullDownRefresh: function() {},
            onReachBottom: function() {},
            onShareAppMessage: function() {
                return {
                    title: "买车票就上同程汽车票！省心、更放心！",
                    path: "/pages/index/index"
                };
            },
            inputName: function(t) {
                var e = t.detail.value.replace(/\s/gi, "");
                this.setData({
                    addName: e
                }), n.setEvent(r, "收件人名字");
            },
            submitAddress: function() {
                if (n.isEmpty(this.data.addName)) return n.alert("请输入寄件姓名！"), !1;
                if (n.isEmpty(this.data.contactPhone) && !this.isMobile(this.data.contactPhone)) return n.alert("请输入正确的手机号"), 
                n.setEvent(r, "DD039", "^名称:[请输入正确的手机号]^"), !1;
                if (this.data.isEmptyRegion) return n.alert("请选择所在地区"), !1;
                if (!this.data.addressDetail) return n.alert("请填写详细地址"), !1;
                if (n.isEmpty(this.data.freightPrice)) return n.alert("该地区暂不支持配送"), !1;
                try {
                    wx.setStorageSync("bus_addressInfo", {
                        addName: this.data.addName,
                        contactPhone: this.data.contactPhone,
                        region: this.data.region,
                        modefyRegion: [ this.tmpData.regionA, this.tmpData.regionB, this.data.region[2] ],
                        addressDetail: this.data.addressDetail,
                        phoneSpace: this.data.phoneSpace,
                        freightPrice: this.data.freightPrice,
                        hdSupplierId: this.data.freightPrice.hdSupplierId,
                        agentFee: this.data.freightPrice.payAgentCharge,
                        expressFee: this.data.freightPrice.payExpressCharge,
                        homeDeliveryId: this.data.freightPrice.homeDeliveryId
                    });
                } catch (t) {}
                wx.navigateBack({
                    delta: 1
                });
            },
            blurAddress: function(t) {
                n.isEmpty(t.detail.value) || this.setData({
                    addressDetail: t.detail.value
                });
            },
            bindRegionChange: function(t) {
                var e = this, a = !0, r = {}, s = {};
                n.isEmpty(t.detail.value) || (a = !1), this.setData({
                    region: t.detail.value,
                    isEmptyRegion: a
                });
                for (var o = this.tmpData.privince, d = Array.isArray(o), c = 0, o = d ? o : o[Symbol.iterator](); ;) {
                    var h;
                    if (d) {
                        if (c >= o.length) break;
                        h = o[c++];
                    } else {
                        if ((c = o.next()).done) break;
                        h = c.value;
                    }
                    var l = h;
                    if (l.name == this.data.region[0] || 0 <= this.data.region[0].indexOf(l.name)) {
                        r = l;
                        break;
                    }
                }
                if (this.tmpData.regionA = r.name, !n.isEmpty(r)) {
                    var u = "";
                    u = "县" == e.data.region[1] ? e.data.region[0] : e.data.region[1], n.wxhttp(i.getCitiesByBLCP, {
                        id: r.id
                    }).then(function(t) {
                        if (t.header.isSuccess && !n.isEmpty(t.body)) {
                            for (var a = t.body, i = Array.isArray(a), r = 0, a = i ? a : a[Symbol.iterator](); ;) {
                                var o;
                                if (i) {
                                    if (r >= a.length) break;
                                    o = a[r++];
                                } else {
                                    if ((r = a.next()).done) break;
                                    o = r.value;
                                }
                                var d = o;
                                if (d.name == u || 0 <= u.indexOf(d.name)) {
                                    s = d;
                                    break;
                                }
                            }
                            e.tmpData.regionB = s.name, e.getPostMsg(s);
                        }
                    }).catch(function() {
                        n.alert("该地区暂不支持配送");
                    });
                }
            },
            getPostMsg: function(t) {
                var e = this;
                n.wxhttp(i.getHomeDelivery, {
                    departureName: e.data.localDetail.departure || "",
                    departureStation: e.data.localDetail.dptstation || "",
                    mailCityId: t.id || "",
                    mailCityName: t.name || "",
                    projectId: 0
                }).then(function(t) {
                    t.header.isSuccess && !n.isEmpty(t.body) ? e.data.freightPrice = t.body : n.alert("该地区暂不支持配送");
                }).catch(function() {
                    e.data.freightPrice = {}, n.alert("该地区暂不支持配送");
                });
            },
            inputPhoneNum: function(t) {
                var e, a = t.detail.value.replace(/\s/gi, ""), i = a.length;
                3 >= i ? e = a : 3 < i && 7 >= i ? e = a.substr(0, 3) + " " + a.substr(3) : (11 < i && (a = a.substr(0, 11)), 
                e = a.substr(0, 3) + " " + a.substr(3, 4) + " " + a.substr(7, 4), 11 == i && this.isMobile(a) && (this.blurred(), 
                wx.setStorageSync("bus_newContactPhone", a))), this.setData({
                    contactPhone: a,
                    phoneSpace: e
                });
            },
            blurPhone: function(t) {
                this.setData({
                    phoneFocus: !1
                });
                var e = t.detail.value.replace(/\s/gi, "");
                this.isMobile(e) || (n.alert("请输入正确的手机号"), n.setEvent(r, "DD039", "^名称:[请输入正确的手机号]^")), 
                n.setEvent(r, "DD016", "^取票人手机号:[" + e + "]^");
            },
            isMobile: function(t) {
                return /^(1[3-9][0-9])\d{8}$/.test(t);
            },
            blurred: function() {
                this.setData({
                    phoneFocus: !1
                });
            },
            inputAddress: function(t) {
                var e = t.detail.value;
                e != this.data.addressDetail && this.setData({
                    addressDetail: e
                });
            }
        });
    }
}, [ 129 ]);