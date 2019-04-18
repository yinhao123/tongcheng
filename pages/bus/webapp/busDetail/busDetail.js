!function() {
    require("./../../../../common.js"), wx.webpackJsonp.apply(null, arguments);
}([ 20 ], {
    107: function(t, e, a) {
        var i, n = a(0), o = a(1).default, s = "page/bus/webapp/busDetail/busDetail", c = getApp(), d = {}, r = null, p = 0, u = "", l = {};
        Page({
            data: {
                showMap: !0,
                speedCheck: !0,
                hotRuleShow: !0,
                allStation: {},
                itemList: []
            },
            onLoad: function(t) {
                this.paraseParams(t), this.getDetail();
            },
            paraseParams: function() {
                var t, e = wx.getStorageSync("bus_TicketInfo");
                return t = {
                    scheduleNo: e.scheduleNo,
                    scheduleId: e.scheduleId,
                    supplierId: e.supplierId,
                    dptDate: e.dptDate,
                    departure: e.departure,
                    destination: e.destination,
                    dptStation: e.dptStation,
                    arrStation: e.arrStation,
                    coachNo: e.coachNo,
                    ticketPrice: e.ticketPrice,
                    dptTime: e.dptTime,
                    pid: e.pid || "",
                    bookingtype: e.bookingType,
                    depCId: e.depCId,
                    desCId: e.desCId,
                    exData: e.exData,
                    runningschflag: e.runningSchFlag,
                    flagId: e.flagId || ""
                }, t.exData = e.exData || "", d = t;
            },
            getDetail: function() {
                var t = this, e = n.wxhttp(o.getScheduleDetail, d), a = n.wxhttp(o.getDectionaryByCode + "&code=Package_Type_List", {}, "GET"), i = void 0, s = void 0;
                Promise.all([ e, a ]).then(function(e) {
                    i = e[0], s = e[1], i.header.isSuccess && !n.isEmpty(i.body) && t.parseBusDetail(i.body), 
                    s.header.isSuccess && !n.isEmpty(s.body) && t.showList(s.body);
                }).catch(function() {
                    n.alert("亲，出错了，请返回重试或选择其他班次", "", !1, "取消", "好的", function() {
                        wx.navigateBack();
                    });
                });
            },
            parseBusDetail: function(t) {
                r = t, console.log(r), r.dptStationInfo && 0 != r.dptStationInfo.Latitude && (this.data.allStation[r.dptStation] = r.dptStationInfo, 
                this.data.allStation[r.dptStation].station = r.dptStation, this.data.allStation[r.dptStation].departure = r.departure, 
                this.data.allStation[r.dptStation].destination = r.destination, this.data.allStation[r.dptStation].arrStation = r.arrStation || "", 
                this.data.allStation[r.dptStation].dptStation = r.dptStation || "", this.data.allStation[r.dptStation].dptDate = r.dptDate, 
                this.data.allStation[r.dptStation].pid = r.pid || "", this.data.allStation[r.dptStation].depCId = r.depCId || "", 
                this.data.allStation[r.dptStation].desCId = r.desCId || ""), this.setData({
                    stationInfo: {
                        time: new Date(r.dptDate).getMonth() + 1 + "月" + new Date(r.dptDate).getDate() + "日 " + r.dptTime,
                        line: (r.dptStation ? r.dptStation : r.departure) + " → " + (r.arrStation ? r.arrStation : r.destination),
                        address: !!r.dptStationInfo && r.dptStationInfo.StationAddress,
                        price: r.ticketPrice,
                        station: r.dptStation,
                        booktype: r.bookingType,
                        date: new Date(r.dptDate).getMonth() + 1 + "月" + new Date(r.dptDate).getDate() + "日"
                    },
                    allStation: this.data.allStation,
                    busInfo: r
                }), wx.setStorageSync("allStation", JSON.stringify(this.data.allStation)), wx.setStorageSync("mapTmp", JSON.stringify({
                    station: r.dptStation
                })), n.setEvent(s, "BC04", "^出发城市:" + r.departure + "^到达城市:" + r.destination + "^班次信息:" + r.dptStation + "-" + r.arrStation + "^出发时间:" + r.dptTime + "^");
            },
            showList: function(t) {
                var e = this, a = JSON.parse(t);
                a.forEach(function(t) {
                    switch ((t = e.addkeys(t)).packageType) {
                      case "1":
                        t.sort = 1;
                        break;

                      case "2":
                        t.sort = 3;
                        break;

                      case "3":
                        t.sort = 4;
                        break;

                      case "4":
                        t.sort = 2;
                    }
                }), i = a.sort(function(t, e) {
                    return t.sort - e.sort;
                }), console.log(i), this.checkPrice();
            },
            addkeys: function(t) {
                return t.price = r.ticketPrice, [ "packageDesc", "servicePrice", "discountPriceDes", "packageDesc", "serviceSell", "hidden" ].forEach(function(e) {
                    t[e] || (t[e] = "");
                }), t;
            },
            checkPrice: function() {
                var t = r.ticketPrice, e = i[3].packageRevenueItemId.split(",");
                200 > t ? (p = 6, u = e[0]) : (p = 8, u = e[1]), this.getRevenue(u);
            },
            getRevenue: function(t) {
                var e = this, a = n.wxhttp(o.getVipServiceItemList, {
                    revenueItemId: t
                }), s = n.wxhttp(o.getVipHallService, {
                    departure: r.departure,
                    dptDateTime: r.dptDate,
                    revenueItemId: i[1].packageRevenueItemId
                });
                Promise.all([ a, s ]).then(function(t) {
                    t[0].header.isSuccess && !n.isEmpty(t[0].body) && (e.combineData(t[0].body, 0), 
                    l = t[0].body), t[1].header.isSuccess && !n.isEmpty(t[1].body) ? e.combineData(t[1].body, 1) : i[1].hidden = !0, 
                    e.DataReturn();
                }).catch(function() {
                    n.alert("亲，出错了，请稍后重新尝试", "", !1, "取消", "好的", function() {});
                });
            },
            combineData: function(t, e) {
                e ? (i[1].packageDesc = t.description, i[1].discountPriceDes = "贵宾厅服务，省￥3", i[1].servicePrice = t.price + 3, 
                i[1].serviceSell = t.price, i[1].hidden = !t.canSale, i[1].price -= 3) : (i[3].packageDesc = t.subTitle, 
                i[3].discountPriceDes = "超值套票立省￥" + p, i[3].servicePrice = t.sellPrice + p, i[3].serviceSell = t.sellPrice, 
                i[3].hidden = !t.canSale, i[3].price = (1e3 * i[3].price - 1e3 * p) / 1e3, this.setData({
                    hotRule: t.serviceDetail.replace(/<[^>]*>/g, "\n ")
                }));
            },
            DataReturn: function() {
                i[2].servicePrice = parseFloat(i[2].packagePrice), i[2].serviceSell = parseFloat(i[2].packagePrice), 
                i[2].discountPriceDes = "极速出票", this.setData({
                    itemList: i
                });
                for (var t, e = "", a = 0, o = i.length; a < o; a++) e += (t = i[a].packageDesc) + (t ? ";" : "");
                n.setEvent(s, "BC05", "^全部套餐说明:" + e + "^");
            },
            mapCtrl: function() {
                n.setEvent(s, "BC01"), wx.navigateTo({
                    url: "../notices/notices?pagename=map&from=busdetail"
                });
            },
            getBycode: function() {
                var t = this;
                wx.request({
                    url: o.getDectionaryByCode + "&code=Package_Type_List",
                    header: n.setHeader(),
                    method: "GET",
                    success: function(e) {
                        console.log(e), e.data.header.isSuccess && !n.isEmpty(e.data.body) && (r = e.data.body, 
                        t.setData({
                            stationInfo: {
                                time: r.dptDate + " " + r.dptTime,
                                line: r.departure + " → " + r.destination,
                                poi: r.dptStationInfo.StationAddress,
                                price: r.ticketPrice
                            }
                        }));
                    }
                });
            },
            booking: function(t) {
                var e = d, a = t.currentTarget.dataset.id, i = c.globalData.wxrefid || "111621535";
                e.agentType = d.agentType || "", e.backupAgentType = d.backupAgentType || "", e.depId = d.depCId || 0, 
                e.desId = d.desCId || 0, this.getVerify(e, a);
                var o = this.data.itemList[a];
                n.setEvent(s, "BC02", "^渠道Refid:" + i + "^票价:" + o.price + "^套餐说明:" + o.packageDesc + "^");
            },
            getVerify: function(t, e) {
                var a = t, i = this, o = this.data.itemList[e];
                n.isEmpty(t) || (a.exData = d.exData, a.revenueType = o.packageType, a.revenueId = "3" == o.packageType ? u : "", 
                a.revenuePrice = o.serviceSell || "", i.navTo(a));
            },
            navTo: function(t) {
                var e = {
                    scheduleNo: t.scheduleNo,
                    scheduleId: t.scheduleId,
                    supplierId: t.supplierId,
                    dptDate: t.dptDate,
                    departure: t.departure,
                    destination: t.destination,
                    dptStation: t.dptStation,
                    arrStation: t.arrStation,
                    coachNo: t.coachNo,
                    ticketPrice: t.ticketPrice,
                    dptTime: t.dptTime,
                    depId: t.depId,
                    desId: t.desId,
                    exData: t.exData,
                    revenueType: t.revenueType,
                    revenueId: t.revenueId,
                    revenuePrice: t.revenuePrice,
                    flagId: t.flagId || "",
                    runningschflag: t.runningschflag
                };
                "3" == t.revenueType && (e.superValue = l), wx.setStorageSync("bus_TicketInfo", e), 
                n.loading(), wx.navigateTo({
                    url: "../booking/booking"
                });
            },
            tipCtrl: function(t) {
                var e = t.currentTarget.dataset.id, a = this.data.itemList[e].packageType;
                console.log(a), n.setEvent(s, "BC03", "^套餐说明:" + this.data.itemList[e].packageDesc + "^"), 
                "2" === a ? this.setData({
                    speedCheck: !1
                }) : "3" === a ? (console.log(1), this.setData({
                    hotRuleShow: !1
                })) : "4" === a && (console.log(r.dptStation), "成都北门汽车站" == r.dptStation ? wx.navigateTo({
                    url: "/pages/webview/webview?src=" + this.creatwebSrc("https://wx.17u.cn/wxbust/webapp/bus/staticpage.html?activityId=5")
                }) : "无锡汽车客运站" == r.dptStation && wx.navigateTo({
                    url: "/pages/webview/webview?src=" + this.creatwebSrc("https://wx.17u.cn/wxbust/webapp/bus/staticpage.html?activityId=6")
                }));
            },
            creatwebSrc: function(t) {
                return "" + encodeURIComponent("https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx3827070276e49e30&redirect_uri=https://wx.17u.cn/flight/getopenid.html?url=" + encodeURIComponent(t) + "&showwxpaytitle=1&response_type=code&scope=snsapi_base&state=123&connect_redirect=1#wechat_redirect");
            },
            hotRuleCtrl: function() {
                this.setData({
                    hotRuleShow: !0
                });
            },
            speedCheckCtrl: function() {
                this.setData({
                    speedCheck: !0
                });
            },
            onReady: function() {
                wx.setNavigationBarTitle({
                    title: "班次详情"
                });
            },
            onShow: function() {
                n.isEmpty(r) || this.parseBusDetail(r);
            },
            onHide: function() {},
            onUnload: function() {
                try {
                    n.setEvent(s, "BD000");
                } catch (t) {}
            },
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
}, [ 107 ]);