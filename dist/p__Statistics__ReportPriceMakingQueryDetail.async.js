(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[137],{G4da:function(e,t,a){"use strict";a.r(t);a("g9YV");var n,l,r,c=a("wCAj"),o=(a("IzEo"),a("bx4M")),m=(a("bP8k"),a("gFTJ")),i=(a("/zsF"),a("PArb")),s=(a("14J3"),a("BMrR")),d=(a("+L6B"),a("2/Rp")),u=(a("Pwec"),a("CtXQ")),p=(a("jCWc"),a("kPKH")),E=a("2Taf"),b=a.n(E),g=a("vZ4D"),I=a.n(g),y=a("l4Ni"),f=a.n(y),h=a("ujKo"),x=a.n(h),k=a("MhPg"),v=a.n(k),w=(a("tU7J"),a("wFql")),Y=a("q1tI"),D=a.n(Y),C=a("MuoO"),M=a("zHco"),S=a("/iIO"),R=a.n(S),A=a("wd/R"),B=a.n(A);function P(e){return function(){var t,a=x()(e);if(z()){var n=x()(this).constructor;t=Reflect.construct(a,arguments,n)}else t=a.apply(this,arguments);return f()(this,t)}}function z(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],function(){})),!0}catch(e){return!1}}var J=w["a"].Title,N=(n=Object(C["connect"])(function(e){var t=e.businessIncomeDetail,a=e.loading;return{businessIncomeDetail:t,loading:a.models.businessIncomeDetail}}),n((r=function(e){v()(a,e);var t=P(a);function a(){var e;b()(this,a);for(var n=arguments.length,l=new Array(n),r=0;r<n;r++)l[r]=arguments[r];return e=t.call.apply(t,[this].concat(l)),e.state={cnasInfo:{checkcode:"",checkname:"",domaincode:"",domainname:"",subdomaincode:"",subdomainname:""},dataSource:[]},e.columns=[{title:"\u8d39\u7528\u540d\u79f0",dataIndex:"costname"},{title:"\u8d39\u7528\u79cd\u7c7b",dataIndex:"costtype"},{title:"\u53d1\u751f\u65e5\u671f",dataIndex:"occurdate",render:function(e){return D.a.createElement("span",null,B()(e).format("YYYY-MM-DD"))}},{title:"\u91d1\u989d",dataIndex:"costmoney"},{title:"\u63a5\u6536\u4eba",dataIndex:"reciever"},{title:"\u767b\u8bb0\u65e5\u671f",dataIndex:"registdate",render:function(e){return D.a.createElement("span",null,B()(e).format("YYYY-MM-DD"))}},{title:"\u767b\u8bb0\u4eba",dataIndex:"register"},{title:"\u72b6\u6001",dataIndex:"status"}],e.back=function(){window.close()},e}return I()(a,[{key:"componentWillMount",value:function(){var e=this,t=sessionStorage.getItem("reportno"),a=this.props.dispatch;JSON.parse(localStorage.getItem("userinfo"));a({type:"businessIncomeDetail/getReport",payload:t,callback:function(t){var n=t;void 0!==n.cnasCode&&null!==n.cnasCode&&"1"===n.iscnas&&a({type:"entrustment/getCnasInfo",payload:{checkCode:n.cnasCode},callback:function(t){200===t.code&&e.setState({cnasInfo:t.data})}})}});var n=sessionStorage.getItem("reportNoForCostEdit"),l={reportNo:n};a({type:"businessIncomeDetail/getCostInfosFetch",payload:l,callback:function(t){t&&e.setState({dataSource:t})}})}},{key:"render",value:function(){var e=this.props,t=e.businessIncomeDetail,a=e.loading,n=t.report,l=this.state,r=l.cnasInfo,E=l.dataSource;return D.a.createElement(M["a"],{loading:a},D.a.createElement(o["a"],{bordered:!1},D.a.createElement(s["a"],{gutter:16},D.a.createElement(p["a"],{span:3},D.a.createElement(J,{level:3},"\u59d4\u6258\u8be6\u60c5")),D.a.createElement(p["a"],{span:19}),D.a.createElement(p["a"],{span:2},D.a.createElement(d["a"],{type:"primary",style:{marginLeft:8,paddingLeft:0,paddingRight:15},onClick:this.back},D.a.createElement(u["a"],{style:{paddingLeft:5},type:"close"}),"\u5173\u95ed"))),D.a.createElement(i["a"],{style:{marginBottom:32}}),D.a.createElement(m["a"],{size:"large",title:"\u4e1a\u52a1\u4fe1\u606f",style:{marginBottom:32},bordered:!0},D.a.createElement(m["a"].Item,{label:"\u59d4\u6258\u7f16\u53f7"},n.reportno),D.a.createElement(m["a"].Item,{label:"\u59d4\u6258\u65e5\u671f"},B()(n.reportdate).format("YYYY-MM-DD")),D.a.createElement(m["a"].Item,{label:"\u68c0\u9a8c\u8d39"},n.price),D.a.createElement(m["a"].Item,{label:"\u7533\u8bf7\u4eba"},n.applicant),D.a.createElement(m["a"].Item,{label:"\u8054\u7cfb\u4eba"},n.applicantname),D.a.createElement(m["a"].Item,{label:"\u8054\u7cfb\u7535\u8bdd"},n.applicanttel),D.a.createElement(m["a"].Item,{label:"\u4ee3\u7406\u4eba"},n.agent),D.a.createElement(m["a"].Item,{label:"\u8054\u7cfb\u4eba"},n.agentname),D.a.createElement(m["a"].Item,{label:"\u8054\u7cfb\u7535\u8bdd"},n.agenttel),D.a.createElement(m["a"].Item,{label:"\u4ed8\u6b3e\u4eba"},n.payer),D.a.createElement(m["a"].Item,{label:"\u4e1a\u52a1\u6765\u6e90"},n.businesssource),D.a.createElement(m["a"].Item,{label:"\u8d38\u6613\u65b9\u5f0f"},n.tradeway),D.a.createElement(m["a"].Item,{label:"\u8bc1\u4e66\u8981\u6c42"},n.certstyle),D.a.createElement(m["a"].Item,{label:"\u81ea\u7f16\u53f7"},n.reportno20),D.a.createElement(m["a"].Item,{label:"\u4e1a\u52a1\u5206\u7c7b"},n.businesssort),D.a.createElement(m["a"].Item,{label:"\u6267\u884c\u90e8\u95e8"},n.section),D.a.createElement(m["a"].Item,{label:"\u6d77\u5173\u90e8\u95e8"},n.customsName)),D.a.createElement(i["a"],{style:{marginBottom:32}}),D.a.createElement(m["a"],{size:"large",title:"\u68c0\u67e5\u5bf9\u8c61",style:{marginBottom:32},bordered:!0},D.a.createElement(m["a"].Item,{label:"\u68c0\u67e5\u54c1\u540d"},n.cargoname),D.a.createElement(m["a"].Item,{label:"\u4e2d\u6587\u4fd7\u540d"},n.chineselocalname),D.a.createElement(m["a"].Item,{label:"\u8239\u540d\u6807\u8bc6"},n.shipname),D.a.createElement(m["a"].Item,{label:"\u7533\u62a5\u6570\u91cf\u548c\u5355\u4f4d"},(void 0===n.quantityd||null===n.quantityd?"":n.quantityd)+n.unit),D.a.createElement(m["a"].Item,{label:"\u68c0\u9a8c\u65f6\u95f4"},B()(n.inspdate).format("YYYY-MM-DD")),D.a.createElement(m["a"].Item,{label:"\u68c0\u67e5\u6e2f\u53e3"},n.inspplace2),D.a.createElement(m["a"].Item,{label:"\u68c0\u9a8c\u5730\u70b9"},n.inspectplace))),D.a.createElement(o["a"],{title:"\u68c0\u67e5\u9879\u76ee",className:R.a.card,bordered:!1},D.a.createElement("table",{width:"100%",border:1},D.a.createElement("tr",null,D.a.createElement("td",{width:"8%",style:{backgroundColor:"#E5E5E5",textAlign:"center",padding:"10px"}},"\u8ba4\u53ef\u9886\u57df\u53ca\u4ee3\u7801"),D.a.createElement("td",{width:"8%",style:{backgroundColor:"#E5E5E5",textAlign:"center",padding:"10px"}},"\u8ba4\u53ef\u5b50\u9886\u57df\u4ee3\u7801"),D.a.createElement("td",{width:"12%",style:{backgroundColor:"#E5E5E5",textAlign:"center",padding:"10px"}}," \u68c0\u67e5\u9886\u57df/\u68c0\u67e5\u5bf9\u8c61\u53ca\u4ee3\u7801"),D.a.createElement("td",{width:"15%",style:{backgroundColor:"#E5E5E5",textAlign:"center",padding:"10px"}},"\u68c0\u67e5\u9879\u76ee\u53ca\u4ee3\u7801"),D.a.createElement("td",{style:{backgroundColor:"#E5E5E5",textAlign:"center",padding:"10px"}}," \u68c0\u67e5\u9879\u76ee\u8be6\u7ec6\u63cf\u8ff0")),D.a.createElement("tr",null,D.a.createElement("td",{style:{padding:"10px"}},r.domaincode,D.a.createElement("br",null),r.domainname),D.a.createElement("td",{style:{padding:"10px"}},r.subdomaincode,D.a.createElement("br",null),r.subdomainname),D.a.createElement("td",{style:{padding:"10px"}},r.checkcode,D.a.createElement("br",null),r.checkname),D.a.createElement("td",{style:{padding:"10px"}},n.cnasProject),D.a.createElement("td",{style:{padding:"10px"}},D.a.createElement(s["a"],null,D.a.createElement(p["a"],{span:24},D.a.createElement("span",null,"\u7533\u8bf7\u9879\u76ee:",n.inspway))),D.a.createElement(s["a"],null,D.a.createElement(p["a"],{span:24},D.a.createElement("span",null,"\u68c0\u9a8c\u5907\u6ce8:",n.inspwaymemo1))))))),D.a.createElement(o["a"],null,D.a.createElement(m["a"],{size:"large",title:"\u5f53\u524d\u72b6\u6001",style:{marginBottom:32},bordered:!0},D.a.createElement(m["a"].Item,{label:"\u72b6\u6001\u65e5\u671f"},null!==n.overalltime?B()(n.overalltime).format("YYYY-MM-DD"):null),D.a.createElement(m["a"].Item,{label:"\u5f53\u524d\u72b6\u6001"},n.overallstate))),D.a.createElement(o["a"],{title:"\u6210\u672c\u8be6\u60c5",bordered:!0},D.a.createElement(c["a"],{loading:a,dataSource:E,columns:this.columns,rowKey:"reportno",pagination:!1})))}}]),a}(Y["Component"]),l=r))||l);t["default"]=N}}]);