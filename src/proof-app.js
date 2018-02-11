"use strict";

function sortByKeys(e, t) {
    if (e && t) {
        e = _.concat(e, _.difference(Object.keys(t), e));
        var n = {};
        return _.each(e, function(e) {
            t.hasOwnProperty(e) && (n[e] = t[e])
        }), n
    }
}
var app = angular.module("ProofApp", ["ngSanitize", "app.config", "app.decorators", "app.directives", "app.filters", "app.routes", "app.services", "app.authentication", "app.analytics", "app.api", "app.academy", "app.accounts", "app.trial", "app.notification", "app.traffic", "app.components", "app.checkout", "app.domains", "app.oto", "app.resources", "app.plans", "app.settings", "app.billing", "ngAnimate", "angularMoment", "angularPayments", "firebase", "youtube-embed", "ngclipboard", "timer", "angularEffDrop"]).config(["fbConfig", "env", "pwToken", function(e, t, n) {
    firebase.initializeApp(e), profitwell("auth_token", n)
}]).run(["$rootScope", "fbConfigSecondary", "env", function(e, t, n) {
    e.firebaseSecondary = firebase.initializeApp(t, "fs-alternate")
}]);
app.run(["$rootScope", "$templateCache", "$http", "$location", "simpleLogin", "alert", "Auth", "twitter", function(e, t, n, a, o, i, r, c) {
        n.get("templates/sidebar/sidebar.template.html", {
            cache: t
        }), n.get("templates/dashboard.html", {
            cache: t
        }), n.get("templates/pixel.html", {
            cache: t
        }), n.get("templates/settings.html", {
            cache: t
        }), n.get("templates/settings-billing.html", {
            cache: t
        }), e.$on("AUTH_TOKEN", function(e, t) {
            o.loginWithToken(t).then(function(e) {
                a.path("/dashboard"), i.banner("LOGGED IN AS ADMIN!")
            })
        }), r.$onAuthStateChanged(function(t) {
            t ? t.getIdToken().then(function(e) {
                return jwt_decode(e)
            }).then(function(t) {
                e.tokenData = t, profitwell("user_id", t.user_id), profitwell("user_email", t.email), profitwell("cq_get")
            }) : e.tokenData = {}
        }), e.$on("$routeChangeStart", function(e, t) {
            c.trackPageview()
        })
    }]), angular.module("app.config", []).constant("version", "2.1.129").constant("env", "production").constant("apiUrl", "https://account.proofapi.com").constant("cfUrl", "https://us-central1-proof-f6589.cloudfunctions.net").constant("loginRedirectPath", "/login").constant("billingRedirectPath", "/update-payment").constant("STRIPE_PK", "pk_live_wPyXEy91jMilRQVlVg3SDqWI").constant("pwToken", "0c51cc620ac606412e8025077d47db14").constant("webhookBaseUrl", "https://webhook.proofapi.com/").constant("fbConfig", {
        apiKey: "AIzaSyAAJxx7T982ObQAuijyyZGOhDmTRYIfi7c",
        authDomain: "proof-f6589.firebaseapp.com",
        databaseURL: "https://proof-f6589.firebaseio.com",
        projectId: "proof-f6589",
        storageBucket: "proof-f6589.appspot.com",
        messagingSenderId: "24029482974"
    }).constant("fbConfigSecondary", {
        apiKey: "AIzaSyC_EQTTVno93SJs3jlHHUQvMfhZqdZBMMU",
        authDomain: "proof-2.firebaseapp.com",
        databaseURL: "https://proof-2.firebaseio.com",
        projectId: "proof-2",
        storageBucket: "proof-2.appspot.com",
        messagingSenderId: "955405219551"
    }).constant("accountDockUrl", "https://static.accountdock.com/app.min.js"), window.openFirebaseConnections = [], angular.module("app.decorators", ["firebase.utils", "simpleLogin"]).config(["$provide", function(e) {
        e.decorator("ngCloakDirective", ["$delegate", "simpleLogin", function(e, t) {
            var n = e[0],
                a = n.compile;
            return n.compile = function(e, o) {
                t.getUser().then(function() {
                    a.call(n, e, o)
                })
            }, e
        }])
    }]), angular.module("app.directives", ["simpleLogin"]).directive("appVersion", ["version", "env", function(e, t) {
        return function(n, a) {
            a.text("Version " + e), console.log("Version", e), "development" == t && console.log("Env:", t)
        }
    }]).directive("selectOnClick", ["$window", function(e) {
        return {
            restrict: "A",
            link: function(t, n, a) {
                n.on("click", function() {
                    e.getSelection().toString() || this.setSelectionRange(0, this.value.length)
                })
            }
        }
    }]).directive("onEnter", function() {
        return {
            restrict: "A",
            scope: {
                action: "&onEnter"
            },
            link: function(e, t, n) {
                t.on("keydown keypress", function(t) {
                    13 === t.which && (e.$apply(e.action), t.preventDefault())
                })
            }
        }
    }).directive("onRightClick", ["$parse", function(e) {
        return function(t, n, a) {
            var o = e(a.onRightClick);
            n.bind("contextmenu", function(e) {
                t.$apply(function() {
                    e.preventDefault(), o(t, {
                        $event: e
                    })
                })
            })
        }
    }]).directive("ngShowAuth", ["simpleLogin", "$timeout", function(e, t) {
        var n;
        return e.watch(function(e) {
            n = !!e
        }), {
            restrict: "A",
            link: function(a, o) {
                function i() {
                    t(function() {
                        o.toggleClass("ng-cloak", !n)
                    }, 0)
                }
                o.addClass("ng-cloak"), i(), e.watch(i, a)
            }
        }
    }]).directive("ngHideAuth", ["simpleLogin", "$timeout", function(e, t) {
        var n;
        return e.watch(function(e) {
            n = !!e
        }), {
            restrict: "A",
            link: function(a, o) {
                function i() {
                    o.addClass("ng-cloak"), t(function() {
                        o.toggleClass("ng-cloak", !1 !== n)
                    }, 0)
                }
                i(), e.watch(i, a)
            }
        }
    }]).directive("settingsBilling", function() {
        return {
            templateUrl: "templates/settings-billing.html",
            restrict: "E",
            controller: ["$scope", function(e) {}]
        }
    }).directive("settingsPlan", function() {
        return {
            templateUrl: "templates/settings-plan.html",
            restrict: "E",
            transclude: !0,
            controller: ["$scope", function(e) {}]
        }
    }).directive("setPlan", function() {
        return {
            templateUrl: "templates/set-plan.html",
            restrict: "E",
            controller: ["$scope", function(e) {}]
        }
    }).directive("settingsLoginMethods", function() {
        return {
            templateUrl: "templates/settings-login-methods.html",
            restrict: "E",
            controller: ["$scope", function(e) {}]
        }
    }).directive("help", ["dropWrapper", function(e) {
        return {
            restrict: "EA",
            transclude: !0,
            scope: {
                fn: "=callback",
                content: "=content",
                on: "@on",
                theme: "@theme",
                position: "=position"
            },
            link: function(t, n) {
                t.drop = e({
                    target: n,
                    scope: t,
                    template: '<span ng-bind-html="content"></span>',
                    position: t.position || "top middle",
                    constrainToWindow: !0,
                    constrainToScrollParent: !0,
                    classes: t.theme || "drop-theme-hubspot-popovers",
                    tetherOptions: {},
                    openOn: t.on || "click"
                }), t.custom_close = function(e) {
                    t.fn(e), t.drop.close()
                }
            }
        }
    }]).directive("accountUsage", ["db", function(e) {
        return {
            restrict: "E",
            templateUrl: "templates/settings-usage.html",
            controller: ["$scope", function(t) {
                function n(e, t, n) {
                    var a = [],
                        o = !1;
                    for (angular.forEach(t, function(e) {
                            e[n] > 0 && (o = !0), a.push(e[n])
                        }); a.length < e;) a.unshift(0);
                    return !!o && [a]
                }

                function a(e) {
                    var t = e;
                    if (r.visitorLimitModifierType && r.visitorLimitModifier) switch (r.visitorLimitModifierType) {
                        case "add":
                            t += r.visitorLimitModifier;
                            break;
                        case "multiply":
                            t *= r.visitorLimitModifier;
                            break;
                        case "limit":
                            t = r.visitorLimitModifier
                    }
                    return t
                }

                function o() {
                    t.visitors = a(t.plans[t.account.planId].visitors), t.percentUsed = t.billingStats.uniqueVisitors / t.visitors * 100;
                    var e = t.percentUsed,
                        n = "#0bdc60";
                    t.percentUsed > 90 && (n = "#FFA726"), t.percentUsed > 100 && (e = 100, n = "#F44336"), t.progressBarStyle = {
                        width: e + "%",
                        "background-color": n
                    }
                }
                t.labels = function(e) {
                    for (var t = []; t.length < e;) {
                        var n = moment().subtract(t.length, "days");
                        t.unshift(n.format("M/D"))
                    }
                    return t
                }(14), t.series = ["Unique Visitors"];
                var i = e.getAccountUsage(t.user.uid, 14);
                i.$watch(function(e) {
                    "child_changed" != e.event && "child_added" != e.event || (t.data = n(14, i, "sessions"))
                });
                var r = e.getAccount(t.user.uid);
                r.$loaded().then(function() {
                    if (r.currentPeriodEnd) {
                        var e = moment.unix(r.currentPeriodEnd),
                            n = e.diff(moment(), "days");
                        t.daysLeft = n > 0 ? n : 0
                    }
                }).then(function() {
                    t.plans = e.getPlans();
                    var n = e.getCurrentBillingPeriod(t.user.uid);
                    n.$loaded().then(function() {
                        n.$value && (t.billingStats = e.getBillingStats(t.user.uid, n.$value), t.billingStats.$loaded().then(function() {
                            t.plans.$loaded().then(function() {
                                o()
                            })
                        }), t.billingStats.$watch(function() {
                            t.plans[t.account.planId] && o()
                        }), t.account.$watch(function() {
                            t.plans[t.account.planId] && o()
                        }))
                    })
                })
            }]
        }
    }]).directive("analyticsClick", ["analytics", function(e) {
        return {
            restrict: "A",
            link: function(t, n, a) {
                n.on("click", function() {
                    a.analyticsClick && e.track(a.analyticsClick, a.analyticsMeta)
                })
            }
        }
    }]).directive("analyticsHover", ["analytics", function(e) {
        return {
            restrict: "A",
            link: function(t, n, a) {
                n.on("mouseover", function() {
                    a.analyticsHover && e.track(a.analyticsHover, a.analyticsMeta)
                })
            }
        }
    }]).directive("charCount", function() {
        return {
            require: "ngModel",
            restrict: "A",
            link: function(e, t, n, a) {
                var o = document.createElement("div");
                o.className = "char-count";
                var i = t[0].parentNode.insertBefore(o, t[0].nextSibling);
                e.$watch(function() {
                    return a.$viewValue
                }, function(e) {
                    var t = e ? e.length : 0,
                        a = t > n.charCount ? 'class="over-limit"' : "";
                    i.innerHTML = "<span " + a + ">" + t + "</span> / " + n.charCount + " characters"
                })
            }
        }
    }).directive("settingsLanguage", ["db", "languageOptions", "alert", function(e, t, n) {
        return {
            templateUrl: "templates/settings-language.html",
            controller: ["$scope", function(a) {
                a.languageOptions = t;
                var o = e.getPixel(a.user.uid);
                a.updateLanguage = function() {
                    console.log(a.language), a.language && (_.set(o, "language.from", a.language.from || null), _.set(o, "language.someone", a.language.someone || null), _.set(o, "language.time", a.language.time || null)), o.$save(), n.banner("Language settings have been saved", "success")
                }, o.$loaded().then(function() {
                    a.language = o.language
                })
            }]
        }
    }]), angular.module("app.filters", []).filter("interpolate", ["version", function(e) {
        return function(t) {
            return String(t).replace(/\%VERSION\%/gm, e)
        }
    }]).filter("reverse", function() {
        return function(e) {
            if (e) return e.slice().reverse()
        }
    }).filter("fromCents", function() {
        return function(e) {
            return parseFloat(e / 100)
        }
    }).filter("minZero", function() {
        return function(e) {
            return e < 0 ? 0 : e
        }
    }).filter("percentage", ["$filter", function(e) {
        return function(t, n) {
            return e("number")(100 * t, n) + "%"
        }
    }]).filter("zpad", function() {
        return function(e, t) {
            return void 0 === e && (e = ""), e.length >= t ? e : ("0".repeat(t) + e).slice(-1 * t)
        }
    }), app.controller("PixelCtrl", ["$scope", "user", "db", "pixel", "analytics", "$timeout", function(e, t, n, a, o, i) {
        n.getLastPageview(t.uid, function(t) {
            i(function() {
                e.pixelInstalled = t, console.log("lastPageview", t)
            }, 10)
        }), e.account = n.getAccount(t.uid), e.$watch("account.beta", function(e) {
            e && o.track("Beta Pixel")
        })
    }]), angular.module("app.resources", []).constant("languageOptions", {
        en: "English",
        ar: "Arabic",
        "zh-cn": "Chinese",
        cs: "Czech",
        da: "Danish",
        nl: "Dutch",
        fr: "French",
        de: "German",
        el: "Greek",
        he: "Hebrew",
        hi: "Hindi",
        hu: "Hungarian",
        id: "Indonesian",
        it: "Italian",
        ja: "Japanese",
        ko: "Korean",
        nb: "Norwegian",
        pl: "Polish",
        pt: "Portuguese",
        ro: "Romanian",
        ru: "Russian",
        es: "Spanish",
        sv: "Swedish",
        th: "Thai",
        uk: "Ukrainian",
        vi: "Vietnamese"
    }).constant("planPrices", {
        basic: {
            price: 29,
            traffic: 1e3,
            domains: "Unlimited"
        },
        pro: {
            price: 79,
            traffic: 1e4,
            domains: "Unlimited"
        },
        business: {
            price: 129,
            traffic: 5e4,
            domains: "Unlimited"
        },
        premium: {
            price: 199,
            traffic: 1e5,
            domains: "Unlimited"
        },
        platinum: {
            price: 299,
            traffic: 3e5,
            domains: "Unlimited"
        }
    }).constant("planFeatures", {
        CUSTOM_RULES: {
            name: "Custom Rules",
            tier: 1,
            description: "Get granular control over how and when notifications display on your pages.",
            pitch: "Are you a serious marketer looking for more control over the behavior of your Proof notifications? We created Proof Custom Rules to give added flexibility to marketers seeking higher conversion rates."
        },
        HOT_STREAKS: {
            name: "Hot Streaks",
            tier: 2,
            description: "Display recent visitor and conversion trends from your site",
            pitch: "Hot Streaks displays how many people have viewed or converted on your pages over a recent time range."
        },
        LIVE_VISITOR_COUNT: {
            name: "Live Visitor Count",
            tier: 2,
            description: "Display how many visitors you have currently viewing your website or specific page.",
            pitch: "Live Visitor tracking displays how many visitors are viewing your entire site, or just a particular page. It gives visitors confidence they aren't the only one shopping your site."
        },
        CUSTOM_TIMING: {
            name: "Custom Timing",
            tier: 1,
            description: "Get granular control over when and how long notifications display on your pages.",
            pitch: "Sometimes notifications popup faster or slower than you'd prefer. With custom timing, you can speed them up, slow them down, or hold them on screen longer."
        },
        PRIORITY_SUPPORT: {
            name: "Priority Support",
            tier: 3,
            description: "Get hands on support for your proof account",
            pitch: ""
        },
        UNLIMITED_NOTIFICATIONS: {
            name: "Unlimited Notifications",
            tier: 1,
            description: "",
            pitch: ""
        },
        CUSTOMER_PROFILES: {
            name: "Traffic Feed Customer Profiles",
            tier: 2,
            description: "",
            pitch: ""
        },
        TRAFFIC_FEED: {
            name: "Customer Journeys",
            tier: 1,
            description: "",
            pitch: "Identify the anonymous clicks coming to your site. Google analytics tells you how many visitors you are getting, Proof will tell you who they are."
        }
    }).constant("planTiers", {
        1: ["basic"],
        2: ["pro"],
        3: ["business", "premium", "academy", "platinum", "founder"]
    }), angular.module("app.routes", ["ngRoute", "simpleLogin"]).constant("ROUTES", {
        "/login": {
            templateUrl: "templates/login.html",
            controller: "LoginCtrl",
            useAsDefault: !0
        },
        "/login/academy/:key": {
            templateUrl: "templates/newAcademyMember.html",
            controller: "RegisterAcademyCtrl"
        },
        "/forgot": {
            templateUrl: "templates/forgot.html",
            controller: "PasswordResetCtrl"
        },
        "/signup": {
            templateUrl: "templates/signup.html",
            controller: "SignUpCtrl"
        },
        "/signup/:id": {
            templateUrl: "templates/signup.html",
            controller: "SignUpCtrl"
        },
        "/promo/:promocode": {
            templateUrl: "templates/signup.html",
            controller: "SignUpCtrl"
        },
        "/promo/:promocode/:planId": {
            templateUrl: "templates/signup.html",
            controller: "SignUpCtrl"
        },
        "/dashboard": {
            templateUrl: "templates/dashboard.html",
            controller: "DashboardCtrl",
            authRequired: !0
        },
        "/notifications": {
            templateUrl: "templates/notification/list/list.template.html",
            controller: "NotificationListCtrl",
            authRequired: !0,
            reloadOnSearch: !1
        },
        "/notification/new": {
            templateUrl: "templates/notification/new/new.template.html",
            controller: "NotificationNewCtrl",
            authRequired: !0
        },
        "/notification/edit/:id": {
            templateUrl: "templates/notification/edit/edit.template.html",
            controller: "NotificationEditCtrl",
            authRequired: !0
        },
        "/traffic": {
            templateUrl: "templates/traffic/list/list.template.html",
            controller: "TrafficListCtrl",
            authRequired: !0
        },
        "/pixel": {
            templateUrl: "templates/pixel.html",
            controller: "PixelCtrl",
            authRequired: !0
        },
        "/welcome": {
            templateUrl: "templates/onboarding.html",
            controller: "OnboardingCtrl",
            authRequired: !0
        },
        "/settings": {
            templateUrl: "templates/settings.html",
            controller: "SettingsCtrl",
            authRequired: !0
        },
        "/o-install": {
            templateUrl: "templates/onboarding/install/install.template.html",
            controller: "OnboardingInstallCtrl",
            authRequired: !0,
            allowInactive: !0
        },
        "/o-confirm": {
            templateUrl: "templates/onboarding/payment/payment.template.html",
            controller: "OnboardingPaymentCtrl",
            authRequired: !0,
            allowInactive: !0
        },
        "/oto/:id": {
            templateUrl: "templates/oto/oto.template.html",
            controller: "OTOCtrl",
            authRequired: !0
        },
        "/checkout/:id": {
            redirectTo: "/signup"
        },
        "/o-plans": {
            templateUrl: "templates/onboarding/plans/plans.template.html",
            controller: "OnboardingPlansCtrl",
            authRequired: !0,
            allowInactive: !0
        },
        "/update-payment": {
            templateUrl: "templates/payment-update.html",
            controller: "SettingsCtrl",
            authRequired: !0,
            allowInactive: !0
        },
        "/change-plan": {
            templateUrl: "templates/plans/change/change.template.html",
            controller: "PlanChangeCtrl",
            authRequired: !0,
            allowInactive: !0
        },
        "/set-plan": {
            templateUrl: "templates/set-plan.html",
            controller: "SettingsCtrl",
            authRequired: !0,
            allowInactive: !0
        },
        "/academy": {
            templateUrl: "templates/academy/browse/browse.template.html",
            controller: "AcademyBrowseCtrl",
            authRequired: !0,
            reloadOnSearch: !1
        },
        "/academy/:lesson*?": {
            templateUrl: "templates/academy/view/view.template.html",
            controller: "AcademyViewCtrl",
            authRequired: !0
        },
        "/cancel-confirm": {
            templateUrl: "templates/plans/cancelConfirm/cancelConfirm.template.html",
            controller: "CancelConfirm",
            authRequired: !0
        }
    }).config(["$routeProvider", function(e) {
        e.whenAuthenticated = function(t, n) {
            n.resolve = n.resolve || {}, n.resolve.user = ["requireUser", function(e) {
                return e()
            }], n.resolve.account = ["requireActive", function(e) {
                return e(n)
            }], n.resolve.permissions = ["checkPermissions", function(e) {
                return e(n)
            }], e.when(t, n)
        }
    }]).config(["$routeProvider", "ROUTES", "$locationProvider", function(e, t, n) {
        angular.forEach(t, function(t, n) {
            t.authRequired ? e.whenAuthenticated(n, t) : e.when(n, t)
        }), e.otherwise({
            redirectTo: "/dashboard"
        }), n.html5Mode(!0)
    }]).run(["$rootScope", "$location", "simpleLogin", "ROUTES", "loginRedirectPath", "billingRedirectPath", function(e, t, n, a, o, i) {
        function r(n) {
            e.authChangeInProgress || !n && c(t.path()) && t.path(o)
        }

        function c(e) {
            return a.hasOwnProperty(e) && a[e].authRequired
        }
        n.watch(r, e), e.$on("$routeChangeError", function(e, n, a, r) {
            if (angular.isObject(r)) switch (console.log("AUTH_ERROR", r.code), r.code) {
                case "ACTIVE_REQUIRED":
                    return t.path(i);
                case "AUTH_REQUIRED":
                default:
                    return t.path(o)
            }
        })
    }]), angular.module("app.analytics", []).factory("facebook", ["env", function(e) {
        function t(t, n) {
            if ("production" === e) try {
                fbq("track", t, n)
            } catch (e) {
                console.log(e)
            }
        }
        return {
            track: t
        }
    }]).factory("twitter", function() {
        return {
            trackPageview: function(e) {
                "production" === e && "function" == typeof twq && (twq("init", "ny1nn"), twq("track", "PageView"))
            }
        }
    }).factory("adwords", ["$window", "env", function(e, t) {
        var n = {
                NEW_TRIAL: "pA1eCLqZ43AQnJvL0QM"
            },
            a = function(t) {
                try {
                    e.google_trackConversion({
                        google_conversion_id: 976407964,
                        google_conversion_language: "en",
                        google_conversion_format: "3",
                        google_conversion_color: "ffffff",
                        google_conversion_label: n[t],
                        google_conversion_value: 0,
                        google_remarketing_only: !1
                    })
                } catch (e) {
                    console.log(e)
                }
            };
        return {
            newTrialConversion: function() {
                "production" === t && a("NEW_TRIAL")
            }
        }
    }]).factory("analytics", ["env", "intercomSvc", function(e, t) {
        function n(n, a) {
            "production" === e && (a ? (t.track(n, a), heap.track(n, a), window._pq = window._pq || [], _pq.push(["track", n, a])) : (t.track(n), heap.track(n), window._pq = window._pq || [], _pq.push(["track", n])), window.hasOwnProperty("ga") && ga("send", {
                hitType: "event",
                eventCategory: "App",
                eventAction: n
            }))
        }

        function a(e) {
            heap.addUserProperties(e)
        }

        function o(e, t, n) {
            window.hasOwnProperty("ga") && (ga("ecommerce:addTransaction", {
                id: e,
                revenue: n
            }), ga("ecommerce:addItem", {
                id: e,
                name: t,
                price: n,
                category: "Plans",
                quantity: 1
            }), ga("ecommerce:send"))
        }

        function i(e) {
            window.hasOwnProperty("ga") && ga("set", "userId", e)
        }
        return {
            track: n,
            addUserProperties: a,
            trackRevenue: o,
            setUserId: i
        }
    }]), angular.module("app.api", ["app.config"]).factory("api", ["$http", "apiUrl", function(e, t) {
        function n(n) {
            var a = t + "/utils/pageTitle?url=" + encodeURIComponent(n);
            return e.get(a)
        }

        function a(n) {
            var a = t + "/utils/pixelInstalled?url=" + encodeURIComponent(n);
            return e.get(a)
        }

        function o() {
            return e.get("https://location.proofapi.com/json/")
        }

        function i(n, a, o, i) {
            var r = t + "/analytics/trackPromptResponse",
                c = {
                    account_id: n,
                    survey_id: a,
                    send_to: i,
                    payload: o
                };
            return e.post(r, c)
        }

        function r(n, a, o) {
            var i = t + "/analytics/trackSegmentation",
                r = {
                    type: n,
                    account_id: a.$id,
                    plan: a.planId,
                    email: a.email,
                    utm_tags: o
                };
            return e.post(i, r)
        }
        return {
            getPageTitle: n,
            isPixelInstalled: a,
            geolocate: o,
            trackSegmentation: r,
            trackPromptResponse: i
        }
    }]),
    function() {
        angular.module("app.authentication", ["app.config"]).factory("Auth", ["$firebaseAuth", function(e) {
            return e()
        }]).factory("requireActive", ["$rootScope", "Auth", "$q", "$firebaseObject", function(e, t, n, a) {
            return function(o) {
                var i = n.defer();
                return t.$waitForSignIn().then(function(t) {
                    if (e.hideSidebar = !1, !t || !t.hasOwnProperty("uid")) return i.reject();
                    a(firebase.database().ref("/accounts/" + t.uid)).$loaded().then(function(e) {
                        if (e.active || o.allowInactive) return i.resolve(e);
                        i.reject({
                            activeRequired: !0,
                            code: "ACTIVE_REQUIRED",
                            account: e
                        })
                    })
                }), i.promise
            }
        }]).factory("checkPermissions", ["simpleLogin", "$q", "$firebaseObject", function(e, t, n) {
            return function(a) {
                var o = t.defer();
                return e.getUser().then(function(e) {
                    if (e && e.uid) {
                        var t = e.uid;
                        n(firebase.database().ref("/accounts/" + t)).$loaded().then(function(e) {
                            if (!_.has(e, "products")) return o.resolve({});
                            var t = Object.keys(e.products);
                            if (!_.get(a, "permsRequired", !1)) return o.resolve(t);
                            var n = _.intersection(t, a.permsRequired);
                            if (_.isEqual(n.length, a.permsRequired.length)) return o.resolve(t);
                            o.reject(t)
                        })
                    } else o.reject("Permission denied")
                }), o.promise
            }
        }]).factory("signup", ["intercomSvc", function(e) {
            function t(t, n, a, o) {
                t.init = !0, a && (t.planId = a.code), o && (t.phone = o);
                var i = (new Date).getTime();
                t.created = i, t.firstName = n.displayName.split(" ").slice(0, 1).join(" "), t.displayName = n.displayName, t.email = n.email, t.photoURL = n.photoURL;
                var r = Math.floor(i / 1e3);
                return e.boot({
                    app_id: "k3mxasvj",
                    email: n.email,
                    user_id: t.$id,
                    name: n.displayName,
                    phone: t.phone,
                    created_at: r
                }), console.log("GO SQUARED!"), t
            }

            function n(t, n, a) {
                t.init = !0, a && (t.planId = a.code), t.firstName = n.first_name, t.email = n.email;
                var o = (new Date).getTime(),
                    i = Math.floor(o / 1e3);
                return e.boot({
                    app_id: "k3mxasvj",
                    email: n.email,
                    user_id: t.$id,
                    phone: t.phone,
                    created_at: i
                }), t
            }
            return {
                initializeAccount: t,
                initializeAccountWithEmail: n
            }
        }])
    }(), angular.module("app.authentication").factory("authSvc", ["simpleLogin", "$firebaseAuth", "$window", "analytics", "intercomSvc", function(e, t, n, a, o) {
        var i, r = t(firebase.auth()),
            c = function(e) {
                var t = _.map(_.filter(e.providerData, function(e) {
                    return e.photoURL
                }), function(e) {
                    return e.photoURL
                });
                return {
                    email: e.email,
                    displayName: e.displayName || null,
                    uid: e.uid,
                    photoURL: t[0] || null,
                    phoneNumber: e.phoneNumber || null,
                    firstName: e.displayName ? e.displayName.split(" ")[0] : null,
                    lastName: e.displayName ? e.displayName.split(" ").slice(-1).pop() : null
                }
            };
        return {
            getUID: function() {
                return i
            },
            getUser: function() {
                return r.$waitForSignIn().then(function(e) {
                    return e && e.email ? (i = e.uid, c(e)) : null
                })
            },
            authenticate: function(e, t) {
                switch (e) {
                    case "facebook":
                        return r.$signInWithPopup("facebook").then(function(e) {
                            return c(e.user)
                        });
                    case "emailSignup":
                        return t && t.email && t.password ? r.$createUserWithEmailAndPassword(t.email, t.password).then(function(e) {
                            return e
                        }) : Promise.reject({
                            message: "Missing email and/or password"
                        });
                    case "emailLogin":
                        return r.$signInWithEmailAndPassword(t.email, t.password).then(function(e) {
                            return e
                        });
                    case "google":
                    default:
                        return r.$signInWithPopup("google").then(function(e) {
                            return c(e.user)
                        })
                }
            },
            logout: function() {
                return angular.forEach(n.openFirebaseConnections, function(e) {
                    e.$destroy()
                }), i = null, o.shutdown(), a.track("Logged out"), r.$signOut()
            }
        }
    }]), angular.module("app.analytics").factory("intercomSvc", function() {
        return window.hasOwnProperty("Intercom") ? {
            boot: function(e) {
                window.Intercom("boot", e)
            },
            update: function(e) {
                window.Intercom("update", e)
            },
            track: function(e, t) {
                window.Intercom("trackEvent", e, t)
            },
            shutdown: function() {
                window.Intercom("shutdown")
            },
            showNewMessage: function(e) {
                window.Intercom("showNewMessage", e)
            }
        } : (console.log("INTERCOM: disabled in dev"), {
            boot: function() {},
            update: function() {},
            track: function() {},
            shutdown: function() {},
            showNewMessage: function() {}
        })
    }), angular.module("app.services", []).factory("pixel", function() {
        return function(e, t) {
            return ["<script src='https://cdn.useproof.com/proof.js?acc=", e, "' async><\/script>"].join("")
        }
    }).factory("db", ["$firebaseObject", "$firebaseArray", "alert", "$q", function(e, t, n, a) {
        function o(e) {
            var t = e.join("/");
            return firebase.database().ref(t).once("value").then(function(e) {
                return e.val()
            })
        }

        function i(e) {
            var t = (new Date).getTime(),
                n = e.account_id + t;
            return firebase.database().ref("worker_queue/webhooks/tasks").child(n).set(e)
        }

        function r(t) {
            var n = firebase.database().ref("promos").child(t);
            return e(n)
        }

        function c(t) {
            var n = firebase.database().ref("academy/newAccounts").child(t);
            return e(n)
        }

        function s(t, n) {
            var a = firebase.database().ref("proofs").child(t).child(n);
            return e(a)
        }

        function l(t, n) {
            var a = firebase.database().ref("proofs").child(t).child(n),
                o = e(a),
                i = firebase.database().ref("pixels").child(t).child("proofs").child(n),
                r = e(i);
            return o.$remove().then(function() {
                return r.$remove()
            })
        }

        function u(t, n) {
            var a = firebase.database().ref("billing_stats").child(t).child(n);
            return e(a)
        }

        function p(t) {
            var n = firebase.database().ref("billing_stats").child(t).child("currentPeriod");
            return e(n)
        }

        function d(e, n) {
            var a = moment().subtract(n, "days").format("YYYY-MM-DD"),
                o = moment().format("YYYY-MM-DD"),
                i = firebase.database().ref("account_stats").child(e).orderByKey().startAt(a).endAt(o).limitToLast(n);
            return t(i)
        }

        function f(e, n, a) {
            var o = firebase.database().ref("notifications").child(e).child(n).orderByChild("timestamp").limitToLast(a || 20);
            return t(o)
        }

        function m(t, n) {
            var a = firebase.database().ref("preOnboarding").child(n).child(t);
            return e(a)
        }

        function h(t) {
            var n = firebase.database().ref("plans").child(t);
            return e(n)
        }

        function g() {
            var t = firebase.database().ref("plans");
            return e(t)
        }

        function v(t) {
            var n = firebase.database().ref("customer_data").child(t);
            return e(n)
        }

        function b(t) {
            var n = firebase.database().ref("account_index").child(t);
            return e(n)
        }

        function y(t) {
            var n = firebase.database().ref("pixel_stats").child(t).child("pageviews");
            return e(n)
        }

        function w(e, t) {
            return firebase.database().ref("pixel_stats").child(e).child("lastPageview").on("value", function(e) {
                return t(e.val())
            })
        }

        function k(e, t, n) {
            return firebase.database().ref("onboarding").child(e).child("action").child(t).on("value", function(e) {
                return n(e.val())
            })
        }

        function $(e, t) {
            var n = (new Date).getTime();
            return firebase.database().ref("onboarding").child(e).child("action").child(t).set(n)
        }

        function C(t) {
            var n = firebase.database().ref("pixel_stats").child(t);
            return e(n)
        }

        function S(t) {
            var n = firebase.database().ref("accounts").child(t);
            return e(n)
        }

        function P(t) {
            var n = firebase.database().ref("invite_codes").child(t);
            return e(n)
        }

        function T(t) {
            var n = firebase.database().ref("pixels").child(t);
            return e(n)
        }

        function _(t) {
            var n = firebase.database().ref("onboarding").child(t);
            return e(n)
        }

        function U(e) {
            var n = firebase.database().ref("proofs").child(e).limitToLast(1);
            return t(n)
        }

        function N(e) {
            var n = firebase.database().ref("proofs").child(e);
            return t(n)
        }

        function A(t) {
            var n = firebase.database().ref("proofs-draft").child(t);
            return e(n)
        }

        function I(t) {
            var n = firebase.database().ref("notificationEditDraft").child(t);
            return e(n)
        }

        function O(t, n) {
            var a = firebase.database().ref("pixels").child(t).child("proofs").child(n);
            return e(a)
        }

        function x(t) {
            var n = firebase.database().ref("pixels").child(t).child("proofs");
            return e(n)
        }

        function D(e, n, a) {
            var o = firebase.database().ref("integrations").child(e).limitToLast(1),
                i = t(o);
            return n.created = (new Date).getTime(), n.type = a || "clickfunnels", i.$add(n).then(function(e) {
                return e.key
            })
        }

        function E(e, n) {
            if (n) {
                var a = firebase.database().ref("integrations").child(e).orderByChild("type").equalTo(n);
                return t(a)
            }
            var a = firebase.database().ref("integrations").child(e);
            return t(a)
        }

        function L(t, n) {
            var a = firebase.database().ref("integrations").child(t).child(n);
            return e(a)
        }
        return {
            getLastPageview: w,
            getActionTimestamp: k,
            trackActionTimestamp: $,
            get: o,
            getAccount: S,
            getPixel: T,
            getOnboarding: _,
            getInviteCode: P,
            getNotificationDraft: A,
            getNotificationEditDraft: I,
            getNotification: s,
            deleteNotification: l,
            getNotifications: U,
            getAllNotifications: N,
            getUrlFilter: O,
            getUrlFilters: x,
            newWebhook: D,
            getWebhooks: E,
            getWebhook: L,
            getPixelMetrics: C,
            getPageviews: y,
            getCustomerIndex: b,
            getCustomerData: v,
            getPlans: g,
            getPlan: h,
            getPreOnboarding: m,
            getConversions: f,
            getAccountUsage: d,
            getBillingStats: u,
            getCurrentBillingPeriod: p,
            getNewAcademyMember: c,
            getPromo: r,
            trackWebhookConversion: i
        }
    }]).factory("video", ["$firebaseObject", function(e) {
        function t(e, t) {
            return {
                id: e,
                vars: {
                    controls: 1,
                    autoplay: t || 0,
                    modestbranding: 1,
                    autohide: 1,
                    showinfo: 0,
                    rel: 0
                }
            }
        }
        return {
            load: t
        }
    }]).factory("focus", ["$timeout", "$window", function(e, t) {
        return function(n) {
            e(function() {
                var e = t.document.getElementById(n);
                e && e.focus()
            })
        }
    }]).factory("cookies", function() {
        return {
            set: function(e, t, n) {
                var a = "";
                if (n) {
                    var o = new Date;
                    o.setTime(o.getTime() + 24 * n * 60 * 60 * 1e3), a = "; expires=" + o.toUTCString()
                }
                document.cookie = e + "=" + t + a + "; domain=.useproof.com; path=/"
            },
            get: function(e) {
                for (var t = e + "=", n = document.cookie.split(";"), a = 0; a < n.length; a++) {
                    for (var o = n[a];
                        " " == o.charAt(0);) o = o.substring(1, o.length);
                    if (0 == o.indexOf(t)) return o.substring(t.length, o.length)
                }
                return null
            }
        }
    }).factory("alert", ["$rootScope", function(e) {
        var t = {};
        return t.data = {}, t.set = function(e, n, a) {
            t.data = {
                type: n || "neutral",
                msg: e,
                expiry: a || 4e3
            }
        }, t.banner = function(e, n, a, o) {
            t.data = {
                type: n || "neutral",
                msg: e,
                expiry: o || 3e3,
                banner: !0,
                fullscreen: a || !1
            }
        }, t
    }]);
