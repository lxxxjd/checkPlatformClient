(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[107],{"ym/L":function(e,t,n){"use strict";n.r(t);n("IzEo");var a,r,o,l,i=n("bx4M"),s=(n("g9YV"),n("wCAj")),c=n("2Taf"),u=n.n(c),m=n("vZ4D"),p=n.n(m),d=n("l4Ni"),f=n.n(d),I=n("ujKo"),g=n.n(I),h=n("MhPg"),v=n.n(h),y=(n("OaEy"),n("2fM7")),E=(n("y8nQ"),n("Vl3Y")),w=(n("sRBo"),n("kaz8")),S=n("q1tI"),A=n.n(S),D=n("MuoO"),C=n("3a4m"),b=n.n(C),k=n("zHco"),x=n("glGN"),M=n.n(x),N=n("wd/R"),R=n.n(N),z=n("Xt3C");function O(e){return function(){var t,n=g()(e);if(Y()){var a=g()(this).constructor;t=Reflect.construct(n,arguments,a)}else t=n.apply(this,arguments);return f()(this,t)}}function Y(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],function(){})),!0}catch(e){return!1}}w["a"].Group,E["a"].Item,y["a"].Option;var J=E["a"].create()(z["a"]),j=(a=Object(D["connect"])(function(e){var t=e.inspectionAnalysis,n=e.loading;return{inspectionAnalysis:t,loading:n.models.inspectionAnalysis}}),r=E["a"].create(),a(o=r((l=function(e){v()(n,e);var t=O(n);function n(){var e;u()(this,n);for(var a=arguments.length,r=new Array(a),o=0;o<a;o++)r[o]=arguments[o];return e=t.call.apply(t,[this].concat(r)),e.state={},e.columns=[{title:"\u59d4\u6258\u7f16\u53f7",dataIndex:"reportno"},{title:"\u59d4\u6258\u65e5\u671f",dataIndex:"reportdate",render:function(e){return A.a.createElement("span",null,R()(e).format("YYYY-MM-DD"))}},{title:"\u8239\u540d\u6807\u8bc6",dataIndex:"shipname"},{title:"\u68c0\u67e5\u54c1\u540d",dataIndex:"cargoname"},{title:"\u6837\u54c1\u7f16\u53f7",dataIndex:"sampleno"},{title:"\u6837\u54c1\u540d\u79f0",dataIndex:"samplename"},{title:"\u68c0\u6d4b\u4eba\u5458",dataIndex:"testmans",render:function(e,t){var n=[];if(void 0===e||null===e||""===e)return null;if(n=e.split("|"),n.length<2)return e;for(var a=null,r=A.a.createElement("br",null),o=0;o<n.length;o++)a=0===o?n[o]:o%3===0?A.a.createElement("span",null,a,r,n[o]):A.a.createElement("span",null,a,"\xa0",n[o]);return A.a.createElement("div",null,a)}},{title:"\u72b6\u6001",dataIndex:"state"},{title:"\u64cd\u4f5c",render:function(t,n){return A.a.createElement(S["Fragment"],null,"\u5df2\u53d1\u5e03"===t.overallstate||"\u7533\u8bf7\u4f5c\u5e9f"===t.overallstate?[]:[A.a.createElement("a",{onClick:function(){return e.mobileItem(t,n)}},"\u68c0\u6d4b\u4eba\u5458\xa0\xa0")],A.a.createElement("a",{onClick:function(){return e.detailItem(t,n)}},"\u67e5\u770b"),"\xa0\xa0",A.a.createElement("a",{onClick:function(){return e.previewItem(t,n)}},"\u59d4\u6258\u8be6\u60c5"))}}],e.mobileItem=function(e){localStorage.setItem("taskInspmanDetail",JSON.stringify(e)),sessionStorage.setItem("overallstate_InspmanDetail",e.overallstate),b.a.push({pathname:"/InspectionAnalysis/InspmanDetail"})},e.previewItem=function(e){sessionStorage.setItem("reportno",e.reportno),window.open("/Entrustment/DetailForEntrustment"),localStorage.setItem("reportDetailNo",e.reportno)},e.detailItem=function(e){sessionStorage.setItem("reportno",e.reportno),sessionStorage.setItem("shipname",e.shipname),sessionStorage.setItem("applicant",e.applicant),sessionStorage.setItem("sampleno",e.sampleno),b.a.push({pathname:"/InspectionAnalysis/InspectionArrangementDetail"})},e}return p()(n,[{key:"componentDidMount",value:function(){var e=this.props.dispatch,t=JSON.parse(localStorage.getItem("userinfo"));e({type:"inspectionAnalysis/getAllSampleAndTestMan",payload:{certCode:t.certCode,nameC:t.nameC,role:t.role}})}},{key:"render",value:function(){var e=this.props,t=e.inspectionAnalysis.samples,n=e.loading;return A.a.createElement(k["a"],{title:"\u68c0\u9a8c\u5b89\u6392"},A.a.createElement(i["a"],{bordered:!1,size:"small"},A.a.createElement("div",{className:M.a.tableList},A.a.createElement("div",{className:M.a.tableListForm},A.a.createElement(J,null)),A.a.createElement(s["a"],{style:{marginTop:5},size:"middle",loading:n,dataSource:t.list,pagination:{showQuickJumper:!0,showSizeChanger:!0},columns:this.columns,rowKey:"sampleno"}))))}}]),n}(S["PureComponent"]),o=l))||o)||o);t["default"]=j}}]);