(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[109],{nzxe:function(e,t,n){"use strict";n.r(t);n("IzEo");var a,r,s,o,i=n("bx4M"),c=(n("g9YV"),n("wCAj")),l=(n("14J3"),n("BMrR")),p=(n("Pwec"),n("CtXQ")),u=(n("jCWc"),n("kPKH")),m=(n("+L6B"),n("2/Rp")),g=(n("miYZ"),n("tsqr")),d=n("2Taf"),f=n.n(d),y=n("vZ4D"),h=n.n(y),v=n("l4Ni"),w=n.n(v),S=n("ujKo"),I=n.n(S),k=n("MhPg"),R=n.n(k),E=(n("y8nQ"),n("Vl3Y")),b=n("q1tI"),x=n.n(b),A=n("MuoO"),C=n("zHco"),P=n("RdVf"),z=n.n(P);function B(e){return function(){var t,n=I()(e);if(D()){var a=I()(this).constructor;t=Reflect.construct(n,arguments,a)}else t=n.apply(this,arguments);return w()(this,t)}}function D(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],function(){})),!0}catch(e){return!1}}var M=(a=Object(A["connect"])(function(e){var t=e.inspectionAnalysis,n=e.loading;return{inspectionAnalysis:t,loading:n.models.inspectionAnalysis}}),r=E["a"].create(),a(s=r((o=function(e){R()(n,e);var t=B(n);function n(){var e;f()(this,n);for(var a=arguments.length,r=new Array(a),s=0;s<a;s++)r[s]=arguments[s];return e=t.call.apply(t,[this].concat(r)),e.state={dataSource:[]},e.columns=[{title:"\u6307\u6807\u540d\u79f0",dataIndex:"itemC"},{title:"\u82f1\u6587\u540d\u79f0",dataIndex:"itemE"},{title:"\u68c0\u6d4b\u6807\u51c6",dataIndex:"teststandard"},{title:"\u5355\u4f4d",dataIndex:"unit"},{title:"\u7ed3\u679c",dataIndex:"testresult"}],e.init=function(){var t=e.props.dispatch,n=sessionStorage.getItem("reportno"),a=sessionStorage.getItem("sampleno");t({type:"inspectionAnalysis/getAllDetails",payload:{reportno:n,sampleno:a},callback:function(t){if(t&&void 0!==t.length){for(var n=0;n<t.length;n++)void 0!==t[n].testresult&&null!==t[n].testresult||(t[n].testresult=0);e.state.dataSource=t}}})},e.reviewPass=function(){var t=e.props.dispatch,n=sessionStorage.getItem("reportno"),a=sessionStorage.getItem("sampleno");t({type:"inspectionAnalysis/reviewSampleRegister",payload:{reportno:n,sampleno:a},callback:function(e){"success"===e?g["a"].success("\u590d\u6838\u901a\u8fc7"):g["a"].error("\u64cd\u4f5c\u5931\u8d25")}})},e.reviewReturn=function(){var t=e.props.dispatch,n=sessionStorage.getItem("reportno"),a=sessionStorage.getItem("sampleno");t({type:"inspectionAnalysis/returnSampleRegister",payload:{reportno:n,sampleno:a},callback:function(e){"success"===e?g["a"].success("\u9000\u56de\u6210\u529f"):g["a"].error("\u64cd\u4f5c\u5931\u8d25")}})},e.back=function(){e.props.history.goBack()},e}return h()(n,[{key:"componentDidMount",value:function(){this.init()}},{key:"render",value:function(){var e=this.props.loading,t=this.state.dataSource,n=sessionStorage.getItem("reportno"),a=sessionStorage.getItem("shipname"),r=sessionStorage.getItem("sampleno"),s=sessionStorage.getItem("result_review_pass_or_return"),o={reportno:n,shipname:a,sampleno:r};return x.a.createElement(C["a"],{text:o},x.a.createElement(i["a"],{bordered:!1,size:"small"},x.a.createElement(l["a"],null,x.a.createElement(u["a"],{sm:22},"pass"===s?x.a.createElement(m["a"],{style:{marginBottom:12,marginRight:12},type:"primary",onClick:this.reviewPass},"\u901a\u8fc7"):[],"return"===s?x.a.createElement(m["a"],{style:{marginBottom:12,marginRight:12},type:"primary",onClick:this.reviewReturn},"\u9000\u56de"):[]),x.a.createElement(u["a"],{span:2},x.a.createElement(m["a"],{type:"primary",style:{marginLeft:8,paddingLeft:0,paddingRight:15},onClick:this.back},x.a.createElement(p["a"],{type:"left"}),"\u8fd4\u56de"))),x.a.createElement("div",{className:z.a.tableList},x.a.createElement(c["a"],{dataSource:t,columns:this.columns,pagination:{showQuickJumper:!0,showSizeChanger:!0},loading:e,rowKey:"keyno"}))))}}]),n}(b["PureComponent"]),s=o))||s)||s);t["default"]=M}}]);