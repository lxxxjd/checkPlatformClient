(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[4],{BOD2:function(t,e,a){t.exports={container:"antd-pro-layouts-user-layout-container",lang:"antd-pro-layouts-user-layout-lang",content:"antd-pro-layouts-user-layout-content",top:"antd-pro-layouts-user-layout-top",header:"antd-pro-layouts-user-layout-header",logo:"antd-pro-layouts-user-layout-logo",title:"antd-pro-layouts-user-layout-title",desc:"antd-pro-layouts-user-layout-desc",box:"antd-pro-layouts-user-layout-box"}},jH8a:function(t,e,a){"use strict";a.r(e);var n=a("2Taf"),r=a.n(n),o=a("vZ4D"),c=a.n(o),l=a("l4Ni"),u=a.n(l),s=a("ujKo"),i=a.n(s),p=a("MhPg"),m=a.n(p),d=(a("Pwec"),a("CtXQ")),y=a("q1tI"),f=a.n(y),h=(a("Y2fQ"),a("MuoO")),g=a("wY1l"),v=a.n(g),E=a("ggcP"),b=a("ZFw/"),N=a.n(b),w=a("bfXr"),D=a("BOD2"),M=a.n(D),k=a("zwU1"),O=a.n(k),R=a("tGQQ");a("09Lm");function j(t){return function(){var e,a=i()(t);if(x()){var n=i()(this).constructor;e=Reflect.construct(a,arguments,n)}else e=a.apply(this,arguments);return u()(this,e)}}function x(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],function(){})),!0}catch(t){return!1}}var P=[],Q=f.a.createElement(y["Fragment"],null,"Copyright ",f.a.createElement(d["a"],{type:"copyright"})," \u6c34\u6728\u6881\u6e05"),C=function(t){m()(a,t);var e=j(a);function a(){return r()(this,a),e.apply(this,arguments)}return c()(a,[{key:"componentDidMount",value:function(){var t=this.props,e=t.dispatch,a=t.route,n=a.routes,r=a.authority;e({type:"menu/getMenuData",payload:{routes:n,authority:r}})}},{key:"render",value:function(){var t=this.props,e=t.children,a=t.location.pathname,n=t.breadcrumbNameMap;return f.a.createElement(N.a,{title:Object(R["a"])(a,n)},f.a.createElement("div",{className:M.a.container},f.a.createElement("div",{className:M.a.lang},f.a.createElement(w["a"],null)),f.a.createElement("div",{className:M.a.content},f.a.createElement("div",{className:M.a.top},f.a.createElement("div",{className:M.a.header},f.a.createElement(v.a,{to:"/user/login"},f.a.createElement("span",{className:M.a.title},"\u68c0\u9a8c\u673a\u6784\u4e1a\u52a1\u7ba1\u7406\u7cfb\u7edf"))),f.a.createElement("div",{style:{marginTop:10}},f.a.createElement("img",{alt:"404",src:O.a,style:{height:27,paddingTop:2}}),f.a.createElement("span",{style:{verticalAlign:"middle",fontFamily:"\u6977\u4f53",fontSize:23,marginLeft:10,color:"black"}},"\u660e\u68c0\u8fbe")),f.a.createElement("div",{className:M.a.desc})),e),f.a.createElement(E["a"],{links:P,copyright:Q})))}}]),a}(y["Component"]);e["default"]=Object(h["connect"])(function(t){var e=t.menu;return{menuData:e.menuData,breadcrumbNameMap:e.breadcrumbNameMap}})(C)}}]);