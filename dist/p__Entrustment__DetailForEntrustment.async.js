(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[90],{YwlW:function(e,t,a){},"u/dL":function(e,t,a){"use strict";a.r(t);a("g9YV");var n,l,r,c=a("wCAj"),o=(a("IzEo"),a("bx4M")),i=(a("bP8k"),a("gFTJ")),s=(a("/zsF"),a("PArb")),m=(a("2qtc"),a("kLXV")),d=(a("14J3"),a("BMrR")),u=(a("+L6B"),a("2/Rp")),p=(a("Pwec"),a("CtXQ")),E=(a("jCWc"),a("kPKH")),b=(a("/xke"),a("TeRw")),g=a("p0pE"),f=a.n(g),h=a("2Taf"),y=a.n(h),I=a("vZ4D"),v=a.n(I),w=a("l4Ni"),k=a.n(w),C=a("ujKo"),x=a.n(C),R=a("MhPg"),S=a.n(R),Y=(a("tU7J"),a("wFql")),M=a("q1tI"),D=a.n(M),P=a("MuoO"),z=a("zHco"),A=a("YwlW"),J=a.n(A),q=a("wd/R"),B=a.n(q),F=a("hotG");function L(e){return function(){var t,a=x()(e);if(O()){var n=x()(this).constructor;t=Reflect.construct(a,arguments,n)}else t=a.apply(this,arguments);return k()(this,t)}}function O(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],function(){})),!0}catch(e){return!1}}var V=Y["a"].Title,j=(n=Object(P["connect"])(function(e){var t=e.entrustment,a=e.testRecordEntrustment,n=e.loading;return{entrustment:t,testRecordEntrustment:a,loading:n.models.entrustment}}),n((r=function(e){S()(a,e);var t=L(a);function a(){var e;y()(this,a);for(var n=arguments.length,l=new Array(n),r=0;r<n;r++)l[r]=arguments[r];return e=t.call.apply(t,[this].concat(l)),e.state={visible:!1,showVisible:!1,url:"",report:{},cnasInfo:{checkcode:"",checkname:"",domaincode:"",domainname:"",subdomaincode:"",subdomainname:""}},e.columns=[{title:"\u8bb0\u5f55\u540d",dataIndex:"recordname",render:function(e){var t=/\.{1}[a-z]{1,}$/;return null!==t.exec(e)?D.a.createElement("span",null,e.slice(0,t.exec(e).index)):D.a.createElement("span",null,e)}},{title:"\u4e0a\u4f20\u65e5\u671f",dataIndex:"recorddate",render:function(e){return D.a.createElement("span",null,B()(e).format("YYYY-MM-DD"))}},{title:"\u64cd\u4f5c",render:function(t,a){return D.a.createElement(M["Fragment"],null,D.a.createElement("a",{onClick:function(){return e.previewItem(t,a)}},"\u67e5\u770b"))}}],e.previewItem=function(t){var a=e.props.dispatch,n=sessionStorage.getItem("reportno"),l=f()({},t,{reportno:n,source:"\u59d4\u6258"});a({type:"testRecordEntrustment/getRecord",payload:l,callback:function(t){if(400===t.code)b["a"].open({message:"\u6253\u5f00\u5931\u8d25",description:t.data});else{var a=t.data;e.setState({url:a})}}}),e.setState({showVisible:!0})},e.handleOk=function(t){console.log(t);var a=e.props,n=a.dispatch,l=(a.match,sessionStorage.getItem("reportno"));n({type:"entrustment/remove",payload:{reportno:l}}),e.setState({visible:!1})},e.handleCancel=function(t){console.log(t),e.setState({visible:!1})},e.deleteReport=function(){e.setState({visible:!0})},e.back=function(){window.close()},e.showCancel=function(){e.setState({showVisible:!1})},e.getPlaceFromCode=function(e){var t="".concat(e.substring(0,2),"0000"),a="".concat(e.substring(0,4),"00"),n=e,l=F["a"].find(function(e){return e.value===t});if(void 0===l)return D.a.createElement("span",null,n);var r=l.children.find(function(e){return e.value===a}),c=r.children.find(function(e){return e.value===n});return D.a.createElement("span",null,l.label,"/",r.label,"/",c.label)},e}return v()(a,[{key:"componentWillMount",value:function(){var e=this,t=sessionStorage.getItem("reportno"),a=this.props.dispatch;JSON.parse(localStorage.getItem("userinfo"));a({type:"entrustment/getReport",payload:t,callback:function(t){var n=t;e.setState({report:t}),void 0!==n.cnasCode&&null!==n.cnasCode&&"1"===n.iscnas&&a({type:"entrustment/getCnasInfo",payload:{checkCode:n.cnasCode},callback:function(t){200===t.code&&e.setState({cnasInfo:t.data})}})}}),a({type:"testRecordEntrustment/getRecordInfo",payload:{reportno:t,source:"\u59d4\u6258"}})}},{key:"render",value:function(){var e=this.props,t=e.testRecordEntrustment.recordData,a=e.loading,n=this.state,l=n.showVisible,r=n.url,b=n.cnasInfo,g=n.report;return D.a.createElement(z["a"],{loading:a},D.a.createElement(o["a"],{bordered:!1},D.a.createElement(d["a"],{gutter:16},D.a.createElement(E["a"],{span:3},D.a.createElement(V,{level:3},"\u59d4\u6258\u8be6\u60c5")),D.a.createElement(E["a"],{span:19}),D.a.createElement(E["a"],{span:2},D.a.createElement(u["a"],{type:"primary",style:{marginLeft:8,paddingLeft:0,paddingRight:15},onClick:this.back},D.a.createElement(p["a"],{style:{paddingLeft:5},type:"close"}),"\u5173\u95ed"))),D.a.createElement(m["a"],{title:"\u786e\u8ba4",visible:this.state.visible,onOk:this.handleOk,onCancel:this.handleCancel},D.a.createElement("p",null,"\u662f\u5426\u64a4\u9500")),D.a.createElement(s["a"],{style:{marginBottom:32}}),D.a.createElement(i["a"],{size:"large",title:"\u4e1a\u52a1\u4fe1\u606f",style:{marginBottom:32},bordered:!0},D.a.createElement(i["a"].Item,{label:"\u59d4\u6258\u7f16\u53f7"},g.reportno),D.a.createElement(i["a"].Item,{label:"\u59d4\u6258\u65e5\u671f"},B()(g.reportdate).format("YYYY-MM-DD")),D.a.createElement(i["a"].Item,{label:"\u68c0\u9a8c\u8d39"},g.price),D.a.createElement(i["a"].Item,{label:"\u7533\u8bf7\u4eba"},g.applicant),D.a.createElement(i["a"].Item,{label:"\u8054\u7cfb\u4eba"},g.applicantname),D.a.createElement(i["a"].Item,{label:"\u8054\u7cfb\u7535\u8bdd"},g.applicanttel),D.a.createElement(i["a"].Item,{label:"\u4ee3\u7406\u4eba"},g.agent),D.a.createElement(i["a"].Item,{label:"\u8054\u7cfb\u4eba"},g.agentname),D.a.createElement(i["a"].Item,{label:"\u8054\u7cfb\u7535\u8bdd"},g.agenttel),D.a.createElement(i["a"].Item,{label:"\u4ed8\u6b3e\u4eba"},g.payer),D.a.createElement(i["a"].Item,{label:"\u4e1a\u52a1\u6765\u6e90"},g.businesssource),D.a.createElement(i["a"].Item,{label:"\u8d38\u6613\u65b9\u5f0f"},g.tradeway),D.a.createElement(i["a"].Item,{label:"\u8bc1\u4e66\u8981\u6c42"},null!==g.certstyle?["\u9700\u8981/"+g.certstyle]:[]),D.a.createElement(i["a"].Item,{label:"\u81ea\u7f16\u53f7"},g.reportno20),D.a.createElement(i["a"].Item,{label:"\u4e1a\u52a1\u5206\u7c7b"},g.businesssort),D.a.createElement(i["a"].Item,{label:"\u6267\u884c\u90e8\u95e8"},g.section),D.a.createElement(i["a"].Item,{label:"\u6d77\u5173\u90e8\u95e8"},g.customsName),D.a.createElement(i["a"].Item,{label:"\u62a5\u5173\u53f7"},g.customsNo)),D.a.createElement(s["a"],{style:{marginBottom:32}}),D.a.createElement(i["a"],{size:"large",title:"\u68c0\u67e5\u5bf9\u8c61",style:{marginBottom:32},bordered:!0},D.a.createElement(i["a"].Item,{label:"\u68c0\u67e5\u54c1\u540d"},g.cargoname),D.a.createElement(i["a"].Item,{label:"\u4e2d\u6587\u4fd7\u540d"},g.chineselocalname),D.a.createElement(i["a"].Item,{label:"\u8239\u540d\u6807\u8bc6"},g.shipname),D.a.createElement(i["a"].Item,{label:"\u7533\u62a5\u6570\u91cf"},void 0===g.quantityd||null===g.quantityd?"":g.quantityd+g.unit),D.a.createElement(i["a"].Item,{label:"\u4ea7\u5730\u5378\u6e2f"},g.fromto),D.a.createElement(i["a"].Item,{label:"\u68c0\u9a8c\u65f6\u95f4"},B()(g.inspdate).format("YYYY-MM-DD")),D.a.createElement(i["a"].Item,{label:"\u68c0\u9a8c\u5730\u70b9"},void 0===g.inspplace1||null===g.inspplace1?"":this.getPlaceFromCode(g.inspplace1)),D.a.createElement(i["a"].Item,{label:"\u8be6\u7ec6\u5730\u70b9"},g.inspplace2))),D.a.createElement(o["a"],{title:"\u68c0\u67e5\u9879\u76ee",className:J.a.card,bordered:!1},D.a.createElement("table",{width:"100%",border:1},D.a.createElement("tr",null,D.a.createElement("td",{width:"8%",style:{backgroundColor:"#E5E5E5",textAlign:"center",padding:"10px"}},"\u8ba4\u53ef\u9886\u57df\u53ca\u4ee3\u7801"),D.a.createElement("td",{width:"8%",style:{backgroundColor:"#E5E5E5",textAlign:"center",padding:"10px"}},"\u8ba4\u53ef\u5b50\u9886\u57df\u4ee3\u7801"),D.a.createElement("td",{width:"12%",style:{backgroundColor:"#E5E5E5",textAlign:"center",padding:"10px"}}," \u68c0\u67e5\u9886\u57df/\u68c0\u67e5\u5bf9\u8c61\u53ca\u4ee3\u7801"),D.a.createElement("td",{width:"15%",style:{backgroundColor:"#E5E5E5",textAlign:"center",padding:"10px"}},"\u68c0\u67e5\u9879\u76ee\u53ca\u4ee3\u7801"),D.a.createElement("td",{style:{backgroundColor:"#E5E5E5",textAlign:"center",padding:"10px"}}," \u68c0\u67e5\u9879\u76ee\u8be6\u7ec6\u63cf\u8ff0")),D.a.createElement("tr",null,D.a.createElement("td",{style:{padding:"10px"}},b.domaincode,D.a.createElement("br",null),b.domainname),D.a.createElement("td",{style:{padding:"10px"}},b.subdomaincode,D.a.createElement("br",null),b.subdomainname),D.a.createElement("td",{style:{padding:"10px"}},b.checkcode,D.a.createElement("br",null),b.checkname),D.a.createElement("td",{style:{padding:"10px"}},g.cnasProject),D.a.createElement("td",{style:{padding:"10px"}},D.a.createElement(d["a"],null,D.a.createElement(E["a"],{span:24},D.a.createElement("span",null,"\u7533\u8bf7\u9879\u76ee:",g.inspway))),D.a.createElement(d["a"],null,D.a.createElement(E["a"],{span:24},D.a.createElement("span",null,"\u68c0\u9a8c\u5907\u6ce8:",g.inspwaymemo1))))))),D.a.createElement(o["a"],{bordered:!1,title:"\u59d4\u6258\u9644\u4ef6"},D.a.createElement("div",null,D.a.createElement(c["a"],{size:"middle",loading:a,dataSource:t,columns:this.columns,rowKey:"recordname",pagination:{showQuickJumper:!0,showSizeChanger:!0}}))),D.a.createElement(m["a"],{title:"\u59d4\u6258\u9644\u4ef6",visible:l,onCancel:this.showCancel,footer:null,width:800,style:{top:10}},D.a.createElement("embed",{src:r,style:{width:"100%",height:.8*document.body.clientHeight},type:"application/pdf"})))}}]),a}(M["Component"]),l=r))||l);t["default"]=j}}]);