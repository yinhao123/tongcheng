!function() {
    require("./../../../../common.js"), wx.webpackJsonp.apply(null, arguments);
}([ 12 ], {
    131: function(e, t, a) {
        var r = function(e) {
            return e && e.__esModule ? e : {
                default: e
            };
        }(a(5)), s = a(14), i = (getApp(), null), o = a(1).default, n = a(0), d = {}, c = {}, u = null, l = null, f = !1, h = null, g = 0;
        Page({
            data: {
                orderInfo: {},
                orderSerialId: "",
                isFirst: !0,
                localFirstInto: "",
                localSuccessTime: 0,
                stateTitle: [],
                stAnimation: {},
                stY: 0,
                state: "",
                isFirstAjaxState: !0,
                virtual: {},
                subscribe: {},
                ticketing: {},
                pillIsShow: !1,
                pillTitle: "极速出票",
                fastDesc: [],
                ftAnimation: {},
                ftY: 0,
                redPackagePrice: 0,
                toggleRedPackage: !1,
                showServiceCall: !1,
                backUrl: "",
                isBack: 0,
                qaList: [ {
                    title: "我下完订单，成功支付后能保证有票吗？",
                    detail: [ "网上购票结果受票量影响，不能保证全部有票。", "一般会在30分钟内给出购票结果，如30分钟无结果，可以转人工帮您催处理，具体购票结果还请耐心等待，已短信通知为准，带来不便敬请谅解！" ],
                    show: !1
                }, {
                    title: "支付成功，什么时候可以知道购票结果？",
                    detail: [ "1、非预售车票，通常情况下，会在30分钟内给出购票结果，如30分钟无结果，可以转人工客服帮您催处理！", "2、预售车票，如您的订单还没有进入预售期，会在开启预售后第一时间为您抢票，3天内短信通知购票结果， 请您及时关注订单状态，留意购票通知的短信。" ],
                    show: !1
                }, {
                    title: "购票失败，退款什么时候到账？",
                    detail: [ "如果购票失败款项会在1-15个工作日退回到原支付账户" ],
                    show: !1
                }, {
                    title: "出票失败的APP汽车票红包怎么用 ？",
                    detail: [ "下载并使用取票手机号登录“同程旅游APP”，至“我的-红包”中查看使用。" ],
                    show: !1
                } ],
                couponSmall: !1,
                couponPop: !1,
                alreadyShowShare: !1,
                hadSendVoucher: !1,
                shareConfig: {},
                encryptMID: "",
                urgeBtnClass: "",
                rotate: 0,
                hiddenClock: !1,
                advise: [],
                isShowADV: !1,
                voucherList: [],
                voucherData: {},
                isGetVoucher: !1
            },
            getCouponList: function(e) {
                var t = this;
                n.$http(o.pageReceiveConfig, {
                    pageNo: "paysuccess",
                    orderSerialId: e
                }).then(function(e) {
                    t.setData({
                        voucherList: e.voucherList,
                        voucherData: e,
                        isGetVoucher: e.status
                    });
                }).catch(function(e) {
                    console.log(e);
                });
            },
            getCoupon: function(e) {
                var t = this;
                if (this.data.isGetVoucher) n.alert("该活动已经领取过"); else {
                    var a = e.currentTarget.dataset.idx, i = this.data.voucherList[a];
                    r.default.setEvent(s.success, "DLCG03", "^券信息:" + i.activityName + "^"), n.$http(o.pageVoucherReceive, {
                        batchNo: i.activityId,
                        id: this.data.voucherData.configId,
                        orderSerialId: this.data.orderSerialId,
                        pageNo: "paysuccess"
                    }).then(function() {
                        t.setData({
                            isGetVoucher: !0
                        });
                        n.alert("领取成功"), i.beRedirect && i.redirectUrl && (/^http/i.test(i.redirectUrl) ? setTimeout(function() {
                            wx.reLaunch({
                                url: "/pages/webview/webview?src=" + encodeURIComponent(i.redirectUrl),
                                success: function(e) {
                                    console.log("mina-success:", e);
                                },
                                fail: function(e) {
                                    console.log("mina-error:", e);
                                }
                            });
                        }, 3e3) : setTimeout(function() {
                            wx.reLaunch({
                                url: i.redirectUrl,
                                success: function(e) {
                                    console.log("mina-success:", e);
                                },
                                fail: function(e) {
                                    console.log("mina-error:", e);
                                }
                            });
                        }, 3e3));
                    }).catch(function(e) {
                        if (!n.isEmpty(e.header) && !n.isEmpty(e.header.errMsg)) return t.$toast({
                            txt: e.header.errMsg || "领取失败，稍后重试！"
                        }), t.show = !1, void (t.showToast = !0);
                    });
                }
            },
            getBannerData: function() {
                var e = this;
                n.$http(o.getAdvertListById, {
                    projectId: 1,
                    advertid: "003",
                    channelId: ""
                }).then(function(t) {
                    e.setData({
                        advise: t.slice(0, 3),
                        isShowADV: !0
                    });
                }).catch(function(e) {
                    console.error(e);
                });
            },
            btnToAdvisePage: function(e) {
                var t = e.currentTarget.dataset.idx, a = this.data.advise[t];
                a.link ? (/^http/i.test(a.link) ? setTimeout(function() {
                    wx.reLaunch({
                        url: "/pages/webview/webview?src=" + encodeURIComponent(a.link),
                        success: function(e) {
                            console.log("mina-success:", e);
                        },
                        fail: function(e) {
                            console.log("mina-error:", e);
                        }
                    });
                }, 100) : setTimeout(function() {
                    wx.reLaunch({
                        url: a.link,
                        success: function(e) {
                            console.log("mina-success:", e);
                        },
                        fail: function(e) {
                            console.log("mina-error:", e);
                        }
                    });
                }, 100), r.default.setEvent(s.success, "DLCG04", "^活动id:" + a.advertid + "^")) : console.log();
            },
            urgeCtrl: function() {
                var e = "", t = this, a = "";
                return "disable" == this.data.urgeBtnClass || f ? void (f && n.alert("请耐心等候，系统正在为您出票~")) : (wx.request({
                    url: o.hastenTicketOutNew,
                    header: n.setHeader(),
                    method: "POST",
                    data: JSON.stringify({
                        orderSerialId: u.orderSerialId
                    }),
                    success: function(r) {
                        console.log(r), (r = r.data).header.isSuccess && !n.isEmpty(r.body) ? (0 == r.body.count ? t.clockAnimate() : f = !0, 
                        e = r.body.msg, a = "disable", t.setData({
                            urgeBtnClass: a,
                            hideUrgeTips: "false",
                            urgeTxt: e,
                            urgeShow: "urgeShow"
                        })) : n.alert("抱歉，系统开小差了，请您稍后再试~");
                    }
                }), void r.default.setEvent(s.success, "DLCG02", "催出票"));
            },
            clockAnimate: function() {
                var e = this;
                h = setTimeout(function() {
                    if (360 <= g) {
                        var t = "";
                        return e.data.urgered && (t = "disable"), clearTimeout(h), g = 0, void e.setData({
                            urgeBtnClass: t,
                            hiddenClock: !0,
                            rotate: 0
                        });
                    }
                    g += 6, e.setData({
                        rotate: g
                    }), e.clockAnimate();
                }, 1e3);
            },
            delayUrgeBtn: function() {
                var e = this;
                l && clearTimeout(l), l = setTimeout(function() {
                    e.setData({
                        urgeBtnClass: ""
                    });
                }, 12e4);
            },
            urgeState: function() {
                var e = u.payTime, t = u.serverTime.replace(/-/g, "/");
                12e4 > new Date(t).getTime() - e && this.delayUrgeBtn(), this.setData({
                    urgeBtnClass: "disable",
                    state: "urge"
                }), this.clockAnimate(!0);
            },
            getUrgeFirst: function(e) {
                var t = n.wxhttp(o.hastenTicketOut, {
                    orderSerialId: this.data.orderSerialId
                }, "POST"), a = this;
                Promise.all([ t ]).then(function(t) {
                    var r = t[0];
                    console.log(r), r.header.isSuccess && 0 != r.body.hastenCount ? (f = !0, a.setData({
                        urgeBtnClass: "disable"
                    })) : (f = !1, a.urgeState(e));
                }).catch(function(e) {
                    console.log(e);
                });
            },
            ajaxTicketState: function(e) {
                var t = this, a = t.data.isFirstAjaxState, l = {
                    orderSerialId: t.data.orderSerialId
                };
                a && wx.request({
                    url: o.getOrderDetail,
                    data: l,
                    header: n.setHeader(),
                    method: "POST",
                    success: function(a) {
                        var o = a.data, n = o.body, l = t.data.stateTitle, f = t.data.fastDesc;
                        r.default.setEvent(s.success, "DLCG07", "^出发城市:" + n.departure + "^到达城市:" + n.destination + "^"), 
                        1 != o.header.isSuccess || t.isEmpty(o.body) || (o.body.createTime = o.body.createTime.replace(/-/g, "/"), 
                        console.log(o.body), u = o.body, t.setData({
                            isFirstAjaxState: !1,
                            orderInfo: o.body
                        }), wx.setStorageSync("monthCard", t.data.orderSerialId), wx.setNavigationBarTitle({
                            title: n.departure + "-" + n.destination
                        }), o.body.isVirtualOrder && "待购票" != o.body.orderStateName ? (l.push("订单支付成功"), 
                        t.setData({
                            stateTitle: l,
                            state: "virtual",
                            backUrl: "/pages/bus/webapp/list/list?date=" + t.data.orderInfo.dptDate + "&fromcity=" + t.data.orderInfo.departure + "&tocity=" + t.data.orderInfo.destination
                        }), t.funSetVirtual()) : "出票成功" == o.body.orderStateName ? (l.push("出票成功"), f.push("已成功为您极速出票"), 
                        t.data.orderInfo.fastOrder && t.setData({
                            fastDesc: f
                        }), t.setData({
                            stateTitle: l,
                            state: "success"
                        }), t.getBusListGenerateUrl()) : "出票失败" == o.body.orderStateName ? (l.push("出票失败"), 
                        f.push("出票失败 极速出票费将退还"), t.data.orderInfo.fastOrder && t.setData({
                            fastDesc: f
                        }), t.setData({
                            stateTitle: l,
                            state: "fail"
                        }), t.getBusListGenerateUrl()) : "待购票" == o.body.orderStateName ? (l.push("预约成功"), 
                        d.server > c.sTime && d.server < c.eTime ? (t.setData({
                            pillIsShow: !0,
                            pillTitle: "无票必赔"
                        }), f.push("若出票失败赠送出行优惠礼包"), t.setData({
                            fastDesc: f
                        })) : (f.push("享优先出票特权"), t.data.orderInfo.fastOrder && t.setData({
                            fastDesc: f
                        })), t.setData({
                            stateTitle: l,
                            state: "wait",
                            backUrl: "/pages/bus/webapp/list/list?date=" + t.data.orderInfo.dptDate + "&fromcity=" + t.data.orderInfo.departure + "&tocity=" + t.data.orderInfo.destination
                        }), t.funSetSubscribe()) : (l.push("订单支付成功"), d.server > c.sTime && d.server < c.eTime ? (f.push("若出票失败赠送出行优惠礼包"), 
                        t.setData({
                            pillIsShow: !0,
                            pillTitle: "无票必赔",
                            fastDesc: f
                        }), setTimeout(function() {
                            f.push("享优先出票特权"), t.data.orderInfo.fastOrder && t.setData({
                                pillTitle: "极速出票"
                            }), t.data.orderInfo.fastOrder && t.setData({
                                fastDesc: f
                            });
                        }, 3e3)) : (f.push("享优先出票特权"), t.data.orderInfo.fastOrder && t.setData({
                            fastDesc: f
                        })), t.setData({
                            stateTitle: l,
                            state: "ongoing",
                            backUrl: "/pages/bus/webapp/list/list?date=" + t.data.orderInfo.dptDate + "&fromcity=" + t.data.orderInfo.departure + "&tocity=" + t.data.orderInfo.destination
                        }), ("支付成功" == o.body.orderStateName || "索票成功" == o.body.orderStateName || "出票中" == o.body.orderStateName) && t.getUrgeFirst(o.body), 
                        t.funSetTicketing(), i = setTimeout(function() {
                            t.ajaxTicketState();
                        }, 3e3)), e && "function" == typeof e && e());
                    }
                }), a || t.ajaxTicketStateSimple();
            },
            ajaxTicketStateSimple: function() {
                var e = this, t = {
                    orderSerialId: e.data.orderSerialId
                };
                wx.request({
                    url: o.getOrderStatus,
                    data: t,
                    header: n.setHeader(),
                    method: "POST",
                    success: function(t) {
                        var a = t.data;
                        a.header.isSuccess && ("出票成功" == a.body.orderStateName ? (e.funRefreshState("title", "出票成功"), 
                        e.setData({
                            state: "success"
                        }), e.getBusListGenerateUrl()) : "出票失败" == a.body.orderStateName ? (e.funRefreshState("title", "出票失败"), 
                        e.setData({
                            state: "fail"
                        }), e.getBusListGenerateUrl()) : i = setTimeout(function() {
                            e.ajaxTicketState();
                        }, 3e3), e.funCheckTicketTimeout(a));
                    }
                });
            },
            ajaxGiveRedPackage: function() {
                var e = this;
                wx.request({
                    url: o.getVoucherFromUnifiedConfig,
                    data: JSON.stringify({}),
                    header: n.setHeader(),
                    method: "POST",
                    success: function(t) {
                        var a = t.data;
                        a.header.isSuccess && e.setData({
                            redPackagePrice: a.body.voucherShowPrice,
                            toggleRedPackage: !0
                        });
                    }
                });
            },
            getBusListGenerateUrl: function() {
                var e = this, t = {
                    departure: e.data.orderInfo.departure,
                    destination: e.data.orderInfo.destination,
                    departureDate: e.data.orderInfo.dptDate,
                    page: 1,
                    pageSize: 25,
                    hasCategory: !0,
                    dptTimeSpan: 0,
                    bookingType: 0,
                    orderTime: 1,
                    orderPrice: 2,
                    departureStation: e.data.orderInfo.dptStation,
                    arrivalStation: e.data.orderInfo.arrStation
                };
                wx.request({
                    url: o.getScheduleList,
                    data: JSON.stringify(t),
                    header: {
                        "Content-Type": "application/json",
                        openid: wx.getStorageSync("tongcheng.openid") || ""
                    },
                    method: "POST",
                    success: function(t) {
                        var a, r = t.data, s = e.data.state;
                        r.header.isSuccess && 0 < r.body.schedule.length ? ("success" == s && (e.setData({
                            isBack: 1
                        }), a = "../list/list?date=" + e.data.orderInfo.returnTime.substr(0, 10) + "&fromcity=" + e.data.orderInfo.destination + "&tocity=" + e.data.orderInfo.departure), 
                        "fail" == s && (a = "../list/list?date=" + e.data.orderInfo.dptDate + "&fromcity=" + e.data.orderInfo.departure + "&tocity=" + e.data.orderInfo.destination), 
                        e.setData({
                            backUrl: a
                        })) : ("success" == s && (e.setData({
                            isBack: 0
                        }), a = "../list/list?date=" + e.data.orderInfo.dptDate + "&fromcity=" + e.data.orderInfo.departure + "&tocity=" + e.data.orderInfo.destination), 
                        "fail" == s && (a = "../list/list?date=" + e.data.orderInfo.returnTime.substr(0, 10) + "&fromcity=" + e.data.orderInfo.departure + "&tocity=" + e.data.orderInfo.destination), 
                        e.setData({
                            backUrl: a
                        }));
                    }
                });
            },
            funCheckTicketTimeout: function(e) {
                if (!this.data.orderInfo.fastOrder) return !1;
                var t = this, a = t.data.localSuccessTime + 3e5, r = new Date().getTime(), s = e.body.orderStateName, i = t.data.fastDesc, o = i[i.length - 1];
                r > a ? "出票失败" == s ? "出票失败，极速出票费将退还" != o && t.funRefreshState("fast", "出票失败，极速出票费将退还") : "出票已超时，极速出票费将退还" != o && t.funRefreshState("fast", "出票已超时，极速出票费将退还") : "出票成功" == s && t.funRefreshState("fast", "已成功为您极速出票");
            },
            funSetVirtual: function() {
                var e = this, t = e.data.orderInfo.dptDateTime, a = e.data.orderInfo.ticketOutLatestHour || 0;
                t = t.replace(/-/g, "/");
                var r = new Date(t).getTime() - 60 * a * 1e3, s = new Date(r);
                e.setData({
                    virtual: {
                        mmdd: s.getMonth() + 1 + "月" + s.getDate() + "日",
                        HHMM: e.funAddZero(s.getHours()) + ":" + e.funAddZero(s.getMinutes())
                    }
                });
            },
            funSetSubscribe: function() {
                var e = this.data.orderInfo.regularTime.split(" ")[0].split("-"), t = parseInt(e[1]) + "月" + parseInt(e[2]) + "日";
                this.setData({
                    subscribe: {
                        mmdd: t
                    }
                });
            },
            funSetTicketing: function() {
                var e = this, t = new Date(e.data.orderInfo.createTime).getTime(), a = new Date(t + 3e5);
                setTimeout(function() {
                    e.funRefreshState("title", "正在为您出票");
                }, 3e3), e.setData({
                    ticketing: {
                        HHMM: e.funAddZero(a.getHours()) + ":" + e.funAddZero(a.getMinutes())
                    }
                });
            },
            funRefreshState: function(e, t) {
                var a = this, r = (a.data.stateTitle, "title" == e ? a.data.stateTitle : a.data.fastDesc), s = "title" == e ? a.data.stY : a.data.ftY;
                r.push(t), s += -24, "title" == e ? a.setData({
                    stateTitle: r,
                    stY: s
                }) : a.setData({
                    fastDesc: r,
                    ftY: s
                });
                var i = wx.createAnimation({
                    duration: 300,
                    timingFunction: "linear"
                });
                a.animation = i, i.translateY(s).step(), "title" == e ? a.setData({
                    stAnimation: i.export()
                }) : a.setData({
                    ftAnimation: i.export()
                });
            },
            toOrderDetail: function() {
                var e = this;
                this.data.state;
                try {
                    r.default.setEvent(s.success, "DLCG01");
                } catch (e) {}
                wx.redirectTo({
                    url: "../orderdetail/orderdetail?orderSerialId=" + e.data.orderSerialId + "&shareCard=1&hasCard=1&isReadTime=true"
                });
            },
            backUrl: function() {
                var e = this;
                wx.redirectTo({
                    url: e.data.backUrl
                });
            },
            serviceCall: function() {
                wx.makePhoneCall({
                    phoneNumber: "4007777777"
                });
            },
            hideServiceCall: function() {
                this.setData({
                    showServiceCall: !this.data.showServiceCall
                });
            },
            slideList: function(e) {
                var t = this, a = e.currentTarget.dataset.serial, i = t.data.qaList, o = i[a], n = o.show;
                o.show = !n, t.setData({
                    qaList: i
                }), o.show && r.default.setEvent(s.success, "DLCG06");
            },
            hideRedPackage: function() {
                this.setData({
                    toggleRedPackage: !1
                });
            },
            funAddZero: function(e) {
                return (e = e.toString())[1] ? e : "0" + e;
            },
            isEmpty: function(e) {
                if (null == e) return !0;
                if ("[object Array]" == toString.call(e) || "[object String]" == toString.call(e)) return 0 === e.length;
                for (var t in e) if (hasOwnProperty.call(e, t)) return !1;
                return !0;
            },
            onLoad: function(e) {
                this.getBannerData(), -1 < o.getServerTime.indexOf("wxbusapi") && (o = n.getNewOrderApi(!0, o));
                var t = this, a = e.orderSerialId, r = wx.getStorageSync("bus_localFirstInto");
                this.getCouponList(a), r && r == a ? this.setData({
                    isFirst: !1,
                    localSuccessTime: wx.getStorageSync("bus_successTime")
                }) : (this.setData({
                    localFirstInto: a,
                    localGetGift: !1,
                    localSuccessTime: new Date().getTime()
                }), wx.setStorageSync("bus_localFirstInto", a), wx.setStorageSync("bus_successTime", this.data.localSuccessTime)), 
                this.setData({
                    orderSerialId: a
                });
                var s = n.wxhttp(o.getServerTime, {}), i = n.wxhttp(o.getTicketOutFailVoucherId, {}, "GET");
                Promise.all([ s, i ]).then(function(e) {
                    var a = e[0], r = e[1];
                    if (a.body && !t.isEmpty(a.body)) {
                        var s = a.body;
                        d = {
                            server: Date.parse(s.replace(/-/g, "/")),
                            local: new Date().getTime()
                        };
                    }
                    return r.header.isSuccess && r.body ? n.wxhttp(o.getVoucherInfo, {
                        id: r.body
                    }) : Promise.reject("请求券id失败");
                }).catch(function(e) {
                    console.log(e);
                }).then(function(e) {
                    if (e.header.isSuccess && !n.isEmpty(e.body)) {
                        var a = e.body.validFrom.replace(/-/g, "/"), r = e.body.validTo.replace(/-/g, "/");
                        c.sTime = new Date(a).getTime(), c.eTime = new Date(r).getTime(), t.ajaxTicketState();
                    } else t.ajaxTicketState();
                }).catch(function(e) {
                    console.log(e);
                }), this.getTelephone();
            },
            onUnload: function() {
                clearTimeout(i);
            },
            onHide: function() {
                clearTimeout(i);
            },
            closeCouponPop: function() {
                this.setData({
                    couponPop: !1,
                    alreadyShowShare: !0
                });
            },
            isEmptyObject: function(e) {
                for (var t in e) return !1;
                return !0;
            },
            onShow: function() {},
            getTelephone: function() {
                var e = this;
                n.wxhttp(o.telephone).then(function(t) {
                    t.header.isSuccess && e.setData({
                        showNewKeFu: t.body
                    });
                });
            },
            contactSer: function() {
                var e = "https://livechat.ly.com/out/chat?ProductId=18&SourceType=16&PageId=18011&FPage=" + encodeURIComponent("pages/bus/webapp/success/success") + "&OrderSerialId=" + this.data.orderInfo.orderSerialId + "&OrderState=" + encodeURIComponent(this.data.orderInfo.orderStateName);
                wx.navigateTo({
                    url: "/pages/webview/webview?src=" + encodeURIComponent(e)
                }), this.closeKeFuFn();
            },
            callKefu: function() {
                wx.makePhoneCall({
                    phoneNumber: "4007777777"
                }), this.closeKeFuFn();
            },
            showKefuFn: function() {
                this.setData({
                    showKeFu: !this.data.showKeFu
                }), this.data.showKeFu && r.default.setEvent(s.success, "DLCG05");
            },
            closeKeFuFn: function() {
                this.setData({
                    showKeFu: !1
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
}, [ 131 ]);