(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[48],{"3XPW":function(e,t,a){"use strict";a.r(t);a("IzEo");var n,r,i,c,o=a("bx4M"),l=(a("g9YV"),a("wCAj")),s=(a("14J3"),a("BMrR")),u=(a("Pwec"),a("CtXQ")),p=(a("jCWc"),a("kPKH")),d=(a("+L6B"),a("2/Rp")),m=(a("miYZ"),a("tsqr")),f=(a("2qtc"),a("kLXV")),h=a("2Taf"),g=a.n(h),y=a("vZ4D"),v=a.n(y),w=a("l4Ni"),E=a.n(w),I=a("ujKo"),R=a.n(I),k=a("MhPg"),x=a.n(k),S=(a("y8nQ"),a("Vl3Y")),L=(a("OaEy"),a("2fM7")),b=a("q1tI"),C=a.n(b),M=a("MuoO"),P=a("3a4m"),D=a.n(P),N=a("wd/R"),O=a.n(N),F=a("zHco"),J=a("VQHb"),Y=a.n(J);function j(e){return function(){var t,a=R()(e);if(q()){var n=R()(this).constructor;t=Reflect.construct(a,arguments,n)}else t=a.apply(this,arguments);return E()(this,t)}}function q(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],function(){})),!0}catch(e){return!1}}L["a"].Option;var B=(n=S["a"].create(),r=Object(M["connect"])(function(e){var t=e.charge,a=e.loading;return{charge:t,loading:a.models.charge}}),n(i=r((c=function(e){x()(a,e);var t=j(a);function a(){var e;g()(this,a);for(var n=arguments.length,r=new Array(n),i=0;i<n;i++)r[i]=arguments[i];return e=t.call.apply(t,[this].concat(r)),e.state={list:{}},e.columns=[{title:"\u59d4\u6258\u7f16\u53f7",dataIndex:"reportno"},{title:"\u59d4\u6258\u65e5\u671f",dataIndex:"reportdate",render:function(e){return C.a.createElement("span",null,O()(e).format("YYYY-MM-DD"))}},{title:"\u8239\u540d\u6807\u8bc6",dataIndex:"shipname"},{title:"\u68c0\u67e5\u54c1\u540d",dataIndex:"cargoname"},{title:"\u7533\u8bf7\u9879\u76ee",dataIndex:"inspway"},{title:"\u5b9a\u4ef7\u65b9\u5f0f",dataIndex:"priceway"},{title:"\u6570\u91cf",dataIndex:"quantity"},{title:"\u5355\u4ef7",dataIndex:"price"},{title:"\u603b\u4ef7",dataIndex:"total"},{title:"\u64cd\u4f5c",render:function(t,a){return C.a.createElement(b["Fragment"],null,C.a.createElement("a",{onClick:function(){return e.previewItem(t,a)}},"\u59d4\u6258\u8be6\u60c5"),"\xa0\xa0")}}],e.init=function(){var t=e.props.dispatch,a=JSON.parse(localStorage.getItem("listListFictionReview"));e.setState({list:a});var n={listno:a.listno};t({type:"charge/getReportListBylistnoFetch",payload:n})},e.previewItem=function(e){sessionStorage.setItem("reportno",e.reportno),window.open("/Entrustment/DetailForEntrustment"),localStorage.setItem("reportDetailNo",e.reportno)},e.handlePass=function(){e.handleReview("\u5ba1\u6838\u901a\u8fc7","\u5ba1\u6838\u901a\u8fc7\u6210\u529f")},e.handleReview=function(t,a){var n=e.props.dispatch,r=JSON.parse(localStorage.getItem("userinfo")),i=e.state.list;i.paystatus=t,i.reviewMan=r.nameC,f["a"].confirm({title:"\u786e\u5b9a".concat(t,"\u5417\uff1f"),okText:"\u786e\u8ba4",cancelText:"\u53d6\u6d88",onOk:function(){n({type:"charge/passListFictionFetch",payload:i,callback:function(t){"success"===t?(localStorage.setItem("listListFictionReview",JSON.stringify(i)),e.state.list=i,m["a"].success(a)):m["a"].success("\u64cd\u4f5c\u5931\u8d25")}})}})},e.handleNoPass=function(){e.handleReview("\u5ba1\u6838\u9000\u56de","\u9000\u56de\u6210\u529f")},e.back=function(){D.a.push({pathname:"/Charge/ListReview"})},e}return v()(a,[{key:"componentDidMount",value:function(){this.init()}},{key:"render",value:function(){var e=this.props,t=e.charge.reportByListno,a=e.loading;return C.a.createElement(F["a"],null,C.a.createElement(o["a"],{bordered:!1},C.a.createElement(s["a"],{gutter:8},C.a.createElement(p["a"],{span:2},C.a.createElement(d["a"],{type:"primary",onClick:this.handlePass},"\u901a\u8fc7")),C.a.createElement(p["a"],{span:2},C.a.createElement(d["a"],{type:"primary",style:{marginLeft:1,paddingLeft:0,paddingRight:15},onClick:this.back},C.a.createElement(u["a"],{type:"left"}),"\u8fd4\u56de"))),C.a.createElement(s["a"],{className:Y.a.card},C.a.createElement(p["a"],{sm:5},C.a.createElement("span",{level:4}," \u6e05\u5355\u7f16\u53f7\uff1a",this.state.list.listno," ")),C.a.createElement(p["a"],{sm:17},C.a.createElement("span",null," \u4ed8\u6b3e\u4eba\uff1a",this.state.list.payer," "))),C.a.createElement("div",{className:Y.a.tableList},C.a.createElement(l["a"],{loading:a,dataSource:t,columns:this.columns,rowKey:"reportno",pagination:{showQuickJumper:!0,showSizeChanger:!0}}))))}}]),a}(b["PureComponent"]),i=c))||i)||i);t["default"]=B}}]);