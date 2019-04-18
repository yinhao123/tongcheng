!function() {
    require("./../../../../common.js"), wx.webpackJsonp.apply(null, arguments);
}([ 1 ], {
    126: function(t, e, a) {
        var i = Math.atan, n = Math.PI, o = Math.sin, r = Math.sqrt, s = Math.floor, d = a(5), u = a(0), c = "page/bus/webapp/notices/notices", l = a(1).default;
        Page({
            data: {
                isBus: 1,
                noticeParam: {},
                notice: "",
                pagename: "",
                isHiddenMap: !1,
                latitude: 0,
                longitude: 0,
                allStation: {},
                station: "",
                nowStation: {},
                markers: [],
                stationhover: "",
                stationun: "",
                isClosest: "0",
                fromPage: "",
                orderdetail: {},
                guessToRefund: 0,
                lijianCard: 0,
                BusYiyuanFree: 0,
                BusYiyuanFreename: "",
                coefficientFee: 0,
                serviceCharges: 0,
                FastTicketOut: 0,
                refundFee: 0,
                refundName: "",
                refundTicketStr: [],
                shortrefundTicketStr: [],
                limitedStartTime: new Date(),
                nowTime: new Date(),
                isRefund: !1
            },
            ajaxGetNotice: function() {
                var t = this;
                wx.request({
                    url: l.root + "notice/getNotice?plateId=12",
                    method: "POST",
                    header: {
                        "content-type": "application/json",
                        openid: wx.getStorageSync("tongcheng.openid"),
                        unionId: wx.getStorageSync("tongcheng.unionid")
                    },
                    data: JSON.stringify(t.data.noticeParam),
                    success: function(e) {
                        if (e.data.header && e.data.body.notice) {
                            var a = e.data.body.notice;
                            a = (a = (a = a.replace(/(?!<br.+?>)<.+?>/gi, "")).replace(/<br\/>|<br><br>/gi, "<br>")).split("<br>"), 
                            t.setData({
                                notice: a
                            });
                        }
                    }
                });
            },
            onShow: function() {
                this.ajaxGetNotice();
            },
            onLoad: function(t) {
                if ("notices" == t.pagename) {
                    wx.setNavigationBarTitle({
                        title: "汽车票须知"
                    }), this.data.pagename = "notices";
                    var e = t.param ? JSON.parse(t.param) : {};
                    this.setData({
                        isBus: t.bus,
                        noticeParam: e,
                        pagename: this.data.pagename
                    });
                } else if ("refundPage" == t.pagename) {
                    wx.setNavigationBarTitle({
                        title: "退票"
                    });
                    var i = this, n = getCurrentPages();
                    if (!(2 <= n.length) || "page/bus/webapp/orderdetail/orderdetail" != n[n.length - 2].route || u.isEmpty(n[n.length - 2].data) || u.isEmpty(n[n.length - 2].data.orderDetail) || (console.log(n[n.length - 2].data.orderDetail), 
                    this.setData({
                        orderdetail: n[n.length - 2].data.orderDetail
                    })), u.isEmpty(this.data.orderdetail)) o = wx.getStorageSync("noticesdata"); else var o = this.data.orderdetail;
                    wx.removeStorage({
                        key: "noticesdata",
                        success: function() {
                            console.log("noticesdata数据清除成功");
                        }
                    }), this.getKanInfo(function(t) {
                        var e = o, a = 1e3 * e.totalAmount, n = !1, r = t ? new Date(u.getDate(t)).getTime() : new Date(u.getDate(e.serverTime)).getTime(), d = (new Date(), 
                        0), c = 0, l = "", m = 0, f = 0, g = 0, p = "", h = [], T = [];
                        if (i.data.orderdetail = e, e.pricesInfo.forEach(function(t) {
                            5 == t.itemCode && "服务费" == t.name ? (a -= t.amount * e.count * 1e3, m = t.amount * e.count) : "退改无忧" == t.name || "退票无忧" == t.name || "随心退" == t.name ? (a -= t.amount * e.count * 1e3, 
                            g = t.amount * e.count, p = t.name, n = !0) : "极速出票" == t.name ? (a -= t.amount * e.count * 1e3, 
                            f = t.amount * e.count) : "立减卡" == t.name || "28" == t.itemCode ? (a -= 1e3 * t.amount, 
                            d = t.amount) : "BusYiyuanFree" == t.itemCode && (a -= t.amount * e.count * 1e3, 
                            c = t.amount * e.count, l = t.name);
                        }), n && !u.isEmpty(e.refundCarefreeRefundRuleList)) {
                            a = i.calTimeToMoney(a, r);
                            var S = (e.refundCarefreeRefundRuleList || []).length, w = 0, y = 0, x = 0, v = 0;
                            (e.refundCarefreeRefundRuleList || []).forEach(function(t) {
                                0 <= t.endTime.toString().indexOf("9999") ? (0 <= t.startTime.toString().indexOf(".") ? (w = t.startTime.toString().split(".")[0], 
                                y = t.startTime.toString().split(".")[1] ? s(t.startTime.toString().split(".")[1] / 10 * 60) : 0) : (w = t.startTime, 
                                y = 0), h.push({
                                    validFrom: 0 < w ? w + "小时" + (0 < y ? y + "分钟" : "") : 0 < y ? y + "分钟" : "",
                                    validTo: "",
                                    refundFeeRate: 100 - t.coefficient
                                })) : (0 <= t.startTime.toString().indexOf(".") ? (w = t.startTime.toString().split(".")[0], 
                                y = t.startTime.toString().split(".")[1] ? s(t.startTime.toString().split(".")[1] / 10 * 60) : 0) : (w = t.startTime, 
                                y = 0), 0 <= t.endTime.toString().indexOf(".") ? (x = t.endTime.toString().split(".")[0], 
                                v = t.endTime.toString().split(".")[1] ? s(t.endTime.toString().split(".")[1] / 10 * 60) : 0) : (x = t.endTime, 
                                v = 0), h.push({
                                    validFrom: 0 < w ? w + "小时" + (0 < y ? y + "分钟" : "") : 0 < y ? y + "分钟" : "",
                                    validTo: (0 < x ? x + "小时" : "") + (0 < v ? v + "分钟" : ""),
                                    refundFeeRate: 100 - t.coefficient
                                }));
                            }), h.reverse(), T = !u.isEmpty(h) && 2 >= h.length ? h.slice() : h.slice(-2);
                        } else if (!u.isEmpty(e.refundTicketRuleList)) {
                            a = i.calTimeToMoneys(a, r);
                            var h = [], T = [], S = (e.refundTicketRuleList || []).length;
                            (e.refundTicketRuleList || []).forEach(function(t, e) {
                                h.push({
                                    validFrom: 0 < t.fromHour ? t.fromHour + "小时" + (0 < t.fromMinus ? t.fromMinus + "分钟" : "") : 0 < t.fromMinus ? t.fromMinus + "分钟" : "",
                                    validTo: S - 1 == e ? 0 <= (t.toHour + "").indexOf("1666") ? "" : t.toHour : t.toHour + "小时" + (0 < t.toMinus ? t.toMinus + "分钟" : ""),
                                    refundFeeRate: t.refundFeeRate
                                });
                            }), h.reverse(), T = !u.isEmpty(h) && 2 >= h.length ? h.slice() : h.slice(-2);
                        }
                        i.setData({
                            pagename: "refundPage",
                            orderdetail: e,
                            guessToRefund: 0 > a ? 0 : a,
                            serviceCharges: m,
                            FastTicketOut: f,
                            refundFee: g,
                            refundName: p,
                            refundTicketStr: h,
                            shortrefundTicketStr: T,
                            nowTime: r,
                            isRefund: n,
                            lijianCard: d,
                            BusYiyuanFree: c,
                            BusYiyuanFreename: l
                        });
                    });
                } else if ("map" == t.pagename) {
                    wx.setNavigationBarTitle({
                        title: "车站地图"
                    }), this.data.fromPage = t.from;
                    var r, d, i = this;
                    this.data.pagename = "map", i.setData({
                        pagename: "map"
                    });
                    try {
                        r = wx.getStorageSync("allStation") || {}, d = wx.getStorageSync("mapTmp") || "";
                    } catch (t) {}
                    r = JSON.parse(r), d = JSON.parse(d), i.setData({
                        pagename: i.data.pagename,
                        allStation: r,
                        station: d.station,
                        nowStation: r[d.station]
                    }), wx.getLocation({
                        type: "wgs84",
                        success: function(t) {
                            var e = t.latitude, n = t.longitude, o = i.BdmapEncryptToMapabc(e, n), s = [], u = 1;
                            for (var c in r) {
                                var l = i.BdmapEncryptToMapabc(r[c].Latitude, r[c].Longitude), m = "", f = i.getFlatternDistance(l.lat, l.lng, o.lat, o.lng);
                                s.push({
                                    station: r[c].station,
                                    singleDistance: f
                                }), m = a(i.data.station == r[c].station ? 40 : 59), i.data.markers.push({
                                    id: u,
                                    latitude: l.lat,
                                    longitude: l.lng,
                                    title: r[c].station,
                                    iconPath: m,
                                    alpha: 1,
                                    width: 30,
                                    height: 50,
                                    label: {},
                                    isClosest: "0"
                                }), u++;
                            }
                            s.sort(function(t, e) {
                                return t.singleDistance - e.singleDistance;
                            });
                            var g = s[0];
                            i.data.markers.forEach(function(t, e) {
                                t.title == g.station && (i.data.markers[e].isClosest = "1");
                            }), i.renderMap(i.data.nowStation.Latitude, i.data.nowStation.Longitude, d.station, g.station);
                        }
                    });
                }
            },
            renderMap: function(t, e, i, n) {
                var o = this, r = this.BdmapEncryptToMapabc(t, e);
                this.setData({
                    tabNavbar: !1,
                    latitude: r.lat,
                    longitude: r.lng,
                    isHiddenMap: !1,
                    station: i,
                    stationaddress: this.data.nowStation.StationAddress,
                    contactphoneno: this.data.nowStation.ContactPhoneNo ? this.data.nowStation.ContactPhoneNo.split("/") : "",
                    starttime: this.data.nowStation.takeTicketStartTime,
                    endtime: this.data.nowStation.takeTicketEndTime,
                    markers: o.data.markers,
                    isClosest: i == n ? "1" : "0"
                }), this.mapCtx = wx.createMapContext("stationMap"), this.mapCtx.moveToLocation(), 
                wx.getSystemInfo({
                    success: function(t) {
                        o.setData({
                            controls: [ {
                                id: 1,
                                iconPath: a(40),
                                position: {
                                    left: 20,
                                    top: t.windowHeight - 80,
                                    width: 50,
                                    height: 50
                                },
                                clickable: !0
                            } ]
                        });
                    }
                });
            },
            markertap: function(t) {
                var e = this, i = parseInt(t.markerId) - 1, n = this.data.allStation[this.data.markers[i].title], o = !1;
                this.data.markers.forEach(function(t, r) {
                    t.title == n.station ? (e.data.markers[i].iconPath = a(40), e.data.markers[i].width = 30, 
                    e.data.markers[i].height = 50, o = 1 == t.isClosest ? 1 : 0) : e.data.markers[r].iconPath = a(59);
                }), this.setData({
                    station: n.station,
                    stationaddress: n.StationAddress,
                    contactphoneno: this.data.nowStation.ContactPhoneNo ? this.data.nowStation.ContactPhoneNo.split("/") : "",
                    starttime: n.takeTicketStartTime,
                    endtime: n.takeTicketEndTime,
                    latitude: n.Latitude,
                    longitude: n.Longitude,
                    markers: e.data.markers,
                    isClosest: o
                });
            },
            openLocation: function(t) {
                var e = t.currentTarget.dataset.latitude, a = t.currentTarget.dataset.longitude, i = t.currentTarget.dataset.station;
                wx.openLocation({
                    latitude: e,
                    longitude: a,
                    scale: 14,
                    name: i
                }), u.setEvent(c, "LB30", "^地图-导航^");
            },
            BdmapEncryptToMapabc: function(t, e) {
                var a = Math.cos, i = {}, n = 52.35987755982988, s = new Number(e - .0065), d = new Number(t - .006), u = r(s * s + d * d) - 2e-5 * o(d * n), c = Math.atan2(d, s) - 3e-6 * a(s * n), l = u * a(c), m = u * o(c);
                return i.lng = l, i.lat = m, i;
            },
            getRad: function(t) {
                return t * n / 180;
            },
            getDistance: function(t, e, a, n) {
                var s, d, u, c, l, m, f, g = this.getRad((t + a) / 2), p = this.getRad((t - a) / 2), h = this.getRad((e - n) / 2), T = o(p), S = o(h), w = o(g);
                return T *= T, S *= S, w *= w, s = T * (1 - S) + (1 - w) * S, d = (1 - T) * (1 - S) + w * S, 
                u = i(r(s / d)), c = r(s * d) / u, l = 2 * u * 6378137, m = (3 * c - 1) / 2 / d, 
                f = (3 * c + 1) / 2 / s, s = l * (1 + 1 / 298.257 * (m * w * (1 - T) - f * (1 - w) * T)), 
                s /= 1e3, s = s.toFixed(2);
            },
            getFlatternDistance: function(t, e, a, n) {
                var s, d, u, c, l, m, f, g = this.getRad((t + a) / 2), p = this.getRad((t - a) / 2), h = this.getRad((e - n) / 2), T = o(p), S = o(h), w = o(g);
                return T *= T, S *= S, w *= w, s = T * (1 - S) + (1 - w) * S, d = (1 - T) * (1 - S) + w * S, 
                u = i(r(s / d)), c = r(s * d) / u, l = 2 * u * 6378137, m = (3 * c - 1) / 2 / d, 
                f = (3 * c + 1) / 2 / s, l * (1 + 1 / 298.257 * (m * w * (1 - T) - f * (1 - w) * T));
            },
            NowCarList: function() {
                if ("busdetail" == this.data.fromPage) {
                    var t = this.data.allStation;
                    return wx.redirectTo({
                        url: "/pages/bus/webapp/list/list?fromcity=" + t[this.data.station].departure + "&tocity=" + t[this.data.station].destination + "&date=" + t[this.data.station].dptDate + "&fromstation=" + t[this.data.station].dptStation + "&tostation=" + t[this.data.station].arrStation + "&pid=" + t[this.data.station].pid + "&bfCityId=" + t[this.data.station].depCId + "&btCityId=" + t[this.data.station].desCId
                    }), !1;
                }
                wx.setStorageSync("bus-selectStation", this.data.station), u.setEvent(c, "LB31", "^地图-查看班次^"), 
                setTimeout(function() {
                    wx.navigateBack();
                }, 100);
            },
            makePhoneCall: function(t) {
                var e = t.currentTarget.dataset.tel;
                0 <= e.indexOf("/") && (e = e.split("/")[0]), wx.makePhoneCall({
                    phoneNumber: e
                }), u.setEvent(c, "LB32", "^地图-电话^");
            },
            calTimeToMoney: function(t, e) {
                var a, i, n, o, r = this, d = this.data.orderdetail, c = 0, l = new Date(), m = new Date(u.getDate(d.dptDateTime)).getTime(), f = 0;
                return u.isEmpty(d.refundCarefreeRefundRuleList) || d.refundCarefreeRefundRuleList.forEach(function(u, g) {
                    0 <= u.endTime.toString().indexOf("9999") ? (0 <= u.startTime.toString().indexOf(".") ? (a = u.startTime.toString().split(".")[0], 
                    i = u.startTime.toString().split(".")[1] ? s(u.startTime.toString().split(".")[1] / 10 * 60) : 0) : (a = u.startTime, 
                    i = 0), (c = m - (60 * parseInt(a) * 60 * 1e3 + 60 * parseInt(i) * 1e3)) >= e && (f = (d.totalTicketAmount * (100 - u.coefficient) / 100).toFixed(2), 
                    t -= 1e3 * f), 0 == g && r.setData({
                        limitedStartTime: c
                    }), r.setData({
                        coefficientFee: f
                    })) : (0 <= u.startTime.toString().indexOf(".") ? (a = u.startTime.toString().split(".")[0], 
                    i = u.startTime.toString().split(".")[1] ? s(u.startTime.toString().split(".")[1] / 10 * 60) : 0, 
                    c = m - (60 * parseInt(a) * 60 * 1e3 + 60 * parseInt(i) * 1e3)) : (a = u.startTime, 
                    i = 0, c = m - (60 * parseInt(a) * 60 * 1e3 + 60 * parseInt(i) * 1e3)), 0 <= u.endTime.toString().indexOf(".") ? (n = u.endTime.toString().split(".")[0], 
                    o = u.endTime.toString().split(".")[1] ? s(u.endTime.toString().split(".")[1] / 10 * 60) : 0, 
                    l = m - (60 * parseInt(n) * 60 * 1e3 + 60 * parseInt(o) * 1e3)) : (n = u.endTime, 
                    o = 0, l = m - (60 * parseInt(n) * 60 * 1e3 + 60 * parseInt(o) * 1e3)), e <= c && e >= l && (f = (d.totalTicketAmount * (100 - u.coefficient) / 100).toFixed(2), 
                    t -= 1e3 * f), 0 == g && r.setData({
                        limitedStartTime: c
                    }), r.setData({
                        coefficientFee: f
                    }));
                }), t / 1e3;
            },
            calTimeToMoneys: function(t, e) {
                var a, i, n, o, r = this, s = this.data.orderdetail, d = 0, c = new Date(), l = new Date(u.getDate(s.dptDateTime)).getTime(), m = 0;
                return u.isEmpty(s.refundTicketRuleList) || s.refundTicketRuleList.forEach(function(u, f) {
                    0 <= u.toHour.toString().indexOf("1666") ? (a = u.fromHour, i = u.fromMinus, (d = l - (60 * parseInt(a) * 60 * 1e3 + 60 * i * 1e3)) >= e && (m = (s.totalTicketAmount * u.refundFeeRate / 100).toFixed(2), 
                    t -= 1e3 * m), 0 == f && r.setData({
                        limitedStartTime: d
                    }), r.setData({
                        coefficientFee: m
                    })) : (a = u.fromHour, i = u.fromMinus, d = l - (60 * parseInt(a) * 60 * 1e3 + 60 * i * 1e3), 
                    n = u.toHour, o = u.toMinus, c = l - (60 * parseInt(n) * 60 * 1e3 + 60 * o * 1e3), 
                    e <= d && e >= c && (m = (s.totalTicketAmount * u.refundFeeRate / 100).toFixed(2), 
                    t -= 1e3 * m), 0 == f && r.setData({
                        limitedStartTime: d
                    }), r.setData({
                        coefficientFee: m
                    }));
                }), t / 1e3;
            },
            getKanInfo: function(t) {
                wx.request({
                    url: l.getServerTime,
                    method: "POST",
                    header: {
                        "Content-Type": "application/json",
                        openid: wx.getStorageSync("tongcheng.openid") || "",
                        unionid: wx.getStorageSync("tongcheng.unionid") || ""
                    },
                    data: {},
                    success: function(e) {
                        e.data.header.isSuccess ? "function" == typeof t && t(e.data.body) : t("");
                    }
                });
            },
            checkrefundToast: function() {
                var t = this;
                d.setEvent(c, "DLXQ16", "^提交退票^"), this.data.nowTime < this.data.limitedStartTime ? t.refundReq() : (this.setData({
                    refundType: 3,
                    refundDisable: !0
                }), u.alert("当前已过网上可退票时间，请至车站窗口办理", "", !1, "取消", "好的", function() {}));
            },
            refundReq: function() {
                var t, e = this.data.orderdetail;
                0 < e.refundRuleId ? t = l.applyRefundTicketByRule : !!e.isRefund && (t = l.applyRefundTicket), 
                u.loading(), wx.request({
                    url: t,
                    header: {
                        "Content-Type": "application/json",
                        openid: wx.getStorageSync("tongcheng.openid") || "",
                        unionid: wx.getStorageSync("tongcheng.unionid") || ""
                    },
                    method: "POST",
                    data: JSON.stringify({
                        orderSerialId: e.orderSerialId
                    }),
                    success: function(t) {
                        var a = "";
                        a = t.data.header.isSuccess && t.data.body ? "退票提交成功" : "退票提交失败，建议至发车站直接办理", wx.showToast({
                            title: a,
                            icon: "none",
                            duration: 3e3,
                            complete: function() {
                                !!t.data.header.isSuccess && t.data.body && setTimeout(function() {
                                    wx.redirectTo({
                                        url: "/pages/bus/webapp/orderdetail/orderdetail?isReadTime=true&orderSerialId=" + e.orderSerialId
                                    });
                                }, 3e3);
                            }
                        });
                    },
                    error: function() {
                        setTimeout(function() {
                            wx.showToast({
                                text: "抱歉，服务开小差了，请稍后重试。",
                                icon: "none",
                                duration: 2e3
                            });
                        }, 1e3);
                    },
                    complete: function() {}
                });
            },
            onShareAppMessage: function() {
                return {
                    title: "买车票就上同程汽车票！省心、更放心！",
                    path: "/pages/index/index"
                };
            }
        });
    },
    40: function(t, e, a) {
        t.exports = a.p + "images/stationhover.png";
    },
    59: function(t, e, a) {
        t.exports = a.p + "images/stationun.png";
    }
}, [ 126 ]);