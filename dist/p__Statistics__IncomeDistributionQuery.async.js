(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[135],{"VBO/":function(e,t,a){"use strict";a.r(t);a("IzEo");var n,i,o,r,l=a("bx4M"),s=(a("g9YV"),a("wCAj")),c=(a("+L6B"),a("2/Rp")),u=(a("5NDa"),a("5rEg")),d=(a("14J3"),a("BMrR")),p=(a("jCWc"),a("kPKH")),m=(a("iQDF"),a("+eQT")),f=a("2Taf"),y=a.n(f),h=a("vZ4D"),g=a.n(h),v=a("l4Ni"),D=a.n(v),E=a("ujKo"),I=a.n(E),C=a("MhPg"),Y=a.n(C),b=(a("y8nQ"),a("Vl3Y")),L=(a("OaEy"),a("2fM7")),R=a("q1tI"),B=a.n(R),M=a("MuoO"),k=a("wd/R"),S=a.n(k),w=a("zHco"),T=a("glGN"),F=a.n(T);function x(e){return function(){var t,a=I()(e);if(N()){var n=I()(this).constructor;t=Reflect.construct(a,arguments,n)}else t=a.apply(this,arguments);return D()(this,t)}}function N(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],function(){})),!0}catch(e){return!1}}L["a"].Option;var O=(n=b["a"].create(),i=Object(M["connect"])(function(e){var t=e.incomeDistribution,a=e.loading;return{incomeDistribution:t,loading:a.models.incomeDistribution}}),n(o=i((r=function(e){Y()(a,e);var t=x(a);function a(){var e;y()(this,a);for(var n=arguments.length,i=new Array(n),o=0;o<n;o++)i[o]=arguments[o];return e=t.call.apply(t,[this].concat(i)),e.state={selectListInfosByConditionsResult:[],selectListInfoTotalByConditionsResult:{}},e.columns=[{title:"\u6e05\u5355\u65e5\u671f",dataIndex:"listdate",render:function(e){return B.a.createElement("span",null,S()(e).format("YYYY-MM-DD"))}},{title:"\u6e05\u5355\u53f7",dataIndex:"listno"},{title:"\u91d1\u989d",dataIndex:"total"},{title:"\u4ed8\u6b3e\u4eba",dataIndex:"payer"},{title:"\u5f00\u7968\u65e5\u671f",dataIndex:"invoiceDate",render:function(t){return e.isValidDate(t)}},{title:"\u53d1\u7968\u53f7\u7801",dataIndex:"invoiceno"},{title:"\u5230\u8d26\u65e5\u671f",dataIndex:"paydate",render:function(t){return e.isValidDate(t)}},{title:"\u72b6\u6001",dataIndex:"paystatus"},{title:"\u64cd\u4f5c",render:function(t,a){return B.a.createElement(R["Fragment"],null,"\u672a\u5ba1\u6838"===a.paystatus||"\u5ba1\u6838\u9000\u56de"===t.paystatus?[B.a.createElement("span",null,B.a.createElement("a",{onClick:function(){return e.deleteBylistno(t,a)}},"\u5220\u9664"))]:null,"\xa0\xa0",B.a.createElement("a",{onClick:function(){return e.previewItem(t)}},"\u67e5\u770b"))}}],e.isValidDate=function(e){return void 0!==e&&null!==e?B.a.createElement("span",null,S()(e).format("YYYY-MM-DD")):[]},e.init=function(){var t=e.props.dispatch,a=JSON.parse(localStorage.getItem("userinfo"));t({type:"incomeDistribution/selectListInfosByConditionsInit",payload:{certCode:a.certCode},callback:function(n){e.state.selectListInfosByConditionsResult=n,t({type:"incomeDistribution/selectListInfoTotalByConditions",payload:{certCode:a.certCode},callback:function(t){e.state.selectListInfoTotalByConditionsResult=t}})}})},e.previewItem=function(e){sessionStorage.setItem("reportnoForList",JSON.stringify(e)),window.open("/Charge/DetailList")},e.handleSearch=function(t){t.preventDefault();var a=e.props,n=a.dispatch,i=a.form;i.validateFields(function(t,a){if(console.log(t),!t){var i=JSON.parse(localStorage.getItem("userinfo")),o=[],r=[],l=[];void 0!==a.payer&&null!==a.payer&&(o.push("payer"),l.push("="),r.push(a.payer)),void 0!==a.paydate&&null!==a.paydate&&(o.push("paydate"),l.push(">="),r.push(S()(a.paydate[0]).format("YYYY-MM-DD")),o.push("paydate"),l.push("<="),r.push(S()(a.paydate[1]).format("YYYY-MM-DD")));var s={kinds:o,conditions:l,values:r,certCode:i.certCode};n({type:"incomeDistribution/selectListInfosByConditions",payload:s,callback:function(t){e.state.selectListInfosByConditionsResult=t,n({type:"incomeDistribution/selectListInfoTotalByConditions",payload:s,callback:function(t){e.state.selectListInfoTotalByConditionsResult=t}})}})}})},e.handleTotalSearch=function(t){t.preventDefault();var a=e.props,n=a.dispatch,i=a.form;i.validateFields(function(t,a){if(console.log(t),!t){var i=JSON.parse(localStorage.getItem("userinfo")),o=[],r=[],l=[];void 0!==a.payer&&null!==a.payer&&(o.push("payer"),l.push("="),r.push(a.payer)),void 0!==a.paydate&&0!==a.paydate.length&&(o.push("paydate"),l.push(">="),r.push(S()(a.paydate[0]).format("YYYY-MM-DD")),o.push("paydate"),l.push("<="),r.push(S()(a.paydate[1]).format("YYYY-MM-DD")));var s={kinds:o,conditions:l,values:r,certCode:i.certCode};n({type:"incomeDistribution/selectListInfoTotalByConditions",payload:s,callback:function(t){e.state.selectListInfoTotalByConditionsResult=t}})}})},e.handleFormReset=function(){var t=e.props.form;t.resetFields(),e.init()},e}return g()(a,[{key:"componentDidMount",value:function(){this.init()}},{key:"renderSimpleForm",value:function(){var e=this.props.form.getFieldDecorator,t=m["a"].RangePicker,a=this.state.selectListInfoTotalByConditionsResult;return B.a.createElement(b["a"],{onSubmit:this.handleSearch,layout:"inline"},B.a.createElement("h3",{style:{margin:5,fontWeight:"bold"}},"\u7edf\u8ba1\u7ed3\u679c:"),B.a.createElement(d["a"],{gutter:16,style:{marginBottom:5,marginLeft:200,marginRight:200}},B.a.createElement(p["a"],{span:12},B.a.createElement("h4",{style:{fontWeight:"bold"}},"\u5f00\u7968\u603b\u989d\uff1a",void 0!==a&&null!==a?a.billingTotal:0)),B.a.createElement(p["a"],{span:12},B.a.createElement("h4",{style:{fontWeight:"bold"}},"\u5230\u8d26\u603b\u989d\uff1a",void 0!==a&&null!==a?a.receivedTotal:0))),B.a.createElement(d["a"],{gutter:{md:8,lg:24,xl:48}},B.a.createElement(p["a"],{span:9},B.a.createElement(b["a"].Item,{label:"\u8fdb\u8d26\u8d26\u6237"},e("payer",{})(B.a.createElement(u["a"],{placeholder:"\u8bf7\u8f93\u5165"})))),B.a.createElement(p["a"],{span:7},B.a.createElement(b["a"].Item,{label:"\u5230\u8d26\u65e5\u671f"},e("paydate",{})(B.a.createElement(t,{format:"YYYY-MM-DD"})))),B.a.createElement(p["a"],{span:5},B.a.createElement("span",{className:F.a.submitButtons},B.a.createElement(c["a"],{style:{marginLeft:0},onClick:this.handleFormReset},"\u91cd\u7f6e"),B.a.createElement(c["a"],{style:{marginLeft:8},type:"primary",htmlType:"submit"},"\u67e5\u8be2"),B.a.createElement(c["a"],{type:"primary",style:{marginLeft:8},onClick:this.handleTotalSearch},"\u67e5\u8be2\u603b\u989d")))))}},{key:"render",value:function(){var e=this.props.loading,t=this.state.selectListInfosByConditionsResult;return B.a.createElement(w["a"],null,B.a.createElement(l["a"],{bordered:!1,size:"small"},B.a.createElement("div",{className:F.a.tableList},B.a.createElement("div",{className:F.a.tableListForm},this.renderSimpleForm()),B.a.createElement(s["a"],{size:"middle",loading:e,dataSource:t,columns:this.columns,rowKey:"listno",pagination:{showQuickJumper:!0,showSizeChanger:!0}}))))}}]),a}(R["PureComponent"]),o=r))||o)||o);t["default"]=O}}]);