var academy = angular.module("app.academy", ["ngSanitize", "youtube-embed"]);
academy.run(["$http", "$templateCache", function(e, t) {
    e.get("templates/academy/shared/lesson-resources/lesson-resources.template.html", {
        cache: t
    }), e.get("templates/academy/shared/video-player/video-player.template.html", {
        cache: t
    }), e.get("templates/academy/shared/lesson-card/lesson-card.template.html", {
        cache: t
    }), e.get("templates/academy/shared/breadcrumbs/breadcrumbs.template.html", {
        cache: t
    }), e.get("templates/academy/shared/breadcrumbs/crumb.template.html", {
        cache: t
    }), e.get("templates/academy/browse/browse.template.html", {
        cache: t
    }), e.get("templates/academy/view/view.template.html", {
        cache: t
    })
}]), angular.module("app.academy").factory("lessonsSvc", ["$firebaseObject", "$firebaseArray", "$filter", function(e, t, n) {
    var a = t(firebase.database().ref("academy").child("lessons").orderByChild("index"));
    return {
        getLessons: function() {
            return a
        },
        getLesson: function(t) {
            return "academy" === t ? {
                title: "Conversion Club",
                $id: "academy",
                slug: "academy"
            } : e(firebase.database().ref("academy/lessons").child(t))
        },
        getCategory: function(e) {
            return n("filter")(a, {
                category: e
            })
        }
    }
}]);
var accounts = angular.module("app.accounts", ["firebase", "app.authentication"]);
accounts.run(["Auth", "Account", function(e, t) {
    e.$onAuthStateChanged(t.handleAuthChange)
}]), angular.module("app.accounts").factory("Account", ["$firebaseObject", "$firebaseArray", "$q", "subscriptionSvc", "Plan", "simpleLogin", function(e, t, n, a, o, i) {
    function r(t) {
        t ? s.resolve(e(firebase.database().ref("accounts").child(t.uid))) : s.reject()
    }

    function c(e) {
        e.$loaded(function(e) {
            _.has(e, "customer_id") && (profitwell("user_stripe_id", _.get(e, "customer_id")), profitwell("cq_get"));
            var t = e.planId || e.plan_id;
            t && l.resolve(o.getPlanByCode(t));
            try {
                a.getCustomerSubscription(e.$id).then(function(e) {
                    u.resolve(e.data)
                })
            } catch (e) {}
        })
    }
    var s = n.defer(),
        l = n.defer(),
        u = n.defer();
    return s.promise.then(c), {
        handleAuthChange: r,
        getAccount: function() {
            return s.promise
        },
        getPlan: function() {
            return l.promise
        },
        getSubscription: function() {
            return u.promise
        },
        extendTrial: function() {
            return s.promise.then(function(e) {
                return a.extendTrial(e.$id)
            })
        }
    }
}]), angular.module("app.accounts").factory("Plan", ["$firebaseObject", function(e) {
    return {
        getPlanByCode: function(t) {
            var n = e(firebase.database().ref("plans").child(t));
            return n.annual = -1 !== t.indexOf("_annual"), n
        }
    }
}]), app.controller("LoginCtrl", ["$scope", "simpleLogin", "$location", "$timeout", "alert", "db", "analytics", "focus", function(e, t, n, a, o, i, r, c) {
    function s(e) {
        return angular.isObject(e) && e.code ? e.message : e + ""
    }
    e.success = !1, e.viewAnimation = "fade", c("email");
    var l = function() {
        e.shake = !0, a(function() {
            e.shake = !1
        }, 500)
    };
    e.loginWithEmail = function(a, c) {
        e.processing = !0, a && c ? (e.err = null, t.login(a, c).then(function(e) {
            var t = i.getAccount(e.uid);
            r.setUserId(e.uid), t.$loaded().then(function() {
                r.track("Logged in password"), n.path("/dashboard"), o.banner("Hey " + t.firstName + ", welcome back!", "success")
            })
        }, function(t) {
            o.set(s(t), "error"), console.log(e.err), e.processing = !1, l()
        })) : (e.processing = !1, l())
    }, e.loginWithGoogle = function() {
        t.loginWithGoogle().then(function(e) {
            var a = i.getAccount(e.user.uid);
            r.setUserId(e.user.uid), a.$loaded().then(function() {
                a.init ? (r.track("Logged in with Google"), n.path("/dashboard"), o.banner("Hey " + a.firstName + ", welcome back!", "success")) : (t.logout(), n.path("/signup"), o.banner("Yikes! Your account was not recognized.  Please signup first or try another login method :)", "error"))
            })
        }).catch(function(e) {
            o.banner(s(e), "error")
        })
    }, e.loginWithFacebook = function() {
        t.loginWithFacebook().then(function(e) {
            var a = i.getAccount(e.user.uid);
            r.setUserId(e.user.uid), a.$loaded().then(function() {
                a.init ? (r.track("Logged in with Facebook"), n.path("/dashboard"), o.banner("Hey " + a.firstName + ", welcome back!", "success")) : (t.logout(), n.path("/signup"), o.banner("Yikes! Your account was not recognized.  Please signup first or try another login method :)", "error", !1, 5e3))
            })
        }).catch(function(e) {
            o.banner(s(e), "error")
        })
    }
}]), app.controller("PasswordResetCtrl", ["$scope", "simpleLogin", "$location", "$timeout", "alert", "focus", function(e, t, n, a, o, i) {
    function r(e) {
        return angular.isObject(e) && e.code ? e.message : e + ""
    }
    e.submitted = !1;
    var c = function() {
        e.shake = !0, a(function() {
            e.shake = !1
        }, 500)
    };
    e.reset = function(n) {
        e.processing = !0, n ? t.resetPassword(n).then(function() {
            console.log("Password reset email sent successfully!"), e.success = !0, e.sentTo = n, o.set("Password reset email is on it's way!", "success")
        }).catch(function(t) {
            o.banner(r(t), "error"), c(), e.processing = !1, i("email")
        }) : (c(), e.processing = !1, o.banner("Please enter an email", "error", !0), i("email"))
    }
}]), app.controller("RegisterAcademyCtrl", ["$scope", "simpleLogin", "$location", "$timeout", "alert", "db", "analytics", "$routeParams", "signup", function(e, t, n, a, o, i, r, c, s) {
    e.success = !1, e.viewAnimation = "fade";
    var l = c.key;
    e.newMember = i.getNewAcademyMember(l), e.newMember.$loaded().then(function() {
        e.loaded = !0, e.newMember.email ? console.log("Account exists") : e.doesNotExist = !0
    }), e.signupWithGoogle = function() {
        t.loginWithGoogle().then(function(t) {
            var n = t.user.providerData[0];
            console.log(t.user.uid), e.pixel = i.getPixel(t.user.uid), e.onboarding = i.getOnboarding(t.user.uid);
            var a = i.getAccount(t.user.uid);
            return a.$loaded().then(function() {
                return a = s.initializeAccount(a, n), a.customer_id = e.newMember.customerId, a.planId = "academy", a.active = !0, console.log("loaded account"), a.$save()
            })
        }).then(function() {
            return e.pixel.$loaded().then(function() {
                return console.log("loaded pixel"), e.pixel.init = !0, e.pixel.active = !0, e.pixel.$save()
            })
        }).then(function() {
            return e.onboarding.$loaded().then(function() {
                return console.log("loaded onboarding"), e.onboarding.state = "complete", e.onboarding.$save()
            })
        }).then(function() {
            n.path("/dashboard")
        }).catch(function(e) {
            console.log(e);
            var t = e || "There was an error. Please contact support in the chat";
            o.banner(t, "error")
        })
    }
}]), app.controller("SignUpCtrl", ["$scope", "simpleLogin", "$q", "$location", "$timeout", "$routeParams", "alert", "db", "signup", "facebook", "focus", "analytics", "cookies", "api", "intercomSvc", "checkoutSvc", function(e, t, n, a, o, i, r, c, s, l, u, p, d, f, m, h) {
    e.loading = !0, e.viewAnimation = "fade", e.newUser = {}, u("name");
    var g;
    d.get("location") ? (g = JSON.parse(d.get("location")), console.log("Get location")) : f.geolocate().then(function(e) {
        g = e.data, d.set("location", JSON.stringify(g)), console.log("Set location")
    }).catch(console.log);
    var v = function() {
        e.shake = !0, o(function() {
            e.shake = !1
        }, 500)
    };
    i.id ? (e.plan = c.getPlan(i.id), e.plan.$loaded().then(function() {
        e.plan = !!(e.plan.price || e.plan.code || e.plan.trial_period) && e.plan, console.log("plan set to:", e.plan.code), e.loading = !1
    })) : e.loading = !1;
    var b = d.get("promo"),
        y = null;
    i.promocode ? y = i.promocode : b && (y = b), y && function(e) {
        return !/[~`!#$%\^&*+=\\[\]\\';,\/{}|\\":<>\?]/g.test(e)
    }(y) && function(e) {
        return -1 == e.indexOf(" ")
    }(y) ? (console.log("Check promo:", y), e.promo = c.getPromo(y), e.promo.$loaded().then(function() {
        e.promo.init ? console.log("P: Exists") : console.log("P: Nope")
    })) : console.log("Invalid Promo:", y);
    var w = function(n) {
        switch (n) {
            case "facebook":
                return t.loginWithFacebook().then(function(t) {
                    var n = t.user;
                    return e.pixel = c.getPixel(t.user.uid), e.account = c.getAccount(t.user.uid), n
                });
            case "password":
                return t.createAccount(e.newUser.email, e.newUser.password).then(function(t) {
                    return e.pixel = c.getPixel(t.uid), e.account = c.getAccount(t.uid), t
                });
            case "google":
            default:
                return t.loginWithGoogle().then(function(t) {
                    var n = t.user.providerData[0];
                    return e.pixel = c.getPixel(t.user.uid), e.account = c.getAccount(t.user.uid), n
                })
        }
    };
    i.email && (e.newUser.email = i.email, m.boot({
        app_id: "k3mxasvj",
        email: i.email
    }), p.addUserProperties({
        email: i.email
    }), p.track("NewLead", {
        homepageConversion: !0
    }), l.track("Lead")), e.signup = function(t) {
        if ("password" == t) {
            var n;
            if (e.newUser.displayName ? e.newUser.email ? e.newUser.password || (v(), u("password"), n = "password") : (v(), u("email"), n = "email") : (v(), u("name"), n = "name"), n) return void r.banner("Please enter your " + n, "success", !0)
        }
        w(t).then(function(t) {
            return e.account.$loaded().then(function() {
                function n(t) {
                    var n = d.get(t);
                    n && (e.utmTags[t] = n)
                }
                if (p.setUserId(e.account.$id), !e.account.init) {
                    e.account.init = !0, e.account.email = t.email || e.newUser.email, e.account.displayName = t.displayName || e.newUser.displayName, e.account.firstName = e.account.displayName.split(" ")[0], e.account.lastName = e.account.displayName.split(" ").slice(-1).pop(), e.account.created = (new Date).getTime(), e.account.photoURL = t.photoURL, e.plan && (e.account.planId = e.plan.code), l.track("CompleteRegistration"), p.track("NewLead"), m.boot({
                        app_id: "k3mxasvj",
                        email: e.account.email,
                        user_id: e.account.$id,
                        name: e.account.displayName,
                        created_at: Math.floor(e.account.created / 1e3)
                    }), _.has(e.promo, "init") && (e.account.promo = e.promo.$id, _.set(e.account, ["products", e.account.promo], {
                        timestamp: e.account.created,
                        type: "promo"
                    })), e.utmTags = {}, n("utm_source"), n("utm_medium"), n("utm_campaign"), n("utm_term"), n("utm_content"), e.utmTags != {} && (e.account.segmentation = e.utmTags);
                    var a = d.get("proofHistory");
                    if (a) try {
                        a = JSON.parse(a), Object.assign(e.account.segmentation, a)
                    } catch (e) {}
                    e.account.segmentation && (e.account.$save(), m.update({
                        segmentation: e.account.segmentation
                    }), f.trackSegmentation("lead", e.account, e.account.segmentation))
                }
                h.trackConversionToWebhook(e.account);
                try {
                    LeadDyno.recordLead(e.account.email, {
                        first_name: e.account.firstName,
                        last_name: e.account.lastName
                    }, function() {
                        console.log("LD: true")
                    })
                } catch (e) {
                    console.log(e)
                }
                return e.promo && e.promo.trial_period && (e.account.trial_period = e.promo.trial_period), e.account.$save().then(function() {
                    return console.log("Save Account"), t.uid
                })
            })
        }).then(function() {
            return e.pixel.$loaded().then(function() {
                return e.pixel.init = !0, e.pixel.active = !0, e.pixel.$save().then(function() {
                    return !0
                })
            })
        }).then(function() {
            a.path("/o-install")
        }).catch(function(e) {
            r.banner(_.get(e, "message", "There was an error. Please contact support in the chat"), "error", !0, 5e3), v()
        })
    }
}]);
var billing = angular.module("app.billing", ["firebase"]);
billing.run(["$http", "$templateCache", function(e, t) {
        e.get("templates/billing/default-payment-method/default-payment-method.template.html", {
            cache: t
        })
    }]),
    function(e, t) {
        "function" == typeof define && define.amd ? define(["angular", "chart.js"], t) : "object" == typeof exports ? module.exports = t(require("angular"), require("chart.js")) : e.tcAngularChartjs = t(e.angular, e.Chart)
    }(this, function(e, t) {
        function n(e) {
            return new e
        }

        function a(e) {
            return new e("line")
        }

        function o(e) {
            return new e("bar")
        }

        function i(e) {
            return new e("horizontalbar")
        }

        function r(e) {
            return new e("radar")
        }

        function c(e) {
            return new e("polararea")
        }

        function s(e) {
            return new e("pie")
        }

        function l(e) {
            return new e("doughnut")
        }

        function u(e) {
            return new e("bubble")
        }

        function p() {
            return function(n) {
                function a(a, i, r) {
                    var c, s = i[0].getContext("2d"),
                        l = !1,
                        u = !1,
                        p = !1,
                        d = null;
                    for (var f in r) "chartLegend" === f ? l = !0 : "chart" === f ? p = !0 : "autoLegend" === f && (u = !0);
                    a.$on("$destroy", function() {
                        c && "function" == typeof c.destroy && c.destroy()
                    }), a.click && (i[0].onclick = function(e) {
                        var t = {
                            chartEvent: e,
                            element: c.getElementAtEvent(e),
                            elements: c.getElementsAtEvent(e),
                            dataset: c.getDatasetAtEvent(e)
                        };
                        a.click({
                            event: t
                        })
                    }), a.$watch("[data, options, plugins]", function(r) {
                        if (r && a.data) {
                            c && "function" == typeof c.destroy && c.destroy();
                            var f = n || a.type;
                            if (!f) throw "Error creating chart: Chart type required.";
                            f = o(f), c = new t(s, {
                                type: f,
                                data: e.copy(a.data),
                                options: a.options,
                                plugins: a.plugins
                            }), l && (a.legend = c.generateLegend()), u && (d && d.remove(), e.element(i[0]).after(c.generateLegend()), d = e.element(i[0]).next()), p && (a.chart = c), c.resize()
                        }
                    }, !0)
                }

                function o(e) {
                    switch (e.toLowerCase()) {
                        case "polararea":
                            return "polarArea";
                        case "horizontalbar":
                            return "horizontalBar";
                        default:
                            return e
                    }
                }
                return {
                    restrict: "A",
                    scope: {
                        data: "=chartData",
                        options: "=chartOptions",
                        plugins: "=chartPlugins",
                        type: "@chartType",
                        legend: "=?chartLegend",
                        chart: "=?chart",
                        click: "&chartClick"
                    },
                    link: a
                }
            }
        }

        function d() {
            function e(e, t) {
                e.$watch("legend", function(e) {
                    e && t.html(e)
                }, !0)
            }
            return {
                restrict: "A",
                scope: {
                    legend: "=?chartLegend"
                },
                link: e
            }
        }
        return n.$inject = ["TcChartjsFactory"], a.$inject = ["TcChartjsFactory"], o.$inject = ["TcChartjsFactory"], i.$inject = ["TcChartjsFactory"], r.$inject = ["TcChartjsFactory"], c.$inject = ["TcChartjsFactory"], s.$inject = ["TcChartjsFactory"], l.$inject = ["TcChartjsFactory"], u.$inject = ["TcChartjsFactory"], e.module("tc.chartjs", []).directive("tcChartjs", n).directive("tcChartjsLine", a).directive("tcChartjsBar", o).directive("tcChartjsHorizontalbar", i).directive("tcChartjsRadar", r).directive("tcChartjsPolararea", c).directive("tcChartjsPie", s).directive("tcChartjsDoughnut", l).directive("tcChartjsBubble", u).directive("tcChartjsLegend", d).factory("TcChartjsFactory", p), p
    }), app.controller("CheckoutCtrl", ["$scope", "api", "$location", "alert", "analytics", "checkoutSvc", "$routeParams", "STRIPE_PK", "facebook", "intercomSvc", function(e, t, n, a, o, i, r, c, s, l) {
        e.viewAnimation = "fade", e.checkout = i.data, e.loaded = !0, e.cred = {
            email: r.email
        }, Stripe.setPublishableKey(c), e.$watch("user", function(t, n) {
            t && (t.displayName ? e.name = {
                firstName: t.displayName.split(" ")[0],
                lastName: t.displayName.split(" ").slice(-1).pop()
            } : e.name = null)
        }), r.email && (l.boot({
            app_id: "k3mxasvj",
            email: r.email
        }), o.addUserProperties({
            email: r.email
        }), o.track("NewLead", {
            homepageConversion: !0
        }), s.track("Lead"), i.trackConversionToWebhook({
            email: r.email
        }))
    }]);
var checkout = angular.module("app.checkout", []);
checkout.run(["$http", "$templateCache", function(e, t) {}]), angular.module("app.checkout").factory("checkoutSvc", ["$routeParams", "authSvc", "db", "intercomSvc", "facebook", "analytics", "cookies", "api", "adwords", "alert", "customerSvc", function(e, t, n, a, o, i, r, c, s, l, u) {
    function p() {
        return r.get("location") ? new Promise(function(e, t) {
            return JSON.parse(r.get("location"))
        }) : c.geolocate().then(function(e) {
            return e.data
        }).catch(console.log)
    }

    function d(e) {
        console.log("TrackConversionToWebhook()"), p().then(function(t) {
            var a = {
                type: "webhook.custom",
                integration_id: "-KsFzRmWhPHnA8FteSCi",
                account_id: "he16ui4hXZOQOZYALliQJi2qSJE2",
                timestamp: (new Date).getTime(),
                ip: t.ip || null,
                data: {
                    first_name: e.firstName || null,
                    email: e.email,
                    photo: e.photoURL || null,
                    city: t.city || null,
                    state: t.region_code || null,
                    country: t.country_name || null
                }
            };
            return n.trackWebhookConversion(a)
        })
    }

    function f(e) {
        return e.$save().then(function() {
            return e
        })
    }

    function m(e) {
        var t = n.getOnboarding(b.uid);
        return t.state = "complete", t.$save().then(function() {
            return e
        })
    }

    function h(e) {
        var t = n.getCustomerData(b.uid);
        return t.data = e, t.id = e.id, t.$save().then(function() {
            return !0
        })
    }

    function g(e) {
        var t = n.getCustomerIndex(e.customer_id);
        return t.$loaded().then(function() {
            return t.$value = e.$id, t.$save().then(function() {
                return e
            })
        })
    }
    var v, b, y, w, k = function(e) {
            return e.$loaded().then(function() {
                return e.init = !0, e.active = !0, e.$save().then(function() {
                    return !0
                })
            })
        },
        $ = function(t, n) {
            function s(e) {
                var t = r.get(e);
                t && (l[e] = t)
            }
            if (t && t.init) return Promise.resolve();
            t.init = !0, t.email = n.email, t.displayName = n.displayName || null, t.firstName = n.firstName || null, t.lastName = n.lastName || null, t.phone = n.phoneNumber, t.created = (new Date).getTime(), t.photoURL = n.photoURL, t.planId = "basic", o.track("CompleteRegistration"), i.track("NewLead"), a.boot({
                app_id: "k3mxasvj",
                email: t.email,
                user_id: t.$id,
                name: t.displayName,
                created_at: Math.floor(t.created / 1e3)
            }), _.set(t, ["products", e.id], {
                timestamp: t.created,
                type: "promo"
            });
            var l = {};
            return s("utm_source"), s("utm_medium"), s("utm_campaign"), s("utm_term"), s("utm_content"), l != {} && (t.segmentation = l, a.update({
                segmentation: l
            }), c.trackSegmentation("lead", t, l)), t.$save()
        };
    return {
        trackConversionToWebhook: d,
        setCredentials: function(e) {
            e && (v = e)
        },
        setUser: function(e) {
            e && (b = e)
        },
        getUser: function() {
            return b ? Promise.resolve(b) : v ? t.authenticate("emailSignup", v) : Promise.reject("Please enter account information")
        },
        activateAccount: function(e) {
            return b = e, w = n.getPixel(e.uid), y = n.getAccount(e.uid), y.$loaded().then(function() {
                return d(e), $(y, e)
            }).then(function() {
                return k(w)
            }).then(function() {
                return y
            })
        },
        createStripeCustomer: function(t, n) {
            return u.newCustomer({
                email: t.email,
                token: n,
                account_id: b.uid,
                plan: t.planId || "basic",
                trial_period: t.trial_period || 14,
                name: t.displayName,
                promo: e.id
            }).then(function(e) {
                return t.customer_id = e.data.id, t.active = !0, f(t).then(g).then(m).then(function() {
                    return h(e.data)
                }).then(function() {
                    return o.track("Purchase", {
                        value: 29,
                        currency: "USD"
                    }), s.newTrialConversion(), i.track("NewTrial"), i.addUserProperties({
                        plan: t.planId,
                        trial_period: t.trial_period || 14
                    }), i.trackRevenue(e.data.id, t.planId, 29), !0
                })
            })
        },
        data: {
            video_id: "k6yHZ1UfUYM",
            mainHeader: "Try Proof FREE for 14 Days",
            subHeader: "AND Get Conversion Secrets as a Free Bonus!",
            label: "Traffic Training Discount For Proof Members",
            termsOfService: "Pay $0.00 today, then after 14 days plans start as low as $29/mo depending on amount of visitors to your site. Cancel anytime - no funny business :-)",
            savings: "Save $500",
            oldPrice: 5e4,
            totalTime: 36e4,
            offerTitle: "One-Time Offer",
            type: "Bonus Training",
            logo: "https://useproof.s3.amazonaws.com/turbo1/Web_Image_2017-07-17_17-14-56.png",
            imgBenefits: "https://useproof.s3.amazonaws.com/turbo1/fbadsBenefits.png",
            btnContent: "Get Started for FREE",
            testimonials: [{
                rating: "assets/img/starRating.svg",
                name: "David Schloss",
                quote: "Hell yes! 30 of my 40 clients use Proof and their conversions are exponentially better.",
                img: "https://images.clickfunnels.com/7f/4f2030a32c11e7a0bc37c4a84a54e7/18194237_1048719948595233_6927125918919160167_n.jpg"
            }],
            summary: !0,
            products: [{
                highlight: !0,
                label: "Free 14-Day Trial",
                title: "Proof",
                description: "Trusted by over 3,000 businesses to increase their conversion rates."
            }, {
                label: "+ Free Bonus",
                title: "Conversion Secrets",
                description: "Get access to over a dozen trainings taught by top conversion experts walking you through, click-by-click, how to setup, launch, and optimize a profitable funnel. These advanced trainings paired with Proof will truly give you the resources to build high converting pages and sales funnels that turn clicks into paying customers.",
                rating: !0,
                img: "assets/img/conversion-secrets.png",
                features: [{
                    title: "10+ Conversions Trainings"
                }, {
                    title: "Pre-Built Funnel Templates"
                }, {
                    title: "Conversion Tracking Spreadsheet"
                }, {
                    title: "Expert CRO Tools"
                }, {
                    title: "Design Conversion Training"
                }, {
                    title: "Copywriting Conversion Training"
                }, {
                    title: "Foundation of Optimization"
                }, {
                    title: "Winning Funnel Framework"
                }]
            }]
        }
    }
}]);
var components = angular.module("app.components", []);
components.run(["$http", "$templateCache", function(e, t) {
    e.get("templates/components/switch/switch.template.html", {
        cache: t
    }), e.get("templates/components/input/input.template.html", {
        cache: t
    }), e.get("templates/components/notificationSample/notificationSample.template.html", {
        cache: t
    })
}]), angular.module("app.api").factory("customerSvc", ["$http", "apiUrl", function(e, t) {
    return {
        getCustomer: function(n) {
            var a = t + "/customer";
            return firebase.auth().currentUser.getIdToken().then(function(t) {
                var o = {
                    token: t,
                    account_id: n
                };
                return e.get(a, o)
            })
        },
        newCustomer: function(n) {
            var a = t + "/customer/new";
            return firebase.auth().currentUser.getIdToken().then(function(t) {
                return e.post(a, n)
            })
        },
        updateCard: function(n, a, o) {
            var i = t + "/customer/updateCard";
            return firebase.auth().currentUser.getIdToken().then(function(t) {
                var r = {
                    token: t,
                    source: o,
                    account_id: a,
                    customer_id: n
                };
                return e.patch(i, r)
            })
        },
        addOto: function(n, a, o) {
            var i = t + "/customer/addOto";
            return firebase.auth().currentUser.getIdToken().then(function(t) {
                return e.post(i, {
                    token: t,
                    account_id: a,
                    customer_id: n,
                    oto_id: o
                })
            })
        }
    }
}]), app.controller("DashboardCtrl", ["$scope", "user", "db", "video", "version", "intercomSvc", "promptSvc", "plansSvc", function(e, t, n, a, o, i, r, c) {
    function s(t) {
        e.video = a.load(t, 0), e.$on("youtube.player.paused", function(n, a) {
            e.onboarding[t] = e.onboarding[t] || {}, e.onboarding[t].watched = !0, e.onboarding.$save()
        }), e.$on("youtube.player.ended", function(n, a) {
            e.onboarding[t] = e.onboarding[t] || {}, e.onboarding[t].watched = !0, e.onboarding.$save()
        })
    }
    i.update({
        app_version: o
    }), e.account = n.getAccount(t.uid), e.onboarding = n.getOnboarding(t.uid), e.account.$loaded().then(function() {
        return e.onboarding.$loaded()
    }).then(function() {
        e.loaded = !0;
        e.onboarding.AKhhkUIzDr8 = e.onboarding.AKhhkUIzDr8 || {}, s("AKhhkUIzDr8"), e.showVideo = !e.onboarding.AKhhkUIzDr8.dismissed
    }), e.videoPlayer, e.dismiss = function(t) {
        e.videoPlayer.stopVideo(), e.showVideo = !1, e.onboarding[t].dismissed = !0, e.onboarding.$save()
    }
}]);
var domains = angular.module("app.domains", ["selector", "angular-md5"]);
domains.factory("URI", function() {
    return window.URI
}), domains.run(["$rootScope", "$http", "$templateCache", "domainSvc", "moment", function(e, t, n, a, o) {
    t.get("templates/domains/directives/url-input/url-input.template.html", {
        cache: n
    }), t.get("templates/domains/directives/url-input/selector.template.html", {
        cache: n
    }), t.get("templates/domains/directives/url-input/item-create.template.html", {
        cache: n
    }), t.get("templates/domains/directives/url-input/item-default.template.html", {
        cache: n
    }), t.get("templates/domains/directives/url-input/group-default.template.html", {
        cache: n
    }), t.get("templates/domains/directives/url-input/selected-item.template.html", {
        cache: n
    }), t.get("templates/domains/directives/url-input/selector.template.html", {
        cache: n
    }).then(function(e) {
        n.put("selector/selector.html", e.data)
    })
}]);
var notification = angular.module("app.notification", []);
notification.run(["$http", "$templateCache", function(e, t) {
    e.get("templates/notification/new/new.template.html", {
        cache: t
    }), e.get("templates/notification/shared/progress/progress.template.html", {
        cache: t
    }), e.get("templates/notification/shared/nav/nav.template.html", {
        cache: t
    }), e.get("templates/notification/steps/capture/capture.template.html", {
        cache: t
    }), e.get("templates/notification/steps/display/display.template.html", {
        cache: t
    }), e.get("templates/notification/steps/message/message.template.html", {
        cache: t
    }), e.get("templates/notification/steps/customize/customize.template.html", {
        cache: t
    })
}]), angular.module("app.notification").factory("notificationSvc", ["db", "webhookBaseUrl", "analytics", function(e, t, n) {
    return {
        updatePixelSettings: function(e) {
            return firebase.database().ref("proofs").child(e).once("value", function(t) {
                var n = {
                    trackDomains: null,
                    showHotStreaks: null
                };
                return t.forEach(function(e) {
                    e.val().active && (e.val().showVisitorsDomain && (n.trackDomains = !0), e.val().hotStreaksDomain && (n.showHotStreaks = !0))
                }), firebase.database().ref("pixels").child(e).update(n)
            })
        },
        getWebhookName: function(e) {
            return {
                clickfunnels: "Clickfunnels",
                infusionsoft: "Infusionsoft",
                clickbank: "Clickbank",
                custom_webhook: "Custom"
            }[e]
        },
        getWebhookBaseUrl: function(e, n) {
            return {
                clickfunnels: t + "cf/" + e + "/",
                infusionsoft: t + "is/" + e + "/",
                clickbank: t + "cb/" + e + "/",
                custom_webhook: t + "cw/" + e + "/"
            }[n]
        },
        saveUrlFilter: function(t, n, a) {
            var o = n.key,
                i = e.getUrlFilters(t);
            return i.$loaded().then(function() {
                return i[o] = a, i.$save().then(function() {
                    return !0
                })
            })
        },
        prepForLaunch: function(e) {
            var t = (new Date).getTime(),
                a = {
                    modified: t,
                    created: e.created || t,
                    active: !0,
                    name: e.name,
                    hideMobile: e.hideMobile || null,
                    showTopMobile: e.showTopMobile || null,
                    showPositionRight: e.showPositionRight || null,
                    watchDOM: e.watchDOM || null,
                    spaCompatibility: e.spaCompatibility || null
                };
            e.showAN && (a.showAN = !0, a.action_blurb = e.action_blurb, a.activityAge = e.activityAge ? parseInt(e.activityAge) : null, a.activityLimit = e.activityLimit ? parseInt(e.activityLimit) : null, a.activityMinimum = e.activityMinimum ? parseInt(e.activityMinimum) : null, a.mapsOnly = e.mapsOnly || null, a.customImage = e.customImage || null, a.customImagePath = e.customImagePath || null, a.hideOwnConversion = e.hideOwnConversion || null, a.hideAnon = e.hideAnon || null, a.customImageFallback = e.customImageFallback || null, a.restartActivityList = e.restartActivityList || null, e.activityNotifications = e.activityNotifications || {}, a.activityNotifications = {
                doNotRecycle: e.activityNotifications.doNotRecycle || null
            }), e.showVisitors && (a.showVisitors = e.showVisitors || null, a.showVisitorsDomain = e.showVisitorsDomain || null, a.visitorDoNotRecycle = e.visitorDoNotRecycle || null, a.visitorType = e.visitorType || null, a.visitorThreshold = e.visitorThreshold || null), e.showHotStreaks && (n.track("Enable HotStreaks"), a.showHotStreaks = !0, a.hotStreaks = {
                period: _.get(e, "hotStreaks.period", null),
                type: _.get(e, "hotStreaks.type", null),
                msg: _.get(e, "hotStreaks.msg", null),
                peopleName: _.get(e, "hotStreaks.peopleName", null),
                doNotRecycle: _.get(e, "hotStreaks.doNotRecycle", null),
                threshold: _.get(e, "hotStreaks.threshold", null)
            }), e.customTiming && (a.delay = e.delay ? parseInt(e.delay) : null, a.showFor = e.showFor ? parseInt(e.showFor) : null, a.spacing = e.spacing ? parseInt(e.spacing) : null), e.languageOverride && (a.language = {
                someone: _.get(e, "language.someone", null),
                from: _.get(e, "language.from", null),
                time: _.get(e, "language.time", null)
            });
            var o = {
                active: !0
            };
            return e.webhook ? (a.integration_id = e.integration_id, a.integration_type = e.integration_type) : e.advancedCaptureMatch ? (a.capture_match = e.capture_match, a.capture_match_type = e.capture_match_type, o.capture_match = e.capture_match, o.capture_match_type = e.capture_match_type) : (a.captureUrls = e.captureUrls, o.captureUrls = e.captureUrls), e.advancedDisplayMatch ? (a.match = e.match, a.match_type = e.match_type, o.match = e.match, o.match_type = e.match_type) : (o.displayUrls = e.displayUrls, a.displayUrls = e.displayUrls), e.watchDOM && (o.watchDOM = e.watchDOM), {
                notification: a,
                urlFilter: o
            }
        },
        setUrlFilter: function(e, t) {
            return t.active = !0, e.captureUrls && (t.captureUrls = e.captureUrls), e.displayUrls ? t.displayUrls = e.displayUrls : (t.match = e.match, t.match_type = e.match_type), e.watchDOM && (t.watchDOM = e.watchDOM), t.$save(), t
        },
        validateDraft: function(e, t) {
            var n = {
                list: [],
                count: 0,
                exist: !1,
                add: function(e, t, n, a) {
                    return this.list.push({
                        step: e,
                        msg: t,
                        type: n || "error",
                        meta: a
                    }), this.exist = !0, n && "error" != n || this.count++, this
                }
            };
            if (t && !_.has(e, "name") && (n.add("staging", "Your notification is missing an internal name"), focus("staging")), e.webhook ? e.integration_id && e.integration_type || n.add("capture", "You have not selected a webhook") : e.advancedCaptureMatch || e.captureUrls && e.captureUrls.length || n.add("capture", "Missing a capture URL"), e.advancedDisplayMatch ? e.match && e.match_type || n.add("display", "Missing a display URL and/or match type") : e.displayUrls && e.displayUrls.length || n.add("display", "Missing a display URL"), e.showAN || e.showHotStreaks || e.showVisitors || n.add("message", "Please select at least one type of notification to display"), e.showAN && !_.has(e, "action_blurb") && n.add("message", "Your recent activity notification is missing a message"), _.get(e, "urlData")) {
                var a = {},
                    o = {};
                for (var i in e.urlData) {
                    var r = e.urlData[i];
                    for (var c in r) {
                        var s = r[c];
                        Math.abs(moment().diff(s.lastViewed, "hours")) > 24 && (a[c] = s), _.get(s, "pageviews") || (o[c] = s)
                    }
                }
                _.size(a) && (n.suggestPixelInstall = !0, 1 == _.size(a) ? n.add("capture", "You have 1 url that has not been detected in the last 24hrs", "info", a) : n.add("capture", "You have " + _.size(a) + " urls that have not been detected in the last 24hrs", "info", a)), _.size(o) && (n.suggestPixelInstall = !0, 1 == _.size(o) ? n.add("capture", "You have 1 url that has never been detected.", "warning", o) : n.add("capture", "You have " + _.size(o) + " urls that have never been detected.", "warning", o))
            }
            return !!n.exist && n
        },
        getConversionImage: function(e, t) {
            var n = "https://useproof.s3.amazonaws.com/turbo1/defaultImageSquare.svg";
            if (e.mapsOnly) var a = t.map,
                o = n;
            else var a = t.photo,
                o = n;
            return e.customImage ? e.customImageFallback ? a || e.customImage : e.customImage : a || o
        }
    }
}]), app.controller("OTOCtrl", ["$scope", "video", "user", "db", "customerSvc", "$location", "alert", "analytics", "facebook", "$interval", "$routeParams", function(e, t, n, a, o, i, r, c, s, l, u) {
    e.viewAnimation = "fade";
    var p = u.id;
    e.account = a.getAccount(n.uid), e.account.$loaded().then(function() {
        e.loaded = !0, e.account.offers = e.account.offers || {}, e.account.offers[p] = e.account.offers[p] || {
            startTime: (new Date).getTime()
        }, e.account.$save();
        var n = e.account.offers[p].startTime;
        e.oto = {
            video_id: "k6yHZ1UfUYM",
            mainHeader: "You're almost ready...",
            subHeader: "Watch this short video before you get started with Proof",
            title: "Facebook Ads Mastery",
            logo: "https://useproof.s3.amazonaws.com/turbo1/Web_Image_2017-07-17_17-14-56.png",
            label: "Traffic Training Discount For Proof Members",
            description: "Step By Step Guide To Creating And Scaling Profitable Facebook Campaigns For Sales Funnels, Lead Generation, Webinars and More.",
            savings: "Save $50",
            price: 4700,
            oldPrice: 9900,
            totalTime: 36e4,
            offerTitle: "One-Time Offer",
            type: "Bonus Training",
            itemsSold: 2107,
            imgBenefits: "https://useproof.s3.amazonaws.com/turbo1/fbadsBenefits.png"
        }, e.oto.totalTime = e.oto.totalTime || 36e4, e.oto.endTime = e.oto.endTime || n + e.oto.totalTime, e.video = t.load(e.oto.video_id, 1);
        var a = !1;
        l(function() {
            var t = (new Date).getTime(),
                o = !(!e.account.products || !e.account.products[p]);
            e.progress = n < t && !o ? (t - n) / e.oto.totalTime * 100 : 100, i.path() == "/oto/" + u.id && (moment().isAfter(e.oto.endTime) && !e.oto.paused ? (e.closed = !0, a || r.banner("The offer has expired!", null, !0), a = !0) : o && (e.closed = !0, a || r.banner("You have already captured this bonus!", "error", !0), a = !0))
        }, 50)
    }), e.pauseTimer = function() {
        e.oto.paused = !0;
        var t = (new Date).getTime();
        e.oto.timeLeft = e.oto.endTime - t, e.$broadcast("timer-stop")
    }, e.resumeTimer = function() {
        e.oto.paused = !1;
        var t = (new Date).getTime();
        e.oto.endTime = t + e.oto.timeLeft, e.$broadcast("timer-start")
    }, e.$watch("paymentModal", function(t) {
        !1 === t && e.resumeTimer()
    }), e.videoPlayer, e.noThanks = function() {
        e.videoPlayer.stopVideo(), i.path("/dashboard"), r.banner("Welcome to Proof! Watch the video below to get started!", "success", !0)
    }, e.addToOrder = function() {
        e.paymentProcessing = !0, e.oto.btnContent = "Processing", o.addOto(e.account.customer_id, e.account.$id, "fbads").then(function(t) {
            e.account.products = e.account.products || {}, e.account.products.fbads = {
                timestamp: (new Date).getTime()
            }, firebase.database().ref("billing_stats").child(e.account.$id).latestCharge = (new Date).getTime(), e.account.$save(), c.track("Purchased OTO", {
                title: "FB Ads Mastery"
            }), s.track("Purchase", {
                value: 47,
                currency: "USD"
            }), r.banner("Woohoo! Check your email for your training login details", "success", !0), i.path("/dashboard"), e.videoPlayer.stopVideo()
        }).catch(function(t) {
            e.paymentProcessing = !1, e.oto.btnContent = "Add To My Order";
            var t = _.get(t, "msg", "There was a problem reaching the server. Please try again.");
            r.banner(t, "error", !0), e.paymentModal = !0, e.pauseTimer()
        })
    }
}]);
var oto = angular.module("app.oto", ["ngSanitize"]);
oto.run(["$http", "$templateCache", function(e, t) {
    e.get("templates/oto/oto.template.html", {
        cache: t
    })
}]);
var plans = angular.module("app.plans", []);
plans.run(["$http", "$templateCache", function(e, t) {
    e.get("templates/plans/plan/plan.template.html", {
        cache: t
    }), e.get("templates/plans/change/change.template.html", {
        cache: t
    }), e.get("templates/plans/cancel/cancel.template.html", {
        cache: t
    })
}]), angular.module("app.plans").factory("plansSvc", ["planFeatures", "planPrices", "planTiers", function(e, t, n) {
    function a(e) {
        if (e) {
            var t = e.indexOf("_");
            return -1 == t ? e : e.substr(0, t)
        }
    }

    function o(e) {
        for (var t in n)
            for (var a in n[t])
                if (e == n[t][a]) return t
    }

    function i(n) {
        var i = [],
            r = a(n),
            c = o(r);
        i.push(t[r].traffic.toLocaleString() + " Unique Visitors");
        var s = t[r].domains,
            l = 1 != s ? "s" : "";
        i.push(s + " Domain" + l);
        for (var u in e) e[u].tier <= c && i.push(e[u].name);
        return i
    }
    return {
        getPlanName: a,
        getTier: o,
        getFeatureList: i
    }
}]), app.controller("SidebarCtrl", ["$rootScope", "$scope", "$location", "simpleLogin", "$firebaseAuth", "db", "pixel", "version", "analytics", "intercomSvc", "$timeout", function(e, t, n, a, o, i, r, c, s, l, u) {
    function p(e) {
        for (var t = !1, a = 0; a < e.length; a++) - 1 !== n.path().indexOf(e[a]) && (t = !0);
        return t
    }

    function d(e) {
        e && (m = e.uid, i.getLastPageview(m, function(e) {
            u(function() {
                t.pixelInstalled = !!e
            }, 10)
        }), i.getActionTimestamp(m, "clickedCC", function(e) {
            u(function() {
                e || (t.promoteConversionClub = !0)
            }, 10)
        }), t.trackAction = function(e) {
            i.trackActionTimestamp(m, e).then(function() {
                console.log("tracked")
            })
        }, t.account = i.getAccount(m), t.account.$watch(function() {
            t.academyMember = !(!t.account || !t.account.planId || -1 == t.account.planId.indexOf("academy") && !_.get(t.account, "products.academy.timestamp", !1))
        }), t.account.$loaded().then(function() {
            h(m), t.$on("$locationChangeStart", function(e) {
                h(m), l.update()
            })
        }));
        var n = ["/start", "/o-confirm", "/o-install", "/o-plans", "/oto/fbads"];
        p(n) ? (t.hideBrand = !0, t.hideVersion = !0) : (t.hideBrand = !1, t.hideVersion = !1), t.$on("$locationChangeSuccess", function(e) {
            p(n) ? (t.hideBrand = !0, t.hideVersion = !0) : (t.hideBrand = !1, t.hideVersion = !1)
        })
    }
    var f, m, h = function(e) {
            var a = g.$getAuth();
            a && (f = i.getOnboarding(e), f.$loaded().then(function() {
                switch (f.state) {
                    case "payment-info":
                        p(["/o-confirm"]) || n.path("/o-confirm");
                        break;
                    case "choose-plan":
                        p(["/o-plans"]) || n.path("/o-plans");
                        break;
                    case "delinquent":
                        p(["/update-payment"]) || n.path("/update-payment");
                        break;
                    case "complete":
                        p(["/o-install", "/o-plans", "/o-confirm"]) && n.path("/dashboard");
                        break;
                    case "install-pixel":
                    default:
                        p(["/o-install", "/login/academy", "/login", "/checkout/cs", "/oto/fbads"]) || p(["/start"]) || n.path("/o-install")
                }
            }));
            var o = ["/login", "/signup", "/o-install", "/o-confirm", "/o-plans", "/oto/fbads", "/checkout/cs", "/start"];
            if (a && !p(o) ? (t.sidebar = "templates/sidebar/sidebar.template.html", t.brand_bg = !0) : (t.sidebar = "", t.brand_bg = !1), a && t.account.init && !a.isAnonymous) {
                window.hasOwnProperty("trackJs") && (trackJs.addMetadata("email", t.account.email), trackJs.addMetadata("displayName", t.account.displayName || t.account.first_name || "Unknown")), l.boot({
                    app_id: "k3mxasvj",
                    email: t.account.email,
                    user_id: e,
                    name: t.account.displayName,
                    phone: t.account.phone
                });
                try {
                    FS.identify(e, {
                        displayName: t.account.displayName,
                        email: t.account.email,
                        phone: t.account.phone
                    }), heap.identify(e), heap.addUserProperties({
                        email: t.account.email,
                        name: t.account.displayName || t.account.first_name
                    })
                } catch (e) {}
            }
            window.hasOwnProperty("trackJs") && trackJs.configure({
                userId: e,
                version: c
            })
        },
        g = o(firebase.auth());
    g.$onAuthStateChanged(d), t.signOut = function() {
        e.hideSidebar = !0, a.logout(), n.path("/login")
    }, t.newNotification = function() {
        n.path("/notification/new")
    }, t.getClass = function(e) {
        return n.path().substr(0, e.length) === e ? "active" : ""
    }
}]), angular.module("app.api").factory("subscriptionSvc", ["$http", "apiUrl", function(e, t) {
    return {
        changePlan: function(n, a, o) {
            var i = t + "/v2/subscription/changePlan";
            return firebase.auth().currentUser.getIdToken().then(function(t) {
                var r = {
                    account_id: n,
                    plan_id: a,
                    prev_plan_id: o,
                    token: t
                };
                return e.patch(i, r)
            })
        },
        checkCost: function(n, a, o) {
            var i = t + "/v2/subscription/checkCost";
            return firebase.auth().currentUser.getIdToken().then(function(t) {
                var r = {
                    account_id: n,
                    plan_id: a,
                    prev_plan_id: o,
                    token: t
                };
                return e.patch(i, r)
            })
        },
        applyCoupon: function(n, a) {
            var o = t + "/v2/subscription/applyCoupon";
            return firebase.auth().currentUser.getIdToken().then(function(t) {
                var i = {
                    token: t,
                    account_id: n,
                    coupon_id: a
                };
                return e.patch(o, i)
            })
        },
        getCustomerSubscription: function(n) {
            var a = t + "/v2/subscription";
            return firebase.auth().currentUser.getIdToken().then(function(t) {
                var o = {
                    token: t,
                    account_id: n
                };
                return e.post(a, o)
            })
        },
        reactivatePlan: function(n, a) {
            var o = t + "/v2/subscription/reactivate";
            return firebase.auth().currentUser.getIdToken().then(function(t) {
                var i = {
                    token: t,
                    account_id: n,
                    plan_id: a
                };
                return e.post(o, i)
            })
        },
        extendTrial: function(n) {
            var a = t + "/v2/subscription/extendTrial";
            return firebase.auth().currentUser.getIdToken().then(function(t) {
                var o = {
                    token: t,
                    account_id: n
                };
                return e.post(a, o)
            })
        }
    }
}]), app.controller("SettingsCtrl", ["$scope", "$firebaseObject", "$firebaseArray", "user", "$timeout", "$routeParams", "$http", "simpleLogin", "$location", "alert", "focus", "subscriptionSvc", "STRIPE_PK", "db", "intercomSvc", function(e, t, n, a, o, i, r, c, s, l, u, p, d, f, m) {
    function h() {
        e.loading = !1, e.account.plan = e.account.plan || {};
        var t = e.account.planId || e.account.plan.code || "basic";
        firebase.database().ref("plans").child(t).once("value", function(t) {
            e.currentPlan = t.val(), e.currentPlanId = t.key, e.isAnnual = !(!e.currentPlanId || -1 == e.currentPlanId.indexOf("_annual"))
        })
    }
    e.uid = a.uid;
    var g = function(t) {
        e.authProviders = {
            "google.com": {
                title: "Google Login",
                id: "google"
            },
            "facebook.com": {
                title: "Facebook Login",
                id: "facebook"
            },
            password: {
                title: "Username & Password",
                edit: !0,
                id: "password"
            }
        }, t.providerData.forEach(function(t) {
            e.authProviders[t.providerId].active = !0, e.authProviders[t.providerId].email = t.email
        }, this)
    };
    g(a), e.$on("proof.plans.select", function(t, n) {
        e.$broadcast("proof.plans.selected", n)
    }), e.linkNewAccount = function(e) {
        switch (e) {
            case "google":
                c.linkWithGoogle().then(function(e) {
                    e.credential;
                    c.getUser().then(function(e) {
                        l.banner("Your Google account has been linked to Proof", "success", !0), g(e)
                    })
                }).catch(function(e) {
                    console.log(e), o(function() {
                        l.banner(e.message, "error", !0)
                    }, 0)
                });
                break;
            case "facebook":
                c.linkWithFacebook().then(function(e) {
                    e.credential;
                    c.getUser().then(function(e) {
                        l.banner("Your Facebook account has been linked to Proof", "success", !0), g(e)
                    })
                }).catch(function(e) {
                    console.log(e), o(function() {
                        l.banner(e.message, "error", !0)
                    }, 0)
                })
        }
    }, e.unlinkAccount = function(e) {
        switch (e) {
            case "google":
                c.unlinkProvider("google.com").then(function() {
                    l.banner("Your Google account has been disconnected", "neutral", !0), g(a)
                });
                break;
            case "facebook":
                c.unlinkProvider("facebook.com").then(function() {
                    c.getUser().then(function(e) {
                        l.banner("Your Facebook account has been disconnected", "neutral", !0), g(e)
                    })
                })
        }
    }, e.order = "visitors,domains,notifications,timing,support", Stripe.setPublishableKey(d), e.user = a, e.loading = !0, e.config = {
        modals: []
    };
    var v = firebase.database().ref("accounts").child(a.uid);
    e.account = f.getAccount(a.uid), e.account.$watch(h), e.account.$loaded().then(h), e.$on("EXTENDED_TRIAL", function() {
        s.path("/settings")
    });
    var b = f.getPixel(a.uid),
        y = v.child("cards");
    e.cards = n(y), v.child("defaultCard").on("value", function(n) {
        n.exists() && (e.card = t(y.child(n.val())))
    }), e.modal = function(t) {
        t ? (e.config.modals = [], e.config.modals[t] = !0,
            u(t)) : e.config.modals = []
    }, e.updateEmail = function(t) {
        t && t != e.account.email ? c.updateEmail(t).then(function() {
            e.account.email = t, e.account.$save().then(function(n) {
                e.modal(), l.banner("Email successfully changed to " + t, "success")
            })
        }).catch(function(e) {
            e.message ? l.banner(e.message, "error", !0) : l.banner(e, "error")
        }) : l.banner("Please enter a new email address", "error", !0)
    }, e.updatePassword = function(t) {
        t ? c.updatePassword(t).then(function() {
            e.modal(), l.banner("Password changed successfully!", "success")
        }).catch(function(e) {
            l.banner(e.message, "error", !0)
        }) : l.banner("Please input a new password", "error", !0)
    }, e.updatePhone = function(t) {
        t ? (e.account.phone = t, e.account.$save().then(function() {
            e.modal(), l.banner("New phone has been saved", "success")
        })) : l.banner("Please provide a new phone number", "error", !0)
    }, e.saveAccount = function() {
        e.account.$save().then(function(t) {
            e.modal(), l.banner("Your changes have been saved!", "success"), m.update({
                name: e.account.firstName + " " + e.account.lastName,
                phone: e.account.phone || null,
                company: e.account.company || null,
                street: e.account.street || null,
                city: e.account.city || null,
                state: e.account.state || null,
                zipcode: e.account.zipcode || null,
                country: e.account.country || null
            })
        }).catch(function(e) {
            l.banner("Error saving: " + e, "error", !0)
        })
    }, e.reactivateAccount = function(t) {
        e.loading = !0, p.reactivatePlan(e.account.$id, t).then(function() {
            e.account.cancelAccount = null, e.account.$save(), b.active = !0, b.$save(), o(function() {
                e.loading = !1, s.path("/dashboard")
            })
        })
    }, e.setPlan = function(t) {
        e.account.planId = t, e.account.$save(), s.path("/update-payment")
    }
}]), angular.module("app.settings", []);
var traffic = angular.module("app.traffic", []);
traffic.run(["$http", "$templateCache", function(e, t) {
    e.get("templates/traffic/list/list.template.html", {
        cache: t
    })
}]), angular.module("app.traffic").factory("trafficSvc", ["$rootScope", function(e) {
    return {
        getRecentPageviews: function(t) {
            new Date(moment().subtract(30, "minutes").format("YYYY-MM-DD HH:mm:ss"));
            return e.firebaseSecondary.firestore().collection("pixelPageviews").doc(t).collection("pageviews").orderBy("timestamp", "desc").limit(20)
        },
        getVisitor: function(t, n) {
            return e.firebaseSecondary.firestore().collection("pixelVisitors").doc(t).collection("visitors").doc(n).get()
        }
    }
}]);
var trialbar = angular.module("app.trial", ["app.services", "app.accounts"]);
trialbar.run(["$http", "$templateCache", function(e, t) {
        e.get("templates/trial/trialbar/trialbar.template.html", {
            cache: t
        }), e.get("templates/trial/trialbar/trialflag.template.html", {
            cache: t
        }), e.get("templates/trial/trialbar/trialflag-else.template.html", {
            cache: t
        })
    }]),
    function(e) {
        var t = e.module("angularEffDrop", ["ng"]),
            n = e.extend;
        t.provider("dropWrapper", [function() {
            var e = "template/eff-drop.html";
            this.setDefaultTemplateUrl = function(t) {
                e = t
            };
            var t = {};
            this.setDefaultTetherOptions = function(e) {
                n(t, e)
            }, this.$get = ["$rootScope", "$compile", "$templateCache", function(n, a, o) {
                return function(i) {
                    function r() {
                        d && c(), d = new Drop(v)
                    }

                    function c() {
                        d && d.isOpened() && (d.destroy(), d = void 0)
                    }

                    function s(e) {
                        "function" == typeof e && e(h, !0), r(), d.isOpened() || d.open()
                    }

                    function l(e) {
                        "function" == typeof e && e(h, !1), c()
                    }

                    function u(e) {
                        d && d.isOpened() ? l(e) : s(e)
                    }

                    function p() {
                        return !(!d || !d.isOpened())
                    }
                    i = i || {};
                    var d, f = i.templateUrl || e,
                        m = i.template || o.get(f),
                        h = i.scope || n.$new(),
                        g = a(m)(h),
                        v = {
                            target: i.target[0],
                            content: g[0],
                            position: i.position || "bottom left",
                            openOn: i.openOn || void 0,
                            openDelay: i.openDelay || void 0,
                            closeDelay: i.closeDelay || void 0,
                            constrainToWindow: i.constrainToWindow || !0,
                            constrainToScrollParent: i.constrainToScrollParent || !0,
                            classes: i.classes || "drop-theme-arrows-bounce-dark",
                            remove: !1,
                            tetherOptions: i.tetherOptions || t
                        };
                    if (null == v.content || void 0 == v.content) throw console.error("content of (", f || m, ")", v.content), "'templateUrl' or 'template' parameter is incorrect !";
                    return h.$on("$destroy", l), r(), {
                        open: s,
                        close: l,
                        toogle: u,
                        isOpened: p
                    }
                }
            }]
        }]), t.provider("effDropFactory", [function() {
            this.$get = ["dropWrapper", function(t) {
                return function(n, a) {
                    return {
                        restrict: "EA",
                        scope: {
                            content: "@" + n
                        },
                        link: function(n, o, i) {
                            var r = t(e.extend({
                                target: o,
                                scope: n
                            }, a));
                            $(o).hover(function() {
                                n.$apply(r.open)
                            }, function() {
                                n.$apply(r.close)
                            })
                        }
                    }
                }
            }]
        }]), t.directive("effDrop", ["effDropFactory", function(e) {
            return e("effDrop")
        }]), t.run(["$templateCache", function(e) {
            e.put("template/eff-drop.html", '<div class="eff-drop">{{content}}</div>')
        }])
    }(angular), angular.module("simpleLogin", ["firebase"]).factory("requireUser", ["simpleLogin", "$q", function(e, t) {
        return function() {
            return e.getUser().then(function(e) {
                return e || t.reject({
                    authRequired: !0,
                    code: "AUTH_REQUIRED"
                })
            })
        }
    }]).factory("simpleLogin", ["$firebaseAuth", "createProfile", "analytics", "$window", "intercomSvc", function(e, t, n, a, o) {
        function i() {
            s.user = r.$getAuth(), angular.forEach(c, function(e) {
                e(s.user)
            })
        }
        var r = e(firebase.auth()),
            c = [],
            s = {
                user: null,
                getUser: function() {
                    return r.$waitForSignIn()
                },
                login: function(e, t) {
                    return r.$signInWithEmailAndPassword(e, t)
                },
                loginAnonymously: function() {
                    return r.$signInAnonymously()
                },
                loginWithFacebook: function() {
                    return r.$signInWithPopup("facebook")
                },
                linkWithFacebook: function() {
                    var e = new firebase.auth.FacebookAuthProvider;
                    return r.$getAuth().linkWithPopup(e)
                },
                loginWithGoogle: function() {
                    return r.$signInWithPopup("google")
                },
                linkWithGoogle: function() {
                    var e = new firebase.auth.GoogleAuthProvider;
                    return r.$getAuth().linkWithPopup(e)
                },
                unlinkProvider: function(e) {
                    return r.$getAuth().unlink(e)
                },
                loginWithGoogleRedirect: function() {
                    return r.$signInWithRedirect("google")
                },
                loginWithToken: function(e) {
                    return r.$signInWithCustomToken(e)
                },
                auth: function() {
                    return r
                },
                logout: function() {
                    return angular.forEach(a.openFirebaseConnections, function(e) {
                        e.$destroy()
                    }), o.shutdown(), n.track("Logged out"), r.$signOut()
                },
                createAccount: function(e, n) {
                    return r.$createUserWithEmailAndPassword(e, n).then(function() {
                        return s.login(e, n)
                    }).then(function(n) {
                        return t(n.uid, e).then(function() {
                            return n
                        })
                    })
                },
                updatePassword: function(e) {
                    return r.$updatePassword(e)
                },
                resetPassword: function(e) {
                    return r.$sendPasswordResetEmail(e)
                },
                updateEmail: function(e) {
                    return r.$updateEmail(e)
                },
                removeUser: function(e, t) {
                    return r.$removeUser({
                        email: e,
                        password: t
                    })
                },
                watch: function(e, t) {
                    s.getUser().then(function(t) {
                        e(t)
                    }), c.push(e);
                    var n = function() {
                        var t = c.indexOf(e);
                        t > -1 && c.splice(t, 1)
                    };
                    return t && t.$on("$destroy", n), n
                }
            };
        return r.$onAuthStateChanged(i), i(), s
    }]).factory("createProfile", ["$q", "$timeout", function(e, t) {
        return function(n, a) {
            var o = firebase.database().ref("accounts/" + n),
                i = e.defer();
            return o.update({
                email: a
            }, function(e) {
                t(function() {
                    e ? i.reject(e) : i.resolve(o)
                })
            }), i.promise
        }
    }]), angular.module("simpleLoginTools", []).service("waitForAuth", ["$rootScope", "$q", "$timeout", function(e, t, n) {
        function a(t) {
            e.auth && (e.auth.error = t instanceof Error ? t.toString() : null);
            for (var a = 0; a < i.length; a++) i[a]();
            n(function() {
                o.resolve()
            })
        }
        var o = t.defer(),
            i = [];
        return i.push(e.$on("$firebaseSimpleLogin:login", a)), i.push(e.$on("$firebaseSimpleLogin:logout", a)), i.push(e.$on("$firebaseSimpleLogin:error", a)), o.promise
    }]).config(["$provide", function(e) {
        e.decorator("ngCloakDirective", ["$delegate", "waitForAuth", function(e, t) {
            var n = e[0],
                a = n.compile;
            return n.compile = function(e, o) {
                t.then(function() {
                    a.call(n, e, o)
                })
            }, e
        }])
    }]).directive("ngShowAuth", ["$rootScope", function(e) {
        function t(e, t) {
            var n = e.$eval(t);
            return "string" == typeof n || angular.isArray(n) || (n = t), "string" == typeof n && (n = n.split(",")), n
        }

        function n(e, t) {
            var n = !1;
            return angular.forEach(t, function(t) {
                return t === e && (n = !0, !0)
            }), n
        }

        function a(e) {
            if (!e.length) throw new Error("ng-show-auth directive must be login, logout, or error (you may use a comma-separated list)");
            return angular.forEach(e, function(e) {
                if (!n(e, ["login", "logout", "error"])) throw new Error('Invalid state "' + e + '" for ng-show-auth directive, must be one of login, logout, or error')
            }), !0
        }
        var o = "logout";
        return e.$on("$firebaseSimpleLogin:login", function() {
            o = "login"
        }), e.$on("$firebaseSimpleLogin:logout", function() {
            o = "logout"
        }), e.$on("$firebaseSimpleLogin:error", function() {
            o = "error"
        }), {
            restrict: "A",
            link: function(i, r, c) {
                function s() {
                    var e = n(o, l);
                    setTimeout(function() {
                        r.toggleClass("ng-cloak", !e)
                    }, 0)
                }
                var l = t(i, c.ngShowAuth);
                a(l), s(), e.$on("$firebaseSimpleLogin:login", s), e.$on("$firebaseSimpleLogin:logout", s), e.$on("$firebaseSimpleLogin:error", s)
            }
        }
    }]), app.controller("TriggerViewCtrl", ["$scope", "simpleLogin", "$firebaseObject", "db", "user", "$location", "focus", "alert", "$routeParams", function(e, t, n, a, o, i, r, c, s) {
        e.trigger = a.getWebhook(o.uid, s.id), e.trigger.$loaded().then(function() {
            "clickfunnels" == e.trigger.type ? e.webhook_url = "http://webhook.proofapi.com/cf/" + o.uid + "/" + s.id : "infusionsoft" == e.trigger.type && (e.webhook_url = "http://webhook.proofapi.com/is/" + o.uid + "/" + s.id), e.loaded = !0
        }), e.delete = function() {
            e.trigger.$remove().then(function() {
                i.path("/triggers"), c.set("Trigger deleted", "success")
            })
        }, e.triggers = a.getWebhooks(o.uid), e.triggers.$loaded().then(function() {
            e.loaded = !0
        }), e.open = function(e) {
            i.path("/triggers/view/" + e)
        }, e.new = function() {
            i.path("/triggers/new")
        }, e.isActive = function(e) {
            return s.id == e ? "active" : ""
        }, e.save = function() {
            e.trigger.$save().then(function() {
                c.set("Your changes were saved", "success")
            })
        }
    }]), app.controller("TriggersNewCtrl", ["$scope", "simpleLogin", "user", "$location", "focus", "db", "alert", function(e, t, n, a, o, i, r) {
        e.saveNew = function() {
            i.newWebhook(n.uid, e.newWebhook, "clickfunnels").then(function(e) {
                a.path("/triggers/view/" + e), r.set("New integration has been created", "success")
            })
        }, e.triggers = i.getWebhooks(n.uid), e.triggers.$loaded().then(function() {
            e.loaded = !0
        }), e.open = function(e) {
            a.path("/triggers/view/" + e)
        }, e.new = function() {
            a.path("/triggers/new")
        }, e.isActive = function(e) {
            return "/triggers/new" == e ? "active" : ""
        }
    }]), app.controller("TriggersCtrl", ["$scope", "simpleLogin", "user", "$location", "focus", "alert", "db", function(e, t, n, a, o, i, r) {
        e.triggers = r.getWebhooks(n.uid), e.triggers.$loaded().then(function() {
            e.loaded = !0
        }), e.open = function(e) {
            a.path("/triggers/view/" + e)
        }, e.new = function() {
            a.path("/triggers/new")
        }
    }]), angular.module("app.academy").controller("AcademyBrowseCtrl", ["$scope", "lessonsSvc", "breadcrumbsSvc", "focus", "$location", "$filter", "analytics", function(e, t, n, a, o, i, r) {
        function c(e, t) {
            for (var n = [], a = 0; a < e.length; a += t) n.push(e.slice(a, a + t));
            return n
        }
        e.lessons = t.getLessons(), e.viewAnimation = "fade", a("query"), r.track("View Conversion Club"), e.query = o.search().q, e.search = function(e) {
            o.path("/academy").search("q", e), e.length > 3 && r.track("Search Conversion Club", {
                query: e
            })
        }, e.lessons.$loaded().then(function() {
            var t = i("filter")(e.lessons, {
                category: "academy"
            });
            e.chunkedData = c(t, 3)
        })
    }]), angular.module("app.academy").controller("AcademyViewCtrl", ["$scope", "lessonsSvc", "breadcrumbsSvc", "$routeParams", "$sce", "video", function(e, t, n, a, o, i) {
        function r(e, t) {
            for (var n = [], a = 0; a < e.length; a += t) n.push(e.slice(a, a + t));
            return n
        }
        e.viewAnimation = "fade", e.path = n.urlToPath(a.lesson);
        var c = _.last(e.path);
        e.lesson = t.getLesson(c), e.lesson.$loaded().then(function() {
            e.lessons = t.getCategory(e.lesson.$id), e.chunkedData = r(e.lessons, 3), e.lesson.video && (e.video = i.load(e.lesson.video, 0)), "academy" !== e.lesson.category && (e.category = t.getLesson(a.lesson))
        })
    }]), angular.module("app.billing").directive("defaultPaymentMethod", ["customerSvc", "simpleLogin", function(e, t) {
        return {
            restrict: "E",
            transclude: !0,
            templateUrl: "templates/billing/default-payment-method/default-payment-method.template.html",
            link: function(n) {
                function a() {
                    t.getUser().then(function(t) {
                        e.getCustomer(t.uid).then(function(e) {
                            if (e.data.success) {
                                if (n.customer = e.data.customer, _.has(n.customer, "default_source")) {
                                    var t = _.get(n.customer, "default_source");
                                    n.defaultSource = _.find(n.customer.sources.data, {
                                        id: t
                                    })
                                }
                            } else n.error = e.data.error;
                            n.$apply()
                        })
                    })
                }
                a(), n.$on("app.card.update", a)
            }
        }
    }]), angular.module("app.billing").directive("proofBillingHistory", ["$window", "$timeout", "customerSvc", "alert", "simpleLogin", function(e, t, n, a, o) {
        return {
            restrict: "AC",
            link: function(t) {
                o.getUser().then(function(o) {
                    n.getCustomer(o.uid).then(function(n) {
                        n.data.success ? (t.customer = n.data.customer, console.log("CUSTOMER", t.customer), _.has(t.customer, "id") && (t.cid = _.get(t.customer, "id"), t.handler = e.AccountDock.configure({
                            key: "ad_acco_07ybz8k12csdnjtv",
                            customer: _.get(t.customer, "id")
                        }), t.showBillingHistory = function(e) {
                            a.set("Opening your account history", "success"), t.handler.open()
                        })) : (t.error = n.data.error, t.showBillingHistory = function() {
                            console.error(t.error)
                        })
                    })
                })
            }
        }
    }]), angular.module("app.checkout").directive("checkoutPayment", ["alert", "checkoutSvc", "$location", function(e, t, n) {
        return {
            restrict: "E",
            templateUrl: "templates/checkout/payment/payment.template.html",
            scope: {
                data: "=",
                nameInput: "=",
                processing: "="
            },
            replace: !0,
            link: function(a) {
                a.onSubmit = function(e, t) {
                    console.log("processing!"), a.processing = !0, a.paymentSuccess = !1, t || (a.processing = !1)
                }, a.handleStripe = function(o, i, r) {
                    if (e.banner("Setting up your account...", "neutral", !0), a.processing = !0, !i.error) return t.getUser().then(t.activateAccount).then(function(e) {
                        return e.customer_id ? void 0 : t.createStripeCustomer(e, i.id)
                    }).then(function() {
                        e.banner("Your account has been activated!", "success", !0), n.path("/oto/fbads")
                    }).catch(function(t) {
                        console.error(t), a.processing = !1;
                        var n = "There was a problem connecting to the server. Please Try again.";
                        _.has(t, "message") ? n = t.message : _.has(t, "data.msg") ? n = t.data.msg : "string" == typeof t.data ? n = t.data : "string" == typeof t && (n = t), e.banner(n, "error", !0)
                    });
                    console.log(i.error);
                    var c = "Unable to add this card, please try again.";
                    i.error.message ? c = i.error.message : "string" == typeof i.error && (c = i.error), e.banner(c, "error", !0), a.processing = !1
                }
            }
        }
    }]), angular.module("app.checkout").directive("productDetails", function() {
        return {
            restrict: "E",
            templateUrl: "templates/checkout/productDetails/productDetails.template.html",
            scope: {
                data: "="
            },
            replace: !0,
            link: function(e, t, n) {}
        }
    }), angular.module("app.checkout").directive("checkoutRegister", ["authSvc", "alert", "db", "checkoutSvc", function(e, t, n, a) {
        return {
            restrict: "E",
            templateUrl: "templates/checkout/register/register.template.html",
            replace: !0,
            scope: {
                cred: "="
            },
            link: function(n, o, i) {
                n.authenticated = !1, n.authenticate = function(o, i) {
                    e.authenticate(o, i).then(function(e) {
                        n.user = e, a.setUser(e), n.authenticated = !0
                    }).catch(function(e) {
                        console.error(e), t.banner(_.get(e, "message", "Registration has failed: an unknown issue occured"), "error", !0), n.$apply()
                    })
                }, n.logout = function() {
                    return e.logout().then(function() {
                        console.log("Logged out"), n.authenticated = !1, n.user = !1
                    })
                }, n.updateCred = function(e) {
                    a.setCredentials(e)
                }, e.getUser().then(function(e) {
                    e && (n.user = e, a.setUser(e), n.authenticated = !0)
                })
            }
        }
    }]), angular.module("app.checkout").directive("testimonial", function() {
        return {
            restrict: "E",
            templateUrl: "templates/checkout/testimonial/testimonial.template.html",
            scope: {
                data: "="
            },
            replace: !0
        }
    }), app.controller("AlertCtrl", ["$scope", "$timeout", "alert", function(e, t, n) {
        function a(n) {
            n.msg ? (e.showbanner = !1, t.cancel(o), t(function() {
                e.banner = n
            }, 10), t(function() {
                e.showbanner = !0
            }, 20), o = t(function() {
                e.showbanner = !1
            }, n.expiry)) : e.closeBanner()
        }
        e.alertService = n, e.alerts = [];
        var o;
        e.$watch("alertService.data", function(n, o, i) {
            if (n.msg) switch (n.banner) {
                case !0:
                    a(n);
                    break;
                default:
                    e.alerts.push(n), t(function() {
                        e.alerts.shift()
                    }, n.expiry)
            }
        }), e.closeBanner = function() {
            e.showbanner = !1, t.cancel(o)
        }
    }]), angular.module("app.components", []).directive("cardUpdateModal", ["alert", "customerSvc", "db", "$firebaseArray", "$firebaseObject", "simpleLogin", "STRIPE_PK", function(e, t, n, a, o, i, r) {
        return {
            restrict: "E",
            scope: {
                openModal: "="
            },
            templateUrl: "templates/components/cardUpdateModal/cardUpdateModal.template.html",
            controller: ["$scope", function(c) {
                Stripe.setPublishableKey(r), i.getUser().then(function(e) {
                    if (c.user = e, e) {
                        var t = firebase.database().ref("accounts").child(e.uid);
                        c.account = n.getAccount(e.uid);
                        var i = t.child("cards");
                        c.cards = a(i), t.child("defaultCard").on("value", function(e) {
                            e.exists() && (c.card = o(i.child(e.val())))
                        });
                        var t = firebase.database().ref("accounts").child(e.uid);
                        c.account = n.getAccount(e.uid);
                        var i = t.child("cards");
                        c.cards = a(i), t.child("defaultCard").on("value", function(e) {
                            e.exists() && (c.card = o(i.child(e.val())))
                        })
                    }
                }), c.updateCard = function(t, n) {
                    t.preventDefault(), c.paymentProcessing = !0, e.set("Please wait...")
                }, c.cancelNewCard = function() {
                    c.paymentProcessing = !1, c.openModal = !1
                }, c.updateCardCallback = function(n, a) {
                    e.set("Your card is being updated", "neutral", 0), a.error ? (console.log("STRIPE ERR", a), a.error.message ? e.banner(a.error.message, "error", !0) : e.banner(a.error, "error", !0), c.paymentProcessing = !1) : t.updateCard(c.account.customer_id, c.account.$id, a.id).then(function(t) {
                        c.paymentProcessing = !1, c.cards.$add({
                            id: a.card.id,
                            processor: "stripe",
                            brand: a.card.brand,
                            last4: a.card.last4,
                            exp_month: a.card.exp_month,
                            exp_year: a.card.exp_year
                        }).then(function(e) {
                            c.account.defaultCard = e.key, c.card = c.cards[e.key]
                        }).finally(function() {
                            c.account.token = t.config.data.token, c.account.$save(), c.$broadcast("app.card.update")
                        }), e.banner("Your new card has been added.", "success"), c.openModal = !1
                    }).catch(function(t) {
                        console.log(t);
                        var n = _.get(t, "data", t),
                            a = _.get(n, "msg", "There was a problem reaching the server");
                        c.paymentProcessing = !1, e.banner(a, "error", !0)
                    })
                }
            }]
        }
    }]), angular.module("app.components").directive("dashboardChart", ["simpleLogin", "$timeout", function(e, t) {
        return {
            restrict: "E",
            scope: {
                days: "=",
                report: "@"
            },
            templateUrl: "templates/components/dashboardChart/dashboardChart.template.html",
            link: function(t, n, a) {
                e.getUser().then(function(e) {
                    firebase.database().ref("reports/" + t.report).child(e.uid).orderByKey().limitToLast(t.days || 30).once("value", function(e) {
                        if (e.val()) {
                            var n = e.val();
                            t.conversionLabels = [], t.tooltipLabels = [], t.conversionVals = [];
                            for (var a = t.days - 1; a >= 0; a--) {
                                var o = moment().subtract(a, "days");
                                t.conversionLabels.push(o.format("DD")), t.tooltipLabels.push(o.format("MMM DD")), t.conversionVals.push(n[o.format("YYYY-MM-DD")] || 0)
                            }
                            t.showChart = !0, t.$apply();
                            var i = document.getElementsByClassName("daily-conversions")[0].getContext("2d");
                            t.chart = new Chart(i, {
                                type: "line",
                                data: {
                                    labels: t.conversionLabels,
                                    datasets: [{
                                        data: t.conversionVals,
                                        label: "Conversions",
                                        backgroundColor: "#E8F5E9",
                                        borderColor: "#00C853"
                                    }]
                                },
                                options: {
                                    hover: {
                                        mode: "nearest",
                                        intersect: !0
                                    },
                                    tooltips: {
                                        mode: "index",
                                        intersect: !1,
                                        callbacks: {
                                            title: function(e, n) {
                                                return t.tooltipLabels[e[0].index]
                                            }
                                        }
                                    },
                                    responsive: !0,
                                    maintainAspectRatio: !1,
                                    legend: {
                                        display: !1
                                    },
                                    layout: {
                                        padding: {
                                            top: 10,
                                            bottom: 1,
                                            left: -28,
                                            right: -28
                                        }
                                    },
                                    scales: {
                                        yAxes: [{
                                            ticks: {
                                                beginAtZero: !0,
                                                display: !1
                                            },
                                            gridLines: {
                                                display: !1,
                                                drawBorder: !1
                                            }
                                        }],
                                        xAxes: [{
                                            labels: !1,
                                            gridLines: {
                                                display: !1,
                                                drawBorder: !1
                                            },
                                            ticks: {
                                                fontColor: "#ccc",
                                                fontSize: "11",
                                                maxRotation: 0,
                                                minRotation: 0
                                            }
                                        }]
                                    }
                                }
                            })
                        }
                    })
                })
            }
        }
    }]), angular.module("app.components").directive("drawer", ["$document", "$timeout", function(e, t) {
        return {
            restrict: "EA",
            transclude: !1,
            scope: {
                psOpen: "=?",
                psAutoClose: "@",
                psSide: "@",
                psSpeed: "@",
                psClass: "@",
                psSize: "@",
                psZindex: "@",
                psPush: "@",
                psContainer: "@",
                psKeyListener: "@",
                psBodyClass: "@",
                psClickOutside: "@",
                onopen: "&?",
                onclose: "&?"
            },
            link: function(n, a, o) {
                function i(e) {
                    var t = e.touches && e.touches[0] || e.target;
                    h && m.contains(t) && !f.contains(t) && (h = !1, n.psOpen = !1, n.$apply()), n.psOpen && (h = !0)
                }

                function r(e) {
                    if (d.bodyClass) {
                        var t = d.className + "-body",
                            n = new RegExp(t + "-closed|" + t + "-open");
                        m.className = m.className.replace(n, "");
                        var a = t + "-" + e;
                        " " !== m.className[m.className.length - 1] ? m.className += " " + a : m.className += a
                    }
                }

                function c() {
                    n.psOpen ? "function" == typeof n.onopen && n.onopen()() : "function" == typeof n.onclose && n.onclose()()
                }

                function s() {
                    switch (d.side) {
                        case "right":
                            f.style.width = d.size, f.style.height = "100%", f.style.top = "0px", f.style.bottom = "0px", f.style.right = "0px";
                            break;
                        case "left":
                            f.style.width = d.size, f.style.height = "100%", f.style.top = "0px", f.style.bottom = "0px", f.style.left = "0px";
                            break;
                        case "top":
                            f.style.height = d.size, f.style.width = "100%", f.style.left = "0px", f.style.top = "0px", f.style.right = "0px";
                            break;
                        case "bottom":
                            f.style.height = d.size, f.style.width = "100%", f.style.bottom = "0px", f.style.left = "0px", f.style.right = "0px"
                    }
                }

                function l(t, a) {
                    switch (a.side) {
                        case "right":
                            t.style.right = "-" + a.size, a.push && (m.style.right = "0px", m.style.left = "0px");
                            break;
                        case "left":
                            t.style.left = "-" + a.size, a.push && (m.style.left = "0px", m.style.right = "0px");
                            break;
                        case "top":
                            t.style.top = "-" + a.size, a.push && (m.style.top = "0px", m.style.bottom = "0px");
                            break;
                        case "bottom":
                            t.style.bottom = "-" + a.size, a.push && (m.style.bottom = "0px", m.style.top = "0px")
                    }
                    a.keyListener && e.off("keydown", p), a.clickOutside && e.off("touchend click", i), h = !1, r("closed"), n.psOpen = !1
                }

                function u(t, a) {
                    switch (a.side) {
                        case "right":
                            t.style.right = "0px", a.push && (m.style.right = a.size, m.style.left = "-" + a.size);
                            break;
                        case "left":
                            t.style.left = "0px", a.push && (m.style.left = a.size, m.style.right = "-" + a.size);
                            break;
                        case "top":
                            t.style.top = "0px", a.push && (m.style.top = a.size, m.style.bottom = "-" + a.size);
                            break;
                        case "bottom":
                            t.style.bottom = "0px", a.push && (m.style.bottom = a.size, m.style.top = "-" + a.size)
                    }
                    n.psOpen = !0, a.keyListener && e.on("keydown", p), a.clickOutside && e.on("touchend click", i), r("open")
                }

                function p(e) {
                    27 === (e.keyCode || e.which) && (l(f, d), t(function() {
                        n.$apply()
                    }))
                }
                var d = {};
                d.side = n.psSide || "right", d.speed = n.psSpeed || "0.25", d.size = n.psSize || "700px", d.zindex = n.psZindex || 1e3, d.className = n.psClass || "drawer", d.push = "true" === n.psPush, d.container = n.psContainer || !1, d.keyListener = "true" === n.psKeyListener, d.bodyClass = n.psBodyClass || !0, d.clickOutside = "false" !== n.psClickOutside, d.autoClose = n.psAutoClose || !0, d.push = d.push && !d.container, a.addClass(d.className);
                var f, m, h = !1;
                if (m = d.container ? document.getElementById(d.container) : document.body, r("closed"), f = a[0], "div" !== f.tagName.toLowerCase() && "pageslide" !== f.tagName.toLowerCase()) throw new Error("Pageslide can only be applied to <div> or <pageslide> elements");
                if (0 === f.children.length) throw new Error("You need to have content inside the <pageslide>");
                angular.element(f.children), m.appendChild(f), f.style.zIndex = d.zindex, f.style.position = "fixed", f.style.transitionDuration = d.speed + "s", f.style.webkitTransitionDuration = d.speed + "s", f.style.height = d.size, f.style.transitionProperty = "top, bottom, left, right", d.push && (m.style.position = "absolute", m.style.transitionDuration = d.speed + "s", m.style.webkitTransitionDuration = d.speed + "s", m.style.transitionProperty = "top, bottom, left, right"), d.container && (f.style.position = "absolute", m.style.position = "relative", m.style.overflow = "hidden"), f.addEventListener("transitionend", c), s(), n.$watch("psOpen", function(e) {
                    e ? u(f, d) : l(f, d)
                }), n.$watch("psSize", function(e, t) {
                    t !== e && (d.size = e, s())
                }), n.$on("$destroy", function() {
                    f.parentNode === m && (d.clickOutside && e.off("touchend click", i), m.removeChild(f)), f.removeEventListener("transitionend", c)
                }), d.autoClose && (n.$on("$locationChangeStart", function() {
                    l(f, d)
                }), n.$on("$stateChangeStart", function() {
                    l(f, d)
                }))
            }
        }
    }]), angular.module("app.components").directive("featureLock", ["featureLockSvc", "simpleLogin", "$rootScope", "db", function(e, t, n, a) {
        return {
            restrict: "E",
            scope: {
                tier: "=",
                featureName: "@",
                featureId: "@"
            },
            templateUrl: "templates/components/featureLock/featureLock.template.html",
            link: function(o, i, r) {
                o.openPlans = !1;
                var c;
                t.getUser().then(function(t) {
                    c = a.getAccount(t.uid), o.isUnlocked = function() {
                        return e.isUnlocked(o.tier, c.planId)
                    }
                }), o.unlockFeature = function() {
                    n.$broadcast("openPlansDrawer", {
                        id: o.featureId,
                        name: o.featureName,
                        tier: o.tier
                    })
                }
            }
        }
    }]), angular.module("app.components").factory("featureLockSvc", ["simpleLogin", "db", "$filter", "planFeatures", "planPrices", "planTiers", "plansSvc", function(e, t, n, a, o, i, r) {
        var c;
        return e.getUser().then(function(e) {
            c = t.getAccount(e.uid)
        }), {
            getFeaturePitch: function(e) {
                return a[e].pitch
            },
            getUpgradePlan: function(e, t) {
                var s = r.getTier(r.getPlanName(c.planId)),
                    l = a[e].tier,
                    u = _.filter(a, function(t, n) {
                        return t.tier <= l && t.tier > s && n != e
                    });
                return u.push({
                    name: n("number")(o[i[l][0]].traffic) + " Unique Monthly Visitors"
                }), u.push({
                    name: o[i[l][0]].domains + " Domains"
                }), {
                    name: i[l][0],
                    price: o[i[l][0]].price,
                    features: u
                }
            },
            isUnlocked: function(e, t) {
                if (e && t) {
                    var n = r.getPlanName(t);
                    for (var a in i)
                        for (var o in i[a])
                            if (n == i[a][o] && a >= e) return !0;
                    return !1
                }
                return !1
            }
        }
    }]), angular.module("app.components").directive("hotStreaksSample", function() {
        return {
            restrict: "E",
            templateUrl: "templates/components/hotStreaksSample/hotStreaksSample.template.html",
            scope: {
                type: "=",
                peopleName: "=",
                msg: "=",
                timeRange: "=",
                count: "=",
                domain: "="
            },
            link: function(e, t, n) {}
        }
    }), angular.module("app.components").directive("proofInput", function() {
        return {
            restrict: "E",
            templateUrl: "templates/components/input/input.template.html",
            scope: {
                label: "@",
                name: "@",
                model: "=",
                ph: "@",
                min: "@",
                type: "@",
                required: "=",
                onChange: "=",
                disabled: "="
            },
            replace: !0
        }
    }), angular.module("app.components").directive("manageWebhooks", ["simpleLogin", "db", "alert", "$timeout", "notificationSvc", function(e, t, n, a, o) {
        return {
            scope: {
                type: "=",
                draft: "="
            },
            templateUrl: "templates/components/manageWebhooks/manageWebhooks.template.html",
            link: function(i, r, c) {
                i.$watch("type", function() {
                    i.type && (i.webhookType = o.getWebhookName(i.type))
                }), i.uid, e.getUser().then(function(e) {
                    i.uid = e.uid, i.type && !i.draft.integration_id && (i.webhooks = t.getWebhooks(i.uid, i.type), i.openDrawer = !0)
                }), i.$watch("type", function(e, n) {
                    i.uid && (i.webhooks = t.getWebhooks(i.uid, i.type)), i.openDrawer = !!i.type
                }), i.deselectWebhookType = function() {
                    i.draft.integration_id || (i.view = "list", i.type = null, i.selectedWebhook = null, i.webhookUrl = null, i.draft.$save())
                }, i.newWebhook = function() {
                    i.view = "new"
                }, i.editWebhook = function(e) {
                    i.view = "edit", i.selectedWebhook = t.getWebhook(i.uid, e);
                    var n = o.getWebhookBaseUrl(i.uid, i.type);
                    i.webhookUrl = n + e
                }, i.saveWebhook = function() {
                    console.log("save"), i.selectedWebhook.$save().then(function() {
                        console.log("saved", i.selectedWebhook.$id), n.banner("Your changes have been saved", "success")
                    })
                }, i.saveNewWebhook = function(e) {
                    e ? i.webhooks.$add({
                        name: e,
                        type: i.type,
                        created: (new Date).getTime()
                    }).then(function(e) {
                        n.banner("Your new webhook has been saved", "success");
                        var a = e.key,
                            r = o.getWebhookBaseUrl(i.uid, i.type);
                        i.webhookUrl = r + a, i.selectedWebhook = t.getWebhook(i.uid, a), i.view = "edit"
                    }) : n.banner("Please enter a name", "error")
                }, i.deleteWebhook = function() {
                    confirm("Are you sure you want to permanently delete this webhook enpoint?") && i.selectedWebhook.$remove().then(function() {
                        a(function() {
                            i.view = "list", i.webhookUrl = null, i.selectedWebhook = null, n.banner("Your webhook have been deleted")
                        }, 10)
                    })
                }, i.backToList = function() {
                    i.view = "list", i.selectedWebhook = null, i.webhookUrl = null
                }, i.webhookIcons = {
                    custom_webhook: "assets/img/integrations/webhooks.svg",
                    clickfunnels: "assets/img/integrations/clickfunnels.png",
                    infusionsoft: "assets/img/integrations/infusionsoft.png"
                }, i.selectWebhook = function(e) {
                    i.selectedWebhook.$save().then(function() {
                        i.openDrawer = !1, i.draft.integration_id = e, i.draft.integration_type = i.type, i.draft.webhookName = i.selectedWebhook.name, i.selectedWebhook = null, i.view = "list", i.draft.$save()
                    })
                }
            }
        }
    }]), angular.module("app.components").directive("notificationSample", function() {
        return {
            restrict: "E",
            templateUrl: "templates/components/notificationSample/notificationSample.template.html",
            scope: {
                location: "=",
                actionBlurb: "=",
                mapsOnly: "=",
                img: "=",
                name: "=",
                activeVisitors: "=",
                activeVisitorCount: "=",
                activeVisitorType: "=",
                activeDomainTracking: "="
            },
            replace: !0,
            link: function(e, t, n) {
                function a(e, t) {
                    return e ? "assets/img/map.png" : t || "assets/img/dave.jpg"
                }

                function o() {
                    e.sampleNotification = {
                        activeVisitors: e.activeVisitors || !1,
                        activeVisitorCount: e.activeVisitorCount || 2,
                        activeVisitorType: e.activeVisitorType || "people",
                        activeTrackType: e.activeDomainTracking ? "site" : "page",
                        name: e.name || "Dave",
                        location: i || "from Annapolis, MD",
                        action_blurb: e.actionBlurb || "Recently joined the Entrepreneur Alliance",
                        photo: a(e.mapsOnly, e.img)
                    }
                }
                var i;
                o(), e.$watch("actionBlurb", function() {
                    e.location && (i = "from " + e.location), o()
                }), e.$watch("mapsOnly", function() {
                    o()
                }), e.$watch("name", function() {
                    o()
                }), e.$watch("location", function() {
                    o()
                }), e.$watch("img", function() {
                    o()
                }), e.$watch("activeVisitorCount", function() {
                    o()
                }), e.$watch("activeVisitorType", function() {
                    o()
                }), e.$watch("activeDomainTracking", function() {
                    o()
                })
            }
        }
    }), angular.module("app.components").directive("pixel", function() {
        return {
            restrict: "E",
            templateUrl: "templates/components/pixel/pixel.template.html",
            scope: {
                format: "@",
                beta: "="
            },
            controller: ["$scope", "simpleLogin", "alert", "pixel", "$timeout", function(e, t, n, a, o) {
                t.getUser().then(function(t) {
                    e.pixel = a(t.uid, e.beta), e.user = t
                }), e.$watch("beta", function(t) {
                    e.user && (e.pixel = a(e.user.uid, e.beta), console.log("beta"))
                }), e.onSuccess = function(t) {
                    e.success = !0, o(function() {
                        e.success = !1
                    }, 2e3), t.clearSelection()
                }
            }]
        }
    }), angular.module("app.components").directive("planUpgradeWindow", ["$rootScope", "featureLockSvc", "subscriptionSvc", "alert", "authSvc", "analytics", "simpleLogin", "db", function(e, t, n, a, o, i, r, c) {
        return {
            restrict: "E",
            templateUrl: "templates/components/planUpgradeWindow/planUpgradeWindow.template.html",
            link: function(r) {
                r.open = !1, r.$watch("open", function(t, n) {
                    0 == t && e.$broadcast("closePlansDrawer")
                }), r.$on("openPlansDrawer", function(e, n) {
                    r.open = !0, r.feature = n, r.feature.pitch = t.getFeaturePitch(n.id), r.plan = t.getUpgradePlan(n.id), r.confirm = !1
                }), r.confirmUpgrade = function() {
                    r.confirm = !0, i.track("Clicked feature lock: confirm upgrade")
                }, r.cancelUpgrade = function() {
                    r.confirm = !1, i.track("Clicked feature lock: cancel upgrade")
                }, r.upgrade = function() {
                    i.track("Clicked feature lock: upgrade"), r.processing = !0, o.getUser().then(function(e) {
                        var t = c.getAccount(e.uid);
                        t.$loaded().then(function() {
                            n.changePlan(e.uid, r.plan.name, t.planId).then(function() {
                                r.open = !1, r.processing = !1, a.banner("Your plan has been upgraded and " + r.feature.name + " has been unlocked", "success", !0), i.track("Upgraded plan with feature lock"), r.$apply()
                            }).catch(function(e) {
                                r.processing = !1, console.error(e);
                                var t;
                                t = _.has(e, "msg") ? e.msg : e, a.banner(t, "error", !0), i.track("Feature lock upgrade failed", t), r.$apply()
                            })
                        })
                    })
                }
            }
        }
    }]), angular.module("app.components").directive("popover", ["popoverSvc", "analytics", "alert", function(e, t, n) {
        return {
            restrict: "A",
            transclude: !0,
            replace: !1,
            templateUrl: "templates/components/popover/popover.template.html",
            scope: {
                align: "@",
                pid: "@",
                hover: "@"
            },
            link: function(a, o, i) {
                function r(t) {
                    a.content = e.getContent(a.pid), a.content ? (a.active = !0, a.$digest(), o.off("click", r), document.body.addEventListener("click", c, !0), s = e.getPosition(o, a.align), o[0].children[1].style.top = s.top, o[0].children[1].style.bottom = s.bottom, o[0].children[1].style.left = s.left, o[0].children[1].style.right = s.right, o[0].children[1].classList.add(a.align)) : console.error("Invalid Popover ID")
                }

                function c(e) {
                    var t = _.filter(e.path, function(e) {
                        return "popoverBody" === e.className
                    });
                    a.active && !t.length && (a.active = !1, a.$digest(), document.body.removeEventListener("click", c, !0), o.on("click", r))
                }
                o[0].classList.add("popoverTrigger"), a.active = !1;
                var s = {};
                o.on("click", r), a.learnMore = function(e) {
                    t.track("Tooltip clicked link", {
                        id: a.pid,
                        title: e.title
                    })
                }, a.vote = function(e, o) {
                    console.log("Vote:", o), t.track("Tooltip vote", {
                        id: a.pid,
                        title: e.title,
                        vote: o
                    }), a.voted = !0, n.banner("Boom! Thanks for the feedback!", "success")
                }
            }
        }
    }]), angular.module("app.components").factory("popoverSvc", ["analytics", function(e) {
        function t(e, t) {
            switch (parent.height = e[0].clientHeight, parent.width = e[0].clientWidth, t) {
                case "leftBottom":
                case "leftTop":
                    return {
                        bottom: "-12px",
                        left: parent.width + 15 + "px"
                    };
                case "topLeft":
                    return {
                        bottom: parent.height + 15 + "px",
                        left: "-12px"
                    };
                case "topRight":
                    return {
                        bottom: parent.height + 15 + "px",
                        right: "-12px"
                    };
                case "bottom":
                    return {
                        top: parent.height + 15 + "px"
                    };
                case "top":
                    return {
                        bottom: parent.height + 15 + "px"
                    };
                case "bottomRight":
                    return {
                        top: parent.height + 15 + "px",
                        right: "-12px"
                    };
                case "bottomLeft":
                default:
                    return {
                        top: parent.height + 10 + "px",
                        left: "-12px"
                    }
            }
        }

        function n(t) {
            var n = a[t] ? a[t] : null;
            return console.log("Open popover:", t), e.track("Open tooltip", {
                id: t,
                title: n.title
            }), n
        }
        var a = {
            CUSTOM_TIMING: {
                title: "Custom Timing",
                content: "We have optimized the timing for highest conversions with the Auto setting. However, in some instances you may want to set your own custom values (all settings are in seconds).",
                link: "https://help.useproof.com/frequently-asked-questions/how-to-change-the-timing-of-my-notifications"
            },
            SELF_NOTIFICATIONS: {
                title: "Disable Self Notifications",
                content: "Your visitors may not want to see their own face displayed in a popup notification. Prevent self notifications by switching the toggle bar to ON.",
                link: "https://help.useproof.com/frequently-asked-questions/how-to-prevent-users-from-seeing-their-own-notification-on-my-website"
            },
            HIDE_ANON: {
                title: "Hide Anonymous Conversions",
                content: "Sometimes we are not able to identify visitors by their email address so we display 'Someone' instead of a firstname. Toggle this on to hide those notifications all together.",
                link: "http://help.useproof.com/frequently-asked-questions/why-are-my-notifications-saying-someone-instead-of-their-first-name"
            },
            RESTART_CYCLE: {
                title: "Restart Cycle on Each Pageview",
                content: "By default your visitors will see the next conversion in the list when they refresh a page or visit the next page on your site.  This forces the cycle to start from the beginning on each page load."
            },
            CUSTOM_IMAGE: {
                title: "Display Custom Image",
                content: "Upload a custom image to be displayed on notifications. Unless set otherwise this will replace user avatars and maps.",
                link: "http://help.useproof.com/frequently-asked-questions/how-to-change-the-appearance-of-my-notification"
            },
            MAPS_ONLY: {
                title: "Display Maps Only",
                content: "Don't want to show user avatars on notifications? No problem! You can toggle this on to always show maps instead.",
                link: "http://help.useproof.com/frequently-asked-questions/how-to-change-the-appearance-of-my-notification"
            },
            AN_DO_NOT_LOOP: {
                title: "Do Not Loop Conversions",
                content: "By default we load x number of conversions on your page and cycle through them.  When all have been displayed we restart at the beginning.  Toggle this on to only show each notification once.",
                link: "http://help.useproof.com/frequently-asked-questions/why-is-the-same-notification-displaying-over-and-over"
            },
            CAPTURE_URL: {
                title: "Set The Capture URL(s)",
                content: "We use the form submission on your page to capture conversions. These URL(s) must have a form on the page with an email input field to successfully capture conversions.",
                link: "http://help.useproof.com/frequently-asked-questions/what-urls-do-i-put-in-the-capture-section"
            },
            DISPLAY_URL: {
                title: "Set The Display URL(s)",
                content: "You can display your campaign on any pages that have the pixel installed.  Make sure these URLs do not overlap with any existing campaigns you have enabled.",
                link: "http://help.useproof.com/frequently-asked-questions/what-urls-do-i-put-in-the-display-section"
            },
            WEBHOOKS: {
                title: "Webhook Integrations",
                content: "Webhook integrations are an alternative method for capturing new conversions that is only recommended if you need to send more information than what is captured automatically by the pixel.",
                link: "http://help.useproof.com/frequently-asked-questions/what-is-a-webhook-integration-and-should-i-use-that-option"
            },
            TOP_MOBILE: {
                title: "Top Of Page On Mobile",
                content: "This will move notifications to the top of the page on mobile devices. This option is often used when notifications are interfering with a form at the bottom of the page."
            }
        };
        return {
            getContent: n,
            getPosition: t
        }
    }]), angular.module("app.components").directive("prompt", function() {
        return {
            restrict: "E",
            scope: {
                global: "@",
                promptId: "@",
                customClass: "@",
                reset: "@",
                callback: "&"
            },
            templateUrl: "templates/components/prompt/prompt.template.html",
            controller: ["$scope", "promptSvc", "promptTemplates", "simpleLogin", "api", function(e, t, n, a, o) {
                function i() {
                    a.getUser().then(function(t) {
                        e.user_id = t.uid, e.template = r[e.promptId], e.promptDraftRef = firebase.database().ref("promptResponses").child(t.uid).child(e.promptId), e.promptDraftRef.once("value").then(function(t) {
                            var n = !1,
                                a = !1;
                            t.val() ? (n = t.val().isDismissed, a = t.val().isComplete, e.promptData = t.val(), e.reset && (e.promptData.currentStep = 0)) : e.promptData = {
                                currentStep: 0,
                                startedTime: (new Date).getTime(),
                                url: window.location.href
                            };
                            var o = (e.promptData.currentStep + 2) / (e.template.sequence.length + 1) * 100;
                            e.progressBarStyle = {
                                width: o + "%"
                            }, console.log(e.progressBarStyle, e.template.sequence.length, e.promptData.currentStep), n || a || (e.showPrompt = !0), e.$apply()
                        })
                    })
                }
                var r = n;
                e.global ? (e.promptSvc = t, e.$watch("promptSvc.data", function(t) {
                    t && t.id && (e.promptId = t.id, e.customClass = t.customClass, e.modal = t.modal, e.reset = t.reset, e.callback = t.callback, i())
                })) : i(), e.nextDialog = function() {
                    var t = e.template.sequence[e.promptData.currentStep].inputKey;
                    if (t && e.promptData.data[t]) {
                        var n = {
                            templateId: e.promptId
                        };
                        n[t] = e.promptData.data[t];
                        var a = e.template.sequence[e.promptData.currentStep].sendTo || e.template.sendTo;
                        a && o.trackPromptResponse(e.user_id, e.promptId, n, a)
                    }
                    e.promptData.currentStep < e.template.sequence.length - 1 ? e.promptData.currentStep++ : (e.promptData.isComplete = !0, e.promptData.completedTime = (new Date).getTime(), e.closePrompt());
                    var i = (e.promptData.currentStep + 2) / (e.template.sequence.length + 1) * 100;
                    e.progressBarStyle = {
                        width: i + "%"
                    }, console.log(e.progressBarStyle, e.template.sequence.length, e.promptData.currentStep), c()
                }, e.prevDialog = function() {
                    e.promptData.currentStep--, c()
                }, e.confirmClick = function(t) {
                    e.promptData.response = t, c(), e.closePrompt()
                }, e.closePrompt = function() {
                    e.showPrompt = !1, e.callback && e.callback(e.promptData)
                }, e.dismissPrompt = function() {
                    e.promptData.isDismissed = !0, c(), e.closePrompt()
                };
                var c = function() {
                    e.promptDraftRef.set(e.promptData), _.each(e.template.sequence, function(t) {
                        if (t.saveTo && e.promptData.data[t.inputKey]) {
                            var n = t.saveTo.replace("{user_id}", e.user_id),
                                a = {};
                            a[t.inputKey] = e.promptData.data[t.inputKey], firebase.database().ref(n).update(a)
                        }
                    })
                }
            }]
        }
    }), angular.module("app.components").factory("promptSvc", ["promptTemplates", function(e) {
        var t = {
            data: {},
            show: function(n, a, o) {
                if (!e.hasOwnProperty(n)) throw 'Error: Could not find template configuration for "' + n + '"';
                t.data = {
                    id: n
                }, Object.assign(t.data, a), o && (t.data.callback = o)
            }
        };
        return t
    }]).constant("promptTemplates", {
        testalert: {
            type: "alert",
            sequence: [{
                text: "Did you get all that?",
                btnText: "Indeed"
            }]
        },
        testinput: {
            type: "input",
            allowDismiss: !0,
            sendTo: ["keen"],
            sequence: [{
                text: "Enter your email",
                inputKey: "email",
                inputType: "email",
                required: !0,
                btnText: "Next",
                sendTo: ["keen"]
            }, {
                text: "Phone #",
                inputKey: "phone",
                inputType: "text",
                backBtn: !0,
                btnText: "Next",
                saveTo: "accounts/{user_id}",
                sendTo: ["slack"]
            }, {
                text: "Age",
                inputKey: "age",
                inputType: "number",
                backBtn: !0,
                btnText: "Next"
            }, {
                text: "Select example",
                inputKey: "selectExample",
                inputType: "select",
                inputOptions: ["Option 1", "Option 2", "Option 3"],
                backBtn: !0,
                btnText: "Next"
            }, {
                text: "Thank you",
                btnText: "Close"
            }]
        },
        testconfirm: {
            type: "confirm",
            sequence: [{
                text: "Are you a human?",
                btnNoText: "No",
                btnYesText: "Yes"
            }]
        },
        completeProfile: {
            type: "input",
            sendTo: ["slack", "keen"],
            headline: "Complete your profile",
            sequence: [{
                text: "Hey there, what is your best phone number?",
                inputKey: "phone",
                label: "Phone Number",
                inputType: "text",
                required: !0,
                btnText: "Next",
                saveTo: "accounts/{user_id}"
            }, {
                text: "What is your company name?",
                inputKey: "company",
                label: "Company Name",
                inputType: "text",
                required: !1,
                btnText: "Next",
                saveTo: "accounts/{user_id}"
            }, {
                text: "What does your business sell?",
                inputKey: "product",
                label: "Product or service",
                inputType: "text",
                required: !1,
                btnText: "Next",
                saveTo: "accounts/{user_id}"
            }, {
                text: "Boom, Thank you!",
                btnText: "Done"
            }]
        }
    }), angular.module("app.components").directive("radioOptions", function() {
        return {
            restrict: "E",
            templateUrl: "templates/components/radioOptions/radioOptions.template.html",
            scope: {
                model: "=",
                options: "=",
                inline: "="
            },
            replace: !0,
            link: function(e, t, n) {
                e.isActive = function(t) {
                    return t === e.model
                }, e.select = function(t) {
                    e.model = t
                }
            }
        }
    }), angular.module("app.components").directive("proofSwitch", function() {
        return {
            restrict: "E",
            templateUrl: "templates/components/switch/switch.template.html",
            scope: {
                prop: "@",
                onChange: "=",
                leftLabel: "@",
                rightLabel: "@",
                offLabel: "@",
                onLabel: "@"
            },
            replace: !0,
            link: function(e, t, n) {
                e.mini = !!n.mini, e.onofflabel = !!n.onofflabel, e.toggle = function() {
                    var t = !_.get(e.onChange, e.prop);
                    _.set(e.onChange, e.prop, t), e.onChange.$save().then(function() {
                        console.log("saved!")
                    }).catch(console.error)
                }, e.getState = function() {
                    return _.get(e.onChange, e.prop)
                }
            }
        }
    }), angular.module("app.domains").factory("domainSvc", ["$firebaseObject", "$firebaseArray", "URI", "md5", "alert", "simpleLogin", function(e, t, n, a, o, i) {
        function r(e) {
            var t = n(e);
            if ("www" == t.subdomain()) {
                var a = t.hostname().split("www.")[1];
                return t.protocol() + "://" + a + t.path()
            }
            return t
        }

        function c(e) {
            if (!e) return !1;
            var t = new n(e),
                a = !!(t.is("url") && t.is("absolute") && t.tld()) && e;
            if (!a) {
                var o = new n("http://" + e),
                    i = o.tld();
                i && i != e || (i = !1), a = !!(o.is("url") && o.is("absolute") && i) && "http://" + e
            }
            return a
        }

        function s(e) {
            var t = n(r(e));
            t.normalize();
            var a = t.path();
            return "/" != a && "/" == a.substr(a.length - 1) ? t.hostname() + a.slice(0, -1) : t.hostname() + a
        }
        var l, u;
        return i.getUser().then(function(e) {
            e && (l = e.uid)
        }), {
            addUrl: function(e, t) {
                var n, i, r = c(e);
                if (r) {
                    n = s(r), i = a.createHash(n);
                    var l = firebase.database().ref("lookup/urls").child(t).child(i);
                    l.child("url").set(n).then(function() {
                        l.child("pageviews").transaction(function(e) {
                            return e || 0
                        })
                    }), firebase.database().ref("lookup/urlsList").child(t).child(i).child("url").set(n)
                } else console.log("Invalid URL"), o.banner("The url you entered is invalid and cannot be used", "error");
                return {
                    url: n || e,
                    isValid: r
                }
            },
            cleanUrl: s,
            validUrl: c,
            getUrls: function(e) {
                return u = firebase.database().ref("lookup/urls").child(e).orderByChild("pageviews").limitToLast(100), t(u)
            },
            getUrl: function(t, n) {
                var a = firebase.database().ref("lookup/urls").child(t).child(n);
                return e(a)
            },
            addDomain: function(e, t) {
                firebase.database().ref("lookup/domainsList").child(e).child(a.createHash(t)).child("domain").set(t)
            }
        }
    }]), app.directive("fileUpload", ["$firebaseStorage", function(e) {
        return {
            restrict: "E",
            transclude: !0,
            scope: {
                path: "@",
                onFileUploaded: "&",
                fileType: "@",
                maxSize: "@",
                square: "@"
            },
            template: '<input type="file" name="file" /><label><ng-transclude></ng-transclude></label>',
            controller: ["$scope", "$firebaseStorage", "simpleLogin", "alert", "$timeout", function(e, t, n, a, o) {
                e.onChange = function(t) {
                    function i(t) {
                        n.getUser().then(function(n) {
                            var a = (new Date).getTime(),
                                o = firebase.storage().ref(e.path).child(n.uid).child(a.toString());
                            e.uploadTask = o.put(t).then(function(t) {
                                e.onFileUploaded({
                                    url: t.downloadURL,
                                    path: t.metadata.fullPath
                                })
                            }).catch(function(e) {
                                console.error("UPLOAD ERROR", e)
                            })
                        })
                    }
                    if (e.fileType && -1 == t[0].type.indexOf(e.fileType)) return void o(function() {
                        a.banner("File type must be an " + e.fileType, "error")
                    });
                    if (e.maxSize && t[0].size > 1024 * e.maxSize) return void o(function() {
                        a.banner("File size must be less than " + e.maxSize + "KB", "error")
                    });
                    if (e.square) {
                        var r = new Image;
                        r.src = window.URL.createObjectURL(t[0]), r.onload = function() {
                            Math.abs(this.width - this.height) > 5 ? o(function() {
                                a.banner("Image must be a square", "error")
                            }) : i(t[0])
                        }
                    } else i(t[0])
                }
            }],
            link: function(e, t, n) {
                t.bind("change", function() {
                    e.onChange(t.children()[0].files)
                })
            }
        }
    }]), app.controller("OnboardingInstallCtrl", ["$scope", "user", "api", "alert", "pixel", "$timeout", "$sce", "db", "$location", "analytics", "intercomSvc", function(e, t, n, a, o, i, r, c, s, l, u) {
        e.pixel = o(t.uid), e.onSuccess = function(t) {
            e.success = !0, i(function() {
                e.success = !1
            }, 2e3), t.clearSelection()
        }, e.helpMe = function() {
            u.showNewMessage("Hi team, I need help installing my pixel and getting setup.")
        };
        var p = c.getPageviews(t.uid);
        p.$watch(function() {
            e.pixelDetected = p.$value > 0, p.$value > 0 && a.banner()
        });
        var d = c.getOnboarding(t.uid),
            f = c.getAccount(t.uid);
        e.nextStep = function() {
            d.$loaded().then(function() {
                return f.$loaded()
            }).then(function() {
                f.planId ? (d.state = "payment-info", d.$save(), s.path("/o-confirm")) : (d.state = "choose-plan", d.$save(), s.path("/o-plans"))
            })
        }, f.$loaded().then(function() {
            e.firstName = f.firstName
        });
        var m = new MobileDetect(window.navigator.userAgent);
        e.isMobile = !!m.mobile()
    }]), app.controller("OnboardingPaymentCtrl", ["$scope", "db", "user", "$location", "customerSvc", "alert", "STRIPE_PK", "analytics", "facebook", "adwords", function(e, t, n, a, o, i, r, c, s, l) {
        function u(e) {
            return e.$save().then(function() {
                return e
            })
        }

        function p(e) {
            return m.state = "complete", m.$save().then(function() {
                return e
            })
        }

        function d(e) {
            var a = t.getCustomerData(n.uid);
            return a.data = e, a.id = e.id, a.$save().then(function() {
                return !0
            })
        }

        function f(e) {
            var n = t.getCustomerIndex(e.customer_id);
            return n.$loaded().then(function() {
                return n.$value = e.$id, n.$save().then(function() {
                    return e
                })
            })
        }
        Stripe.setPublishableKey(r), e.account = t.getAccount(n.uid);
        var m = t.getOnboarding(n.uid);
        e.account.$loaded().then(function() {
            e.myPlan = t.getPlan(e.account.planId || "basic"), e.showEmail = !!e.account.email
        }), e.onSubmit = function(t, n) {
            e.paymentProcessing = !0, e.paymentSuccess = !1, n || (e.paymentProcessing = !1)
        }, e.stripeCallback = function(t, r) {
            if (r.error) {
                var m = "Unable to add this card, please try again.";
                r.error.message ? m = r.error.message : "string" == typeof r.error && (m = r.error), i.banner(m, "error", !0), e.paymentProcessing = !1
            } else o.newCustomer({
                email: e.account.email,
                token: r.id,
                account_id: n.uid,
                plan: e.account.planId || "basic",
                trial_period: e.account.trial_period || e.myPlan.trial_period || 14,
                name: e.account.displayName,
                promo: e.account.promo
            }).then(function(t) {
                e.account.customer_id = t.data.id, e.account.active = !0;
                var n = _.get(t, "data.subscriptions.data.0.id");
                n && (e.account.subscriptionId = n), u(e.account).then(f).then(p).then(function() {
                    return d(t.data)
                }).then(function() {
                    s.track("Purchase", {
                        value: e.myPlan.price,
                        currency: "USD"
                    }), l.newTrialConversion(), c.track("NewTrial"), c.addUserProperties({
                        plan: e.account.planId,
                        trial_period: e.myPlan.trial_period
                    }), c.trackRevenue(t.data.id, e.account.planId, e.myPlan.price), i.banner("Your account has been activated!", "success", !0), a.path("/oto/fbads")
                }).catch(function(n) {
                    e.paymentProcessing = !1;
                    var a = "There was an error setting up your account.  Please contact support";
                    "string" == typeof n && (a = t.data), i.banner(a, "error", !0), e.$apply()
                })
            }).catch(function(t) {
                e.paymentProcessing = !1;
                var n = "There was a problem connecting to the server. Please Try again.";
                t.data.msg ? n = t.data.msg : "string" == typeof n.data && (n = t.data), i.banner(n, "error", !0), e.$apply()
            })
        }
    }]), app.controller("OnboardingPlansCtrl", ["$scope", "db", "user", "$location", "api", "alert", "analytics", "facebook", function(e, t, n, a, o, i, r, c) {
        e.uid = n.uid
    }]), app.directive("planOnboarding", ["plansSvc", function(e) {
        return {
            templateUrl: "templates/plan-onboarding.html",
            restrict: "E",
            controller: ["$scope", "$location", "db", "analytics", "facebook", function(e, t, n, a, o) {
                var i = n.getPlans(),
                    r = n.getAccount(e.uid),
                    c = n.getOnboarding(e.uid);
                e.order = "visitors,domains,notifications,support";
                var s = {
                    price: 79,
                    code: "pro",
                    trial_period: 14,
                    visitors: 1e4,
                    domains: 3
                };
                e.choosePlan = function(e) {
                    i.$loaded().then(function() {
                        r.planId = e || s.code, c.state = "payment-info", a.track("Selected Plan", {
                            code: e
                        }), o.track("AddToCart"), c.$save(), r.$save(), t.path("/o-confirm")
                    })
                }
            }],
            scope: {
                stats: "=",
                order: "=",
                card: "=",
                uid: "=",
                current: "=",
                new: "@"
            },
            link: function(t, n, a) {
                t.order && t.order.split(",");
                t.planId = a.plan, t.label = a.label, t.type = a.type, t.uid = a.uid, t.period = a.hasOwnProperty("annual") ? "yr" : "mo";
                var o = "/plans/" + a.plan;
                firebase.database().ref(o).once("value", function(n) {
                    t.plan = n.val(), t.plan.features = e.getFeatureList(n.key)
                })
            }
        }
    }]), angular.module("app.notification").controller("NotificationEditCtrl", ["$scope", "db", "user", "focus", "alert", "$location", "notificationSvc", "$routeParams", "analytics", function(e, t, n, a, o, i, r, c, s) {
        e.viewAnimation = "fade", e.account = t.getAccount(n.uid), e.draftNotification = t.getNotificationEditDraft(n.uid);
        var l = t.getNotification(n.uid, c.id);
        l.$loaded().then(function() {
            l.modified === e.draftNotification.modified ? (e.draftNotification.step = e.draftNotification.step || "capture", a(e.draftNotification.step), e.errors = r.validateDraft(e.draftNotification)) : e.draftNotification.$remove().then(function() {
                if (_.forEach(l, function(t, n) {
                        e.draftNotification[n] || (e.draftNotification[n] = t)
                    }), e.draftNotification.step = e.draftNotification.step || "capture", "auto" != e.draftNotification.integration_type && e.draftNotification.integration_id) {
                    e.draftNotification.webhook = !0;
                    var o = t.getWebhook(n.uid, e.draftNotification.integration_id);
                    o.$loaded().then(function() {
                        e.draftNotification.webhookName = o.name
                    })
                }
                e.draftNotification.capture_match && (e.draftNotification.advancedCaptureMatch = !0), e.draftNotification.match && (e.draftNotification.advancedDisplayMatch = !0), (e.draftNotification.delay || e.draftNotification.showFor || e.draftNotification.spacing) && (e.draftNotification.customTiming = !0), (_.get(e.draftNotification, "language.someone", !1) || _.get(e.draftNotification, "language.from", !1) || _.get(e.draftNotification, "language.time", !1)) && (e.draftNotification.languageOverride = !0), e.draftNotification.$save(), a(e.draftNotification.step), e.errors = r.validateDraft(e.draftNotification)
            })
        }), e.setProgress = function(t) {
            "launch" == t ? u(e.draftNotification) : (e.errors = r.validateDraft(e.draftNotification), e.draftNotification.step = t, e.draftNotification.modified = (new Date).getTime(), a(t), e.draftNotification.$save().then(function() {
                console.log("saved!")
            }).catch(console.error))
        }, e.reset = function() {
            e.draftNotification.$remove(), e.setProgress("capture"), o.banner("Your notification has been reset")
        };
        var u = function(t) {
            if (e.errors = r.validateDraft(t, !0), e.errors.count) 1 == e.errors.count ? o.banner(_.get(e.errors, "list[0].msg"), "error") : o.banner("Please resolve the errors listed below", "error");
            else {
                var a = r.prepForLaunch(t);
                s.track("Edit notification", a.notification), l.customImagePath && l.customImagePath != a.notification.customImagePath && firebase.storage().ref(l.customImagePath).delete(), l.$remove().then(function() {
                    _.forEach(a.notification, function(e, t) {
                        l[t] || (l[t] = e)
                    }), l.$save().then(function(t) {
                        return r.saveUrlFilter(n.uid, t, a.urlFilter).then(function() {
                            e.draftNotification.$remove(), o.banner("Your notification has been updated", "success"), r.updatePixelSettings(n.uid), i.path("/notifications")
                        })
                    }).catch(function(e) {
                        console.log(e)
                    })
                })
            }
        }
    }]), angular.module("app.notification").controller("NotificationListCtrl", ["$scope", "db", "user", "$routeParams", "$location", "$timeout", "focus", "$q", "intercomSvc", function(e, t, n, a, o, i, r, c, s) {
        e.list = t.getAllNotifications(n.uid), e.list.$loaded().then(function() {
            var a = [];
            _.each(e.list, function(e) {
                var o = c.defer(),
                    i = t.getConversions(n.uid, e.$id);
                i.$loaded(function() {
                    var e = i.length ? 1 : 0;
                    o.resolve(e)
                }), a.push(o.promise)
            }), c.all(a).then(function(t) {
                var n = _.countBy(e.list, "active"),
                    a = {
                        proofs: e.list.length,
                        active_notifications: n.true || 0,
                        inactive_notifications: n.false || 0,
                        converting_notifications: _.sum(t)
                    };
                s.update(a), e.loaded = !0
            })
        }), e.open = function(t) {
            e.itemId = t, e.openPreview = !0
        }, e.new = function() {
            o.path("/notification/new")
        }, e.query = o.search().q, e.search = function(e) {
            o.path("/notifications").search("q", e)
        }, r("query")
    }]), angular.module("app.notification").controller("NotificationNewCtrl", ["$scope", "db", "user", "focus", "alert", "$location", "notificationSvc", "analytics", function(e, t, n, a, o, i, r, c) {
        e.viewAnimation = "fade", e.account = t.getAccount(n.uid), e.draftNotification = t.getNotificationDraft(n.uid), e.draftNotification.$loaded().then(function() {
            e.draftNotification.step = e.draftNotification.step || "capture", a(e.draftNotification.step), e.errors = r.validateDraft(e.draftNotification)
        }), e.setProgress = function(t) {
            "staging" == t && (e.draftNotification.name = e.draftNotification.name || e.draftNotification.action_blurb || null, e.draftNotification.$save()), "launch" == t ? s(e.draftNotification) : (e.errors = r.validateDraft(e.draftNotification), e.draftNotification.step = t, a(t), e.draftNotification.$save().then(function() {
                console.log("saved!")
            }).catch(console.error))
        }, e.reset = function() {
            e.draftNotification.$remove(), e.setProgress("capture"), o.banner("Your notification has been reset")
        };
        var s = function(a) {
            if (e.errors = r.validateDraft(a, !0), !e.errors.count) {
                var s = r.prepForLaunch(a);
                c.track("New notification", s.notification);
                return t.getNotifications(n.uid).$add(s.notification).then(function(t) {
                    t.key;
                    return r.saveUrlFilter(n.uid, t, s.urlFilter).then(function() {
                        e.draftNotification.$remove(), o.banner("New Notification has been created", "success"), r.updatePixelSettings(n.uid), i.path("/notifications")
                    })
                }).catch(function(e) {
                    console.log(e)
                })
            }
            1 == e.errors.count ? o.banner(_.get(e.errors, "list[0].msg"), "error") : o.banner("Please resolve the errors listed below", "error")
        }
    }]), angular.module("app.notification").directive("notificationPreview", function() {
        return {
            restrict: "E",
            templateUrl: "templates/notification/preview/preview.template.html",
            scope: {
                openId: "="
            },
            controller: ["$scope", "simpleLogin", "db", "$location", "$timeout", "alert", "notificationSvc", function(e, t, n, a, o, i, r) {
                var c, s;
                t.getUser().then(function(e) {
                    c = e.uid
                }), e.$watch("openId", function(t, a) {
                    t && (e.notificationLoaded = !1, s = t, e.notification = n.getNotification(c, s), e.urlFilter = n.getUrlFilter(c, s), e.notification.$loaded().then(function() {
                        e.notificationLoaded = !0, e.conversionBucket, e.uid = c, e.notification.integration_id ? e.conversionBucket = e.notification.integration_id : e.conversionBucket = s, e.notification.$watch(function() {
                            e.notification.active ? (r.setUrlFilter(e.notification, e.urlFilter), r.updatePixelSettings(c)) : (e.urlFilter.$remove(), r.updatePixelSettings(c))
                        })
                    }))
                }), e.edit = function() {
                    a.path("/notification/edit/" + e.openId)
                }, e.delete = function() {
                    confirm("Are you sure you want to delete this campaign? This will permanently delete your data.") && (n.deleteNotification(c, s).then(function() {
                        i.banner("Your campaign has been deleted", "neutral"), r.updatePixelSettings(c)
                    }), o(function() {
                        e.$parent.openPreview = !1
                    }))
                }
            }]
        }
    }), angular.module("app.plans").directive("cancelAccount", function() {
        return {
            templateUrl: "templates/plans/cancel/cancel.template.html",
            restrict: "E",
            controller: ["$scope", "alert", "simpleLogin", "analytics", "$location", "api", "intercomSvc", "subscriptionSvc", function(e, t, n, a, o, i, r, c) {
                e.planList = {
                    basic_annual: {
                        label: "One Year Of Basic",
                        cost: 208,
                        fullPrice: 348
                    },
                    pro_annual: {
                        label: "One Year Of Pro",
                        cost: 568,
                        fullPrice: 948
                    },
                    business_annual: {
                        label: "One Year Of Business",
                        cost: 929,
                        fullPrice: 1548
                    },
                    premium_annual: {
                        label: "One Year Of Premium",
                        cost: 1388,
                        fullPrice: 2388
                    }
                }, e.selectedPlan = e.account.planId + "_annual", firebase.database().ref("app_settings").on("value", function(t) {
                    e.selfCancel = t.val().selfCancel
                }), e.startCancellation = function() {
                    e.selfCancel ? e.modal("feedback") : r.showNewMessage()
                }, e.upgradeAccount = function() {
                    e.loading = !0, c.changePlan(e.account.$id, e.selectedPlan, e.account.planId).then(function(n) {
                        c.applyCoupon(e.account.$id, e.selectedPlan).then(function(n) {
                            e.modal(), o.path("/settings"), e.loading = !1, t.banner("Your plan has been changed to " + e.planList[e.selectedPlan].label.toUpperCase(), "success"), e.$apply()
                        })
                    }).catch(function(n) {
                        console.log("PLAN CHANGE ERR", n), t.banner("There was a problem changing your plan", "error"), e.loading = !1, e.paymentModal = !0
                    })
                }, e.saveFeedback = function(n) {
                    n ? (e.account.cancellationFeedback = n, e.account.$save(), e.modal("cancel")) : t.banner("Please enter some feedback so we can improve the app :)", "error", !0)
                }, e.cancelAccount = function(n) {
                    n == e.account.email ? (e.account.cancelAccount = !0, e.account.$save().then(function() {
                        a.track("Cancel Account"), o.path("/cancel-confirm")
                    })) : t.banner("Your account email does not match", "error", !0)
                }
            }]
        }
    }), angular.module("app.plans").controller("CancelConfirm", ["$scope", function(e) {}]), angular.module("app.plans").controller("PlanChangeCtrl", ["$scope", "db", "user", "focus", "$location", function(e, t, n, a, o) {
        function i() {
            e.loading = !1, e.account.plan = e.account.plan || {};
            var t = e.account.planId || e.account.plan.code || "basic";
            firebase.database().ref("plans").child(t).once("value", function(t) {
                e.currentPlan = t.val(), e.currentPlanId = t.key, e.isAnnual = !(!e.currentPlanId || -1 == e.currentPlanId.indexOf("_annual"))
            })
        }
        e.config = {
            modals: []
        }, e.modal = function(t) {
            t ? (e.config.modals = [], e.config.modals[t] = !0, a(t)) : e.config.modals = []
        }, e.account = t.getAccount(n.uid), e.account.$watch(i), e.account.$loaded().then(i), e.$on("EXTENDED_TRIAL", function() {
            o.path("/settings")
        })
    }]), angular.module("app.plans").directive("plan", ["plansSvc", function(e) {
        return {
            templateUrl: "templates/plans/plan/plan.template.html",
            restrict: "E",
            controller: ["$scope", "$rootScope", "$location", "$timeout", "alert", "subscriptionSvc", "simpleLogin", function(e, t, n, a, o, i, r) {
                e.prorate = !1, e.billing = !1, e.loading = !1, e.$on("proof.plans.selected", function(t, n) {
                    e.planId !== n && (e.prorate = !1, e.billing = !1, e.loading = !1)
                }), e.choosePlan = function(t) {
                    r.getUser().then(function(a) {
                        i.changePlan(a.uid, t, e.current).then(function(a) {
                            e.billing = !1, e.$parent.modal(), n.path("/settings"), o.banner("Your plan has been changed to " + t.toUpperCase(), "success");
                            try {
                                e.$apply()
                            } catch (e) {}
                        }).catch(function(e) {
                            console.log("PLAN CHANGE ERR", e), o.banner("There was a problem changing your plan", "error")
                        }), e.prorate = !1, e.billing = !0
                    })
                }, e.cancel = function() {
                    e.prorate = !1
                }, e.checkCost = function(t) {
                    e.$emit("proof.plans.select", e.planId), console.log("proof.plans.selected SEND", e.planId), e.prorate = !1, e.billing = !1, e.loading = !0, t ? r.getUser().then(function(t) {
                        i.reactivatePlan(t.uid, e.planId).then(function(t) {
                            e.prorate = t.data, e.loading = !1, a(function() {
                                n.path("/dashboard"), console.log("REDIRECT?")
                            })
                        })
                    }) : r.getUser().then(function(t) {
                        i.checkCost(t.uid, e.planId, e.current).then(function(t) {
                            e.prorate = t.data, e.loading = !1;
                            try {
                                e.$apply()
                            } catch (e) {}
                        })
                    })
                }
            }],
            scope: {
                stats: "=",
                order: "=",
                card: "=",
                current: "=",
                selected: "=",
                choose: "=",
                new: "@"
            },
            link: function(t, n, a) {
                t.order && t.order.split(",");
                t.planId = a.plan, t.label = a.label, t.type = a.type, t.period = a.hasOwnProperty("annual") ? "yr" : "mo";
                var o = "/plans/" + a.plan;
                firebase.database().ref(o).once("value", function(n) {
                    t.plan = n.val(), t.plan.features = e.getFeatureList(n.key)
                }), t.onClick = function(e) {
                    t.choose ? t.choose(t.planId, e) : t.checkCost(e)
                }
            }
        }
    }]), angular.module("app.traffic").directive("trafficChart", ["md5", function(e) {
        return {
            restrict: "E",
            templateUrl: "templates/traffic/chart/chart.template.html",
            replace: !0,
            scope: {
                paused: "="
            },
            link: function(e, t, n) {
                function a() {
                    e.data.shift(), e.data.push(0), o()
                }

                function o() {
                    !0 !== e.paused && (e.chart.data.datasets[0].data = e.data, e.chart.update())
                }
                e.attrs = t, e.data = _.fill(new Array(30), 0), e.chart = new Chart(n.$$element[0].getContext("2d"), {
                    type: "bar",
                    data: {
                        labels: new Array(30),
                        datasets: [{
                            data: e.data,
                            label: "Pageviews",
                            backgroundColor: "rgba(0,149,247, .3)",
                            borderWidth: 0,
                            borderColor: "rgba(0,149,247, 1)",
                            tension: -1
                        }]
                    },
                    options: {
                        barPercentage: 1,
                        maintainAspectRatio: !1,
                        legend: {
                            display: !1
                        },
                        layout: {
                            padding: {
                                top: 10,
                                bottom: 1,
                                left: -28,
                                right: -28
                            }
                        },
                        scales: {
                            yAxes: [{
                                ticks: {
                                    beginAtZero: !0,
                                    display: !1
                                },
                                gridLines: {
                                    display: !1,
                                    drawBorder: !1
                                }
                            }],
                            xAxes: [{
                                labels: !1,
                                barPercentage: 1,
                                categoryPercentage: .89,
                                gridLines: {
                                    display: !1,
                                    drawBorder: !1
                                }
                            }]
                        }
                    }
                }), e.$on("addVisitor", function(t, n) {
                    var a = moment().diff(n.visitor.timestamp, "minutes");
                    if (a < 30) {
                        var i = 29 - a;
                        e.data[i] = _.sum([e.data[i], 1])
                    }
                    o()
                }), e.timer = setInterval(a, 6e4), e.$on("$destroy", function() {
                    clearInterval(e.timer)
                })
            }
        }
    }]), angular.module("app.traffic").controller("TrafficListCtrl", ["$scope", "user", "trafficSvc", "domainSvc", function(e, t, n, a) {
        function o(t) {
            e.$broadcast("addVisitor", {
                visitor: t,
                timestamp: moment(t.timestamp).format("h:mm a")
            })
        }

        function i(t) {
            if (e.deferLoad) return void(e.deferLoad = !1);
            t.docChanges.forEach(function(t) {
                if ("added" == t.type || "modified" == t.type) {
                    var n = t.doc.data(),
                        i = a.validUrl(n.pageUrl);
                    i && (n.cleanUrl = a.cleanUrl(i)), moment(new Date).isAfter(n.timestamp) && e.$apply(function() {
                        e.traffic.push(n), o(n)
                    })
                }
            }), e.$apply(function() {
                e.loaded = !0
            })
        }
        e.traffic = [], e.chartLabels = [], e.chartData = [];
        var r = n.getRecentPageviews(t.uid);
        e.pauseTraffic = function() {
            e.paused = !0, e.pausedAt = moment(), c()
        }, e.resumeTraffic = function() {
            e.paused = !1, r = n.getRecentPageviews(t.uid), e.deferLoad = !0, r.onSnapshot(i)
        };
        var c = r.onSnapshot(i);
        e.open = function(t) {
            e.session = t, e.openPreview = !0
        }, e.activeHoverId = "", e.setActive = function(t) {
            e.activeHoverId = t || null
        }, e.isActive = function(t) {
            return e.activeHoverId === t ? "active" : ""
        }
    }]), angular.module("app.traffic").directive("visitorDetails", ["md5", "trafficSvc", "authSvc", "analytics", function(e, t, n, a) {
        return {
            restrict: "E",
            templateUrl: "templates/traffic/profile/profile.template.html",
            scope: {
                session: "="
            },
            controller: ["$scope", function(o) {
                o.$watch("session", function(i, r) {
                    if (i && i.id)
                        if (a.track("Opened traffic feed profile"), o.loading = !0, n.getUser().then(function(e) {
                                t.getVisitor(e.uid, i.id).then(function(e) {
                                    e.exists ? o.$apply(function() {
                                        o.loading = !1, o.visitor = e.data(), o.otherEmails = _.map(o.visitor.conversions, function(e, t) {
                                            return t.split("_at_").join("@").split("_dot_").join(".")
                                        });
                                        var t = o.visitor.initialUrl.split("?");
                                        o.landingPage = t[0];
                                        var n = t[1] ? t[1].split("&") : null;
                                        console.log(n);
                                        var a = o.otherEmails.indexOf(o.session.email);
                                        a > -1 && o.otherEmails.splice(a, 1)
                                    }) : o.visitor = null
                                }).catch(function(e) {
                                    console.log("Error getting document:", e), o.visitor = null
                                })
                            }), i.email) {
                            var c = e.createHash(i.email);
                            firebase.database().ref("lookup/location").child(c).once("value", function(e) {
                                o.location = e.val(), o.$apply()
                            }), firebase.database().ref("lookup/fullcontact").child(c).once("value", function(e) {
                                o.fullcontact = e.val(), o.kloutScore = _.get(o.fullcontact, "digitalFootprint.scores[0].value", "n/a"), o.demographics = _.get(o.fullcontact, "demographics", !1), o.websites = _.get(o.fullcontact, "contactInfo.websites", !1), o.interests = _.get(o.fullcontact, "digitalFootprint.topics", !1), o.socialProfiles = _.get(o.fullcontact, "socialProfiles", !1), o.$apply()
                            })
                        } else o.fullcontact = null, o.location = null, o.kloutScore = "n/a", o.demographics = null, o.websites = null, o.interests = null, o.socialProfiles = null
                })
            }]
        }
    }]);
var trialFlagLink = function(e) {
    e.$watch("subscription", function(t) {
        e.trialing = _.get(t, "trial_end", !1), e.subscription = t
    })
};
angular.module("app.trial").controller("TrialCtrl", ["Account", "$q", "$timeout", "$scope", "alert", function(e, t, n, a, o) {
    function i(e) {
        a.account = e[0], a.plan = e[1], a.planName = e[1].title, a.subscription = e[2], a.$parent.trialing = _.get(e[2], "trial_end", !1), a.$parent.extendable = !!a.$parent.trialing && !_.get(e[0], "extended", !1)
    }
    a.$parent.extendTrial = function(t) {
            a.$parent.loading = !0, e.extendTrial(t).then(function(e) {
                a.$parent.loading = !1, a.subscription = e.data, a.$parent.trialing = _.get(e.data, "trial_end", !1), a.$parent.extendable = !1, o.banner("Woohoo! Your trial has been extended!", "success", !0), a.$emit("EXTENDED_TRIAL", e), a.$broadcast("EXTENDED_TRIAL", e)
            })
        },
        function() {
            return t.all([e.getAccount(), e.getPlan(), e.getSubscription()])
        }().then(i)
}]).directive("trialflag", function() {
    return {
        restrict: "AE",
        transclude: !0,
        replace: !0,
        templateUrl: "templates/trial/trialbar/trialflag.template.html",
        controller: "TrialCtrl",
        scope: !0,
        link: trialFlagLink
    }
}).directive("trialflagElse", function() {
    return {
        restrict: "AE",
        transclude: !0,
        replace: !0,
        templateUrl: "templates/trial/trialbar/trialflag-else.template.html",
        controller: "TrialCtrl",
        scope: !0,
        link: trialFlagLink
    }
}).directive("trialbar", function() {
    return {
        restrict: "E",
        templateUrl: "templates/trial/trialbar/trialbar.template.html",
        controller: "TrialCtrl"
    }
}), angular.module("app.academy").directive("academyBreadcrumbs", ["breadcrumbsSvc", function(e) {
    return {
        restrict: "E",
        templateUrl: "templates/academy/shared/breadcrumbs/breadcrumbs.template.html",
        scope: {
            lesson: "="
        },
        link: function(t) {
            e.getPathTo(t.lesson.$id).then(function(e) {
                t.path = e
            })
        }
    }
}]), angular.module("app.academy").factory("_", ["$window", function(e) {
    return e._
}]).factory("breadcrumbsSvc", ["lessonsSvc", "_", "$q", function(e, t, n) {
    function a(e, n, o) {
        var i = t.filter(o, {
            category: e
        });
        return i.length && (n[e] = i, angular.forEach(i, function(e) {
            n = a(e.$id, n, o)
        })), n
    }

    function o(e, n, a) {
        n.push(e);
        var i = t.find(a, {
            $id: e
        });
        return t.get(i, "category", !1) ? o(i.category, n, a) : n
    }
    var i = e.getLessons();
    return {
        getPathTo: function(e) {
            var t = n.defer();
            return i.$loaded().then(function(n) {
                t.resolve(o(e, [], n).reverse())
            }), t.promise
        },
        getTree: function() {
            var e = n.defer();
            return i.$loaded().then(function(t) {
                e.resolve(a("root", {}, t))
            }), e.promise
        },
        pathToUrl: function(e) {
            return "/".concat(e.join("/"))
        },
        urlToPath: function(e) {
            return ["academy"].concat(e.split("/"))
        }
    }
}]), angular.module("app.academy").directive("academyCrumb", ["breadcrumbsSvc", "lessonsSvc", function(e, t) {
    return {
        restrict: "E",
        templateUrl: "templates/academy/shared/breadcrumbs/crumb.template.html",
        scope: {
            target: "="
        },
        link: function(n) {
            e.getPathTo(n.target).then(function(t) {
                n.path = t, n.url = e.pathToUrl(t)
            }), n.lesson = t.getLesson(n.target), n.children = t.getCategory(n.target)
        }
    }
}]), angular.module("app.academy").directive("academyLessonCard", ["breadcrumbsSvc", function(e) {
    return {
        restrict: "E",
        templateUrl: "templates/academy/shared/lesson-card/lesson-card.template.html",
        scope: {
            lesson: "="
        },
        link: function(t, n, a) {
            e.getPathTo(t.lesson.$id).then(function(n) {
                t.path = n, t.url = e.pathToUrl(n)
            }), t.actionBtn = "category" == t.lesson.type ? "collection" : "playBtn"
        }
    }
}]), angular.module("app.academy").directive("academyLessonResources", [function() {
    return {
        restrict: "E",
        templateUrl: "templates/academy/shared/lesson-resources/lesson-resources.template.html",
        link: function(e, t, n) {}
    }
}]), angular.module("app.academy").directive("academyVideoPlayer", [function() {}]);
var KEYS = {
        up: 38,
        down: 40,
        left: 37,
        right: 39,
        escape: 27,
        enter: 13,
        backspace: 8,
        delete: 46,
        shift: 16,
        leftCmd: 91,
        rightCmd: 93,
        ctrl: 17,
        alt: 18,
        tab: 9
    },
    $filter, $timeout, $window, $http, $q, Selector = function() {
        function e(e) {
            return e instanceof HTMLElement ? e.ownerDocument && e.ownerDocument.defaultView.opener ? e.ownerDocument.defaultView.getComputedStyle(e) : window.getComputedStyle(e) : {}
        }

        function t(e, t, n, a, o) {
            this.restrict = "EAC", this.replace = !0, this.transclude = !0, this.scope = {
                name: "@?",
                value: "=model",
                disabled: "=?disable",
                disableSearch: "=?",
                required: "=?require",
                multiple: "=?multi",
                placeholder: "@?",
                valueAttr: "@",
                labelAttr: "@?",
                groupAttr: "@?",
                options: "=?",
                debounce: "=?",
                create: "&?",
                limit: "=?",
                rtl: "=?",
                api: "=?",
                change: "&?",
                remote: "&?",
                remoteParam: "@?",
                remoteValidation: "&?",
                remoteValidationParam: "@?",
                removeButton: "=?",
                softDelete: "=?",
                closeAfterSelection: "=?",
                viewItemTemplate: "=?",
                dropdownItemTemplate: "=?",
                dropdownCreateTemplate: "=?",
                dropdownGroupTemplate: "=?"
            }, this.templateUrl = "selector/selector.html", $filter = e, $timeout = t, $window = n, $http = a, $q = o
        }
        return t.prototype.$inject = ["$filter", "$timeout", "$window", "$http", "$q"], t.prototype.link = function(t, n, a, o, i) {
            i(t, function(t, o) {
                var i = $filter("filter"),
                    r = angular.element(n[0].querySelector(".selector-input input")),
                    c = angular.element(n[0].querySelector(".selector-dropdown")),
                    s = r.controller("ngModel"),
                    l = n.find("select").controller("ngModel"),
                    u = $q.defer(),
                    p = {
                        api: {},
                        search: "",
                        disableSearch: !1,
                        selectedValues: [],
                        highlighted: 0,
                        valueAttr: null,
                        labelAttr: "label",
                        groupAttr: "group",
                        options: [],
                        debounce: 0,
                        limit: 1 / 0,
                        remoteParam: "q",
                        remoteValidationParam: "value",
                        removeButton: !0,
                        viewItemTemplate: "selector/item-default.html",
                        dropdownItemTemplate: "selector/item-default.html",
                        dropdownCreateTemplate: "selector/item-create.html",
                        dropdownGroupTemplate: "selector/group-default.html"
                    };
                !angular.isDefined(o.value) && o.multiple && (o.value = []), angular.forEach(p, function(e, t) {
                    angular.isDefined(o[t]) || (o[t] = e)
                }), angular.forEach(["name", "valueAttr", "labelAttr"], function(e) {
                    a[e] || (a[e] = o[e])
                }), o.getObjValue = function(e, t) {
                    var n;
                    if (!angular.isDefined(e) || !angular.isDefined(t)) return e;
                    if (t = angular.isArray(t) ? t : t.split("."), n = t.shift(), n.indexOf("[") > 0) {
                        var a = n.match(/(\w+)\[(\d+)\]/);
                        null !== a && (e = e[a[1]], n = a[2])
                    }
                    return 0 === t.length ? e[n] : o.getObjValue(e[n], t)
                }, o.setObjValue = function(e, t, n) {
                    var a;
                    if (angular.isDefined(e) || (e = {}), t = angular.isArray(t) ? t : t.split("."), a = t.shift(), a.indexOf("[") > 0) {
                        var i = a.match(/(\w+)\[(\d+)\]/);
                        null !== i && (e = e[i[1]], a = i[2])
                    }
                    return e[a] = 0 === t.length ? n : o.setObjValue(e[a], t, n), e
                }, o.optionValue = function(e) {
                    return null == o.valueAttr ? e : o.getObjValue(e, o.valueAttr)
                }, o.optionEquals = function(e, t) {
                    return angular.equals(o.optionValue(e), angular.isDefined(t) ? t : o.value)
                }, o.setValue = function(e) {
                    o.multiple ? o.value = null == o.valueAttr ? e || [] : (e || []).map(function(e) {
                        return o.getObjValue(e, o.valueAttr)
                    }) : o.value = null == o.valueAttr ? e : o.getObjValue(e || {}, o.valueAttr)
                }, o.hasValue = function() {
                    return o.multiple ? (o.value || []).length > 0 : !!o.value
                }, o.request = function(e, t, n, a) {
                    var i, r = {};
                    if (o.disabled) return $q.reject();
                    if (!angular.isDefined(n)) throw "Remote attribute is not defined";
                    if (o.loading = !0, o.options = [], r[e] = t, i = n(r), "function" != typeof i.then) {
                        var c = {
                            method: "GET",
                            cache: !0,
                            params: {}
                        };
                        angular.extend(c, i), angular.extend(c.params, i.params), c.params[a] = t, i = $http(c)
                    }
                    return i.then(function(e) {
                        o.options = e.data || e, o.filterOptions(), o.loading = !1, u.resolve()
                    }, function(e) {
                        throw o.loading = !1, u.reject(), "Error while fetching data: " + (e.message || e)
                    }), i
                }, o.fetch = function() {
                    return o.request("search", o.search || "", o.remote, o.remoteParam)
                }, o.fetchValidation = function(e) {
                    return o.request("value", e, o.remoteValidation, o.remoteValidationParam)
                }, angular.isDefined(o.remote) ? angular.isDefined(o.remoteValidation) || (o.remoteValidation = !1) : (o.remote = !1, o.remoteValidation = !1, u.resolve()), o.remote && $timeout(function() {
                    $q.when(o.hasValue() && o.remoteValidation ? o.fetchValidation(o.value) : angular.noop).then(function() {
                        o.$watch("search", function() {
                            $timeout(o.fetch)
                        })
                    })
                }), o.optionToObject = function(e, t) {
                    var n = {},
                        a = angular.element(e);
                    angular.forEach(e.dataset, function(e, t) {
                        t.match(/^\$/) || (n[t] = e)
                    }), e.value && o.setObjValue(n, o.valueAttr || "value", e.value), a.text() && o.setObjValue(n, o.labelAttr, a.text().trim()), angular.isDefined(t) && o.setObjValue(n, o.groupAttr, t), o.options.push(n), !a.attr("selected") || !o.multiple && o.hasValue() || (o.multiple ? (o.value || (o.value = []), o.value.push(o.optionValue(n))) : o.value || (o.value = o.optionValue(n)))
                }, o.fillWithHtml = function() {
                    o.options = [], angular.forEach(t, function(e) {
                        var t = (e.tagName || "").toLowerCase();
                        "option" == t && o.optionToObject(e), "optgroup" == t && angular.forEach(e.querySelectorAll("option"), function(t) {
                            o.optionToObject(t, (e.attributes.label || {}).value)
                        })
                    }), o.updateSelected()
                }, o.initialize = function() {
                    o.remote || angular.isArray(o.options) && o.options.length || o.fillWithHtml(), o.hasValue() && (o.multiple ? angular.isArray(o.value) || (o.value = [o.value]) : angular.isArray(o.value) && (o.value = o.value[0]), o.updateSelected(), o.filterOptions(), o.updateValue())
                }, o.$watch("multiple", function() {
                    $timeout(o.setInputWidth), u.promise.then(o.initialize, o.initialize)
                }), o.dropdownPosition = function() {
                    var t = r.parent()[0],
                        n = e(t),
                        a = parseFloat(n.marginTop || 0),
                        o = parseFloat(n.marginLeft || 0);
                    c.css({
                        top: t.offsetTop + t.offsetHeight + a + "px",
                        left: t.offsetLeft + o + "px",
                        width: t.offsetWidth + "px"
                    })
                }, o.open = function() {
                    o.multiple && (o.selectedValues || []).length >= o.limit || (o.isOpen = !0, o.dropdownPosition(), $timeout(o.scrollToHighlighted))
                }, o.close = function() {
                    o.isOpen = !1, o.resetInput(), o.remote && $timeout(o.fetch)
                }, o.decrementHighlighted = function() {
                    o.highlight(o.highlighted - 1), o.scrollToHighlighted()
                }, o.incrementHighlighted = function() {
                    o.highlight(o.highlighted + 1), o.scrollToHighlighted()
                }, o.highlight = function(e) {
                    a.create && o.search && -1 == e ? o.highlighted = -1 : o.filteredOptions.length && (o.highlighted = (o.filteredOptions.length + e) % o.filteredOptions.length)
                }, o.scrollToHighlighted = function() {
                    var t = c[0],
                        n = t.querySelectorAll("li.selector-option")[o.highlighted],
                        a = e(n),
                        i = parseFloat(a.marginTop || 0),
                        r = parseFloat(a.marginBottom || 0);
                    o.filteredOptions.length && (n.offsetTop + n.offsetHeight + r > t.scrollTop + t.offsetHeight && $timeout(function() {
                        t.scrollTop = n.offsetTop + n.offsetHeight + r - t.offsetHeight
                    }), n.offsetTop - i < t.scrollTop && $timeout(function() {
                        t.scrollTop = n.offsetTop - i
                    }))
                }, o.createOption = function(e) {
                    $q.when(function() {
                        var t = {};
                        return angular.isFunction(o.create) ? t = o.create({
                            input: e
                        }) : (o.setObjValue(t, o.labelAttr, e), o.setObjValue(t, o.valueAttr || "value", e)), t
                    }()).then(function(e) {
                        o.options.push(e), o.set(e)
                    })
                }, o.typedIn = [], o.enterOption = function(e) {
                    0 === o.filteredOptions.length && -1 === o.typedIn.indexOf(e) && (o.typedIn.push(e), o.createOption(e))
                }, o.rightClickInput = function(e) {
                    document.getElementById("selectorSearchInput").focus()
                }, o.set = function(e) {
                    o.multiple && (o.selectedValues || []).length >= o.limit || (angular.isDefined(e) || (e = o.filteredOptions[o.highlighted]), o.multiple ? (o.selectedValues || (o.selectedValues = []), o.selectedValues.indexOf(e) < 0 && o.selectedValues.push(e)) : o.selectedValues = [e], (!o.multiple || o.closeAfterSelection || (o.selectedValues || []).length >= o.limit) && o.close(), o.resetInput(), l.$setDirty())
                }, o.unset = function(e) {
                    o.multiple ? o.selectedValues.splice(angular.isDefined(e) ? e : o.selectedValues.length - 1, 1) : o.selectedValues = [], o.resetInput(), l.$setDirty()
                }, o.keydown = function(e) {
                    switch (e.keyCode) {
                        case KEYS.up:
                            if (!o.isOpen) break;
                            o.decrementHighlighted(), e.preventDefault();
                            break;
                        case KEYS.down:
                            o.isOpen ? o.incrementHighlighted() : o.open(), e.preventDefault();
                            break;
                        case KEYS.escape:
                            o.highlight(0), o.close();
                            break;
                        case KEYS.enter:
                            o.isOpen && (a.create && o.search && -1 == o.highlighted ? o.createOption(e.target.value) : o.filteredOptions.length && o.set(), e.preventDefault());
                            break;
                        case KEYS.backspace:
                            if (!r.val()) {
                                var t = o.getObjValue(o.selectedValues.slice(-1)[0] || {}, o.labelAttr || "");
                                o.unset(), o.open(), o.softDelete && !o.disableSearch && $timeout(function() {
                                    o.search = t
                                }), e.preventDefault()
                            }
                            break;
                        case KEYS.left:
                        case KEYS.right:
                        case KEYS.shift:
                        case KEYS.ctrl:
                        case KEYS.alt:
                        case KEYS.tab:
                        case KEYS.leftCmd:
                        case KEYS.rightCmd:
                            break;
                        default:
                            !o.multiple && o.hasValue() ? e.preventDefault() : (o.open(), o.highlight(0))
                    }
                }, o.inOptions = function(e, t) {
                    return o.remote ? e.filter(function(e) {
                        return angular.equals(t, e)
                    }).length > 0 : e.indexOf(t) >= 0
                }, o.filterOptions = function() {
                    if (o.filteredOptions = i(o.options || [], o.search), angular.isArray(o.selectedValues) || (o.selectedValues = []), o.multiple) o.filteredOptions = o.filteredOptions.filter(function(e) {
                        return !o.inOptions(o.selectedValues, e)
                    });
                    else {
                        var e = o.filteredOptions.indexOf(o.selectedValues[0]);
                        e >= 0 && o.highlight(e)
                    }
                }, o.measureWidth = function() {
                    var t, n = e(r[0]),
                        a = angular.element('<span class="selector-shadow"></span>');
                    return a.text(r.val() || (o.hasValue() ? "" : o.placeholder) || ""), angular.element(document.body).append(a), angular.forEach(["fontFamily", "fontSize", "fontWeight", "fontStyle", "letterSpacing", "textTransform", "wordSpacing", "textIndent"], function(e) {
                        a.css(e, n[e])
                    }), t = a[0].offsetWidth, a.remove(), t
                }, o.setInputWidth = function() {
                    var e = o.measureWidth() + 1;
                    r.css("width", e + "px")
                }, o.resetInput = function() {
                    r.val(""), o.setInputWidth(), $timeout(function() {
                        o.search = ""
                    })
                }, o.$watch("[search, options, value]", function() {
                    o.filterOptions(), $timeout(function() {
                        o.setInputWidth(), o.isOpen && o.dropdownPosition()
                    })
                }, !0), o.updateValue = function(e) {
                    angular.isDefined(e) || (e = o.selectedValues || []), o.setValue(o.multiple ? e : e[0])
                }, o.$watch("selectedValues", function(e, t) {
                    angular.equals(e, t) || (o.updateValue(), angular.isFunction(o.change) && o.change(o.multiple ? {
                        newValue: e,
                        oldValue: t
                    } : {
                        newValue: (e || [])[0],
                        oldValue: (t || [])[0]
                    }))
                }, !0), o.$watchCollection("options", function(e, t) {
                    angular.equals(e, t) || o.remote || o.updateSelected()
                }), o.updateSelected = function() {
                    o.multiple ? o.selectedValues = (o.value || []).map(function(e) {
                        return i(o.options, function(t) {
                            return o.optionEquals(t, e)
                        })[0]
                    }).filter(function(e) {
                        return angular.isDefined(e)
                    }).slice(0, o.limit) : o.selectedValues = (o.options || []).filter(function(e) {
                        return o.optionEquals(e)
                    }).slice(0, 1)
                }, o.$watch("value", function(e, t) {
                    angular.equals(e, t) || $q.when(o.remote && o.remoteValidation && o.hasValue() ? o.fetchValidation(e) : angular.noop).then(function() {
                        o.updateSelected(), o.filterOptions(), o.updateValue()
                    })
                }, !0), r = angular.element(n[0].querySelector(".selector-input input")).on("focus", function() {
                    $timeout(function() {
                        o.$apply(o.open)
                    })
                }).on("blur", function() {
                    o.$apply(o.close)
                }).on("keydown", function(e) {
                    o.$apply(function() {
                        o.keydown(e)
                    })
                }).on("input", function() {
                    o.setInputWidth()
                }), c.on("mousedown", function(e) {
                    e.preventDefault()
                }), angular.element($window).on("resize", function() {
                    o.dropdownPosition()
                }), o.$watch(function() {
                    return s.$pristine
                }, function(e) {
                    l[e ? "$setPristine" : "$setDirty"]()
                }), o.$watch(function() {
                    return s.$touched
                }, function(e) {
                    l[e ? "$setTouched" : "$setUntouched"]()
                }), angular.forEach(["open", "close", "fetch"], function(e) {
                    o.api[e] = o[e]
                }), o.api.focus = function() {
                    r[0].focus()
                }, o.api.set = function(e) {
                    return o.value = e
                }, o.api.unset = function(e) {
                    var t = e ? (o.selectedValues || []).filter(function(t) {
                            return o.optionEquals(t, e)
                        }) : o.selectedValues,
                        n = o.selectedValues.map(function(e, n) {
                            return o.inOptions(t, e) ? n : -1
                        }).filter(function(e) {
                            return e >= 0
                        });
                    angular.forEach(n, function(e, t) {
                        o.unset(e - t)
                    })
                }
            })
        }, t
    }();
angular.module("selector", []).directive("selector", ["$filter", "$timeout", "$window", "$http", "$q", function(e, t, n, a, o) {
    return new Selector(e, t, n, a, o)
}]), angular.module("app.domains").directive("urlInput", ["URI", "domainSvc", "md5", "moment", "$filter", "$timeout", "simpleLogin", function(e, t, n, a, o, i, r) {
    return {
        restrict: "E",
        templateUrl: "templates/domains/directives/url-input/url-input.template.html",
        require: "ngModel",
        scope: {
            placeholder: "@",
            draft: "=",
            loaded: "="
        },
        link: function(c, s, l, u) {
            var p;
            if (u) {
                var d = function(t) {
                        var n = new e(t.url),
                            o = t && !_.isEmpty(t.url) && n.is("absolute") ? e.parse("http://" + t.url) : {};
                        return {
                            value: t.url,
                            label: t.url,
                            domain: o.hostname,
                            parts: o,
                            hoursAgo: Math.abs(a().diff(t.lastViewed, "hours")),
                            data: t
                        }
                    },
                    f = function() {
                        c.selectedUrls = _.filter(c.urlOptions, function(e) {
                            return -1 != _.indexOf(u.$viewValue, e.data.url)
                        })
                    };
                r.getUser().then(function(e) {
                    p = e.uid, c.urls = t.getUrls(p), c.urls.$loaded(function(e) {
                        c.loaded = !0;
                        var n = o("reverse")(e);
                        c.urlOptions = _.map([].concat(n), d), c.urls.$loaded(f), c.urls.$watch(function(e) {
                            "child_added" === e.event && t.getUrl(p, e.key).$loaded(function(e) {
                                var t = d(e);
                                _.findKey(c.urlOptions, {
                                    value: t.value
                                }) || (c.urlOptions.push(t), f())
                            })
                        }), u.$render = function() {
                            c.urls.$loaded(f)
                        }
                    })
                }), c.createUrl = function(n) {
                    var a = t.addUrl(n, p),
                        o = a.isValid ? e.parse(a.isValid) : null,
                        i = {
                            value: a.url,
                            label: a.url,
                            domain: o ? o.hostname : null,
                            parts: o,
                            data: a,
                            isInvalid: !a.isValid
                        };
                    return _.size(c.urls) < 1 && t.addDomain(p, i.domain), i
                }, c.onChange = function(e, t) {
                    u.$setViewValue(_.map(t, "value")), i(function() {
                        c.draft.urlData = c.draft.urlData || {}, c.draft.urlData[c.draft.step] = {};
                        for (var e = 0; e < t.length; e++) {
                            var a = n.createHash(t[e].value);
                            c.draft.urlData[c.draft.step][a] = {
                                url: t[e].value,
                                lastViewed: t[e].data.lastViewed || null,
                                pageviews: t[e].data.pageviews || null
                            }
                        }
                    })
                }
            }
        }
    }
}]), angular.module("app.notification").directive("conversions", ["db", "notificationSvc", function(e, t) {
    return {
        restrict: "E",
        templateUrl: "templates/notification/preview/conversions/conversions.template.html",
        scope: {
            uid: "=",
            conversionBucket: "="
        },
        replace: !0,
        controller: ["$scope", "alert", "analytics", function(n, a, o) {
            n.list = null, n.loaded = !1;
            var i = 5;
            n.loadMoreConversions = function() {
                n.list = e.getConversions(n.uid, n.conversionBucket, i), n.list.$loaded().then(function() {
                    n.notification = e.getNotification(n.uid, n.conversionBucket), n.notification.$loaded().then(function() {
                        _.each(n.list, function(e) {
                            e.photo = t.getConversionImage(n.notification, e)
                        }), n.loaded = !0
                    })
                }), i += 10
            }, n.$watch("conversionBucket", function(e, t) {
                e && (i = 5, n.loadMoreConversions())
            }), n.deleteConversion = function(e) {
                if (console.log("delete"), 1 == confirm("Are you sure you want to delete this contact?  This will be permanent and cannot be undone.")) {
                    var t = n.list.$getRecord(e);
                    n.list.$remove(t).then(function(e) {
                        a.banner("Contact has been deleted", "neutral"), o.track("Delete Contact")
                    }).catch(function(e) {
                        a.banner("There was a problem deleting this contact", "error")
                    })
                }
            }
        }]
    }
}]), angular.module("app.notification").directive("livePreview", function() {
    return {
        restrict: "E",
        templateUrl: "templates/notification/preview/livePreview/livePreview.template.html",
        scope: {
            data: "="
        }
    }
}), angular.module("app.notification").directive("urlsPreview", ["simpleLogin", "notificationSvc", function(e, t) {
    return {
        restrict: "E",
        templateUrl: "templates/notification/preview/urlsPreview/urlsPreview.template.html",
        scope: {
            notification: "=",
            loaded: "="
        },
        replace: !0,
        link: function(n) {
            var a = null;
            e.getUser().then(function(e) {
                a = e.uid
            }), n.$watch("loaded", function() {
                n.notification && n.notification.integration_type && (n.webhookType = t.getWebhookName(n.notification.integration_type)), n.notification && n.notification.integration_id && a && (n.webhookUrl = t.getWebhookBaseUrl(a, n.notification.integration_type) + n.notification.integration_id)
            })
        }
    }
}]), angular.module("app.notification").directive("flowBoxNav", function() {
    return {
        restrict: "E",
        templateUrl: "templates/notification/shared/nav/nav.template.html",
        scope: {
            lastStep: "@",
            nextStep: "@",
            nextLabel: "@",
            setProgress: "="
        },
        replace: !0
    }
}), angular.module("app.notification").directive("flowBoxProgress", function() {
    return {
        restrict: "E",
        templateUrl: "templates/notification/shared/progress/progress.template.html",
        scope: {
            active: "=",
            setProgress: "="
        },
        replace: !0,
        link: function(e, t, n) {
            e.isActive = function(t) {
                return e.active == t
            }
        }
    }
}), angular.module("app.notification").directive("urlLegend", function() {
    return {
        restrict: "E",
        templateUrl: "templates/notification/shared/url-legend/url-legend.template.html",
        replace: !0,
        scope: {
            list: "="
        },
        link: function(e, t, n) {}
    }
}), angular.module("app.notification").directive("customize", ["db", "simpleLogin", "$rootScope", function(e, t, n) {
    return {
        restrict: "E",
        templateUrl: "templates/notification/steps/customize/customize.template.html",
        controller: ["$scope", function(n) {
            t.getUser().then(function(t) {
                n.account = e.getAccount(t.uid)
            })
        }]
    }
}]), angular.module("app.notification").directive("capture", function() {
    return {
        restrict: "E",
        templateUrl: "templates/notification/steps/capture/capture.template.html",
        link: function(e) {
            e.matchTypeOptions = {
                contains: "Contains",
                equals: "Exact Match"
            }
        }
    }
}), angular.module("app.notification").directive("display", function() {
    return {
        restrict: "E",
        templateUrl: "templates/notification/steps/display/display.template.html",
        link: function(e, t, n) {
            e.matchTypeOptions = {
                contains: "Contains",
                equals: "Exact Match"
            }
        }
    }
}), angular.module("app.notification").directive("message", function() {
    return {
        restrict: "E",
        templateUrl: "templates/notification/steps/message/message.template.html",
        controller: ["$scope", function(e) {
            e.openConfigDrawer = function(t, n) {
                if (t && n) switch (t) {
                    case "AN":
                        e.configureAN = !0;
                        break;
                    case "HS":
                        e.configureHotStreaks = !0;
                        break;
                    case "LVC":
                        e.configureLVC = !0
                }
            }
        }]
    }
}), angular.module("app.notification").directive("staging", function() {
    return {
        restrict: "E",
        templateUrl: "templates/notification/steps/staging/staging.template.html"
    }
}), angular.module("app.notification").directive("activeVisitorTracking", function() {
    return {
        restrict: "E",
        templateUrl: "templates/notification/steps/customize/activeVisitorTracking/activeVisitorTracking.template.html"
    }
}), angular.module("app.notification").directive("activityNotifications", function() {
    return {
        restrict: "E",
        templateUrl: "templates/notification/steps/customize/activityNotifications/activityNotifications.template.html",
        controller: ["$scope", "alert", function(e, t) {
            e.afterFileUpload = function(t, n) {
                console.log(t, n), t && n && (e.draftNotification.customImage = t, e.draftNotification.customImagePath = n, e.$apply())
            }, e.removeCustomImage = function() {
                e.draftNotification.customImage = null, e.draftNotification.customImagePath = null, t.banner("Custom image has been removed", "neutral")
            }
        }]
    }
}), angular.module("app.notification").directive("appearance", function() {
    return {
        restrict: "E",
        templateUrl: "templates/notification/steps/customize/appearance/appearance.template.html"
    }
}), angular.module("app.notification").directive("hotStreaks", ["db", function(e) {
    return {
        restrict: "E",
        templateUrl: "templates/notification/steps/customize/hotStreaks/hotStreaks.template.html",
        link: function(e, t, n) {
            e.typeOptions = {
                visitors: "Visitors",
                conversions: "Conversions"
            }, e.report = {
                count: 527
            };
            var a = {
                    daily: {
                        name: "24 hours"
                    },
                    weekly: {
                        name: "7 days"
                    },
                    monthly: {
                        name: "30 days"
                    }
                },
                o = _.cloneDeep(a),
                i = moment().diff(e.draftNotification.created, "days");
            i < 7 && (o.weekly.disabled = !0), i < 30 && (o.monthly.disabled = !0), e.$watch("draftNotification.hotStreaks.domain", function(t) {
                t ? e.periodOptions = a : (e.periodOptions = o, e.draftNotification.hotStreaks = e.draftNotification.hotStreaks || {}, e.draftNotification.hotStreaks.period = e.draftNotification.hotStreaks.period || "daily", e.periodOptions[e.draftNotification.hotStreaks.period].disabled && (e.draftNotification.hotStreaks.period = "daily"))
            }), e.$watch("draftNotification.hotStreaks.type", function(t) {
                switch (t) {
                    case "visitors":
                        e.draftNotification.hotStreaks.msg = null;
                        break;
                    case "conversions":
                        e.draftNotification.hotStreaks.domain = null
                }
                e.draftNotification.$save().then(function() {
                    console.log("saved!")
                }).catch(console.error)
            }), e.getTypeInit = function(e) {
                return e || "visitors"
            }, e.getPeriodInit = function(e) {
                return e || "daily"
            }
        }
    }
}]), angular.module("app.notification").directive("languageSettings", ["languageOptions", function(e) {
    return {
        restrict: "E",
        templateUrl: "templates/notification/steps/customize/language/language.template.html",
        link: function(t, n, a) {
            t.languageOptions = e
        }
    }
}]), angular.module("app.notification").directive("timingSettings", function() {
    return {
        restrict: "E",
        templateUrl: "templates/notification/steps/customize/timing/timing.template.html"
    }
}), angular.module("app.notification").directive("alc", function() {
    return {
        restrict: "E",
        templateUrl: "templates/notification/steps/capture/alc/alc.template.html"
    }
}), angular.module("app.notification").directive("webhooks", ["simpleLogin", "db", function(e, t) {
    return {
        restrict: "E",
        templateUrl: "templates/notification/steps/capture/webhooks/webhooks.template.html",
        link: function(n, a, o) {
            var i;
            e.getUser().then(function(e) {
                i = e.uid, n.draftNotification.selectedWebhookType && (n.webhooks = t.getWebhooks(i, n.draftNotification.selectedWebhookType))
            }), n.selectWebhookType = function(e) {
                n.draftNotification.selectedWebhookType = e, n.openDrawer = !0, n.webhooks = t.getWebhooks(i, e), n.draftNotification.$save()
            }, n.resetSelection = function() {
                n.draftNotification.integration_id = null, n.draftNotification.selectedWebhookType = null, n.draftNotification.webhookName = null, n.draftNotification.$save()
            }, n.toggleWebhooks = function() {
                n.draftNotification.webhook = !n.draftNotification.webhook, n.draftNotification.webhook || n.resetSelection(), n.draftNotification.$save()
            }
        }
    }
}]), angular.module("app.notification").directive("errorsList", function() {
    return {
        restrict: "E",
        templateUrl: "templates/notification/steps/staging/errorsList/errorsList.template.html",
        scope: {
            data: "=",
            resolve: "="
        },
        replace: !0
    }
});