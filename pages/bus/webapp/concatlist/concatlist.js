!function() {
    require("./../../../../common.js"), wx.webpackJsonp.apply(null, arguments);
}([ 17 ], {
    124: function(e, t, a) {
        getApp();
        var r = a(1).default, i = a(0), d = i.format(new Date()), n = 0, s = "page/bus/webapp/concatlist/concatlist";
        Page({
            data: {
                handleType: "",
                isAdd: !0,
                addName: "",
                addIDCard: "",
                IDSpace: "",
                passOfEdit: {},
                passengers: [],
                from: "",
                FCTicketLeft: 0,
                plists: [],
                contactId: "",
                adultPassNum: 0,
                freeChildren: [],
                editPassIndex: 0,
                editFCAdult: {},
                editFCIndex: 0,
                editFreechild: {}
            },
            inputName: function(e) {
                var t = e.detail.value.replace(/\s/gi, "");
                this.setData({
                    addName: t
                }), "adult" == this.data.handleType && i.setEvent(s, "新乘车人姓名", "F002_3_1"), "child" == this.data.handleType && i.setEvent(s, "儿童姓名", "ertongxingming");
            },
            inputIDCard: function(e) {
                var t, a = e.detail.value.replace(/\s/gi, ""), r = a.length;
                6 >= r ? t = a : 6 < r && 14 >= r ? t = a.substr(0, 6) + " " + a.substr(6) : (18 < r && (a = a.substr(0, 18)), 
                t = a.substr(0, 6) + " " + a.substr(6, 8) + " " + a.substr(14, 4)), this.setData({
                    addIDCard: a,
                    IDSpace: t
                });
            },
            inputIDCardEv: function() {
                i.setEvent(s, "新乘车人证件", "F002_3_2");
            },
            btnAddSubmit: function(e) {
                var t = this, a = +e.currentTarget.dataset.child, d = {
                    certNo: t.data.addIDCard,
                    certType: 1,
                    linkerName: t.data.addName,
                    mobile: "",
                    child: a
                }, l = t.funValidateData(d);
                return l ? (i.alert(l), !1) : void (0 == n && t.data.isAdd && "child" == t.data.handleType ? (wx.setStorageSync("bus_newAddPassenger", {
                    linkerName: t.data.addName,
                    IDCard: t.data.addIDCard
                }), wx.navigateBack()) : (i.setEvent(s, "确定添加新乘车人", "F002_3_3"), i.loading(), wx.request({
                    url: r.addLinkerNew,
                    method: "POST",
                    header: i.setHeader(),
                    data: JSON.stringify([ d ]),
                    success: function(e) {
                        wx.hideToast(), e.data.header.isSuccess ? (wx.setStorageSync("bus_newAddPassenger", {
                            linkerName: t.data.addName,
                            IDCard: t.data.addIDCard
                        }), wx.navigateBack()) : i.alert(e.data.header.errMsg);
                    }
                })));
            },
            btnEditSubmit: function(e) {
                var t = this, a = +e.currentTarget.dataset.child;
                setTimeout(function() {
                    var e = {
                        certNo: t.data.addIDCard,
                        certType: 1,
                        id: t.data.passOfEdit.listNos[0].id,
                        linkerName: t.data.addName,
                        mobile: "",
                        memberId: t.data.passOfEdit.memberId || "",
                        linkerId: t.data.passOfEdit.id,
                        child: a
                    }, d = t.funValidateData(e);
                    return d ? (i.alert(d), !1) : (i.loading(), void wx.request({
                        url: r.updateLinkerNew,
                        method: "POST",
                        header: i.setHeader(),
                        data: JSON.stringify([ e ]),
                        success: function(e) {
                            if (wx.hideToast(), e.data.header.isSuccess) wx.setStorageSync("bus_updatePassenger", {
                                IDCard: t.data.addIDCard,
                                linkerName: t.data.addName,
                                from: t.data.from
                            }), wx.navigateBack(); else if ("您输入的身份证号已存在，请核实后重新输入。" == e.header.errMsg) {
                                var a = t.data.passengers, r = t.data.passOfEdit;
                                a.forEach(function(e) {
                                    if (r.IDCard == e.IDCard) return i.alert("您输入的身份证号与【" + e.linkerName + "】重复，请核实后重新输入"), 
                                    !1;
                                });
                            } else i.alert(e.data.header.errMsg || "修改失败，请稍后再试");
                        }
                    }));
                }, 100);
            },
            funValidateData: function(e) {
                return e.linkerName ? 2 > e.linkerName.length ? "乘客姓名不得小于两个字" : /^[a-zA-Z一-龥]+$/.test(e.linkerName) ? e.certNo ? this.isIdCard(e.certNo) ? !(!e.child || !this.eighteenYears(e.certNo)) && "儿童年龄需小于18周岁，请核实后重新输入" : "请输入合法身份证" : "请输入证件号码" : "姓名只能包含中文或者英文，不能有空格、符号等特殊字符!" : "请填写乘客姓名";
            },
            eighteenYears: function(e) {
                var t = parseInt(d.substr(0, 4)) - e.substr(6, 4), a = parseInt(d.substr(5, 2) + d.substr(8, 2)), r = parseInt(e.substr(10, 2) + e.substr(12, 2));
                return !(18 > t || 18 == t && !(r <= a));
            },
            isIdCard: function(e) {
                var t = e.toLowerCase().match(/\w/g);
                if (e.match(/^\d{17}[\dx]$/i)) {
                    for (var a = 0, r = [ 7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2 ], i = 0; 17 > i; i++) a += parseInt(t[i], 10) * r[i];
                    return !("10x98765432".charAt(a % 11) != t[17] || !e.replace(/^\d{6}(\d{4})(\d{2})(\d{2}).+$/, "$1-$2-$3"));
                }
                return !1;
            },
            onShow: function() {},
            onLoad: function(e) {
                var t, a;
                e.action;
                if (i.wxhttp(r.getServerTime).then(function(e) {
                    e.header.isSuccess && e.body && (d = e.body);
                }).catch(function(e) {
                    console.log(e);
                }), n = parseInt(e.isHasPassengers), e.action && ("addAdult" == e.action || "addChild" == e.action) && this.setData({
                    handleType: "addAdult" == e.action ? "adult" : "child",
                    isAdd: !0
                }), e.action && ("editAdult" == e.action || "editChild" == e.action) && (t = e.passenger ? JSON.parse(e.passenger) : {}, 
                a = e.all ? JSON.parse(e.all) : [], this.setData({
                    handleType: "editAdult" == e.action ? "adult" : "child",
                    isAdd: !1,
                    addName: t.linkerName,
                    addIDCard: t.IDCard,
                    IDSpace: t.IDSpace,
                    passOfEdit: t,
                    passengers: a,
                    from: e.from
                })), e.action && "addFreeChild" == e.action) {
                    var s = e.plists ? JSON.parse(e.plists) : [];
                    this.setData({
                        handleType: "addFreeChild",
                        FCTicketLeft: e.FCTicketLeft,
                        plists: s,
                        contactId: e.contactId,
                        adultPassNum: Math.min(e.FCTicketLeft - e.freeChildCount, e.adultNum - e.freeChildCount),
                        freeChildren: [ this.getOneFreeChild() ]
                    });
                }
                if (e.action && "editFreeChild" == e.action) {
                    var l, u, h = e.plists ? JSON.parse(e.plists) : [], c = h.find(function(e, t) {
                        return l = t, 1 == e.isEdit;
                    }), o = c.carryChildren.find(function(e, t) {
                        return u = t, 1 == e.isEdit;
                    });
                    delete c.isEdit, delete o.isEdit, this.setData({
                        handleType: "editFreeChild",
                        plists: h,
                        editPassIndex: l,
                        editFCAdult: c,
                        editFCIndex: u,
                        editFreechild: o
                    });
                }
            },
            btnSubFC: function() {
                0 < this.data.freeChildren.length && (this.data.freeChildren.splice(-1, 1), this.setData({
                    freeChildren: this.data.freeChildren
                }));
            },
            btnPlusFC: function() {
                this.data.freeChildren.length < this.data.adultPassNum && (this.data.freeChildren.push(this.getOneFreeChild()), 
                this.setData({
                    freeChildren: this.data.freeChildren
                }));
            },
            fnSyncFCNameId: function(e) {
                console.log("e.detail:", e.detail), console.log("dataset:", e.currentTarget.dataset);
                for (var t = e.currentTarget.dataset.unique, a = e.currentTarget.dataset.key, r = this.data.freeChildren, d = Array.isArray(r), n = 0, r = d ? r : r[Symbol.iterator](); ;) {
                    var l;
                    if (d) {
                        if (n >= r.length) break;
                        l = r[n++];
                    } else {
                        if ((n = r.next()).done) break;
                        l = n.value;
                    }
                    var u = l;
                    if (u.unique == t) {
                        "id" == a ? (u.id = e.detail.value.replace(/\s/g, ""), u.idSpace = u.id.substr(0, 6) + " " + u.id.substr(6, 8) + " " + u.id.substr(14, 4)) : u[a] = e.detail.value;
                        break;
                    }
                }
                "id" == a ? i.setEvent(s, "身份证号", "shenfenzhenghao") : i.setEvent(s, "儿童姓名", "ertongxingming"), 
                this.setData({
                    freeChildren: this.data.freeChildren
                });
            },
            getOneFreeChild: function() {
                return {
                    name: "",
                    id: "",
                    idSpace: "",
                    unique: this.getUniqueNO()
                };
            },
            getUniqueNO: function() {
                var e = "" + Date.now() + parseInt(1e3 * Math.random());
                return "" == e ? this.getUniqueNO() : e;
            },
            btnFreeChildSubmit: function(e) {
                setTimeout(function() {
                    var t = e.detail.value;
                    if ("addFreeChild" == this.data.handleType) {
                        console.log("添加携童数据：", e.detail.value);
                        var a = this.data.plists, r = this.data.freeChildren;
                        this.data.contactId;
                        if (!r.length) return i.alert("请添加儿童"), !1;
                        for (var d in t) if (/name/gi.test(d)) {
                            if (!t[d]) return i.alert("请填写儿童姓名"), !1;
                            if (2 > t[d].length) return i.alert("儿童姓名不得小于两个字"), !1;
                            if (!/^[a-zA-Z一-龥]+$/.test(t[d])) return i.alert("儿童姓名只能包含中文或者英文，不能有空格、符号等特殊字符!"), 
                            !1;
                        }
                        for (var n in t) if (/id/gi.test(n)) {
                            var l = t["name" + n.replace("id", "")], u = this.isDuplicate(t[n], l);
                            if (u) return i.alert("儿童“" + l + "”与儿童“" + u.name + "”的证件号码重复，请重新输入"), !1;
                            if (!t[n]) return i.alert("请输入儿童“" + l + "”的证件号码"), !1;
                            if (!this.isIdCard(t[n])) return i.alert("儿童“" + l + "”的身份证不符合规范，请重新输入"), !1;
                            if (this.eighteenYears(t[n])) return i.alert("儿童“" + l + "”的年龄需小于18周岁，请核实后重新输入"), 
                            !1;
                        }
                        console.log("携童所有数据通过校验");
                        var h = a.find(function(e) {
                            return 1 == e.isConcat;
                        }), c = !1;
                        h && !h.carryChildren && (h.carryChildren = [ {
                            name: r[0].name,
                            cardNo: r[0].id,
                            idSpace: r[0].idSpace,
                            showDeleteBtn: !1
                        } ], c = !0, delete h.isConcat);
                        for (var o = a.filter(function(e) {
                            return !e.carryChildren && 1 != e.type;
                        }), f = c ? 1 : 0; f < r.length; f++) {
                            var C = r[f];
                            o[c ? f - 1 : f].carryChildren = [ {
                                name: C.name,
                                cardNo: C.id,
                                idSpace: C.idSpace,
                                showDeleteBtn: !1
                            } ];
                        }
                        i.setEvent(s, "确定", "queding"), wx.setStorageSync("addFreeChildInfo", a), wx.navigateBack();
                    }
                    if ("editFreeChild" == this.data.handleType) {
                        console.log("编辑携童数据：", e.detail.value);
                        var p = this.data.editFCAdult.carryChildren[this.data.editFCIndex];
                        if (!t.freeChildName) return i.alert("请填写儿童姓名"), !1;
                        if (2 > t.freeChildName.length) return i.alert("儿童姓名不得小于两个字"), !1;
                        if (!/^[a-zA-Z一-龥]+$/.test(t.freeChildName)) return i.alert("儿童姓名只能包含中文或者英文，不能有空格、符号等特殊字符!"), 
                        !1;
                        if (!t.freeChildId) return i.alert("请输入证件号码"), !1;
                        if (!this.isIdCard(t.freeChildId)) return i.alert("身份证不符合规范，请重新输入"), !1;
                        if (this.eighteenYears(t.freeChildId)) return i.alert("儿童的年龄需小于18周岁，请核实后重新输入"), 
                        !1;
                        p.name = e.detail.value.freeChildName, p.cardNo = e.detail.value.freeChildId, p.idSpace = e.detail.value.freeChildId.substr(0, 6) + " " + e.detail.value.freeChildId.substr(6, 8) + " " + e.detail.value.freeChildId.substr(14, 4), 
                        wx.setStorageSync("editFreeChildInfo", {
                            passIndex: this.data.editPassIndex,
                            freeChildIndex: this.data.editFCIndex,
                            editChild: p
                        }), wx.navigateBack();
                    }
                }.bind(this), 100);
            },
            isDuplicate: function(e, t) {
                for (var a = this.data.freeChildren, r = Array.isArray(a), i = 0, a = r ? a : a[Symbol.iterator](); ;) {
                    var d;
                    if (r) {
                        if (i >= a.length) break;
                        d = a[i++];
                    } else {
                        if ((i = a.next()).done) break;
                        d = i.value;
                    }
                    var n = d;
                    if (n.id == e && n.name != t) return n;
                }
                for (var s = this.data.plists, l = Array.isArray(s), u = 0, s = l ? s : s[Symbol.iterator](); ;) {
                    var h;
                    if (l) {
                        if (u >= s.length) break;
                        h = s[u++];
                    } else {
                        if ((u = s.next()).done) break;
                        h = u.value;
                    }
                    var c = h;
                    if (c.carryChildren && -1 < c.carryChildren.findIndex(function(t) {
                        return t.cardNo == e;
                    })) return c.carryChildren.find(function(t) {
                        return t.cardNo == e;
                    });
                }
                return !1;
            },
            onShareAppMessage: function() {
                return {
                    title: "买车票就上同程汽车票！省心、更放心！",
                    path: "/pages/index/index"
                };
            }
        });
    }
}, [ 124 ]);