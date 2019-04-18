!function() {
    require("./../../../../common.js"), wx.webpackJsonp.apply(null, arguments);
}([ 15 ], {
    106: function(t, e, a) {
        function i(t) {
            return t && t.__esModule ? t : {
                default: t
            };
        }
        var n = i(a(27)), o = i(a(5)), r = a(14), s = getApp(), d = a(1).default, c = a(0);
        Page({
            info: {
                runningTimer: ""
            },
            data: {
                pid: "",
                pidAddTime: "",
                refid: "",
                header: {},
                queryDate: c.parseDate(c.format(new Date(), "Y-M-D")),
                fromCity: "",
                toCity: "",
                depCId: 0,
                desCId: 0,
                flagId: "",
                todayYMD: c.format(new Date(), "Y-M-D"),
                saleDayObj: {
                    isSubscribe: !1,
                    canSaleDay: 30,
                    subscribeDay: 0,
                    saleDay: 30,
                    saleBeginDate: c.format(new Date(), "Y-M-D")
                },
                endDate: "",
                sixDayArrs: [],
                loading: !1,
                page: 0,
                totalPage: 1,
                busList: [],
                scrollTop: 0,
                scrollTopTemp: 0,
                isShowNoMore: !1,
                renderList: [],
                isShowFilter: !1,
                isHasStation: !1,
                urlFStation: "",
                urlTStation: "",
                fromStation: "",
                toStation: "",
                timeSpan: "",
                isUserChange: !1,
                activeCat: "",
                departureStation: [],
                arrivalStation: [],
                dptTimeSpan: [],
                filterTop: 0,
                recommendMsg: "",
                isShowDisInfo: !1,
                subPriceRiseRatio: 0,
                announceList: [],
                isShowNotice: !1,
                isShowNoResult: !1,
                noResultTxt: [ "暂未查到当日可售汽车票", "您可以重新查询试试" ],
                showRunning: !1,
                firstLoad: !0
            },
            onLoad: function(t) {
                var e = this;
                s.globalData.onLoadPts = t, wx.removeStorageSync("bus-selectStation"), wx.removeStorageSync("_selectedDate"), 
                -1 < d.getServerTime.indexOf("wxbusapi") && (d = c.getNewOrderApi(!0, d)), new Promise(function(e, a) {
                    var i = t.scene;
                    i && !t.wxParamData ? c.$http(d.GetAppQrCodePath + "?" + decodeURIComponent(i)).then(function(t) {
                        e(t.data.PathJson);
                    }).catch(function(t) {
                        console.error("request api.GetAppQrCodePath fail:", t), a(t);
                    }) : e(t);
                }).then(function(t) {
                    var a = t.pid || "", i = t.pid ? Date.now() : "", n = t.flagId || "", o = decodeURIComponent(t.fromstation || ""), r = decodeURIComponent(t.tostation || ""), d = t.crossrefid || t.wxrefid || s.globalData.wxrefid || wx.getStorageSync("refid");
                    return s.globalData.wxrefid = d, wx.setStorageSync("refid", d), e.setData({
                        header: c.setHeader(),
                        refid: d,
                        pid: a,
                        pidAddTime: i,
                        flagId: n,
                        queryDate: c.parseDate(t.date).getTime(),
                        fromCity: decodeURIComponent(t.fromcity || ""),
                        toCity: decodeURIComponent(t.tocity || ""),
                        fromStation: o,
                        toStation: r,
                        depCId: t.bfCityId || 0,
                        desCId: t.btCityId || 0,
                        isHasStation: !(!o && !r),
                        urlFStation: o,
                        urlTStation: r
                    }), console.log("onload queryDate:", e.data.queryDate), wx.setNavigationBarTitle({
                        title: e.data.fromCity + "-" + e.data.toCity
                    }), e.reqBusSaleDay(e.data.fromCity, e.data.toCity);
                }).catch(function(t) {
                    console.error && console.error(t), o.default.setEvent(pageName, "DLLB09", "^名称:[获取处理options出错：" + JSON.stringify(t) + "]^");
                }).then(function(t) {
                    e.setData({
                        saleDayObj: t
                    });
                    var a = 1 == parseInt(e.data.saleDayObj.canSaleDay) ? 1 : parseInt(e.data.saleDayObj.canSaleDay) - 1, i = c.addTime(e.data.saleDayObj.saleBeginDate, a + "D"), n = i.getTime(), o = c.format(i, "Y-M-D");
                    e.setData({
                        endDate: o
                    }), console.log("获取预售期后 endDay:", i), (e.data.queryDate > n || e.data.queryDate < c.parseDate(e.data.saleDayObj.saleBeginDate).getTime()) && (console.log("出发时间不在预售期内，重置为明天"), 
                    e.setData({
                        queryDate: c.parseDate(e.data.todayYMD).getTime()
                    })), e.fnInitCalender(e.data.queryDate), e.reqBusList({
                        method: "onload"
                    }), e.getDictionaryCity();
                }).catch(function(t) {
                    console.error && console.error(t), o.default.setEvent(pageName, "DLLB09", "^名称:[" + JSON.stringify(t) + "]^");
                });
            },
            reqBusSaleDay: function(t, e) {
                return c.$http(d.busGetSaleDay, {
                    departure: t || "",
                    destination: e || ""
                }).then(function(t) {
                    return Promise.resolve(t || {});
                }).catch(function(t) {
                    return console.log("请求预售期接口失败，使用saleDayObj的默认值作为预售期"), console.error && console.error(t), 
                    o.default.setEvent(pageName, "DLLB09", "^名称:[获取预售期失败" + JSON.stringify(t) + "]^"), 
                    Promise.resolve({});
                });
            },
            reqBusList: function(t) {
                var e = this;
                this.data.fromStation, this.data.toStation, this.data.timeSpan;
                if (this.data.loading || "scrollLoad" == t.method && this.data.page >= this.data.totalPage || "scrollLoad" == t.method && this.data.isShowNoResult) return this.data.loading && console.log("不能请求：上一次请求还未结束"), 
                this.data.page >= this.data.totalPage && console.log("不能请求：请求页超过总页数"), !1;
                console.log("开始请求schedulelist"), c.loading(), "scrollLoad" != t.method && this.fnResetPageTop(), 
                "queryDate" == t.method && (this.setData({
                    isShowNoMore: !1
                }), this.data.isHasStation && this.data.firstLoad && this.setData({
                    fromStation: this.data.urlFStation,
                    toStation: this.data.urlTStation,
                    timeSpan: ""
                })), "filterParam" == t.method && this.data.recommendMsg && this.setData({
                    recommendMsg: ""
                }), this.setData({
                    loading: !0,
                    page: this.data.page + 1
                }), c.$http(d.getScheduleList, {
                    departureStation: this.data.fromStation,
                    arrivalStation: this.data.toStation,
                    dptTimeSpan: this.data.timeSpan,
                    depId: this.data.depCId || 0,
                    desId: this.data.desCId || 0,
                    departureDate: c.format(new Date(this.data.queryDate), "Y-M-D"),
                    departure: this.data.fromCity,
                    destination: this.data.toCity,
                    page: this.data.page,
                    pageSize: 25,
                    orderTime: 0,
                    orderPrice: 0,
                    hasCategory: !0,
                    fromPage: "filterParam" == t.method && (this.data.fromStation || this.data.toStation || this.data.timeSpan) ? "schedule" : "",
                    depCityId: 0,
                    desCityId: 0,
                    depFromProjectId: 0
                }).then(function(a) {
                    wx.hideToast(), e.setData({
                        loading: !1
                    }), c.isEmpty(a) ? ("onload" == t.method && o.default.setEvent(r.list, "DLLB08", "^出发城市:" + e.data.fromCity + "^到达城市:" + e.data.toCity + "^是否灰屏:是^"), 
                    e.fnGetScheduleFail(a)) : ("onload" == t.method && o.default.setEvent(r.list, "DLLB08", "^出发城市:" + e.data.fromCity + "^到达城市:" + e.data.toCity + "^是否灰屏:否^"), 
                    e.setData({
                        totalPage: a.pageInfo.totalPage || 1
                    }), e.data.totalPage == e.data.page && e.setData({
                        isShowNoMore: !0
                    }), !c.isEmpty(a.category) && e.fnDealFilter(a), 1 == e.data.page && (e.data.subPriceRiseRatio ? e.reqAnnounce(a.schedule) : e.reqPriceRiseRatio().then(function() {
                        e.reqAnnounce(a.schedule);
                    }).catch(function(t) {
                        return console.error(t);
                    }), e.reqCardDiscountInfo(a.schedule)), a.schedule.forEach(function(t) {
                        t.runTimeScope && 0 < t.runTimeScope.length && (t.runTimeScopeTime = t.runTimeScope.join("~"));
                    }), a.dataSource && /RecommendMsg:/gi.test(a.dataSource) ? e.setData({
                        recommendMsg: a.dataSource.replace("RecommendMsg:", ""),
                        fromStation: "",
                        toStation: "",
                        timeSpan: ""
                    }) : e.setData({
                        recommendMsg: ""
                    }), "scrollLoad" == t.method ? e.setData({
                        busList: e.data.busList.concat(a.schedule)
                    }) : e.setData({
                        busList: a.schedule
                    }), e.reqPreferGroup(e.data.busList));
                }).catch(function(a) {
                    "onload" == t.method && o.default.setEvent(r.list, "DLLB08", "^出发城市:" + e.data.fromCity + "^到达城市:" + e.data.toCity + "^是否灰屏:是^"), 
                    wx.hideToast(), e.setData({
                        loading: !1
                    }), e.fnGetScheduleFail(a), console.error && console.error(a), o.default.setEvent(pageName, "DLLB09", "^名称:[请求班次列表失败：" + JSON.stringify(a) + "]^");
                });
            },
            reqPreferGroup: function(t) {
                var e = this, a = [];
                t.forEach(function(t) {
                    a.push({
                        depStation: t.dptStation,
                        scheduleNo: t.scheduleNo,
                        ticketPrice: t.ticketPrice
                    });
                }), c.$http(d.getPreferGroup, {
                    departure: this.data.fromCity,
                    destination: this.data.toCity,
                    dptDate: this.data.queryDate,
                    schedule: a
                }).then(function(a) {
                    if (c.isEmpty(a.body)) t.forEach(function(t) {
                        0 < t.discount && (t.preferential = {
                            showInformation: "已优惠" + t.discount + "元",
                            preferentialMode: 0
                        });
                    }), e.setData({
                        busList: t
                    }); else {
                        var i = {};
                        t.forEach(function(t) {
                            for (var e = 0, n = a.body.length; e < n; e++) (i = a.body[e]).unionKey == t.scheduleNo.substr(0, 14) + "****" + t.scheduleNo.substr(18) && i.ticketPrice == t.ticketPrice ? 0 < t.discount ? t.preferential = {
                                preferentialType: i.detailInfo.preferentialType,
                                userType: i.detailInfo.userType,
                                showInformation: "最高立减" + (t.discount + (0 < i.detailInfo.preferentialType ? i.detailInfo.preferentialType : 0)) + "元",
                                preferentialMode: 0 == i.detailInfo.preferentialMode || 1 == i.detailInfo.preferentialMode || 2 == i.detailInfo.preferentialMode ? i.detailInfo.preferentialMode : 1,
                                backPreferentialAmount: i.detailInfo.backPreferentialAmount,
                                backShowInformation: "最高立减" + (t.discount + (0 < i.detailInfo.backPreferentialAmount ? i.detailInfo.backPreferentialAmount : 0)) + "元",
                                backUserType: i.detailInfo.backUserType
                            } : t.preferential = i.detailInfo : 0 < t.discount && (t.preferential = {
                                showInformation: "已优惠" + t.discount + "元",
                                preferentialMode: 0
                            });
                        }), e.setData({
                            busList: t
                        });
                    }
                }).catch(function(a) {
                    console.log("request getPrferGroup error: ", a), t.forEach(function(t) {
                        0 < t.discount && (t.preferential = {
                            showInformation: "已优惠" + t.discount + "元",
                            preferentialMode: 0
                        });
                    }), e.setData({
                        busList: t
                    });
                });
            },
            reqCardDiscountInfo: function(t) {
                var e = this, a = [];
                t.forEach(function(t) {
                    a.push(t.ticketPrice);
                }), c.$http(d.getCardDiscountInfo, {
                    ticketPrice: Math.min.apply(null, a)
                }).then(function(t) {
                    !c.isEmpty(t) && 0 < t.count && e.setData({});
                });
            },
            reqPriceRiseRatio: function() {
                var t = this;
                return c.$http(d.getPriceRiseRatio, {}, "POST", this.data.header).then(function(e) {
                    if (e) return t.setData({
                        subPriceRiseRatio: e
                    }), Promise.resolve(e);
                }).catch(function(t) {
                    return console.error("request busConfig.getPriceRiseRatio error: ", t), t;
                });
            },
            reqAnnounce: function(t) {
                var e = this;
                c.$http(d.getAnnounceList, {
                    projectId: 0,
                    pageType: "listPage",
                    departureCityName: this.data.fromCity,
                    departureStationName: this.data.fromStation,
                    supplierId: ""
                }).then(function(a) {
                    var i = a || [];
                    t && t[0] && 2 == t[0].bookingType && (e.data.subPriceRiseRatio ? i.push({
                        title: "为顺利购票，预约班次按票价上浮" + e.data.subPriceRiseRatio + "%收取，出票成功后退还差价",
                        announce: "为顺利购票，预约班次按票价上浮" + e.data.subPriceRiseRatio + "%收取，出票成功后退还差价",
                        templateId: ""
                    }) : i.push({
                        title: "暂未到达车站预售时间，到达车票发售期后马上为您出票。",
                        announce: "暂未到达车站预售时间，到达车票发售期后马上为您出票。",
                        templateId: ""
                    })), e.setData({
                        announceList: i,
                        currentIndex: 0
                    });
                }).catch(function(t) {
                    return console.error("request api.getAnnounceList error: ", t);
                });
            },
            fnInitCalender2: function(t) {
                console.log("fnInitCalender2");
                for (var e = [], a = 0; 6 >= a; a++) {
                    var i = c.addTime(t, (1 >= a ? -1 * a : a - 1) + "D"), n = this.fnCreateOneDay(i, t);
                    1 >= a ? e.unshift(n) : e.push(n);
                }
                e[0].canSelect ? e.pop() : e.shift(), this.setData({
                    queryDate: c.addTime(t, "0D").getTime(),
                    sixDayArrs: e
                });
            },
            fnInitCalender: function(t) {
                var e = this;
                console.log("fnInitCalender");
                for (var a = [], i = this.data.endDate, n = this.fnCreateOneDay(c.addTime(t, "-1D"), this.data.queryDate), o = 0; 10 >= o; o++) {
                    var r = c.addTime(t, (5 >= o ? -1 * o : o - 5) + "D"), s = this.fnCreateOneDay(r, t);
                    5 >= o ? a.unshift(s) : a.push(s);
                }
                var d = a.findIndex(function(t) {
                    return t.date == i;
                }), u = a.findIndex(function(t) {
                    return t.date == e.data.saleDayObj.saleBeginDate;
                });
                6 <= this.data.saleDayObj.saleDay ? -1 < d && 4 > d - 5 ? (a.splice(d + 1), a.splice(0, a.length - 6)) : n.canSelect ? (a.splice(0, 4), 
                a.pop()) : a.splice(0, 5) : (a.splice(0, u), a.splice(6)), this.setData({
                    queryDate: c.addTime(t, "0D").getTime(),
                    sixDayArrs: a
                });
            },
            fnCreateOneDay: function(t, e) {
                var a = this.data.saleDayObj.saleBeginDate, i = this.data.endDate, n = c.format(t, "Y-M-D"), o = c.format(e, "Y-M-D");
                return {
                    showDate: c.format(t, "M-D"),
                    date: n,
                    weekend: n == this.data.todayYMD ? "今天" : c.format1(t, "ww"),
                    isSelected: n == o,
                    canSelect: t.getTime() >= c.parseDate(a).getTime() && t.getTime() <= c.parseDate(i).getTime()
                };
            },
            fnResetPageTop: function() {
                this.setData({
                    busList: [],
                    page: 0,
                    totalPage: 1,
                    scrollTop: 0,
                    scrollTopTemp: 0
                });
            },
            fnGetScheduleFail: function(t) {
                t.header;
                var e = t.body;
                if (!c.isEmpty(e) && c.isEmpty(e.schedule) && e.hasOwnProperty("dataSource") && void 0 !== e.dataSource) switch (e.dataSource) {
                  case "Invalid Line":
                  case "Invalid_Line":
                    this.data.noResultTxt = [ "暂未开通网上售票", "您可以试试其他出行方案" ];
                    break;

                  case "No_Schedule":
                  case "The_Day_No_Schedule":
                    this.data.noResultTxt = [ "暂未查到当日可售班次", "您可以试试其他出行方案" ];
                }
                this.setData({
                    busList: [],
                    isShowFilter: !1,
                    isShowNoResult: !0
                }), this.fnResetPageTop();
            },
            fnDealFilter: function(t) {
                var e = this, a = t.category, i = {
                    departureStation: [],
                    arrivalStation: [],
                    dptTimeSpan: []
                };
                for (var n in a) (function(n) {
                    0 == n || 4 == n || a[n].category.forEach(function(o, r) {
                        "全部车站" == o && (o = "不限");
                        var s, d;
                        switch (a[n].categoryName) {
                          case "出发站":
                            s = "departureStation", d = "fromStation";
                            break;

                          case "到达站":
                            s = "arrivalStation", d = "toStation";
                            break;

                          case "发车时段":
                            s = "dptTimeSpan", d = "timeSpan";
                        }
                        /RecommendMsg:/gi.test(t.dataSource) ? i[s].push({
                            id: r,
                            name: function() {
                                var t = "";
                                switch (o) {
                                  case "凌晨":
                                    t = "凌晨(00:00-06:00)";
                                    break;

                                  case "上午":
                                    t = "上午(06:00-12:00)";
                                    break;

                                  case "下午":
                                    t = "下午(12:00-18:00)";
                                    break;

                                  case "晚上":
                                    t = "晚上(18:00-24:00)";
                                    break;

                                  default:
                                    t = o;
                                }
                                return t;
                            }(),
                            selected: "不限" == o
                        }) : i[s].push({
                            id: r,
                            name: function() {
                                var t = "";
                                switch (o) {
                                  case "凌晨":
                                    t = "凌晨(00:00-06:00)";
                                    break;

                                  case "上午":
                                    t = "上午(06:00-12:00)";
                                    break;

                                  case "下午":
                                    t = "下午(12:00-18:00)";
                                    break;

                                  case "晚上":
                                    t = "晚上(18:00-24:00)";
                                    break;

                                  default:
                                    t = o;
                                }
                                return t;
                            }(),
                            selected: function(t) {
                                return "凌晨" === o ? o = 1 : "上午" === o ? o = 2 : "下午" === o ? o = 3 : "晚上" === o && (o = 4), 
                                t.data[d].length ? !!(-1 < t.data[d].split(",").indexOf(o + "")) : "不限" == o;
                            }(e)
                        });
                    });
                })(n);
                this.setData({
                    departureStation: i.departureStation,
                    arrivalStation: i.arrivalStation,
                    dptTimeSpan: i.dptTimeSpan
                });
            },
            getDictionaryCity: function() {
                var t = this;
                wx.request({
                    url: d.getDictionaryCity,
                    data: {},
                    method: "GET",
                    header: t.data.headers,
                    success: function(e) {
                        var a = e.data;
                        a.header.isSuccess && !c.isEmpty(a.body) && t.setData({
                            proofingCity: a.body
                        });
                    },
                    fail: function() {},
                    complete: function() {}
                });
            },
            btnToBook: function(t) {
                var e = this, a = t.currentTarget.dataset.indexlist, i = e.data.busList[a], n = i.canBooking, s = "";
                1 == i.runningSchFlag && 1 == i.bookingType ? s = "流水班" : 1 != i.runningSchFlag && 1 == i.bookingType && 1 != i.ExtraSchFlag && i.canBooking && 0 == i.isPassingStation ? s = "固定班" : 1 != i.runningSchFlag && 1 == i.bookingType && 1 == i.ExtraSchFlag ? s = "加班车" : 0 != i.isPassingStation && 1 == i.bookingType ? s = "过路车" : 2 == i.bookingType && i.regularTime ? s = "预约票" : 4 == i.bookingType && !i.canBooking && (s = "不可订"), 
                o.default.setEvent(r.list, "DLLB04", "^渠道Refid:[" + e.data.refid + "]^出发城市:" + i.departure + "^到达城市:" + i.destination + "^班次信息:[" + i.dptStation + "-" + i.arrStation + "]^出发时间:" + i.dptDate + "]^票价:[" + i.ticketPrice + "]^余票:[" + i.ticketLeft + "]^班次类型:[" + s + " " + i.dptTime + "]"), 
                n && (c.loading(), i.bookingType, c.$http(d.GetBusVerifyModel, JSON.stringify({
                    scheduleNo: i.scheduleNo,
                    scheduleId: i.scheduleId,
                    dptDate: i.dptDate,
                    departure: i.departure,
                    destination: i.destination,
                    dptStation: i.dptStation,
                    arrStation: i.arrStation,
                    coachNo: i.coachNo,
                    ticketPrice: i.ticketPrice,
                    dptTime: i.dptTime,
                    agentType: i.agentType,
                    backupAgentType: i.backupAgentType,
                    depId: e.data.depCId,
                    desId: e.data.desCId
                }), "POST", e.data.headers).then(function(t) {
                    wx.hideToast();
                    var n = t;
                    return c.isEmpty(n) ? (c.alert(n.errMsg || "'余票不足，请选择其他班次！'"), e.data.list.schedule[a].canBooking = !1, 
                    e.setData({
                        list: e.data.list
                    }), !1) : (wx.setStorageSync("bus_TicketInfo", c.extend(i, {
                        exData: n.exData,
                        supplierId: n.supplierId,
                        freeChildCntLeft: n.freeChildCntLeft || 0,
                        depCId: e.data.depCId,
                        desCId: e.data.desCId,
                        flagId: ""
                    })), void wx.navigateTo({
                        url: "/pages/bus/webapp/booking/booking"
                    }));
                }).catch(function(t) {
                    return wx.hideToast(), c.isEmpty(t.header) ? (c.alert("请求接口失败！"), !1) : (c.alert(t.errMsg || "'余票不足，请选择其他班次！'"), 
                    e.data.list.schedule[a].canBooking = !1, e.setData({
                        list: e.data.list
                    }), !1);
                }));
            },
            btnToCalendar: function() {
                c.loading(), setTimeout(function() {
                    wx.hideToast();
                }, 300);
                var t = wx.getStorageSync("busSaleDays") || {};
                this.data.queryDate && wx.navigateTo({
                    url: "/pages/calendar/calendar?selectedDate=" + (0, n.default)(this.data.queryDate).format("l") + "&saleDay=" + JSON.stringify(t) + "&page=list"
                });
            },
            btnSelectDate: function(t) {
                var e = t.currentTarget.dataset.index, a = this.data.sixDayArrs[e];
                if (this.data.isUserChange && this.setData({
                    fromStation: "",
                    toStation: "",
                    timeSpan: ""
                }), a.canSelect && a.date != c.format(this.data.queryDate, "Y-M-D")) {
                    this.setData({
                        isShowNoResult: !1
                    });
                    var i = (0, n.default)(a.date);
                    wx.setStorageSync("_selectedDate", {
                        year: i.year(),
                        month: i.month(),
                        day: 9 < i.date() ? i.date() : "0" + i.date(),
                        recentdate: "",
                        week: i.format("w")
                    }), this.fnInitCalender(a.date), this.reqBusList({
                        method: "queryDate"
                    }), o.default.setEvent(r.list, "DLLB01", "^日期:" + a.date + "^");
                }
            },
            btnActive: function(t) {
                var e = t.currentTarget.dataset.cat;
                this.data.activeCat == e ? this.btnHideMask() : ("departureStation" === e ? o.default.setEvent(r.list, "DLLB05") : "arrivalStation" === e ? o.default.setEvent(r.list, "DLLB06") : "dptTimeSpan" === e && o.default.setEvent(r.list, "DLLB07"), 
                this.setData({
                    activeCat: e,
                    isShowFilter: !0,
                    isShowMask: !0,
                    renderList: this.data[e],
                    filterTop: 0
                }));
            },
            btnHideMask: function() {
                this.setData({
                    isShowFilter: !1,
                    isShowMask: !1,
                    activeCat: "",
                    renderList: [],
                    filterTop: 0
                });
            },
            btnSelecteOption: function(t) {
                var e, a = t.currentTarget.dataset.idx, i = this.data.renderList[a].name, n = !this.data.renderList[a].selected, o = this.data.renderList.filter(function(t) {
                    return t.selected;
                }).length;
                if ("不限" == i && 0 == n && 1 == o) return !1;
                if (this.setData((e = {}, e["renderList[" + a + "].selected"] = n, e)), n) if ("不限" == i) {
                    var r = this.data.renderList;
                    r.forEach(function(t) {
                        "不限" != t.name && (t.selected = !1);
                    }), this.setData({
                        renderList: r
                    });
                } else {
                    var s;
                    this.setData((s = {}, s["renderList[0].selected"] = !1, s));
                }
            },
            btnSure: function() {
                var t;
                this.setData((t = {}, t["" + this.data.activeCat] = this.data.renderList, t.isShowNoResult = !1, 
                t.isUserChange = !0, t));
                var e = this.data.departureStation.filter(function(t) {
                    return "不限" != t.name && t.selected;
                }), a = this.data.arrivalStation.filter(function(t) {
                    return "不限" != t.name && t.selected;
                }), i = this.data.dptTimeSpan.filter(function(t) {
                    return "不限" != t.name && t.selected;
                }), n = e.map(function(t) {
                    return t.name;
                }).join(","), o = a.map(function(t) {
                    return t.name;
                }).join(","), r = i.map(function(t) {
                    return t.id;
                }).join(",");
                (n != this.data.fromStation || o != this.data.toStation || r != this.data.timeSpan) && (this.setData({
                    fromStation: n,
                    toStation: o,
                    timeSpan: r
                }), this.reqBusList({
                    method: "filterParam"
                })), this.btnHideMask();
            },
            btnCancel: function() {
                this.btnHideMask();
            },
            btnCloseTips: function() {
                this.setData({
                    isShowDisInfo: !1
                });
            },
            btnShowAnnounce: function(t) {
                var e = t.currentTarget.dataset.title, a = t.currentTarget.dataset.src || "http://img1.40017.cn/touch/bus/PC/notice_top.png";
                this.setData({
                    isShowNotice: !0,
                    curText: e,
                    announceImg: a
                }), o.default.setEvent(r.list, "DLLB02");
            },
            btnCloseAnnouncePop: function() {
                this.setData({
                    isShowNotice: !1
                });
            },
            btnToIndex: function() {
                wx.switchTab({
                    url: "/pages/index/index"
                });
            },
            btnShowRunTime: function() {
                var t = this;
                this.data.showRunning = !this.data.showRunning, this.setData({
                    showRunning: this.data.showRunning
                }), this.data.showRunning && (this.info.runningTimer && clearTimeout(this.info.runningTimer), 
                this.info.runningTimer = setTimeout(function() {
                    t.setData({
                        showRunning: !1
                    });
                }, 5e3));
            },
            btnCloseRunning: function() {
                this.setData({
                    showRunning: !1
                });
            },
            evListScroll: function(t) {
                this.btnCloseRunning(), this.setData({
                    scrollTopTemp: t.detail.scrollTop
                });
            },
            evBusLower: function() {
                this.reqBusList({
                    method: "scrollLoad"
                });
            },
            formListBtn: function(t) {
                var e = t.detail.formId;
                console.log(e), c.saveFormid(e, "订汽车票", "", "班次列表页");
            },
            initCalendar: function() {
                var t = this.data.firstLoad ? wx.getStorageSync("selectedDate") : c.isEmpty(wx.getStorageSync("_selectedDate")) ? wx.getStorageSync("selectedDate") : wx.getStorageSync("_selectedDate"), e = c.isEmpty(t) ? -1 : (0, 
                n.default)([ t.year, c.formatNumber(t.month), c.formatNumber(t.day) ].join("-")).time();
                try {
                    if ((0, n.default)(this.data.queryDate).format("l") == [ t.year, t.month, t.day ].join("-")) return void this.setData({
                        firstLoad: !1
                    });
                } catch (t) {}
                if (this.data.isUserChange && this.setData({
                    fromStation: "",
                    toStation: "",
                    timeSpan: ""
                }), t && 0 < e - (0, n.default)().time()) this.setData({
                    date: (0, n.default)([ t.year, c.formatNumber(t.month), c.formatNumber(t.day) ].join("-")).format("nn"),
                    week: "周" + t.week,
                    recentdate: t.recentdate || "",
                    datetime: [ t.year, t.month, t.day ].join("-"),
                    queryDate: [ t.year, t.month, t.day ].join("-")
                }); else {
                    var a = (0, n.default)();
                    this.setData({
                        date: a.format("nn"),
                        week: "周" + a.format("w"),
                        recentdate: "今天",
                        datetime: a.format("l"),
                        queryDate: a.format("l")
                    }), wx.setStorageSync("_selectedDate", {
                        day: a.date(),
                        month: a.month(),
                        recentdate: "今天",
                        week: a.format("w"),
                        year: a.year()
                    });
                }
                console.log("firstLoad", this.data.firstLoad), this.data.firstLoad || (this.fnInitCalender(this.data.queryDate), 
                this.reqBusList({
                    method: "queryDate"
                })), this.setData({
                    firstLoad: !1
                });
            },
            openMap: function(t) {
                var e = t.currentTarget.dataset.index, a = this.data.busList[e].dptStation, i = [], n = {}, s = this;
                this.data.busList.forEach(function(t) {
                    i.push({
                        depStation: t.dptStation,
                        scheduleNo: t.scheduleNo,
                        ticketPrice: t.ticketPrice
                    }), t.dptStationInfo && 0 != t.dptStationInfo.Latitude && (n[t.dptStation] = t.dptStationInfo, 
                    n[t.dptStation].station = t.dptStation, n[t.dptStation].departure = s.data.fromCity);
                }), wx.setStorageSync("allStation", JSON.stringify(n)), wx.setStorageSync("mapTmp", JSON.stringify({
                    station: a
                })), o.default.setEvent(r.list, "DLLB03"), wx.navigateTo({
                    url: "/pages/bus/webapp/notices/notices?pagename=map"
                });
            },
            showMsgTip: function() {
                c.alert(this.data.recommendMsg, "温馨提示", !1, "", "我知道了");
            },
            onReady: function() {},
            onShow: function() {
                this.initCalendar();
                var t = wx.getStorageSync("bus-selectStation") || "";
                t && this.setData({
                    fromStation: t,
                    isUserChange: !0
                }), t && this.reqBusList({
                    method: "filterParam"
                }), wx.removeStorageSync("bus-selectStation"), s.globalData.isAuth && (s.globalData.isAuth = !1, 
                this.onLoad(s.globalData.onLoadPts));
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
            }
        });
    }
}, [ 106 ]);