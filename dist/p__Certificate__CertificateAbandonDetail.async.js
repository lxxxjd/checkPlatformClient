(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[17],{"SRD+":function(t,e,a){"use strict";a.r(e);a("IzEo");var n,r,o,i,s=a("bx4M"),c=(a("g9YV"),a("wCAj")),l=(a("14J3"),a("BMrR")),u=(a("+L6B"),a("2/Rp")),p=(a("Pwec"),a("CtXQ")),d=(a("jCWc"),a("kPKH")),f=(a("miYZ"),a("tsqr")),m=(a("2qtc"),a("kLXV")),h=a("2Taf"),g=a.n(h),y=a("vZ4D"),v=a.n(y),E=a("l4Ni"),w=a.n(E),k=a("ujKo"),b=a.n(k),I=a("MhPg"),C=a.n(I),D=(a("y8nQ"),a("Vl3Y")),S=(a("OaEy"),a("2fM7")),x=a("q1tI"),Y=a.n(x),M=a("MuoO"),R=a("zHco"),O=a("wd/R"),P=a.n(O),V=a("O02X"),z=a.n(V);function L(t){return function(){var e,a=b()(t);if(A()){var n=b()(this).constructor;e=Reflect.construct(a,arguments,n)}else e=a.apply(this,arguments);return w()(this,e)}}function A(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],function(){})),!0}catch(t){return!1}}S["a"].Option;var B=(n=D["a"].create(),r=Object(M["connect"])(function(t){var e=t.certificate,a=t.loading;return{certificate:e,loading:a.models.certificate}}),n(o=r((i=function(t){C()(a,t);var e=L(a);function a(){var t;g()(this,a);for(var n=arguments.length,r=new Array(n),o=0;o<n;o++)r[o]=arguments[o];return t=e.call.apply(e,[this].concat(r)),t.state={approverusers:[]},t.columns=[{title:"\u8bc1\u4e66\u8bc1\u7a3f",dataIndex:"name",render:function(t){var e=/\.{1}[a-z]{1,}$/;return null!==e.exec(t)?Y.a.createElement("span",null,t.slice(0,e.exec(t).index)):Y.a.createElement("span",null,t)}},{title:"\u6388\u6743\u7b7e\u5b57\u4eba",dataIndex:"authorNameC"},{title:"\u6388\u6743\u7b7e\u5b57\u65e5\u671f",dataIndex:"authordate",render:function(e){return t.isValidDate(e)}},{title:"\u72b6\u6001\u65e5\u671f",render:function(e,a){return t.getStatusDate(e)}},{title:"\u72b6\u6001",dataIndex:"status"},{title:"\u64cd\u4f5c",render:function(e,a){return Y.a.createElement(x["Fragment"],null,"\u5f85\u62df\u5236"!==e.status?[Y.a.createElement("a",{onClick:function(){return t.ViewItem(e,a)}},"\u67e5\u770b\xa0\xa0")]:[Y.a.createElement("p",{style:{color:"grey"}},"\u67e5\u770b\xa0\xa0")],"\u5df2\u4f5c\u5e9f"===e.status?[Y.a.createElement("a",{onClick:function(){return t.viewAbandonItem(e,a)}},"\u4f5c\u5e9f\u539f\u56e0\xa0\xa0")]:[])}}],t.viewAbandonItem=function(t){m["a"].info({title:"\u4f5c\u5e9f\u539f\u56e0",okText:"\u77e5\u9053\u4e86",content:Y.a.createElement("div",null,Y.a.createElement("p",null,t.abandonreason)),onOk:function(){}})},t.getStatusDate=function(t){var e=void 0;return"\u5f85\u62df\u5236"===t.status?e=t.uploaddate:"\u5df2\u62df\u5236"===t.status?e=t.signdate:"\u5df2\u590d\u6838"===t.status?e=t.reviewdate:"\u5df2\u7f2e\u5236"===t.status?e=t.makedate:"\u5df2\u7b7e\u7f72"===t.status?e=t.authordate:"\u5df2\u53d1\u5e03"===t.status?e=t.publishdate:"\u5df2\u4f5c\u5e9f"===t.status?e=t.abandondate:"\u7533\u8bf7\u4f5c\u5e9f"===t.status?e=t.applydate:"\u7533\u8bf7\u4f5c\u5e9f"===t.status&&(e=t.applydate),void 0===e?[]:Y.a.createElement("span",null,P()(e).format("YYYY-MM-DD"))},t.isValidDate=function(t){return void 0!==t&&null!==t?Y.a.createElement("span",null,P()(t).format("YYYY-MM-DD")):[]},t.ViewItem=function(e){var a,n=t.props.dispatch;"\u5df2\u62df\u5236"===e.status?a=e.pdfeditorpath:"\u5df2\u590d\u6838"===e.status?a=e.pdfpath:"\u5df2\u7f2e\u5236"===e.status?a=e.titlepdfpath:"\u5df2\u7b7e\u7f72"===e.status||"\u5df2\u53d1\u5e03"===e.status?a=e.certpdfpath:"\u5df2\u4f5c\u5e9f"===e.status?a=e.abandonpdfpath:void 0!==a||void 0!==e.filepath&&null!==e.filepath||(a=e.certpdfpath),n({type:"certificate/getPdfByOssPath",payload:{osspath:a},callback:function(t){200===t.code?window.open(t.data):f["a"].success("\u6253\u5f00\u6587\u4ef6\u5931\u8d25")}})},t.back=function(){t.props.history.goBack()},t}return v()(a,[{key:"componentDidMount",value:function(){var t=this,e=this.props.dispatch,a=sessionStorage.getItem("reportno");e({type:"certificate/getCertFiles",payload:{reportno:a}});var n={certCode:JSON.parse(localStorage.getItem("userinfo")).certCode};e({type:"certificate/getAllUserListByCertCode",payload:n,callback:function(e){e?t.state.approverusers=e:f["a"].error("\u52a0\u8f7d\u7528\u6237\u6570\u636e\u5931\u8d25")}})}},{key:"render",value:function(){var t=this.props,e=t.certificate.recordData,a=t.loading,n=sessionStorage.getItem("reportno"),r=sessionStorage.getItem("shipname"),o=sessionStorage.getItem("applicant"),i={reportno:n,shipname:r,applicant:o};return Y.a.createElement(R["a"],{text:i},Y.a.createElement(s["a"],{bordered:!1,size:"small"},Y.a.createElement(l["a"],null,Y.a.createElement(d["a"],{span:22}),Y.a.createElement(d["a"],{span:2},Y.a.createElement(u["a"],{type:"primary",style:{marginLeft:8,paddingLeft:0,paddingRight:15},onClick:this.back},Y.a.createElement(p["a"],{type:"left"}),"\u8fd4\u56de"))),Y.a.createElement("div",{className:z.a.tableList},Y.a.createElement(c["a"],{style:{marginTop:5},size:"middle",loading:a,dataSource:e,columns:this.columns,rowKey:"name",pagination:{showQuickJumper:!0,showSizeChanger:!0}}))))}}]),a}(x["PureComponent"]),o=i))||o)||o);e["default"]=B}}]);