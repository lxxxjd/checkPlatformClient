(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[20],{MzIX:function(e,t,a){"use strict";a.r(t);a("IzEo");var n,r,l,o,i=a("bx4M"),c=(a("g9YV"),a("wCAj")),s=(a("14J3"),a("BMrR")),u=(a("+L6B"),a("2/Rp")),m=(a("5NDa"),a("5rEg")),p=(a("jCWc"),a("kPKH")),d=a("p0pE"),f=a.n(d),h=a("2Taf"),E=a.n(h),v=a("vZ4D"),g=a.n(v),y=a("MhPg"),I=a.n(y),C=a("l4Ni"),w=a.n(C),x=a("ujKo"),D=a.n(x),S=(a("y8nQ"),a("Vl3Y")),M=(a("OaEy"),a("2fM7")),b=a("q1tI"),k=a.n(b),R=a("MuoO"),Y=a("3a4m"),F=a.n(Y),N=a("zHco"),z=a("glGN"),J=a.n(z),O=a("wd/R"),V=a.n(O);function j(e){return function(){var t,a=D()(e);if(L()){var n=D()(this).constructor;t=Reflect.construct(a,arguments,n)}else t=a.apply(this,arguments);return w()(this,t)}}function L(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],function(){})),!0}catch(e){return!1}}var P=M["a"].Option,B=(n=S["a"].create(),r=Object(R["connect"])(function(e){var t=e.certificate,a=e.loading;return{certificate:t,loading:a.models.certificate}}),n(l=r((o=function(e){I()(a,e);var t=j(a);function a(){var e;E()(this,a);for(var n=arguments.length,r=new Array(n),l=0;l<n;l++)r[l]=arguments[l];return e=t.call.apply(t,[this].concat(r)),e.state={},e.columns=[{title:"\u59d4\u6258\u7f16\u53f7",dataIndex:"reportno"},{title:"\u59d4\u6258\u65e5\u671f",dataIndex:"reportdate",render:function(e){return k.a.createElement("span",null,V()(e).format("YYYY-MM-DD"))}},{title:"\u8239\u540d\u6807\u8bc6",dataIndex:"shipname"},{title:"\u68c0\u67e5\u54c1\u540d",dataIndex:"cargoname"},{title:"\u72b6\u6001\u65e5\u671f",dataIndex:"overalltime",render:function(t){return e.isValidDate(t)}},{title:"\u72b6\u6001",dataIndex:"overallstate"},{title:"\u8bc1\u7a3f\u8bc1\u4e66",dataIndex:"certnames",render:function(e,t){if(null!==e){var a=[];a=e.split("|");for(var n=null,r=k.a.createElement("br",null),l=/\.{1}[a-z]{1,}$/,o=0;o<a.length;o++)n=0===o?null!==l.exec(a[o])?a[o].slice(0,l.exec(a[o]).index):a[o]:null!==l.exec(a[o])?k.a.createElement("span",null,n,r,a[o].slice(0,l.exec(a[o]).index)):k.a.createElement("span",null,n,r,a[o]);return k.a.createElement("div",null,n)}}},{title:"\u64cd\u4f5c",render:function(t,a){return k.a.createElement(b["Fragment"],null,k.a.createElement("a",{onClick:function(){return e.modifyItem(t,a)}},"\u7f2e\u5236"),"\xa0\xa0",k.a.createElement("a",{onClick:function(){return e.previewItem(t,a)}},"\u59d4\u6258\u8be6\u60c5"))}}],e.isValidDate=function(e){return void 0!==e&&null!==e?k.a.createElement("span",null,V()(e).format("YYYY-MM-DD")):[]},e.previewItem=function(e){sessionStorage.setItem("reportno",e.reportno),window.open("/Entrustment/DetailForEntrustment")},e.modifyItem=function(e){sessionStorage.setItem("reportno",e.reportno),sessionStorage.setItem("shipname",e.shipname),sessionStorage.setItem("applicant",e.applicant),F.a.push({pathname:"/Certificate/CertificateMakeDetail"})},e.handleSearch=function(t){t.preventDefault();var a=e.props,n=a.dispatch,r=a.form;r.validateFields(function(e,t){if(console.log(e),!e){var a=JSON.parse(localStorage.getItem("userinfo")),r=f()({},t,{certCode:a.certCode,nameC:a.nameC,role:a.role});n({type:"certificate/getCertReports",payload:r})}})},e.handleFormReset=function(){e.componentDidMount()},e}return g()(a,[{key:"componentDidMount",value:function(){var e=this.props.dispatch,t=JSON.parse(localStorage.getItem("userinfo"));e({type:"certificate/getCertReports",payload:{certCode:t.certCode,nameC:t.nameC,role:t.role}})}},{key:"renderSimpleForm",value:function(){var e=this.props.form.getFieldDecorator;return k.a.createElement(S["a"],{onSubmit:this.handleSearch,layout:"inline"},k.a.createElement(s["a"],{gutter:{md:8,lg:24,xl:48}},k.a.createElement(p["a"],{md:4,sm:20},k.a.createElement(S["a"].Item,{labelCol:{span:5},wrapperCol:{span:6},colon:!1},e("kind",{initialValue:"shipname",rules:[{message:"\u641c\u7d22\u7c7b\u578b"}]})(k.a.createElement(M["a"],{placeholder:"\u641c\u7d22\u7c7b\u578b"},k.a.createElement(P,{value:"reportno"},"\u59d4\u6258\u7f16\u53f7"),k.a.createElement(P,{value:"shipname"},"\u8239\u540d\u6807\u8bc6"),k.a.createElement(P,{value:"cargoname"},"\u68c0\u67e5\u54c1\u540d"),k.a.createElement(P,{value:"applicant"},"\u59d4\u6258\u4eba"),k.a.createElement(P,{value:"agent"},"\u4ee3\u7406\u4eba"),k.a.createElement(P,{value:"overallstate"},"\u72b6\u6001"))))),k.a.createElement(p["a"],{span:6},k.a.createElement(S["a"].Item,null,e("value",{rules:[{message:"\u641c\u7d22\u6570\u636e"}]})(k.a.createElement(m["a"],{placeholder:"\u8bf7\u8f93\u5165"})))),k.a.createElement(p["a"],{span:5},k.a.createElement("span",{className:J.a.submitButtons},k.a.createElement(u["a"],{type:"primary",htmlType:"submit"},"\u67e5\u8be2"),k.a.createElement(u["a"],{style:{marginLeft:8},onClick:this.handleFormReset},"\u91cd\u7f6e")))))}},{key:"render",value:function(){var e=this.props,t=e.certificate.data,a=e.loading;return k.a.createElement(N["a"],null,k.a.createElement(i["a"],{bordered:!1,size:"small"},k.a.createElement("div",{className:J.a.tableList},k.a.createElement("div",{className:J.a.tableListForm},this.renderSimpleForm()),k.a.createElement(c["a"],{size:"middle",loading:a,dataSource:t,columns:this.columns,rowKey:"reportno",pagination:{showQuickJumper:!0,showSizeChanger:!0}}))))}}]),a}(b["PureComponent"]),l=o))||l)||l);t["default"]=B}}]);