(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[49],{SvNc:function(e,t,a){"use strict";a.r(t);a("IzEo");var n,r,i,c,o=a("bx4M"),s=(a("g9YV"),a("wCAj")),l=(a("14J3"),a("BMrR")),u=(a("Pwec"),a("CtXQ")),p=(a("jCWc"),a("kPKH")),d=(a("+L6B"),a("2/Rp")),m=(a("2qtc"),a("kLXV")),f=(a("miYZ"),a("tsqr")),h=a("2Taf"),g=a.n(h),y=a("vZ4D"),v=a.n(y),w=a("l4Ni"),E=a.n(w),k=a("ujKo"),R=a.n(k),I=a("MhPg"),L=a.n(I),x=(a("y8nQ"),a("Vl3Y")),S=(a("OaEy"),a("2fM7")),b=a("q1tI"),C=a.n(b),N=a("MuoO"),D=a("3a4m"),M=a.n(D),P=a("wd/R"),F=a.n(P),O=a("zHco"),Y=a("VQHb"),B=a.n(Y);function J(e){return function(){var t,a=R()(e);if(j()){var n=R()(this).constructor;t=Reflect.construct(a,arguments,n)}else t=a.apply(this,arguments);return E()(this,t)}}function j(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],function(){})),!0}catch(e){return!1}}S["a"].Option;var Q=(n=x["a"].create(),r=Object(N["connect"])(function(e){var t=e.charge,a=e.loading;return{charge:t,loading:a.models.charge}}),n(i=r((c=function(e){L()(a,e);var t=J(a);function a(){var e;g()(this,a);for(var n=arguments.length,r=new Array(n),i=0;i<n;i++)r[i]=arguments[i];return e=t.call.apply(t,[this].concat(r)),e.state={list:{}},e.columns=[{title:"\u59d4\u6258\u7f16\u53f7",dataIndex:"reportno"},{title:"\u59d4\u6258\u65e5\u671f",dataIndex:"reportdate",render:function(e){return C.a.createElement("span",null,F()(e).format("YYYY-MM-DD"))}},{title:"\u8239\u540d\u6807\u8bc6",dataIndex:"shipname"},{title:"\u68c0\u67e5\u54c1\u540d",dataIndex:"cargoname"},{title:"\u7533\u8bf7\u9879\u76ee",dataIndex:"inspway"},{title:"\u4ef7\u683c",dataIndex:"price"},{title:"\u72b6\u6001",dataIndex:"status"},{title:"\u64cd\u4f5c",render:function(t,a){return C.a.createElement(b["Fragment"],null,C.a.createElement("a",{onClick:function(){return e.previewItem(t,a)}},"\u59d4\u6258\u8be6\u60c5"),"\xa0\xa0")}}],e.init=function(){var t=e.props.dispatch,a=JSON.parse(localStorage.getItem("listListFictionReviewBack"));e.setState({list:a});var n={listno:a.listno};t({type:"charge/getReportListBylistnoFetch",payload:n})},e.previewItem=function(e){sessionStorage.setItem("reportno",e.reportno),window.open("/Entrustment/DetailForEntrustment"),localStorage.setItem("reportDetailNo",e.reportno)},e.handlePass=function(){e.handleReview("\u5ba1\u6838\u901a\u8fc7","\u5ba1\u6838\u901a\u8fc7\u6210\u529f")},e.handleReview=function(t,a){var n=e.props.dispatch,r=e.state.list;r.paystatus=t,n({type:"charge/passListFictionFetch",payload:r,callback:function(t){"success"===t?(localStorage.setItem("listListFictionReviewBack",JSON.stringify(r)),e.state.list=r,f["a"].success(a)):f["a"].success("\u64cd\u4f5c\u5931\u8d25")}})},e.handleNoPass=function(){m["a"].confirm({title:"\u786e\u5b9a\u9000\u56de\u5417\uff1f",okText:"\u786e\u8ba4",cancelText:"\u53d6\u6d88",onOk:function(){e.handleReview("\u5ba1\u6838\u9000\u56de","\u5ba1\u6838\u9000\u56de\u6210\u529f")}})},e.back=function(){M.a.push({pathname:"/Charge/ListReview"})},e}return v()(a,[{key:"componentDidMount",value:function(){this.init()}},{key:"render",value:function(){var e=this.props,t=e.charge.reportByListno,a=e.loading;return C.a.createElement(O["a"],null,C.a.createElement(o["a"],{bordered:!1},C.a.createElement(l["a"],{gutter:8},C.a.createElement(p["a"],{span:2},C.a.createElement(d["a"],{type:"primary",onClick:this.handleNoPass,style:{marginLeft:1}},"\u9000\u56de")),C.a.createElement(p["a"],{span:2},C.a.createElement(d["a"],{type:"primary",style:{marginLeft:1,paddingLeft:0,paddingRight:15},onClick:this.back},C.a.createElement(u["a"],{type:"left"}),"\u8fd4\u56de"))),C.a.createElement(l["a"],{className:B.a.card},C.a.createElement(p["a"],{sm:5},C.a.createElement("span",{level:4}," \u6e05\u5355\u7f16\u53f7\uff1a",this.state.list.listno," ")),C.a.createElement(p["a"],{sm:17},C.a.createElement("span",null," \u4ed8\u6b3e\u4eba\uff1a",this.state.list.payer," "))),C.a.createElement("div",{className:B.a.tableList},C.a.createElement(s["a"],{loading:a,dataSource:t,columns:this.columns,rowKey:"reportno",pagination:{showQuickJumper:!0,showSizeChanger:!0}}))))}}]),a}(b["PureComponent"]),i=c))||i)||i);t["default"]=Q}}]);