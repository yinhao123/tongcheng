!function() {
    require("./../../common.js"), wx.webpackJsonp.apply(null, arguments);
}([ 23 ], {
    133: function(t, e, n) {
        var i = function(t) {
            return t && t.__esModule ? t : {
                default: t
            };
        }(n(0));
        Page({
            data: {
                curData: {},
                userAgreement: {
                    1: {
                        title: "关于我们介绍",
                        content: "公司介绍\n\t\t\t\t苏州创旅天下信息技术有限公司（简称苏州创旅）为同程网络科技股份有限公司（简称同程旅游）旗下运营公司，同程旅游是中国领先的休闲旅游在线服务商创立于2004年，2014先后获得腾讯、携程等机构约20亿元人民币投资，2015年再次获得万达、腾讯、中信资本等约60亿元人民币的战略投资。\n\t\t\t\t苏州创旅致力于解决用户出行问题，提高用户的出行体验，服务领域包含了火车票、汽车票、船票、国内/国际用车、高铁订餐等。\n\t\t\t\t同程旅游旗下运营同程旅游网（www.LY.com）、同程旅游APP、小程序，为超过1亿人次的旅行者提供服务。让更多人享受旅游的乐趣是同程旅游的使命。\n\t\t\t\t"
                    }
                }
            },
            onLoad: function() {
                var t = this.data.userAgreement[1];
                wx.setNavigationBarTitle({
                    title: t.title
                }), t.content = t.content.split(/\t/gi), this.setData({
                    curData: t
                });
            },
            btnLogout: function() {
                i.default.alert("为了您的账号资金安全，暂不提供在线注销账号服务，请联系客服协助处理", "注销账号", !1, "", "知道了");
            },
            btnService: function() {
                wx.navigateTo({
                    url: "/pages/serviceList/serviceList?name=su"
                });
            },
            btnBusinessLicense: function() {
                wx.navigateTo({
                    url: "/pages/serviceList/serviceList?name=bl"
                });
            }
        });
    }
}, [ 133 ]);