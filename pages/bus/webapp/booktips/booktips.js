!function() {
    require("./../../../../common.js"), wx.webpackJsonp.apply(null, arguments);
}([ 21 ], {
    123: function(e, t, a) {
        var i = a(1).default, r = a(0), n = "page/bus/webapp/booktips/booktips", s = {
            refundTime1: "",
            refundTime2: ""
        };
        Page({
            data: {
                notice: "",
                RiseRatio: 30,
                busInfo: {},
                state: {
                    qu: !1,
                    tui: !1,
                    gai: !1,
                    other: !1
                },
                isShowOhter: !1,
                isShowNotice: !1,
                isShowRefundPop: !1,
                refundTime: "",
                refundTimeHasDate: !1,
                gaiTime: "",
                refundTxt: "",
                startStr: "",
                endStr: "",
                coefficient: "",
                refundTicketStr: [],
                shortrefundTicketStr: [],
                isShowPopBuy: !1,
                refundFeeRateOld: 0,
                refundFeeRateNew: 0,
                saveOld: 0,
                saveNew: 0,
                maxSavePrice: 0,
                isBuySuixin: !1
            },
            onLoad: function(e) {
                var t, a = e.param ? JSON.parse(e.param) : {}, i = 0, n = 0, o = !1;
                o = !!a.isClickRfd, a.regularTime && (a.regularTimeFormat = a.regularTime.replace(/[年|月|日]/g, "-").slice(0, -1)), 
                r.isEmpty(a.refundTicketRuleList) || a.refundTicketRuleList.forEach(function(e) {
                    e.refundFeeRate > i && (i = e.refundFeeRate);
                }), n = 100 - a.mapCoefficient, this.setData((t = {
                    isBuySuixin: o,
                    busInfo: a,
                    refundFeeRateOld: i,
                    refundFeeRateNew: n,
                    saveOld: (a.ticketPrice * i / 100).toFixed(2),
                    saveNew: (a.ticketPrice * n / 100).toFixed(2),
                    maxSavePrice: ((a.ticketPrice * i * 1e3 - a.ticketPrice * n * 1e3) / 1e5).toFixed(2)
                }, t["state." + a.type] = !0, t)), this.reqGetNotice(), this.reqRiseRatio();
                var u, d;
                u = a.isRefund ? (0 < a.refundAheadHour ? a.refundAheadHour + "小时" : "") + (0 < a.refundAheadMinus ? a.refundAheadMinus + "分钟" : "") : "发车前，具体以车站公布时间为准", 
                s.refundTime1 = u, (a.isRefundChange || a.isRefundOrder) && !r.isEmpty(a.LocalgetStrategyData) && a.LocalgetStrategyData[0].starttime ? d = this.replaceHourTime(+a.LocalgetStrategyData[0].starttime) : (a.isRefundChange || a.isRefundOrder) && !r.isEmpty(a.LocalgetStrategyData) && 0 == a.LocalgetStrategyData[0].starttime && (d = "发车前，具体以车站公布时间为准"), 
                s.refundTime2 = d || "发车前";
                var f = [], c = [], h = (a.refundTicketRuleList || []).length;
                if ((a.refundTicketRuleList || []).forEach(function(e, t) {
                    f.push({
                        validFrom: 0 < e.fromHour ? e.fromHour + "小时" + (0 < e.fromMinus ? e.fromMinus + "分钟" : "") : 0 < e.fromMinus ? e.fromMinus + "分钟" : "",
                        validTo: h - 1 == t ? 0 <= e.toHour.toString().indexOf("166") ? "" : e.toHour : e.toHour + "小时" + (0 < e.toMinus ? e.toMinus + "分钟" : ""),
                        refundFeeRate: e.refundFeeRate
                    });
                }), f.reverse(), c = !r.isEmpty(f) && 2 >= f.length ? f.slice() : f.slice(-2), this.setData({
                    refundTicketStr: f,
                    shortrefundTicketStr: c
                }), a.isClickRfd ? this.setData({
                    refundTime: s.refundTime2,
                    refundTimeHasDate: /\d/gi.test(s.refundTime2.toString()),
                    gaiTime: s.refundTime2
                }) : this.setData({
                    refundTime: s.refundTime1,
                    refundTimeHasDate: /\d/gi.test(s.refundTime1.toString()),
                    gaiTime: "发车前，具体以车站公布时间为准"
                }), !r.isEmpty(a.LocalgetStrategyData)) {
                    for (var g = 0; g < a.LocalgetStrategyData.length; g++) {
                        if (a.LocalgetStrategyData[g].starttime) S = a.LocalgetStrategyData[g].starttime + "小时"; else var S = "";
                        if (a.LocalgetStrategyData[g].endtime) {
                            var l = "到", p = "内";
                            S ? (l = "到", p = "") : (l = "", p = "内");
                            m = l + "" + a.LocalgetStrategyData[g].endtime + "小时" + p;
                        }
                        if (9999 == a.LocalgetStrategyData[g].endtime) var m = "外";
                        this.setData({
                            startStr: S,
                            endStr: m,
                            coefficient: 100 - parseInt(a.LocalgetStrategyData[g].coefficient)
                        });
                    }
                    this.setData({
                        refundTxt: ""
                    });
                }
                (1 == a.ExtraSchFlag && a.bookingType || 1 == a.runningSchFlag || 1 == a.isPassingStation || 2 == a.bookingType) && this.setData({
                    isShowOhter: !0
                });
            },
            onReady: function() {},
            onShow: function() {},
            reqGetNotice: function() {
                var e = this;
                wx.request({
                    url: i.getNotice,
                    method: "POST",
                    header: r.setHeader(),
                    data: JSON.stringify({
                        departureId: e.data.busInfo.departureId || "",
                        depStationNo: e.data.busInfo.depStationNo || "",
                        supplierId: e.data.busInfo.supplierId || "",
                        departureName: e.data.busInfo.departure || "",
                        depStationName: e.data.busInfo.dptStation || ""
                    }),
                    success: function(t) {
                        if (t.data.header && t.data.body.notice) {
                            var a = t.data.body.notice;
                            a = (a = (a = a.replace(/(?!<br.+?>)<.+?>/gi, "")).replace(/<br\/>|<br><br>/gi, "<br>")).split("<br>"), 
                            e.setData({
                                notice: a
                            });
                        }
                    }
                });
            },
            reqRiseRatio: function() {
                var e = this;
                wx.request({
                    url: i.getSubscribePriceRiseRatio,
                    method: "POST",
                    header: r.setHeader(),
                    data: JSON.stringify({}),
                    success: function(t) {
                        t.data.header && e.setData({
                            RiseRatio: t.data.body
                        });
                    }
                });
            },
            btnRefundPop: function() {
                this.data.isShowRefundPop || r.setEvent(n, "DD040"), this.setData({
                    isShowRefundPop: !this.data.isShowRefundPop
                });
            },
            btnSelect: function(e) {
                var t = e.currentTarget.dataset.key;
                for (var a in this.data.state) if (a == t) {
                    var i;
                    this.setData((i = {}, i["state." + t] = !0, i));
                } else {
                    var r;
                    this.setData((r = {}, r["state." + a] = !1, r));
                }
            },
            btnToggleNotice: function() {
                return this.data.notice ? (!this.data.isShowNotice && r.setEvent(n, "DD041"), void this.setData({
                    isShowNotice: !this.data.isShowNotice
                })) : (r.loading(), !1);
            },
            btnChooseRfd: function() {
                var e, t = this.data.isBuySuixin;
                this.setData((e = {}, e["busInfo.isClickRfd"] = !t, e.isShowPopBuy = !1, e.isBuySuixin = !t, 
                e)), wx.setStorageSync("refundStatus", this.data.isBuySuixin);
            },
            replaceHourTime: function(e) {
                var t = 0, a = 0;
                if (-1 < (e = (60 * +e + 0) / 60 + "").indexOf(".")) {
                    var i = (e + "").split("."), r = i[1].length;
                    t = i[0], a = Math.round(+i[1] / Math.pow(10, r) * 60);
                } else t = +e;
                return 0 < +t ? t + "小时" + (0 < a ? a + "分钟" : "") : a + "分钟";
            },
            closePop: function(e) {
                "cover" == e.currentTarget.dataset.id && "inner" != e.currentTarget.dataset.id && this.setData({
                    isShowPopBuy: !1
                });
            },
            showBuy: function() {
                this.setData({
                    isShowPopBuy: !0
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
}, [ 123 ]);