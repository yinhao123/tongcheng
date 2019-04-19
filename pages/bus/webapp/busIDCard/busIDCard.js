!function() {
    require("./../../../../common.js"), wx.webpackJsonp.apply(null, arguments);
}([ 19 ], {
    128: function(e, a, t) {
        var r = t(0), s = t(1).default, d = r.format(new Date()), i = 0;
        Page({
            data: {
                PTypeArrs: [ {
                    type: 0,
                    name: "成人票"
                }, {
                    type: 1,
                    name: "儿童票"
                } ],
                index: 0,
                isSupportChild: !1,
                type: 0,
                hasShowDemo: !1,
                IDSpace: "",
                addIDCard: "",
                addName: ""
            },
            onLoad: function(e) {
                i = +e.isHasPassengers, this.setData({
                    isSupportChild: +e.isSupportChild
                }), +e.isSupportChild || (this.data.PTypeArrs[1].name = "儿童票（不支持）", this.setData({
                    PTypeArrs: this.data.PTypeArrs
                }));
            },
            onReady: function() {},
            uploadIDCard: function() {
                var e = this;
                wx.chooseImage({
                    count: 1,
                    sizeType: [ "original", "compressed" ],
                    sourceType: [ "album", "camera" ],
                    success: function(a) {
                        var t = a.tempFilePaths;
                        r.loading("正在识别中..."), wx.uploadFile({
                            url: s.picture,
                            filePath: t[0],
                            name: "file",
                            header: r.setHeader(),
                            formData: {
                                user: "test"
                            },
                            success: function(a) {
                                var t = JSON.parse(a.data);
                                t.header.isSuccess ? wx.request({
                                    url: s.recognise,
                                    method: "POST",
                                    header: r.setHeader(),
                                    data: JSON.stringify({
                                        url: t.body
                                    }),
                                    success: function(a) {
                                        var t = a.data, s = t.header, d = t.body;
                                        if (s.isSuccess && d) {
                                            if (!d.name || !d.idNumber) return r.alert("识别信息失败，请重新上传"), !1;
                                            var i = e.replaceIDCard(d.idNumber);
                                            e.setData({
                                                addIDCard: i.addIDCard,
                                                IDSpace: i.IDSpace,
                                                addName: d.name
                                            });
                                        } else r.alert("识别信息失败，请重新上传");
                                    },
                                    fail: function() {
                                        r.alert("识别信息失败，请重新上传");
                                    },
                                    complete: function() {
                                        r.hideLoading();
                                    }
                                }) : (r.hideLoading(), r.alert(t.header.errMsg));
                            }
                        });
                    },
                    fail: function(e) {
                        console.error("chooseImage", e);
                    }
                });
            },
            isIdCard: function(e) {
                var a = e.toLowerCase().match(/\w/g);
                if (e.match(/^\d{17}[\dx]$/i)) {
                    for (var t = 0, r = [ 7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2 ], s = 0; 17 > s; s++) t += parseInt(a[s], 10) * r[s];
                    return !("10x98765432".charAt(t % 11) != a[17] || !e.replace(/^\d{6}(\d{4})(\d{2})(\d{2}).+$/, "$1-$2-$3"));
                }
                return !1;
            },
            replaceIDCard: function(e) {
                var a, t = e.replace(/\s/gi, ""), r = t.length;
                return 6 >= r ? a = t : 6 < r && 14 >= r ? a = t.substr(0, 6) + " " + t.substr(6) : (18 < r && (t = t.substr(0, 18)), 
                a = t.substr(0, 6) + " " + t.substr(6, 8) + " " + t.substr(14, 4)), {
                    addIDCard: t,
                    IDSpace: a
                };
            },
            eighteenYears: function(e) {
                var a = parseInt(d.substr(0, 4)) - e.substr(6, 4), t = parseInt(d.substr(5, 2) + d.substr(8, 2)), r = parseInt(e.substr(10, 2) + e.substr(12, 2));
                return !(18 > a || 18 == a && !(r <= t));
            },
            funValidateData: function(e) {
                return e.linkerName ? 2 > e.linkerName.length ? "乘客姓名不得小于两个字" : /^[a-zA-Z一-龥]+$/.test(e.linkerName) ? e.certNo ? this.isIdCard(e.certNo) ? !(!e.child || !this.eighteenYears(e.certNo)) && "儿童年龄需小于18周岁，请核实后重新输入" : "请输入合法身份证" : "请输入证件号码" : "姓名只能包含中文或者英文，不能有空格、符号等特殊字符!" : "请填写乘客姓名";
            },
            inputIDCard: function(e) {
                var a = this.replaceIDCard(e.detail.value);
                this.setData({
                    addIDCard: a.addIDCard,
                    IDSpace: a.IDSpace
                });
            },
            bindPickerChange: function(e) {
                var a = +e.detail.value, t = this.data.PTypeArrs[a].type;
                this.data.isSupportChild || 1 != t || (t = 0, a = 0, r.alert("当前线路不支持儿童票！")), this.setData({
                    index: a,
                    type: t
                });
            },
            inputName: function(e) {
                var a = e.detail.value.replace(/\s/gi, "");
                this.setData({
                    addName: a
                });
            },
            showDemo: function() {
                this.setData({
                    hasShowDemo: !0
                });
            },
            closeDemo: function() {
                this.setData({
                    hasShowDemo: !1
                });
            },
            // 保存乘客信息 
            submitData: function() {
             
                var e = this,
                 a = +this.data.index, 
                 t = {
                    certNo: e.data.addIDCard,
                    certType: 1,
                    linkerName: e.data.addName,
                    mobile: "",
                    child: a
                },
                 d = e.funValidateData(t);

                 console.log(e)
              var  passengerInfo = {
                full_name: e.data.addName,
                telephone: e.data.addIDCard,
              }
                 // 将用户信息存到storage中
              wx.setStorageSync("passengerInfo", passengerInfo);
              // 保存成功之后，返回到前一页
              wx.navigateBack({
                
              })
                // return d ? (r.alert(d), !1) : (r.loading(), void wx.request({
                //     url: s.addLinkerNew,
                //     method: "POST",
                //     header: r.setHeader(),
                //     data: JSON.stringify([ t ]),
                //     success: function(t) {
                //         wx.hideToast(), t.data.header.isSuccess ? (wx.setStorageSync("bus_newAddPassenger", {
                //             linkerName: e.data.addName,
                //             IDCard: e.data.addIDCard,
                //             isChild: a
                //         }), wx.navigateBack()) : r.alert(t.data.header.errMsg);
                //     }
                // }));
            },
            onShareAppMessage: function() {
                return {
                    title: "买车票就上同程汽车票！省心、更放心！",
                    path: "/pages/index/index"
                };
            }
        });
    }
}, [ 128 ]);