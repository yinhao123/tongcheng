!function() {
    require("./../../../../common.js"), wx.webpackJsonp.apply(null, arguments);
}([ 14 ], {
    125: function(e, t, a) {
        var n, i = Math.abs, o = a(0), r = a(5), s = a(1).default, d = "page/bus/webapp/orderDetail/orderDetail", c = getApp(), u = !1, l = !1, h = !1, p = !1, f = !1, g = !1, m = {}, w = "", S = "", y = "", T = "", D = !1, b = {}, C = null, v = !1, I = null, x = 0, k = null, R = null;
        Page((n = {
            data: {
                hidden: !0,
                modalHidden: !0,
                title: "",
                text: "",
                orderInfo: {},
                refundInfo: {},
                confirmRefundInfo: {},
                orderDetail: {},
                bottomSet: {},
                checks: !1,
                payData: {},
                localSlide: !0,
                showNotice: !1,
                hideConnect: !0,
                modalHidden2: !0,
                countdown: "0",
                showSlide: !1,
                showSlideA: !1,
                showSlideB: !1,
                showSlideC: !1,
                showSlideD: !1,
                showSlideE: !1,
                showSlideF: !1,
                arrowstatus: "",
                arrowstatusA: "",
                arrowstatusB: "",
                arrowstatusC: "",
                arrowstatusD: "",
                arrowstatusE: "",
                arrowstatusF: "",
                memberId: "",
                lotteryShow: !1,
                showIndiana: !1,
                screenImg: "",
                isScenicOrder: !1,
                scenicId: 0,
                scenicInfo: "",
                showEntry: !1,
                showShareCard: !0,
                answer1: !1,
                answer2: !1,
                answer3: !1,
                showMapBox: !1,
                showPopPrice: !1,
                getTicketNo: "",
                getTicketPassWord: "",
                ticketCode: "",
                showBack: !1,
                backUrl: "",
                openerweima: !1,
                refundData: {},
                isOpenRefund: !1,
                newPhone: "",
                neworderStateName: "",
                chuangkou: "",
                isHiddenMap: !0,
                latitude: "",
                longitude: "",
                point: {},
                hideMainMap: !1,
                orderChangeSerialId: "",
                countAdult: 0,
                countChild: 0,
                isSupportChild: !1,
                childTicketPrice: 0,
                isShowRefund: !1,
                needOrderdetail: {},
                isUpdataTimes: !1,
                couponSmall: !1,
                couponPop: !1,
                shareUrl: "",
                isFromSuccess: !1,
                isShowCZBX: !1,
                qrCodeList: [],
                qrCodeObj: {},
                isHasorderQrCode: !1,
                indicatorDots: !1,
                passengerCode: [],
                isReadTime: "",
                hadSendVoucher: !1,
                shareConfig: {},
                encryptMID: "",
                subsidyTxt: "",
                isHasBarCode: !1,
                showRefundBtn: !1,
                refundBtnTxt: "退票",
                isRefundFree: !1,
                difTime: 0,
                layerShown: !0,
                noticeShow: !0,
                cardIcon: !0,
                hideRefundRule: !0,
                hideFastLine: !0,
                popcard: !0,
                showFreeChild: !1,
                showCancelModal: !1,
                payHidden: !1,
                checkReasonId: "",
                otherReson: "",
                cancelReasonList: [],
                isShowAdFailPop: !1,
                isAdvanceOrder: !1,
                showChannel: !1,
                hasShowChannel: !1,
                isShowSubscribeInfo: !1,
                isChannel: !1,
                isShowMonth: !0,
                isShowKan: !1,
                popKan: !1,
                showMonthCard: !0,
                showMonthOption: !1,
                monthCardInfo: {},
                discountRuleContent: [],
                showMonthCardBox: !1,
                hasBuyCard: !1,
                availableCard: {},
                crossPlan: [],
                isShowCrossPlan: !1,
                hotelLink: "",
                pricesList: [],
                isTuigaiwuyou: !1,
                showRfTxt: "",
                showRfTxt1: "",
                showrefundPage: !0,
                refundDisable: !1,
                isTodaySch: !1
            },
            toggleFreeChild: function() {
                this.setData({
                    showFreeChild: !this.data.showFreeChild
                });
            },
            urgeCtrl: function() {
                var e = "", t = this, a = "";
                "disable" == this.data.urgeBtnClass || v || wx.request({
                    url: s.hastenTicketOutNew,
                    header: o.setHeader(),
                    method: "POST",
                    data: JSON.stringify({
                        orderSerialId: this.data.orderDetail.orderSerialId
                    }),
                    success: function(n) {
                        (n = n.data).header.isSuccess && !o.isEmpty(n.body) ? (0 == n.body.count ? t.clockAnimate() : v = !0, 
                        e = n.body.msg, a = "disable", t.setData({
                            urgeBtnClass: a,
                            hideUrgeTips: "false",
                            urgeTxt: e,
                            urgeShow: "urgeShow"
                        }), R = setTimeout(function() {
                            t.setData({
                                urgeShow: ""
                            }), clearTimeout(R);
                        }, 6e3)) : o.alert("抱歉，系统开小差了，请您稍后再试~");
                    }
                });
            },
            clockAnimate: function() {
                var e = this;
                I = setTimeout(function() {
                    if (360 <= x) {
                        var t = "";
                        return v && (t = "disable"), clearTimeout(I), x = 0, void e.setData({
                            urgeBtnClass: t,
                            hiddenClock: !0,
                            rotate: 0
                        });
                    }
                    x += 6, e.setData({
                        rotate: x
                    }), e.clockAnimate();
                }, 1e3);
            },
            delayUrgeBtn: function() {
                var e = this;
                k && clearTimeout(k), k = setTimeout(function() {
                    e.setData({
                        urgeBtnClass: ""
                    });
                }, 12e4);
            },
            urgeState: function(e) {
                var t = e.payTime, a = e.serverTime.replace(/-/g, "/");
                12e4 > new Date(a).getTime() - t && (this.delayUrgeBtn(), this.setData({
                    urgeBtnClass: "disable",
                    state: "urge"
                }), this.clockAnimate(!0));
            },
            getUrgeFirst: function(e) {
                var t = o.wxhttp(s.hastenTicketOut, {
                    orderSerialId: y
                }, "POST"), a = this;
                Promise.all([ t ]).then(function(t) {
                    var n = t[0];
                    console.log(n), n.header.isSuccess && 0 != n.body.hastenCount ? (v = !0, a.setData({
                        urgeBtnClass: "disable"
                    })) : (v = !1, a.urgeState(e));
                }).catch(function(e) {
                    console.log(e);
                });
            },
            checkRefund: function() {
                if (this.data.orderDetail) {
                    var e, t = this.data.orderDetail, a = 0, n = 0, i = !1, o = new Date(t.serverTime.replace(/-/g, "/")).getTime();
                    !t.refundEndTime || (a = t.refundEndTime || 0), !t.refundRuleId || (n = 0 <= t.refundRuleStartTime ? new Date(t.dptDateTime.replace(/-/g, "/")).getTime() - 60 * t.refundRuleStartTime * 60 * 1e3 : t.refundEndTime || 0), 
                    e = a > n ? a : n, new Date().getTime() > e && !0, !t.assistRefund || !t.assistServiceFee || (i = !0, 
                    !1), t.refundRuleId && 0 < t.refundRuleId && t.refundCoefficient && 0 < t.refundCoefficient ? i = !0 : 0 == t.refundRuleId && t.isRefund && (i = !0), 
                    this.setData({
                        showRefundBtn: !t.changeChildOrder && i,
                        refundTime: e,
                        refundType: 1 == t.isOrderChange ? 2 : t.assistRefund ? 4 : 1,
                        refundBtnTxt: (t.isOrderChange, "退票"),
                        difTime: new Date().getTime() - o,
                        refundDisable: !1
                    }), this.returnLastRefundTime();
                }
            },
            refundCtrl: function(e) {
                var t = e.currentTarget.dataset.type ? e.currentTarget.dataset.type : "";
                try {
                    r.setEvent(d, "DLXQ14");
                } catch (t) {}
                return this.data.refundDisable ? void o.alert("该站最迟可网上退票时间为" + this.returnLastRefundTime(), "", !1, "取消", "好的", function() {}) : void (1 == t ? this.refundCheak(1) : 2 == t ? this.setData({
                    layerShown: !1,
                    showCtrl: "show"
                }) : 4 == t ? this.setData({
                    showRefundPop: !0
                }) : (o.alert("该站最迟可网上退票时间为" + this.returnLastRefundTime(), "", !1, "取消", "好的", function() {}), 
                this.setData({
                    refundDisable: !0
                })));
            },
            returnLastRefundTime: function() {
                var e, t = this.data.refundTime;
                return e = new Date(o.format(t).replace(/-/g, "/")), o.formatNum(e.getMonth() + 1) + "月" + o.formatNum(e.getDate()) + "日" + o.formatNum(e.getHours()) + "时" + o.formatNum(e.getMinutes()) + "分";
            },
            assistRefundCtrl: function() {
                r.setEvent(d, "DLXQ16"), this.refundReq(4);
            },
            refundCheak: function() {
                new Date().getTime(), this.data.difTime, this.data.orderDetail;
                this.closeLayer(), this.checkrefundToast(), r.setEvent(d, "DLXQ14");
            },
            goToRefundMsg: function() {
                wx.setStorageSync("noticesdata", this.data.orderDetail), wx.navigateTo({
                    url: "/pages/bus/webapp/notices/notices?pagename=refundPage"
                });
            },
            checkrefundToast: function() {
                var e = new Date().getTime() + this.data.difTime, t = this.data.orderDetail, a = this;
                if (a.data.refundTime > e) return 0 == t.refundRuleId ? (0, "车站会收取退票手续费，具体金额以各车站退票规则为准，确认退票吗？") : (1, 
                "此单享受退票无忧服务，退票金额" + a.countFefundPrice() + "元，发车后退款将自动退回至支付账户"), wx.setStorageSync("noticesdata", a.data.orderDetail), 
                wx.navigateTo({
                    url: "/pages/bus/webapp/notices/notices?pagename=refundPage"
                }), !1;
                this.setData({
                    refundType: 3,
                    refundDisable: !0
                }), o.alert("退票操作出错，请稍后再试", "", !1, "取消", "好的", function() {
                    a.getOrderDetail(), r.setEvent(d, "DLXQ20", "^退票操作出错^");
                });
            },
            changeOrder: function() {
                var e, t, a = this.data.orderDetail, n = a.passengersInfo.find(function(e) {
                    return 1 == e.passengerType;
                });
                (this.beforeStartTime() || !!a.isRefund && this.beforeBusinessTime()) && (e = {
                    orgDptDateTime: a.dptDateTime,
                    orgDptStation: a.dptStation,
                    orgArrStation: a.arrStation,
                    ticketPrice: a.ticketPrice,
                    orgSupplierId: n ? a.supplierId || "" : ""
                }, t = "fromcity=" + a.departure + "&tocity=" + a.destination + "&date=" + o.addDay(1, a.dptDate, "yyyy-MM-dd").day + "&fromstation=" + a.dptStation + "&tostation=" + a.arrStation + "&pid=''&bfCityId=" + (a.depCityId ? a.depCityId : "") + "&btCityId=" + (a.desCityId ? a.desCityId : "") + "&isChangeNO=" + a.orderSerialId, 
                wx.setStorageSync("bus_changeData", e), wx.navigateTo({
                    url: "/pages/bus/webapp/list/list?" + t
                }), this.closeLayer()), r.setEvent(d, "XQ09");
            },
            beforeBusinessTime: function() {
                var e = this.computeServerTime();
                return this.data.orderDetail.refundEndTime > e;
            },
            beforeStartTime: function() {
                var e = this.computeServerTime(), t = this.data.orderDetail;
                return new Date(t.dptDateTime.replace(/-/g, "/")).getTime() > e;
            },
            computeServerTime: function() {
                return new Date().getTime() + this.data.difTime;
            },
            countFefundPrice: function() {
                var e = this.data, t = e.orderDetail, a = t.refundCoefficient;
                return ((t.childPrice ? t.childPrice : 0) * a * e.countChild + t.actualTicketPrice * a * e.countAdult).toFixed(2);
            },
            hiddenRefundBtn: function() {
                this.setData({
                    showRefundBtn: !1
                });
            },
            refundReq: function(e) {
                var t, a = this.data.orderDetail, n = this;
                t = e && 4 != e ? s.applyRefundTicketByRule : s.applyRefundTicket, this.setData({
                    hidden: !1
                }), wx.request({
                    url: t,
                    header: o.setHeader(),
                    method: "POST",
                    data: JSON.stringify({
                        orderSerialId: a.orderSerialId
                    }),
                    success: function(t) {
                        var a = "";
                        a = t.data.header.isSuccess && t.data.body ? "退票提交成功" : "退票提交失败，建议至发车站直接办理", 4 == e ? (n.closeLayer(), 
                        setTimeout(function() {
                            wx.showToast({
                                title: a,
                                icon: "none",
                                duration: 2e3,
                                complete: function() {
                                    setTimeout(function() {
                                        n.getOrderDetail();
                                    }, 2002);
                                }
                            });
                        }, 320)) : setTimeout(function() {
                            o.alert(a, "", !1, "取消", "我知道了", function() {
                                n.getOrderDetail();
                            });
                        }, 500);
                    },
                    error: function() {
                        n.closeLayer(), setTimeout(function() {
                            4 == e && n.closeLayer(), wx.showToast({
                                text: "抱歉，服务开小差了，请稍后重试。",
                                icon: "none",
                                duration: 2e3
                            });
                        }, 1e3);
                    },
                    complete: function() {
                        n.setData({
                            hidden: !0
                        });
                    }
                });
            },
            closeLayer: function() {
                this.setData({
                    layerShown: !0,
                    showCtrl: "",
                    showRefundPop: !1,
                    noticeShow: !0,
                    hideRefundRule: !0,
                    hideFastLine: !0
                });
            },
            closeMonthCard: function() {
                this.setData({
                    popcard: !0
                }), wx.setStorage({
                    key: "monthCard",
                    data: ""
                });
            },
            refundTipsShow: function() {
                this.closeLayer(), this.setData({
                    noticeShow: !1
                });
            },
            buyMonthCard: function(e) {
                this.closeLayer();
                var t = e.currentTarget.dataset;
                this.closeMonthCardBox(), wx.navigateTo({
                    url: "/pages/bus/webapp/lijianCard/lijianCard?cardId=" + (t.cardid || -1)
                });
            },
            showCardBox: function(e) {
                var t = e.currentTarget.dataset;
                this.setData({
                    popcard: !1
                }), wx.navigateTo({
                    url: "/pages/bus/webapp/lijianCard/lijianCard?cardId=" + (t.cardid || -1)
                });
            },
            creatwebSrc: function(e) {
                return "" + encodeURIComponent("https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx3827070276e49e30&redirect_uri=https://wx.17u.cn/flight/getopenid.html?url=" + encodeURIComponent(e) + "&showwxpaytitle=1&response_type=code&scope=snsapi_base&state=123&connect_redirect=1#wechat_redirect");
            },
            closeKanjia: function() {
                this.setData({
                    popKan: !1
                }), wx.setStorage({
                    key: "Kanjia",
                    data: ""
                });
            },
            showKanBox: function() {
                this.setData({
                    popKan: !0
                });
            },
            KanPop: function() {
                wx.navigateTo({
                    url: "/pages/bus/activity/20180529subsidy/index/index?orderSerialId=" + y
                });
            },
            orderState: function(e) {
                var t = this.data.orderDetail, a = "icon-printTicket7";
                "已发车" === (e = e || t.orderStateName) ? (a = "icon-printTicket7", this.setData({
                    showRefundBtn: !1
                })) : "待付款" === e ? a = "icon-paying" : "待支付" === e ? a = "icon-paying" : "出票中" === e ? a = "icon-paying" : "已取消" === e ? a = "icon-printTicket8" : "出票失败" === e ? a = "icon-printTicket2" : "出票成功" === e ? a = "icon-printTicket10" : "已改签" === e ? a = "icon-printTicket10" : "待购票" === e ? a = "icon-printTicket1" : "退票成功" === e ? a = "icon-printTicket4" : "改签中" === e ? a = "icon-printTicket3" : "退票失败" === e ? a = "icon-printTicket5" : "退款中" === e ? a = "icon-printTicket6" : "退票申请中" === e ? a = "icon-printTicket6" : "已退款" === e ? a = "icon-printTicket9" : "已退票" === e ? a = "icon-printTicket9" : "退票成功" === e ? a = "icon-printTicket4" : "已发车" == e && (a = "icon-printTicket7", 
                this.setData({
                    showRefundBtn: !1
                })), this.setData({
                    iconClass: a
                });
            },
            formatPrice: function(e) {
                e = e || [];
                var t = !1, a = 0, n = this.data.orderDetail, r = 0, s = 0, d = "", c = "", u = !1;
                if (e.forEach(function(e) {
                    e.sym = "", 0 > e.amount && (e.sym = "-", e.amount = i(e.amount)), e.count = e.count ? "x" + e.count : "", 
                    ("随心退" == e.name || "退改无忧" == e.name || "退票无忧" == e.name) && (t = e.name);
                }), t && !o.isEmpty(n.refundCarefreeRefundRuleList) && n.refundCarefreeRefundRuleList[0] ? (a = this.formatRFTime(n.refundCarefreeRefundRuleList[0].startTime, 1), 
                r = a.split(":")[0], s = a.split(":")[1]) : o.isEmpty(n.refundTicketRuleList) || !n.refundTicketRuleList[0] ? (a = "", 
                d = "该车次暂不支持网上退票，请至车站窗口办理退票。") : (a = !0, r = n.refundTicketRuleList[0].fromHour, 
                s = n.refundTicketRuleList[0].fromMinus), a) {
                    u = o.format1(new Date(o.getDate(n.dptDateTime)), "yyyy/MM/dd") == o.format1(new Date(o.getDate(n.serverTime)), "yyyy/MM/dd");
                    var l;
                    l = new Date(o.getDate(n.dptDateTime)).getTime() - (60 * r * 60 * 1e3 + 60 * s * 1e3), 
                    d = "" + o.format1(new Date(o.getDate(l)), "hh点mm分"), c = "可退";
                } else d = "该车次暂不支持网上退票，请至车站窗口办理退票。", c = "不可退";
                d = d.replace(/00分|00点/g, ""), this.setData({
                    pricesList: e,
                    isTuigaiwuyou: t,
                    showRfTxt: d,
                    showRfTxt1: c,
                    isTodaySch: u
                });
            },
            formatRFTime: function(e, t) {
                var a = 0, n = 0;
                return 1 == t && (0 <= e.toString().indexOf(".") ? (a = parseInt(e.toString().split(".")[0]), 
                n = Math.floor(60 * parseInt(e.toString().split(".")[1]) / 10)) : (a = e, n = "00")), 
                a + ":" + n;
            },
            getRefundRule: function(e) {
                console.log(e);
                var t = e.currentTarget.dataset.id, a = this.data.orderDetail, n = this, i = {};
                i.title = 27 == t || 29 == t ? "退票说明" : "退改无忧说明", wx.request({
                    url: s.getDescription,
                    header: o.setHeader(),
                    method: "POST",
                    data: JSON.stringify({
                        id: a.refundRuleId
                    }),
                    success: function(e) {
                        e.data.header.isSuccess && !o.isEmpty(e.data.body) ? (i.detail = e.data.body.replace(/<[^>]*>/g, "\n "), 
                        n.setData({
                            RefundRule: i,
                            hideRefundRule: !1
                        })) : o.alert("抱歉，服务异常，请稍后重试~");
                    },
                    complete: function() {}
                });
            },
            getFastState: function() {
                var e = this, t = this.data.orderDetail, a = t.fastTicketOut.payTime.replace(/-/g, "/"), n = t.fastTicketOut.outTime.replace(/-/g, "/"), i = parseInt((new Date(n).getTime() - new Date(a).getTime()) / 1e3), r = (i / 60).toFixed(2);
                wx.request({
                    url: s.getOrderBusinessHandle,
                    header: o.setHeader(),
                    method: "POST",
                    data: JSON.stringify({
                        orderSerialId: t.orderSerialId,
                        businessCode: t.fastTicketOut.businessCode || "",
                        outTicketTimeDiff: r
                    }),
                    success: function(t) {
                        t.data.header.isSuccess && t.data.body ? e.parseFastState(t.data.body, a, n, i) : o.alert("抱歉，服务异常，请稍后重试~");
                    },
                    complete: function() {}
                });
            },
            parseFastState: function(e, t, a, n) {
                var i = function(e) {
                    return e.substr(5, 2) + "月" + e.substr(8, 2) + "日 " + e.substr(11);
                }, o = {};
                o.payTime = i(t), o.outTime = i(a), o.payAmount = e.paymentAmount, o.spendTime = parseInt(n / 60) + "分" + parseInt(n % 60) + "秒", 
                this.setData({
                    fastState: o,
                    hideFastLine: !1
                });
            },
            checkMonthCard: function() {
                wx.getStorageSync("monthCard") == y && this.setData({
                    popcard: !1
                });
            },
            contactSer: function() {
                try {
                    r.setEvent(d, "XQ29", "在线客服");
                } catch (e) {}
                var e = "https://livechat.ly.com/out/chat?ProductId=18&SourceType=16&PageId=18011&FPage=" + encodeURIComponent("page/bus/webapp/orderdetail/orderdetail") + "&OrderSerialId=" + this.data.orderDetail.orderSerialId + "&OrderState=" + encodeURIComponent(this.data.orderDetail.orderStateName);
                wx.navigateTo({
                    url: "/pages/webview/webview?src=" + encodeURIComponent(e)
                }), this.closeKeFuFn();
            },
            showMap: function(e) {
                var t = e.stationInfo && e.stationInfo.longitude ? e.stationInfo.longitude : "", a = e.stationInfo && e.stationInfo.latitude ? e.stationInfo.latitude : "";
                t && a && (this.setData({
                    showMapBox: !0,
                    latitude: a,
                    longitude: t,
                    markers: [ {
                        id: 1,
                        latitude: a,
                        longitude: t,
                        iconPath: "http://file.40017.cn/img140017cnproduct/touch/bus/wx_bus/started.png",
                        alpha: 1,
                        width: 18,
                        height: 26
                    } ]
                }), this.mapCtx = wx.createMapContext("myMap"), this.mapCtx.moveToLocation());
            },
            openEwm: function() {
                this.data.openerweima || r.setEvent(d, "XQ07");
                var e = !this.data.openerweima;
                this.setData({
                    openerweima: e,
                    hideMainMap: !this.data.hideMainMap
                });
            },
            showRefundBox: function() {
                var e = !this.data.isOpenRefund;
                this.setData({
                    isOpenRefund: e,
                    hideMainMap: !this.data.hideMainMap
                }), r.setEvent(d, "XQ10");
            },
            onPullDownRefresh: function() {
                var e = this;
                wx.getStorageSync("tongcheng.memberid") ? e.getOrderDetail(function(t) {
                    var a = t.getTicketNo ? e.formatNumber(t.getTicketNo) : "", n = t.getTicketPassWord ? e.formatNumber(t.getTicketPassWord) : "", i = t.ticketCode ? e.formatNumber(t.ticketCode) : "";
                    e.setData({
                        orderDetail: t,
                        getTicketNo: a,
                        getTicketPassWord: n,
                        ticketCode: i
                    }), e.showMap(t), wx.stopPullDownRefresh();
                }) : e.getOrderDetail(function(t) {
                    var a = t.getTicketNo ? e.formatNumber(t.getTicketNo) : "", n = t.getTicketPassWord ? e.formatNumber(t.getTicketPassWord) : "", i = t.ticketCode ? e.formatNumber(t.ticketCode) : "";
                    e.setData({
                        orderDetail: t,
                        getTicketNo: a,
                        getTicketPassWord: n,
                        ticketCode: i
                    }), e.showMap(t), wx.stopPullDownRefresh(), ("出票失败" == t.orderStateName || "已退款" == t.orderStateName || "已退票" == t.orderStateName || "退票申请中" == t.orderStateName || "退款中" == t.orderStateName) && e.funGetRefund();
                }), this.getConfig(), wx.setNavigationBarTitle({
                    title: "汽车票订单详情"
                });
            },
            bindViewClick: function() {
                wx.navigateTo({
                    url: "../orderdetail/orderdetail"
                });
            },
            makePhoneCall: function(e) {
                r.setEvent(d, "DLXQ03");
                var t = e.currentTarget.dataset.tel;
                wx.makePhoneCall({
                    phoneNumber: t
                });
            },
            makePhoneCall2: function() {
                r.setEvent(d, "DLXQ03"), wx.makePhoneCall({
                    phoneNumber: "4007777777"
                });
            },
            getServiceTime: function() {
                var e = this;
                wx.request({
                    url: s.getServerTime,
                    header: {
                        "Content-Type": "application/json",
                        openid: wx.getStorageSync("tongcheng.openid") || "",
                        unionid: wx.getStorageSync("tongcheng.unionid") || ""
                    },
                    method: "POST",
                    success: function(t) {
                        if (t.data.body && !e.isEmpty(t.data.body)) {
                            var a = t.data.body;
                            m = {
                                server: new Date(Date.parse(a.replace(/-/g, "/"))),
                                local: new Date()
                            };
                        }
                    },
                    complete: function() {}
                });
            },
            getTicketWayData: function(e, t) {
                wx.request({
                    url: s.getTicketWay,
                    method: "POST",
                    data: e,
                    success: function(e) {
                        var a = e.data;
                        "function" == typeof t && t(a.body || {});
                    },
                    fail: function() {
                        "function" == typeof t && t({});
                    }
                });
            },
            getOrderDetail: function(e) {
                wx.hideToast(), this.setData({
                    qrCodeList: [],
                    passengerCode: []
                });
                var t = this, a = "", n = 0, c = 0, u = {
                    orderSerialId: y,
                    encryptMemberId: T || "",
                    isReadTime: t.data.isReadTime
                };
                wx.request({
                    url: s.getOrderDetail,
                    data: u,
                    header: {
                        "Content-Type": "application/json",
                        openid: wx.getStorageSync("tongcheng.openid") || "",
                        unionid: wx.getStorageSync("tongcheng.unionid") || ""
                    },
                    method: "POST",
                    success: function(s) {
                        var u;
                        if (1 == (s = s.data).header.isSuccess && (s.body.subsidyAmount && (0 > s.body.subsidyAmount ? t.setData({
                            subsidyTxt: "同程补贴" + i(s.body.subsidyAmount) + "元"
                        }) : 0 < s.body.subsidyAmount && t.setData({
                            subsidyTxt: "已退" + s.body.subsidyAmount + "元差价"
                        })), u = s.body), !!u) {
                            if (t.getTicketWayData({
                                supplierId: u.supplierId || -1
                            }, function(e) {
                                (u = o.extend(u, e, !0)).ticketTimeValue = "", t.isEmpty(u.stationInfo) || (u.stationInfo.takeTicketStartTime && u.stationInfo.takeTicketEndTime ? u.ticketTimeValue = "在" + u.stationInfo.takeTicketStartTime + "-" + u.stationInfo.takeTicketEndTime : !u.stationInfo.takeTicketStartTime && u.stationInfo.takeTicketEndTime && (u.ticketTimeValue = "在" + u.stationInfo.takeTicketEndTime + "前")), 
                                t.parseData(u);
                            }), !t.isEmpty(u)) {
                                ("wxapplet" == u.versionType || "BusWXApplet" == u.versionType) && ("出票成功" == u.orderStateName || "出票中" == u.orderStateName) && t.getCouponInfo(), 
                                "wxapplet" == u.versionType || "WXMobile" == u.versionType || "BusWXApplet" == u.versionType ? t.setData({
                                    payHidden: !1
                                }) : t.setData({
                                    payHidden: !0
                                }), new Date(u.dptDateTime.replace(/-/g, "/")).getTime() <= new Date().getTime() && "出票成功" == u.orderStateName && (a = "已发车"), 
                                ("出票失败" == u.orderStateName || "已退款" == u.orderStateName || "已退票" == u.orderStateName || "退票申请中" == u.orderStateName || "退款中" == u.orderStateName) && t.funGetRefund(), 
                                ("支付成功" == s.body.orderStateName || "索票成功" == s.body.orderStateName || "出票中" == s.body.orderStateName) && t.getUrgeFirst(s.body);
                                var l = (u.contactInfo.mobileNo ? u.contactInfo.mobileNo : u.bookingMobileNo).split("");
                                if (l[3] = "*", l[4] = "*", l[5] = "*", l[6] = "*", u.getTicketInfo) {
                                    var h = [], p = [], f = [];
                                    0 <= u.getTicketInfo.indexOf(",") ? h = u.getTicketInfo.split(",") : 0 <= u.getTicketInfo.indexOf("，") && (h = u.getTicketInfo.split("，"));
                                    for (var g = 0, m = h.length; g < m; g++) (0 <= h[g].indexOf("座位号") || 0 <= h[g].indexOf("检票口")) && p.push(h[g]);
                                    f = p.join(" ");
                                }
                                var w = [];
                                u.qrcode && !t.isEmpty(u.qrcode) && (t.setData({
                                    isHasorderQrCode: !0,
                                    qrCodeObj: {
                                        code: u.qrcode
                                    }
                                }), w.push(t.data.qrCodeObj), t.setData({
                                    qrCodeList: w,
                                    indicatorDots: !1
                                })), t.setData({
                                    neworderStateName: a,
                                    newPhone: l.join(""),
                                    chuangkou: f || [],
                                    orderChangeSerialId: u.orderChangeSerialId || "",
                                    needOrderdetail: {
                                        departure: u.departure,
                                        destination: u.destination,
                                        dptDate: u.dptDate
                                    }
                                }), u.passengersInfo && u.passengersInfo.forEach(function(e) {
                                    0 == e.passengerType ? (n += 1, t.setData({
                                        countAdult: n
                                    })) : 1 == e.passengerType && (c += 1, t.setData({
                                        countChild: c,
                                        isSupportChild: !0,
                                        childTicketPrice: e.ticketPrice
                                    })), t.data.isHasorderQrCode || !e.transId || t.isEmpty(e.transId) || (t.setData({
                                        qrCodeObj: {
                                            name: e.name,
                                            code: e.transId
                                        }
                                    }), t.getCodePath(t.data.qrCodeObj));
                                }), u.regularTime && (u.regularTime = u.regularTime.split(" ")[0]), "function" == typeof e && e(u), 
                                "出票成功" == u.orderStateName && t.getBackStroke(u), "待付款" != u.orderStateName && "已取消" != u.orderStateName || wx.hideShareMenu(), 
                                1 === u.vipSubscribe && ("出票成功" == u.orderStateName && (0 == u.vipSubscribePayState || 2 == u.vipSubscribePayState) && t.setData({
                                    isShowAdFailPop: !0
                                }), t.setData({
                                    isAdvanceOrder: !0
                                }), 0 == u.vipSubscribePayState && t.queryReadyWithHold(function() {
                                    t.data.isChannel ? (u.regularTime && (u.regularTime = u.regularTime.split(" ")[0]), 
                                    "待付款" == u.orderStateName && (u.orderStateName = "待购票", t.setData({
                                        orderDetail: u
                                    })), t.setData({
                                        hasShowChannel: !0,
                                        showWxDaiKouBtn: !1
                                    })) : t.setData({
                                        hasShowChannel: !1,
                                        showWxDaiKouBtn: !0
                                    });
                                })), t.formatPrice(u.pricesInfo), t.checkRefund(), t.orderState(a), t.funGetRunningTime(), 
                                t.getPreferentialCardByBusOrder();
                            }
                            r.setEvent(d, "DLXQ19", "^订单状态:" + u.orderStateName + "^出发城市:" + u.departure + "^到达城市:" + u.destination + "^");
                        }
                    },
                    complete: function() {}
                });
            },
            showRefundTicket: function() {
                try {
                    r.setEvent(d, "XQ16");
                } catch (e) {}
                wx.redirectTo({
                    url: "../orderdetail/orderdetail?orderSerialId=" + this.data.orderChangeSerialId
                });
            },
            getBackStroke: function(e) {
                var t, a, n, i = this;
                n = o.format1(new Date(new Date(e.dptDate).getTime() + 864e5), "yyyy-MM-dd"), a = {
                    departure: e.destination,
                    destination: e.departure,
                    departureDate: n,
                    page: 1,
                    pageSize: 25,
                    hasCategory: !0,
                    dptTimeSpan: "",
                    bookingType: 0,
                    orderTime: 0,
                    orderPrice: 0,
                    departureStation: "",
                    arrivalStation: ""
                }, wx.request({
                    url: s.getScheduleList,
                    data: JSON.stringify(a),
                    header: {
                        "Content-Type": "application/json",
                        openid: i.data.openid || wx.getStorageSync("tongcheng.openid"),
                        Refid: wx.getStorageSync("refid")
                    },
                    method: "POST",
                    success: function(a) {
                        a.data.header.isSuccess && !i.isEmpty(a.data.body.schedule) ? (t = "../list/list?fromcity=" + e.destination + "&tocity=" + e.departure + "&date=" + n, 
                        i.setData({
                            showBack: !0,
                            backUrl: t
                        })) : i.setData({
                            showBack: !1,
                            backUrl: ""
                        });
                    }
                });
            },
            linktosche: function() {
                var e = this;
                try {
                    r.setEvent(d, "XQ12");
                } catch (e) {}
                wx.redirectTo({
                    url: "../list/list?fromcity=" + e.data.needOrderdetail.departure + "&tocity=" + e.data.needOrderdetail.destination + "&date=" + e.data.needOrderdetail.dptDate
                });
            },
            cancleOrder: function() {
                var e, t, a, n, i, c, u, l = this;
                "待购票" == l.data.orderDetail.orderStateName ? (n = s.orderCancel, i = "取消订单可能会耽误您的行程，建议您耐心等待", 
                c = "再等等", u = "确定取消") : (n = s.orderCancel, i = "是否取消订单？", c = "点错了", u = "确定");
                var h = {
                    orderSerialId: y || "",
                    encryptMemberId: T || "",
                    cancelCategory: l.data.checkReasonId,
                    cancelDesc: "Other" == l.data.checkReasonId ? l.data.otherReson : l.data.cancelReasonName
                };
                r.setEvent(d, "DLXQ08"), o.alert(i, "", !0, c, u, function() {
                    l.setData({
                        showCancelModal: !1
                    }), wx.request({
                        url: n,
                        data: JSON.stringify(h),
                        header: {
                            "Content-Type": "application/json",
                            openid: wx.getStorageSync("tongcheng.openid") || "",
                            unionid: wx.getStorageSync("tongcheng.unionid") || ""
                        },
                        method: "POST",
                        success: function(n) {
                            (n = n.data).header.isSuccess ? (o.alert("订单取消成功", "", !1, "", "我知道了"), l.getOrderDetail(function(n) {
                                e = n.getTicketNo ? l.formatNumber(n.getTicketNo) : "", t = n.getTicketPassWord ? l.formatNumber(n.getTicketPassWord) : "", 
                                a = n.ticketCode ? l.formatNumber(n.ticketCode) : "", l.setData({
                                    orderDetail: n,
                                    getTicketNo: e,
                                    getTicketPassWord: t,
                                    ticketCode: a
                                });
                            }), wx.hideToast(), r.setEvent(d, "DLXQ09")) : o.alert("取消失败，请重试！");
                        },
                        complete: function() {}
                    });
                }, function() {
                    l.hideCancelModal(), r.setEvent(d, "DLXQ10");
                });
            },
            getCancelReason: function() {
                var e = this;
                wx.request({
                    url: s.getDectionaryByCode + "&code=OrderCancelReason",
                    data: {},
                    header: {
                        "content-type": "application/json",
                        openid: wx.getStorageSync("tongcheng.openid") || "",
                        unionid: wx.getStorageSync("tongcheng.unionid") || ""
                    },
                    success: function(t) {
                        e.setData({
                            cancelReasonList: JSON.parse(t.data.body || "[]") || []
                        });
                    }
                });
            },
            selectReasonFun: function(e) {
                var t = ~~e.currentTarget.index, a = this.data.cancelReasonList[t].name;
                this.setData({
                    checkReasonId: e.currentTarget.id,
                    cancelReasonName: a,
                    otherReson: ""
                });
            },
            cancleOrderModal: function() {
                this.setData({
                    showCancelModal: !0
                });
            },
            writeSeason: function(e) {
                this.setData({
                    otherReson: e.detail.value
                });
            },
            hideCancelModal: function() {
                this.setData({
                    showCancelModal: !1,
                    checkReasonId: "",
                    cancelReasonName: "",
                    otherReson: ""
                });
            },
            formatNumber: function(e) {
                return e = (e || "").toString(), 4 >= e.length ? e : 4 < e.length && 8 >= e.length ? e.substr(0, 4) + " " + e.substr(4) : e.substr(0, 4) + " " + e.substr(4, 4) + " " + e.substr(8);
            },
            showNotices: function() {
                that.setData({
                    showNotice: !0
                });
            },
            closeNotice: function() {
                that.setData({
                    showNotice: !1
                });
            },
            openConnect: function() {
                that.setData({
                    hideConnect: !1,
                    hideMainMap: !this.data.hideMainMap
                });
            },
            closeConnect: function() {
                that.setData({
                    hideConnect: !0,
                    hideMainMap: !this.data.hideMainMap
                });
            },
            parseData: function(e) {
                var t, a, n, i = this, r = 0, s = e;
                if (s.mmss = e.dptDateTime.substring(10, 16), s.month = e.dptDateTime.substring(5, 7), 
                s.day = e.dptDateTime.substring(8, 10), new Date().getDay(), s.week = o.format1(new Date(e.dptDateTime.replace(/\-/g, "/")), "ww"), 
                e && !i.isEmpty(e.contactInfo)) {
                    for (var d in t = e.regularTime.split(" ")[0].split("-"), n = e.createTime, s.createOrderTime = n.substr(5, 2) + "月" + n.substr(8, 2) + "日 " + n.substr(11, 5), 
                    s.RegularTimestr = t[0] + "年" + t[1] + "月" + t[2] + "日", s.passengersInfo) d.IDCard == e.contactInfo.IDCard && d.name == e.contactInfo.name ? (r++, 
                    s.passengersInfo[d].isCheckIn = !0) : s.passengersInfo[d].isCheckIn = !1;
                    if (s.isTicketPerson = r ? 1 : 0, e.standardStationInfo ? (s.takeOutCheckin = e.standardStationInfo.ticketDelivery, 
                    s.takeOutPhone = e.standardStationInfo.contactPhoneNo, s.takeOutsAddress = e.standardStationInfo.stationAddress, 
                    s.isStationInfo = e.standardStationInfo.contactPhoneNo || e.standardStationInfo.stationAddress ? 1 : 0) : (s.takeOutCheckin = "", 
                    s.takeOutPhone = "", s.takeOutsAddress = "", s.isStationInfo = 0), s.propertiesEntity && s.propertiesEntity.scheduleTicketType) switch (parseInt(s.propertiesEntity.scheduleTicketType)) {
                      case 1:
                        s.scheduleTicketType = "儿童票";
                        break;

                      case 2:
                        s.scheduleTicketType = "学生票";
                        break;

                      case 3:
                        s.scheduleTicketType = "军人票";
                        break;

                      case 4:
                        s.scheduleTicketType = "残疾票";
                        break;

                      case 5:
                        s.scheduleTicketType = "老年票";
                        break;

                      case 6:
                        s.scheduleTicketType = "成人票 | 儿童票";
                        break;

                      default:
                        s.scheduleTicketType = "";
                    } else s.scheduleTicketType = "";
                    s.regularTime && (s.regularTime = s.regularTime.split(" ")[0]), i.setData({
                        orderDetail: s
                    }), i.setData({
                        bottomSet: {
                            status: s.orderStateName,
                            isHasReturn: 0,
                            returnUrl: "",
                            keeponUrl: "/"
                        }
                    }), "待付款" != e.orderStateName && "已取消" != e.orderStateName || i.data.isUpdataTimes || (a = parseInt(new Date(e.createTime.replace(/-/g, "/")).getTime() - m.server.getTime() + 12e5), 
                    a = 0 > a ? 0 : a, i.updateLater(a, s));
                    var c = 0;
                    if (s.passengersInfo.length) for (var u = 0; u < s.passengersInfo.length; u++) s.passengersInfo[u].ticketCode && (i.data.isHasBarCode || i.setData({
                        isHasBarCode: !0
                    }), s.passengersInfo[u].code = s.passengersInfo[u].ticketCode.replace("data:image/png;base64,", ""), 
                    c++);
                    if (c) {
                        var l;
                        i.setData((l = {}, l["orderDetail.passengersInfo"] = s.passengersInfo, l));
                    }
                    1 < c && i.setData({
                        indicatorDots: !0
                    });
                }
            },
            slideToggle: function(e) {
                var t = this, a = e.currentTarget.dataset.open;
                "priceDetailBox" == a ? (u = !u) ? (t.setData({
                    arrowstatusA: "new-arrow-up",
                    showSlideA: u
                }), r.setEvent(d, "XQ02")) : t.setData({
                    arrowstatusA: "",
                    showSlideA: u
                }) : "passengerBox" == a ? (h = !h) ? (t.setData({
                    arrowstatusC: "new-arrow-up",
                    showSlideC: h
                }), r.setEvent(d, "DLXQ04")) : t.setData({
                    arrowstatusC: "",
                    showSlideC: h
                }) : "postBox" == a ? (l = !l) ? t.setData({
                    arrowstatusB: "new-arrow-up",
                    showSlideB: l
                }) : t.setData({
                    arrowstatusB: "",
                    showSlideB: l
                }) : "qaa" == a ? (p = !p) ? t.setData({
                    arrowstatusD: "new-arrow-up",
                    showSlideD: p
                }) : t.setData({
                    arrowstatusD: "",
                    showSlideD: p
                }) : "qab" == a ? (f = !f) ? t.setData({
                    arrowstatusE: "new-arrow-up",
                    showSlideE: f
                }) : t.setData({
                    arrowstatusE: "",
                    showSlideE: f
                }) : "qac" == a && ((g = !g) ? t.setData({
                    arrowstatusF: "new-arrow-up",
                    showSlideF: g
                }) : t.setData({
                    arrowstatusF: "",
                    showSlideF: g
                }));
            },
            slideToggleAnswer: function(e) {
                var t = this, a = e.currentTarget.dataset.index;
                "answer1" == a ? (t.setData({
                    answer1: !t.data.answer1
                }), t.data.answer1 && r.setEvent(d, "DLXQ07")) : "answer2" == a ? (t.setData({
                    answer2: !t.data.answer2
                }), t.data.answer2 && r.setEvent(d, "DLXQ07")) : "answer3" == a && (t.setData({
                    answer3: !t.data.answer3
                }), t.data.answer3 && r.setEvent(d, "DLXQ07"));
            },
            isEmpty: function(e) {
                if (null == e) return !0;
                if ("[object Array]" == toString.call(e) || "[object String]" == toString.call(e)) return 0 === e.length;
                for (var t in e) if (hasOwnProperty.call(e, t)) return !1;
                return !0;
            },
            addZero: function(e) {
                return (e = e.toString())[1] ? e : "0" + e;
            },
            updateLater: function(e, t) {
                var a, n, i = this;
                if (C && clearTimeout(C), 0 < e) {
                    a = parseInt(e / 1e3 / 60 % 60), n = parseInt(e / 1e3 % 60), e -= 1e3;
                    var o = (a ? i.addZero(a) + "分" : "") + i.addZero(n) + "秒";
                    i.setData({
                        countdown: o
                    }), C = setTimeout(function() {
                        i.updateLater(e, t);
                    }, 1e3);
                } else t.orderStateName = "已取消", i.setData({
                    orderDetail: t
                });
            },
            onLoad: function(e) {
                c.globalData.onLoadPts = e, o.loading(), wx.showlottery = this.showLottery, w = e.orderId, 
                y = e.orderSerialId || "", T = e.encryptMemberId || "", s = 24 === y.length ? o.getNewOrderApi(!0, s) : o.getNewOrderApi(!1, s);
                var t, a, n, i = !!e.fromorder, r = this, d = e.hasCard || "", u = e.shareCard || "";
                (d && "1" == d || u && "1" == u) && r.setData({
                    isFromSuccess: !0
                });
                var l = e.isReadTime || "";
                r.setData({
                    isReadTime: l
                }), r.getServiceTime(), wx.getSystemInfo({
                    success: function(e) {
                        S = e.model;
                    }
                });
                try {
                    this.checkMonthCard(), 1 == wx.getStorageSync("bus-order-sharecard") && this.setData({
                        showShareCard: !1
                    });
                } catch (e) {}
                r.getOrderDetail(function(e) {
                    t = e.getTicketNo ? r.formatNumber(e.getTicketNo) : "", a = e.getTicketPassWord ? r.formatNumber(e.getTicketPassWord) : "", 
                    n = e.ticketCode ? r.formatNumber(e.ticketCode) : "", e.regularTime && (e.regularTime = e.regularTime.split(" ")[0]), 
                    r.setData({
                        orderDetail: e,
                        getTicketNo: t,
                        getTicketPassWord: a,
                        ticketCode: n
                    }), r.showMap(e), setTimeout(function() {
                        r.showLottery(i, y), "已退款" != e.orderStateName && "退款中" != e.orderStateName || r.setData({
                            isShowCrossPlan: !1
                        });
                    }, 500);
                }), this.getConfig(), wx.setNavigationBarTitle({
                    title: "汽车票订单详情"
                }), wx.getStorageSync("bus_isPeaceTravel") && r.setData({
                    isShowCZBX: !0
                }), this.getCancelReason(), this.getTelephone();
            },
            onShow: function() {
                c.globalData.isAuth && (c.globalData.isAuth = !1, this.onLoad(c.globalData.onLoadPts));
                var e;
                new Date().getTime();
                try {
                    (e = wx.getStorageSync("bus_fromQRcode") || {
                        value: !1
                    }).value ? e.addtime + e.indate : -1, wx.getStorageSync("bus_alreadyShownEntry") || {
                        value: !1
                    };
                } catch (e) {}
                e.value && (e.indate = -1, wx.setStorageSync("bus_fromQRcode", e), wx.setStorageSync("bus_alreadyShownEntry", {
                    value: !0
                }), this.setData({
                    showEntry: !0
                })), r.setEvent(d, "XQ01");
            },
            onReady: function() {},
            onUnload: function() {
                try {
                    r.setEvent(d, "XQ000");
                } catch (e) {}
            },
            payNow: function() {
                if (!D) {
                    r.setEvent(d, "DLXQ11"), D = !0, o.loading();
                    var e, t, a = this;
                    e = S.toLowerCase().match("iphone") ? 2 : 1, t = a.data.memberId, wx.request({
                        url: s.mobileGateway,
                        data: JSON.stringify({
                            orderId: a.data.orderDetail.encryptOrderId,
                            totalAmount: a.data.orderDetail.payAmount + "",
                            memberId: t,
                            platForm: e,
                            openID: wx.getStorageSync("tongcheng.openid") || "",
                            IsSendHotelCoupon: 0,
                            platType: "1",
                            callBackName: "paymentCallBack",
                            orderSerialId: y
                        }),
                        header: {
                            "content-type": "application/json",
                            openid: wx.getStorageSync("tongcheng.openid") || "",
                            unionId: wx.getStorageSync("tongcheng.unionid"),
                            Refid: wx.getStorageSync("refid")
                        },
                        method: "POST",
                        success: function(e) {
                            D = !1;
                            var t = e.data;
                            t.header.isSuccess && t.body.TenAppPay && (b = t.body.TenAppPay, wx.requestPayment({
                                timeStamp: b.TimeStamp,
                                nonceStr: b.NonceStr,
                                package: b.Package,
                                signType: "MD5",
                                paySign: b.Sign,
                                success: function() {
                                    a.getOrderDetail(function(e) {
                                        a.setData({
                                            orderDetail: e
                                        });
                                    }), a.showLottery(!0, a.data.orderDetail.orderSerialId), wx.redirectTo({
                                        url: "../success/success?orderSerialId=" + a.data.orderDetail.orderSerialId
                                    });
                                },
                                fail: function() {
                                    o.alert("支付失败，重试一下哦~"), r.setEvent(d, "DLXQ20", "^支付失败^");
                                }
                            }));
                        },
                        complete: function() {
                            wx.hideToast();
                        }
                    }), r.setEvent(d, "XQ04");
                }
            },
            goIndex: function() {
                try {
                    r.setEvent(d, "DLXQ15");
                } catch (e) {}
                wx.switchTab({
                    url: "/pages/index/index"
                });
            },
            goBack: function() {
                var e = this;
                r.setEvent(d, "DLXQ13"), wx.redirectTo({
                    url: e.data.backUrl
                });
            },
            navigateToNotice: function() {
                r.setEvent(d, "XQ14"), wx.navigateTo({
                    url: "../notices/notices?bus=1&pagename=notices"
                });
            },
            navigateScenicToNotice: function() {
                r.setEvent(d, "XQ28"), wx.navigateTo({
                    url: "../notices/notices?bus=0&pagename=notices"
                });
            },
            modalTap: function() {
                this.setData({
                    modalHidden2: !1,
                    text: "支付失败，请重试！"
                });
            },
            modalConfirm: function() {
                this.setData({
                    modalHidden2: !0
                });
            },
            showLottery: function(e, t) {
                if (e) {
                    var a = this;
                    wx.request({
                        url: s.addIndianaTimes,
                        method: "POST",
                        data: {
                            orderNo: t,
                            openId: wx.getStorageSync("tongcheng.openid") || "",
                            unionId: wx.getStorageSync("tongcheng.unionid") || "",
                            encryptOpenId: wx.getStorageSync("tongcheng.encryopenid") || ""
                        },
                        header: {
                            "Content-Type": "application/json"
                        },
                        success: function(e) {
                            0 == 1 * e.data.errCode && a.setData({
                                lotteryShow: !0
                            });
                        }
                    });
                }
            },
            cloaselottery: function() {
                this.setData({
                    lotteryShow: !1
                });
            },
            gotoindiana: function() {
                this.setData({
                    lotteryShow: !1
                });
                try {
                    wx.setStorageSync("bus-order-sharecard", 1);
                } catch (e) {}
                wx.switchTab({
                    url: "/pages/index/index",
                    complete: function() {
                        wx.navigateTo({
                            url: "/pages/activetemplate/sharecard/sharecard?activeId=8c1a1338-ea7c-410a-950c-5f00e19898a0&wxrefid=340889673"
                        });
                    }
                });
            },
            getConfig: function() {
                var e = this;
                wx.request({
                    url: "https://wx.17u.cn/appapi/home/config?key=appapi.bus.yiyuan",
                    success: function(t) {
                        e.setData({
                            showIndiana: t.data.IsShow,
                            screenImg: t.data.ScreenImg
                        });
                    }
                });
            },
            funGetScenicDate: function() {
                var e = this;
                wx.request({
                    url: "https://wx.17u.cn/tcsceniccarbasicdsfclient/resource/line/info/byid?",
                    method: "GET",
                    data: {
                        lineId: e.data.scenicId
                    },
                    success: function(t) {
                        "request:ok" != t.errMsg || parseInt(t.data.code) || (t.data.value.ssuserNotice = t.data.value.ssuserNotice.replace(/<br>|<br\/>|<\/span>|<p>|<\/p>|<div>|<\/div>|(<p|<span) class="\w*">|(<p|<span) style="[\w-.:; ]*">/gi, ""), 
                        e.setData({
                            scenicInfo: t.data.value.ssuserNotice
                        }));
                    }
                });
            },
            funGetRunningTime: function() {
                wx.request({
                    url: s.getRunTime,
                    method: "POST",
                    data: {
                        departure: this.data.orderDetail.departure || "",
                        destination: this.data.orderDetail.destination || ""
                    },
                    success: function(e) {
                        try {
                            e.data.header.isSuccess && e.data.body.runTime && e.data.body.runTime;
                        } catch (e) {}
                    }
                });
            },
            funGetRefund: function() {
                var e = this;
                wx.request({
                    url: s.getRefoundProcess,
                    method: "POST",
                    header: {
                        "Content-Type": "application/json",
                        openid: wx.getStorageSync("tongcheng.openid") || "",
                        unionid: wx.getStorageSync("tongcheng.unionid") || ""
                    },
                    data: {
                        orderSerialId: y
                    },
                    success: function(t) {
                        if (t.data.header.isSuccess && "request:ok" == t.errMsg) {
                            var a, n, i, o, r, s, d, t = t.data, c = [], u = 0, l = 0, h = 0;
                            if (e.isEmpty(t.body.refundProcess)) e.setData({
                                isShowRefund: !1
                            }); else {
                                a = function(e) {
                                    for (var a = 0, n = t.body.refundProcess.length; a < n; a++) if (e == t.body.refundProcess[a].status) return t.body.refundProcess[a];
                                }, n = function(e, t) {
                                    return e < t ? -1 : e > t ? 1 : 0;
                                }, i = function(e) {
                                    if (e) return e.substr(5, 2) + "月" + e.substr(8, 2) + "日 " + e.substr(11);
                                };
                                for (var p = 0, f = t.body.refundProcess.length; p < f; p++) c.push(t.body.refundProcess[p].status);
                                c.sort(n), 0 == c[0] && (u = c[c.length - 1], l = c[1], o = a(0).changedTime, 1 > u ? h = 1 : 1 <= u && 7 > u ? (h = 2, 
                                r = a(l).changedTime) : 7 <= u && 9 > u ? (h = 3, r = a(l).changedTime, s = a(7).changedTime) : (h = 4, 
                                r = a(l).changedTime, s = a(7).changedTime, d = a(9).changedTime), e.setData({
                                    refundData: {
                                        show: h,
                                        subscribeRefund: t.body.subscribeRefund || 0,
                                        refundAmount: t.body.refundAmount || 0,
                                        totalRefund: (1e3 * t.body.subscribeRefund + 1e3 * t.body.refundAmount) / 1e3,
                                        isRefund: t.body.isOrderRefund,
                                        one: i(o),
                                        two: i(r),
                                        three: i(s),
                                        four: i(d),
                                        isShowRefund: !0
                                    },
                                    isShowRefund: !0
                                }));
                            }
                        } else e.setData({
                            isShowRefund: !1
                        });
                    },
                    fail: function() {
                        e.setData({
                            isShowRefund: !1
                        });
                    }
                });
            },
            linkToYy: function(e) {
                var e, t = "";
                return this.data.orderDetail.pricesInfo.forEach(function(t) {
                    "BusYiyuanFree" == t.itemCode && (e = t.amount);
                }), t = "https://wx.17u.cn/groundtrafficAct/bus2018/YyfreeActivity/index?price=" + e, 
                wx.navigateTo({
                    url: "/pages/webview/webview?src=" + encodeURIComponent(t)
                }), !1;
            },
            closePopPrice: function() {
                this.setData({
                    showPopPrice: !this.data.showPopPrice,
                    hideMainMap: !this.data.hideMainMap
                }), this.data.showPopPrice && r.setEvent(d, "DLXQ01");
            },
            showMap2: function() {
                var e = this;
                r.setEvent(d, "DLXQ02"), o.isEmpty(e.data.point) && (e.data.point = this.BdmapEncryptToMapabc(e.data.latitude, e.data.longitude));
                var t = e.data.point;
                this.setData({
                    isHiddenMap: !1,
                    hideMainMap: !this.data.hideMainMap,
                    latitude: t.lat,
                    longitude: t.lng,
                    markers: [ {
                        id: 1,
                        iconPath: "http://img1.40017.cn/touch/bus/wx_bus/statred.png",
                        latitude: t.lat,
                        longitude: t.lng,
                        alpha: 1,
                        width: 18,
                        height: 26
                    } ]
                }), this.mapCtx = wx.createMapContext("stationMap"), this.mapCtx.moveToLocation(), 
                wx.getSystemInfo({
                    success: function(a) {
                        e.setData({
                            controls: [ {
                                id: 1,
                                iconPath: "http://img1.40017.cn/touch/bus/wx_bus/statred.png",
                                latitude: t.lng,
                                longitude: t.lng,
                                position: {
                                    left: 20,
                                    top: a.windowHeight - 80,
                                    width: 50,
                                    height: 50
                                },
                                clickable: !0
                            } ]
                        });
                    }
                });
            },
            closeMap: function() {
                this.setData({
                    isHiddenMap: !0,
                    hideMainMap: !this.data.hideMainMap
                });
            },
            getCouponInfo: function() {
                var e = this;
                wx.request({
                    url: s.getCrtVSA,
                    method: "POST",
                    header: {
                        "Content-Type": "application/json",
                        openid: wx.getStorageSync("tongcheng.openid") || "",
                        unionid: wx.getStorageSync("tongcheng.unionid") || ""
                    },
                    data: {},
                    success: function(t) {
                        if (t.data.header.isSuccess) {
                            var a = t.data.body.url, n = t.data.body.to;
                            e.setData({
                                shareUrl: a
                            }), new Date().getTime() <= n && (e.data.isFromSuccess ? e.setData({
                                couponPop: !0,
                                couponSmall: !1
                            }) : e.setData({
                                couponPop: !1,
                                couponSmall: !0
                            }));
                        }
                    }
                });
            },
            getKanInfo: function(e, t) {
                var a = this;
                wx.request({
                    url: s.bargainKan,
                    method: "POST",
                    header: {
                        "Content-Type": "application/json",
                        openid: wx.getStorageSync("tongcheng.openid") || "",
                        unionid: wx.getStorageSync("tongcheng.unionid") || ""
                    },
                    data: {
                        serialId: e
                    },
                    success: function(e) {
                        e.data.header.isSuccess ? "出票成功" == t && a.setData({
                            popKan: 1 == e.data.body,
                            isShowKan: 1 == e.data.body
                        }) : a.setData({
                            popKan: !1,
                            isShowKan: !1
                        });
                    }
                });
            },
            closeCouponPop: function() {
                this.setData({
                    couponPop: !1,
                    couponSmall: !0
                });
            },
            couponShare: function(e) {
                var t = e.currentTarget.dataset.url;
                wx.navigateTo({
                    url: "/" + t
                }), this.closeCouponPop();
            },
            redEnvelope: function() {
                this.setData({
                    isShake: !0
                });
            },
            getCodePath: function(e) {
                var t = this, a = e.code, n = e.name;
                wx.request({
                    url: s.root + "config/getImageByteStream?plateId=12",
                    method: "GET",
                    data: {
                        qrCode: a
                    },
                    header: {
                        "Content-Type": "application/json"
                    },
                    success: function(e) {
                        var a = e.data;
                        a.body && (t.setData({
                            qrCodeObj: {
                                name: n,
                                code: a.body
                            }
                        }), t.data.passengerCode.push(t.data.qrCodeObj), t.setData({
                            qrCodeList: t.data.passengerCode
                        }), 1 < t.data.qrCodeList.length && t.setData({
                            indicatorDots: !0
                        }));
                    }
                });
            },
            isEmptyObject: function(e) {
                for (var t in e) return !1;
                return !0;
            },
            onPageScroll: function() {},
            setEvent: function(e, t) {
                ev.settings.label = e, ev.settings.value = t, ev.submit();
            },
            queryTicketOutNoPay: function() {
                var e = this;
                o.wxhttp(s.getWithholdNoPayOrderExist, {}).then(function(t) {
                    t.header.isSuccess && (e.setData({
                        ASisExceedLimit: t.body.beOverTop
                    }), t.body.nopayOrderExist && e.setData({
                        isShowAdFailPop: !0,
                        noPaySerialId: t.body.orderSerialId
                    }));
                }).catch(function(e) {
                    console.warn(e);
                });
            },
            queryReadyWithHold: function(e) {
                var t = this;
                o.wxhttp(s.queryReadyWithHold, {
                    orderSerialId: t.data.orderDetail.orderSerialId
                }).then(function(a) {
                    a.header.isSuccess ? (t.setData({
                        isChannel: a.body.isChannel
                    }), "function" == typeof e && e(a.body.isChannel)) : "EI_ORDER_00069" == a.header.errCode && o.alert(a.header.errMsg);
                }).catch(function(e) {
                    console.warn(e);
                });
            },
            ChannelWithHold: function(e) {
                var t = this;
                o.wxhttp(s.channelForApplet, {
                    name: t.data.orderDetail.contactInfo.name,
                    serialId: e
                }).then(function(e) {
                    if (e.header.isSuccess && e.body) {
                        var t = e.body;
                        wx.navigateToMiniProgram({
                            appId: "wxbd687630cd02ce1d",
                            path: "pages/index/index",
                            extraData: JSON.parse(t.Content),
                            success: function() {},
                            fail: function() {}
                        });
                    }
                }).catch(function(e) {
                    console.warn(e);
                });
            },
            showChannelFn: function() {
                this.setData({
                    showChannel: !this.data.showChannel
                });
            },
            showSubscribeInfo: function() {
                this.setData({
                    isShowSubscribeInfo: !this.data.isShowSubscribeInfo
                });
            },
            toOrderDetailPay: function() {
                var e = this;
                this.setData({
                    isShowAdFailPop: !1
                }), wx.request({
                    url: s.withholdGateway,
                    data: JSON.stringify({
                        orderSerialId: y,
                        totalAmount: e.data.orderDetail.payAmount + "",
                        platForm: S.toLowerCase().match("iphone") ? 2 : 1,
                        isWithhold: !0
                    }),
                    header: {
                        "content-type": "application/json",
                        openid: wx.getStorageSync("tongcheng.openid") || "",
                        unionId: wx.getStorageSync("tongcheng.unionid"),
                        Refid: wx.getStorageSync("refid")
                    },
                    method: "POST",
                    success: function(t) {
                        var a = t.data;
                        a.header.isSuccess && a.body.TenAppPay && (b = a.body.TenAppPay, wx.requestPayment({
                            timeStamp: b.TimeStamp,
                            nonceStr: b.NonceStr,
                            package: b.Package,
                            signType: "MD5",
                            paySign: b.Sign,
                            success: function() {
                                e.getOrderDetail(function(t) {
                                    e.setData({
                                        orderDetail: t
                                    });
                                }), e.showLottery(!0, e.data.orderDetail.orderSerialId), wx.redirectTo({
                                    url: "../success/success?orderSerialId=" + e.data.orderDetail.orderSerialId
                                });
                            },
                            fail: function() {
                                o.alert("支付失败，重试一下哦~", "", "", "", "", function() {
                                    e.setData({
                                        isShowAdFailPop: !0
                                    });
                                }), r.setEvent(d, "DLXQ20", "^支付失败^");
                            }
                        }));
                    },
                    complete: function() {
                        wx.hideToast();
                    }
                });
            },
            wxPayNow: function() {
                var e = this, t = this.data.orderDetail.orderSerialId;
                return e.queryReadyWithHold(function() {
                    e.data.isChannel ? wx.redirectTo({
                        url: "../orderdetail/orderdetail?isReadTime=true&orderSerialId=" + t
                    }) : e.ChannelWithHold(t);
                }), !1;
            }
        }, n.queryReadyWithHold = function(e) {
            var t = this;
            o.wxhttp(s.queryReadyWithHold, {
                orderSerialId: this.data.orderDetail.orderSerialId
            }).then(function(a) {
                a.header.isSuccess && (t.setData({
                    isChannel: a.body.isChannel
                }), "function" == typeof e && e());
            }).catch(function(e) {
                console.warn(e);
            });
        }, n.fnMonthcardDetail = function() {
            this.setData({
                showMonthCard: !1
            }), r.setEvent(d, "DLXQ05");
        }, n.closeMonthCard = function() {
            this.setData({
                showMonthCard: !0
            });
        }, n.closeMonthCardBox = function() {
            this.setData({
                showMonthCardBox: !1
            });
        }, n.getPreferentialCardInfo = function() {
            var e = this, t = e.data, a = new Date(), n = +wx.getStorageSync(t.orderDetail.orderSerialId);
            10 <= (a - new Date(n || a)) / 1e3 / 60 / 60 / 24 && (wx.removeStorageSync(t.orderDetail.orderSerialId), 
            n = 0), o.wxhttp(s.getPreferentialCardInfo, {
                memberId: t.orderDetail.memberId,
                departureName: t.orderDetail.departure,
                destinationName: t.orderDetail.destination,
                depStation: t.orderDetail.dptStation,
                desStation: t.orderDetail.arrStation,
                supplierId: t.orderDetail.supplierId,
                ticketPrice: t.orderDetail.ticketPrice,
                dptDate: t.orderDetail.dptDate,
                dptTime: t.orderDetail.dptTime
            }).then(function(a) {
                if (a.header.isSuccess && !o.isEmpty(a.body)) {
                    var i = !(!t.orderDetail.preferentialCard || !t.orderDetail.preferentialCard.preferentialCardBuyId);
                    e.setData({
                        monthCardInfo: a.body,
                        showMonthOption: !i && !o.isEmpty(a.body),
                        showMonthCardBox: !i && !o.isEmpty(a.body) && !n
                    }), n || wx.setStorageSync(t.orderDetail.orderSerialId, 1 * new Date());
                } else e.setData({
                    showMonthOption: !1
                });
            }).catch(function(t) {
                console.warn(t), e.setData({
                    showMonthOption: !1
                }), "function" == typeof callback && callback();
            });
        }, n.goCardDetail = function() {
            wx.navigateTo({
                url: "/pages/webview/webview?src=" + encodeURIComponent("https://wx.17u.cn/groundtrafficAct/monthCardDetail?channel=1&cardid=" + (this.data.orderDetail.preferentialCard.preferentialCardBuyId || -1))
            });
        }, n.getPreferentialCard = function() {
            var e = this, t = e.data.orderDetail.preferentialCard && e.data.orderDetail.preferentialCard.preferentialCardBuyId;
            t && o.wxhttp(s.getMemberPreferentialCard, {
                id: t || "-1"
            }).then(function(t) {
                if (t.header.isSuccess && !o.isEmpty(t.body)) {
                    var a = t.body.discountRuleContent.split(/<br>|<br\/>/);
                    e.setData({
                        availableCard: t.body,
                        discountRuleContent: a
                    });
                }
            });
        }, n.getPreferentialCardByBusOrder = function() {
            var e = this;
            !(this.data.orderDetail.pricesInfo || []).find(function(e) {
                return "PreferentialCard_Preferential" == e.itemCode;
            }) || o.wxhttp(s.getPreferentialCardByBusOrder, {
                orderSn: this.data.orderDetail.orderSerialId
            }).then(function(t) {
                t.header.isSuccess && !o.isEmpty(t.body) && e.setData({
                    availableCard: t.body,
                    discountRuleContent: t.body.discountRuleContent.split(/<br>|<br\/>/)
                });
            });
        }, n.getCrossData = function() {
            var e = this, t = e.data.orderDetail;
            wx.request({
                url: "https://wx.17u.cn/frontstageunion/crossrecmmend/queryMulty",
                header: o.setHeader(),
                method: "GET",
                data: {
                    param: JSON.stringify({
                        planCode: "030111",
                        beginDate: t.dptDateTime,
                        fromCityId: t.dptStationId || 0,
                        toCityId: t.destStationId || 0,
                        fromCityName: t.departure,
                        toCityName: t.destination,
                        platId: 852,
                        memberId: wx.getStorageSync("tongcheng.memberid") || "",
                        openId: wx.getStorageSync("tongcheng.openid") || ""
                    })
                },
                success: function(t) {
                    t = t.data, o.isEmpty(t) || o.isEmpty(t.result) || o.isEmpty(t.result.plans) || e.setData({
                        crossPlan: t.result.plans,
                        isShowCrossPlan: !0
                    });
                }
            });
        }, n.crossHotels = function(e) {
            var t = this, a = this.data.orderDetail, n = e ? o.addTime(a.dptDateTime, e + "H", "Y-M-D H:F:S") : "", i = {
                fromCityId: a.depCityId,
                toCityId: a.desCityId,
                hotelsLimit: 1,
                openId: wx.getStorageSync("tongcheng.openid") || "",
                orderSerialNo: y,
                platId: "852",
                planCode: "030111",
                fromCity: a.departure,
                toCity: a.destination,
                fromStation: a.dptStation,
                toStation: a.arrStation,
                startDate: a.dptDateTime,
                endDate: n,
                orderdate: a.createTime
            };
            wx.request({
                url: "https://wx.17u.cn/frontstageunion/hotelCross/hotelRecommend",
                header: o.setHeader(),
                method: "GET",
                data: {
                    param: JSON.stringify(i)
                },
                success: function(e) {
                    "0000" != (e = e.data).code || o.isEmpty(e.result) || o.isEmpty(e.result.hotels) || t.setData({
                        hotelLink: e.result.hotels[0].xcxlink,
                        isShowCrossPlan: !0
                    });
                }
            });
        }, n.crossTap = function(e) {
            console.log(e);
            var t = e.currentTarget.dataset.category, a = this.data.crossPlan[t].redirectUrl;
            wx.navigateTo({
                url: "/pages/webview/webview?src=" + encodeURIComponent(a)
            });
        }, n.crossTaphot = function() {
            wx.navigateTo({
                url: this.data.hotelLink
            });
        }, n.getTelephone = function() {
            var e = this;
            o.wxhttp(s.telephone).then(function(t) {
                t.header.isSuccess && e.setData({
                    showNewKeFu: t.body
                });
            });
        }, n.callKefu = function() {
            wx.makePhoneCall({
                phoneNumber: "4007777777"
            }), this.closeKeFuFn();
        }, n.showKefuFn = function() {
            this.setData({
                showKeFu: !this.data.showKeFu
            }), this.data.showKeFu && r.setEvent(d, "DLXQ06");
        }, n.closeKeFuFn = function() {
            this.setData({
                showKeFu: !1
            });
        }, n.BdmapEncryptToMapabc = function(e, t) {
            var a = Math.cos, n = Math.sin, i = {}, o = 52.35987755982988, r = new Number(t - .0065), s = new Number(e - .006), d = Math.sqrt(r * r + s * s) - 2e-5 * n(s * o), c = Math.atan2(s, r) - 3e-6 * a(r * o), u = d * a(c), l = d * n(c);
            return i.lng = u, i.lat = l, i;
        }, n.onShareAppMessage = function() {
            return {
                title: "买车票就上同程汽车票！省心、更放心！",
                path: "/pages/index/index"
            };
        }, n));
    }
}, [ 125 ]);