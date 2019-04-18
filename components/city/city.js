!function() {
    require("./../../common.js"), wx.webpackJsonp.apply(null, arguments);
}([ 24 ], {
    137: function(t, e, i) {
        var s = function(t) {
            return t && t.__esModule ? t : {
                default: t
            };
        }(i(1)), a = i(0);
        Component({
            options: {
                addGlobalClass: !0
            },
            properties: {
                selectedCity: String,
                depCity: Object
            },
            data: {
                focus: !1,
                inputVal: "",
                showClear: !1,
                searchList: [],
                letters: [ "A", "B", "C", "D", "E", "F", "G", "H", "J", "K", "L", "M", "N", "P", "Q", "R", "S", "T", "W", "X", "Y", "Z" ],
                letterList: [],
                selectedLetter: "",
                hotCityList: [],
                historyList: [],
                cityLastTime: 0,
                isLetterClick: !1
            },
            methods: {
                fnFocusInput: function() {
                    this.setData({
                        focus: !0
                    }), console.log("fnFocusInput");
                },
                fnBlurInput: function() {
                    this.setData({
                        focus: !1
                    }), console.log("fnBlurInput");
                },
                fnInput: (0, a.debounce)(function(t) {
                    var e = t.detail.value, i = this;
                    console.log(this), i.setData({
                        inputVal: e,
                        showClear: 0 < e.length
                    }), e.length ? i.getSuggestCity(e) : i.setData({
                        searchList: []
                    });
                }, 250),
                fnClearInput: function() {
                    this.setData({
                        inputVal: "",
                        showClear: !1
                    });
                },
                fnCancle: function() {
                    var t = this;
                    setTimeout(function() {
                        t.setData({
                            inputVal: "",
                            focus: !1
                        });
                    }, 100), console.log("fnCancle");
                },
                getSuggestCity: function(t) {
                    var e = this, i = s.default.suggestDep, n = !(0, a.isEmpty)(this.data.depCity);
                    n && (i = s.default.suggestDes), (0, a.$http)(i, {
                        departureId: this.data.depCity.id || "",
                        departureStationId: this.data.depCity.stationId || "",
                        keyWords: t,
                        depCName: n ? this.data.depCity.name : ""
                    }).then(function(t) {
                        console.log(t), e.setData({
                            searchList: (0, a.isEmpty)(t) ? [] : t.busStation.stationList
                        });
                    }).catch(function() {
                        e.setData({
                            searchList: []
                        });
                    });
                },
                getLetter: function(t) {
                    var e = t.currentTarget.dataset;
                    this.setData({
                        selectedLetter: e.letter
                    }), this.getCityByLetter(e.letter);
                },
                getCityByLetter: function(t) {
                    var e = this, i = s.default.getDepByLetter, n = this.data.depCity, o = {
                        letter: t
                    }, r = this;
                    !(0, a.isEmpty)(n) && (i = s.default.getDesByLetter, o = {
                        letter: t,
                        depCName: n.name,
                        depId: n.id
                    }), (0, a.$http)(i, o).then(function(t) {
                        if (console.log(t), e.setData({
                            letterList: (0, a.isEmpty)(t) ? [] : t,
                            isLetterClick: !0
                        }), e.data.scrollTop) r.setData({
                            scrollTop: e.data.scrollTop
                        }); else {
                            var i = wx.createSelectorQuery().in(e);
                            i.select("#letter").boundingClientRect(), setTimeout(function() {
                                i.exec(function(t) {
                                    console.log("createSelectorQuery", t), r.setData({
                                        scrollTop: t[0].top - 80
                                    });
                                });
                            }, 300);
                        }
                    }).catch(function() {
                        e.setData({
                            letterList: [],
                            isLetterClick: !0
                        });
                    });
                },
                getHotCityData: function() {
                    var t = this, e = s.default.getHotDepCity, i = this.data.depCity, n = {};
                    !(0, a.isEmpty)(i) && (e = s.default.getHotDesCity, n = {
                        depCName: i.name,
                        depId: i.id
                    }), (0, a.$http)(e, n).then(function(e) {
                        console.log(e), t.setData({
                            hotCityList: (0, a.isEmpty)(e) ? [] : e
                        });
                    }).catch(function() {
                        t.setData({
                            hotCityList: []
                        });
                    });
                },
                getHistory: function() {
                    var t = wx.getStorageSync("busHistory") || [];
                    this.setData({
                        historyList: t
                    });
                },
                setHistory: function(t) {
                    var e = wx.getStorageSync("busHistory") || [];
                    if ((0, a.isEmpty)(e)) e.unshift(t); else {
                        var i = e.findIndex(function(e) {
                            return e.id == t.id;
                        });
                        -1 < i && e.splice(i, 1), e.unshift(t);
                    }
                    e = e.slice(0, 6), wx.setStorageSync("busHistory", e);
                },
                fnSelectedCity: function(t) {
                    var e = t.currentTarget.dataset, i = this.data, s = {}, n = !(0, a.isEmpty)(i.depCity);
                    if (!(0, a.isEmpty)(e)) if (e.name && 0 <= e.index && e.sname && 0 <= e.sindex) {
                        var o = i[e.name][e.index], r = (0, a.isEmpty)(o) ? {} : o[e.sname][e.sindex];
                        s = {
                            name: o.name,
                            id: o.id,
                            cityId: o.cityId,
                            showName: o.showName,
                            stationName: r.stationName || "",
                            stationId: r.stationId || "",
                            searchName: r.searchName || ""
                        };
                    } else if (e.name && 0 <= e.index) {
                        var c = i[e.name][e.index];
                        s = {
                            name: c.name,
                            id: c.id,
                            cityId: c.cityId,
                            showName: c.showName,
                            stationName: c.stationName || "",
                            stationId: c.stationId || "",
                            searchName: c.searchName || ""
                        };
                    }
                    n ? this.triggerEvent("busdescity", s, {
                        bubbles: !0
                    }) : this.triggerEvent("busdepcity", s, {
                        bubbles: !0
                    }), this.setHistory(s);
                }
            },
            ready: function() {
                this.getHistory(), this.getHotCityData();
            }
        });
    }
}, [ 137 ]);