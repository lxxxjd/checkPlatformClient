(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[131],{A7Xz:function(e,t,a){"use strict";a.r(t);a("IzEo");var s,n,l,o,i=a("bx4M"),r=(a("g9YV"),a("wCAj")),c=(a("Pwec"),a("CtXQ")),u=(a("5NDa"),a("5rEg")),p=(a("BoS7"),a("Sdc0")),m=(a("7Kak"),a("9yH6")),d=(a("+L6B"),a("2/Rp")),h=(a("14J3"),a("BMrR")),v=(a("jCWc"),a("kPKH")),f=(a("iQDF"),a("+eQT")),g=(a("miYZ"),a("tsqr")),E=(a("2qtc"),a("kLXV")),y=a("2Taf"),C=a.n(y),D=a("vZ4D"),Y=a.n(D),k=a("l4Ni"),I=a.n(k),F=a("ujKo"),b=a.n(F),R=a("MhPg"),B=a.n(R),w=(a("y8nQ"),a("Vl3Y")),M=(a("OaEy"),a("2fM7")),S=a("q1tI"),T=a.n(S),V=a("MuoO"),x=a("wd/R"),N=a.n(x),L=a("zHco"),O=a("glGN"),A=a.n(O),J=a("ZzZo"),Q=a.n(J);function z(e){return function(){var t,a=b()(e);if(P()){var s=b()(this).constructor;t=Reflect.construct(a,arguments,s)}else t=a.apply(this,arguments);return I()(this,t)}}function P(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],function(){})),!0}catch(e){return!1}}var j=M["a"].Option,W=w["a"].Item,q=0,K=(s=w["a"].create(),n=Object(V["connect"])(function(e){var t=e.businessIncome,a=e.loading;return{businessIncome:t,loading:a.models.businessIncome}}),s(l=n((o=function(e){B()(a,e);var t=z(a);function a(){var e;C()(this,a);for(var s=arguments.length,n=new Array(s),l=0;l<s;l++)n[l]=arguments[l];return e=t.call.apply(t,[this].concat(n)),e.state={selectBusinessIncomesByConditionsResult:[],selectBusinessIncomeTotalByConditionsResult:{}},e.columns=[{title:"\u59d4\u6258\u7f16\u53f7",dataIndex:"reportNo"},{title:"\u59d4\u6258\u65e5\u671f",dataIndex:"reportDate",render:function(e){return T.a.createElement("span",null,N()(e).format("YYYY-MM-DD"))}},{title:"\u7533\u8bf7\u4eba",dataIndex:"applicant"},{title:"\u68c0\u67e5\u54c1\u540d",dataIndex:"cargoName"},{title:"\u7533\u62a5\u6570\u91cf",dataIndex:"quantityD"},{title:"\u68c0\u67e5\u9879\u76ee",dataIndex:"inspWay"},{title:"\u68c0\u9a8c\u8d39",dataIndex:"total"},{title:"\u6e05\u5355\u53f7",dataIndex:"listNo"},{title:"\u53d1\u7968\u53f7",dataIndex:"invoiceNo"},{title:"\u6536\u8d39\u72b6\u6001",dataIndex:"status"},{title:"\u4e1a\u52a1\u72b6\u6001",dataIndex:"overAllState"},{title:"\u64cd\u4f5c",render:function(t,a){return T.a.createElement(S["Fragment"],null,T.a.createElement("a",{onClick:function(){return e.previewItem(t)}},"\u67e5\u770b"))}}],e.init=function(){var t=e.props.dispatch,a=JSON.parse(localStorage.getItem("userinfo"));t({type:"businessIncome/selectBusinessIncomesByConditionsInit",payload:{certCode:a.certCode},callback:function(s){e.state.selectBusinessIncomesByConditionsResult=s;var n={kinds:[],values:[],conditions:[],certCode:a.certCode};t({type:"businessIncome/selectBusinessIncomeTotalByConditions",payload:n,callback:function(t){e.state.selectBusinessIncomeTotalByConditionsResult=t}})}})},e.previewItem=function(e){sessionStorage.setItem("reportno",e.reportNo),window.open("/Statistics/BusinessIncomeDetail")},e.handleSearch=function(t){t.preventDefault();var a=e.props,s=a.dispatch,n=a.form;n.validateFields(function(t,a){if(!t){var l=JSON.parse(localStorage.getItem("userinfo")),o=[],i=[],r=[];void 0!==a.status&&("\u672a\u5b9a\u4ef7"===a.status?(o.push("p.status"),r.push("="),i.push("\u672a\u5b9a\u4ef7")):"\u672a\u5230\u8d26"===a.status?(o.push("p.status"),r.push("="),i.push("\u5df2\u5f00\u5177\u672a\u6536\u8bab")):"\u5df2\u6536\u8bab"===a.status?(o.push("p.status"),r.push("="),i.push("\u6536\u8bab")):"\u5df2\u5f00\u7968"===a.status?(o.push("p.status"),r.push("like"),i.push("%\u6536\u8bab%")):"\u672a\u5f00\u7968"===a.status&&(o.push("p.status"),r.push("like"),i.push("%\u62df\u5236%"))),void 0!==a.statisticFields&&void 0!==a.statisticDateRange&&0!==a.statisticDateRange.length&&("reportdate"===a.statisticFields?(o.push("m.reportdate"),o.push("m.reportdate"),r.push(">="),i.push(N()(a.statisticDateRange[0]).format("YYYY-MM-DD")),r.push("<="),i.push(N()(a.statisticDateRange[1]).format("YYYY-MM-DD"))):(o.push("m.overalltime"),o.push("m.overalltime"),o.push("m.overallstate"),r.push(">="),i.push(N()(a.statisticDateRange[0]).format("YYYY-MM-DD")),r.push("<="),i.push(N()(a.statisticDateRange[1]).format("YYYY-MM-DD")),r.push("="),i.push(a.statisticFields)));var c=n.getFieldValue("keys");for(var u in c){var p=c[u],m=n.getFieldValue("kinds".concat(p)),d=n.getFieldValue("conditions".concat(p)),h=n.getFieldValue("values".concat(p)),v=n.getFieldValue("check".concat(p));!0===v&&void 0!==m&&void 0!==h&&void 0!==d&&(o.push(m),i.push(h),r.push(d))}var f={kinds:o,values:i,conditions:r,certCode:l.certCode};s({type:"businessIncome/selectBusinessIncomesByConditions",payload:f,callback:function(t){e.state.selectBusinessIncomesByConditionsResult=t,s({type:"businessIncome/selectBusinessIncomeTotalByConditions",payload:f,callback:function(t){e.state.selectBusinessIncomeTotalByConditionsResult=t}})}})}})},e.handleTotalSearch=function(t){t.preventDefault();var a=e.props,s=a.dispatch,n=a.form;n.validateFields(function(t,a){if(t)console.log(t);else{var l=JSON.parse(localStorage.getItem("userinfo")),o=[],i=[],r=[];void 0!==a.status&&("\u672a\u5b9a\u4ef7"===a.status?(o.push("p.status"),r.push("="),i.push("\u672a\u5b9a\u4ef7")):"\u672a\u5230\u8d26"===a.status?(o.push("p.status"),r.push("="),i.push("\u5df2\u5f00\u5177\u672a\u6536\u8bab")):"\u5df2\u6536\u8bab"===a.status?(o.push("p.status"),r.push("="),i.push("\u6536\u8bab")):"\u5df2\u5f00\u7968"===a.status?(o.push("p.status"),r.push("like"),i.push("%\u6536\u8bab%")):"\u672a\u5f00\u7968"===a.status&&(o.push("p.status"),r.push("like"),i.push("%\u62df\u5236%"))),void 0!==a.statisticFields&&void 0!==a.statisticDateRange&&0!==a.statisticDateRange.length&&("reportdate"===a.statisticFields?(o.push("m.reportdate"),o.push("m.reportdate"),r.push(">="),i.push(N()(a.statisticDateRange[0]).format("YYYY-MM-DD")),r.push("<="),i.push(N()(a.statisticDateRange[1]).format("YYYY-MM-DD"))):(o.push("m.overalltime"),o.push("m.overalltime"),o.push("m.overallstate"),r.push(">="),i.push(N()(a.statisticDateRange[0]).format("YYYY-MM-DD")),r.push("<="),i.push(N()(a.statisticDateRange[1]).format("YYYY-MM-DD")),r.push("="),i.push(a.statisticFields)));var c=n.getFieldValue("keys");for(var u in c){var p=c[u];console.log(p);var m=n.getFieldValue("kinds".concat(p)),d=n.getFieldValue("conditions".concat(p)),h=n.getFieldValue("values".concat(p)),v=n.getFieldValue("check".concat(p));!0===v&&void 0!==m&&void 0!==h&&void 0!==d&&(o.push(m),i.push(h),r.push(d))}var f={kinds:o,values:i,conditions:r,certCode:l.certCode};s({type:"businessIncome/selectBusinessIncomeTotalByConditions",payload:f,callback:function(t){e.state.selectBusinessIncomeTotalByConditionsResult=t}})}})},e.handleConfirmExport=function(t){var a=e.props.form;E["a"].confirm({title:"\u786e\u5b9a\u8981\u5bfc\u51fa\u4e1a\u52a1\u8bb0\u5f55\u5417\uff1f",okText:"\u786e\u8ba4",cancelText:"\u53d6\u6d88",onOk:function(){e.handleExport(t,a)}})},e.handleExport=function(e,t){e.preventDefault(),t.validateFields(function(e,a){if(e)console.log(e);else{var s=JSON.parse(localStorage.getItem("userinfo")),n=[],l=[],o=[];void 0!==a.status&&("\u672a\u5b9a\u4ef7"===a.status?(n.push("p.status"),o.push("="),l.push("\u672a\u5b9a\u4ef7")):"\u672a\u5230\u8d26"===a.status?(n.push("p.status"),o.push("="),l.push("\u5df2\u5f00\u5177\u672a\u6536\u8bab")):"\u5df2\u6536\u8bab"===a.status?(n.push("p.status"),o.push("="),l.push("\u6536\u8bab")):"\u5df2\u5f00\u7968"===a.status?(n.push("p.status"),o.push("like"),l.push("%\u6536\u8bab%")):"\u672a\u5f00\u7968"===a.status&&(n.push("p.status"),o.push("like"),l.push("%\u62df\u5236%"))),void 0!==a.statisticFields&&void 0!==a.statisticDateRange&&0!==a.statisticDateRange.length&&("reportdate"===a.statisticFields?(n.push("m.reportdate"),n.push("m.reportdate"),o.push(">="),l.push(N()(a.statisticDateRange[0]).format("YYYY-MM-DD")),o.push("<="),l.push(N()(a.statisticDateRange[1]).format("YYYY-MM-DD"))):(n.push("m.overalltime"),n.push("m.overalltime"),n.push("m.overallstate"),o.push(">="),l.push(N()(a.statisticDateRange[0]).format("YYYY-MM-DD")),o.push("<="),l.push(N()(a.statisticDateRange[1]).format("YYYY-MM-DD")),o.push("="),l.push(a.statisticFields)));var i=t.getFieldValue("keys");for(var r in i){var c=i[r];console.log(c);var u=t.getFieldValue("kinds".concat(c)),p=t.getFieldValue("conditions".concat(c)),m=t.getFieldValue("values".concat(c)),d=t.getFieldValue("check".concat(c));!0===d&&void 0!==u&&void 0!==m&&void 0!==p&&(n.push(u),l.push(m),o.push(p))}var h={kinds:n,values:l,conditions:o,certCode:s.certCode};g["a"].success("\u6b63\u5728\u4e0b\u8f7d\u6587\u4ef6\uff0c\u8bf7\u7a0d\u540e\uff01");var v="/api/template/downloadBusinessIncomesAsExcelByConditions";fetch(v,{method:"post",headers:{"Content-Type":"application/json"},body:JSON.stringify(h)}).then(function(e){e.blob().then(function(e){var t=window.URL.createObjectURL(e),a="\u5bfc\u51fa\u8bb0\u5f55.xls",s=document.createElement("a");document.body.appendChild(s),s.style.display="none",s.href=t,s.download=a,s.click(),document.body.removeChild(s)})}).catch(function(e){console.log("\u6587\u4ef6\u4e0b\u8f7d\u5931\u8d25",e)})}})},e.handleFormReset=function(){var t=e.props.form;t.resetFields(),e.init(),e.flag=0},e.remove=function(t){var a=e.props.form,s=a.getFieldValue("keys");e.props.form.validateFields(function(e,t){}),a.setFieldsValue({keys:s.filter(function(e){return e!==t})})},e.add=function(){var t=e.props.form,a=t.getFieldValue("keys"),s=a.concat(q++);t.setFieldsValue({keys:s})},e.flag=0,e.handleAdvanceSearch=function(){if(0===e.flag){var t=4;while(t>0)e.add(),t--;e.flag=1}},e}return Y()(a,[{key:"componentDidMount",value:function(){this.init()}},{key:"renderSimpleForm",value:function(){var e=this.props.form.getFieldDecorator,t=f["a"].RangePicker,a=this.state.selectBusinessIncomeTotalByConditionsResult;return T.a.createElement(w["a"],{onSubmit:this.handleSearch,layout:"inline"},T.a.createElement("h3",{style:{margin:5,fontWeight:"bold"}},"\u7edf\u8ba1\u7ed3\u679c:"),T.a.createElement(h["a"],{gutter:16,style:{marginBottom:5,marginLeft:100,marginRight:100}},T.a.createElement(v["a"],{span:8},T.a.createElement("h4",{style:{fontWeight:"bold"}},"\u7533\u62a5\u6570\u91cf\u603b\u548c\uff1a",void 0===a.declaredQuantityTotal?"":a.declaredQuantityTotal)),T.a.createElement(v["a"],{span:8},T.a.createElement("h4",{style:{fontWeight:"bold"}},"\u6279\u6b21\u603b\u548c\uff08\u6279\uff09\uff1a",void 0===a.recordQuantityTotal?"":a.recordQuantityTotal)),T.a.createElement(v["a"],{span:8},T.a.createElement("h4",{style:{fontWeight:"bold"}},"\u68c0\u9a8c\u8d39\u603b\u548c\uff08\u5143\uff09\uff1a",void 0===a.inspectionCostTotal?"":a.inspectionCostTotal))),T.a.createElement(h["a"],{gutter:{md:8,lg:24,xl:48},style:{marginTop:10}},T.a.createElement(v["a"],{span:10},T.a.createElement("span",{className:A.a.submitButtons},T.a.createElement(d["a"],{type:"primary",htmlType:"submit"},"\u67e5\u8be2"),T.a.createElement(d["a"],{type:"primary",style:{marginLeft:8},onClick:this.handleTotalSearch},"\u67e5\u8be2\u603b\u989d"),T.a.createElement(d["a"],{type:"primary",style:{marginLeft:8},onClick:this.handleConfirmExport},"\u5bfc\u51fa"),T.a.createElement(d["a"],{style:{marginLeft:8},onClick:this.handleAdvanceSearch},"\u9ad8\u7ea7\u68c0\u7d22"),T.a.createElement(d["a"],{style:{marginLeft:8},onClick:this.handleFormReset},"\u91cd\u7f6e")))),T.a.createElement(h["a"],{gutter:{md:8,lg:24,xl:48}},T.a.createElement(v["a"],{span:4},T.a.createElement(w["a"].Item,{labelCol:{span:4},wrapperCol:{span:6},colon:!1},e("statisticFields",{})(T.a.createElement(M["a"],{placeholder:"\u9009\u62e9\u5b57\u6bb5"},T.a.createElement(j,{value:"reportdate"},"\u59d4\u6258\u65e5\u671f"),T.a.createElement(j,{value:"\u68c0\u67e5\u5b8c\u6bd5"},"\u68c0\u67e5\u5b8c\u6bd5"),T.a.createElement(j,{value:"\u6d4b\u8bd5\u5b8c\u6bd5"},"\u6d4b\u8bd5\u5b8c\u6bd5"),T.a.createElement(j,{value:"\u62df\u8bc1\u5b8c\u6bd5"},"\u8bc1\u4e66\u5b8c\u6bd5"),T.a.createElement(j,{value:"\u5df2\u53d1\u5e03"},"\u53d1\u5e03\u65e5\u671f"))))),T.a.createElement(v["a"],{span:7},T.a.createElement(w["a"].Item,{labelCol:{span:5},wrapperCol:{span:6},colon:!1},e("statisticDateRange",{})(T.a.createElement(t,{format:"YYYY-MM-DD"})))),T.a.createElement(v["a"],{span:13},T.a.createElement(w["a"].Item,{label:"\u6536\u8d39\u72b6\u6001\uff1a",labelCol:{span:5},wrapperCol:{span:6}},e("status",{rules:[],initialValue:"\u5168\u90e8"})(T.a.createElement(m["a"].Group,{buttonStyle:"solid"},T.a.createElement(m["a"].Button,{value:"\u5168\u90e8"},"\u5168\u90e8"),T.a.createElement(m["a"].Button,{value:"\u672a\u5b9a\u4ef7"},"\u672a\u5b9a\u4ef7"),T.a.createElement(m["a"].Button,{value:"\u672a\u5f00\u7968"},"\u672a\u5f00\u7968"),T.a.createElement(m["a"].Button,{value:"\u5df2\u5f00\u7968"},"\u5df2\u5f00\u7968"),T.a.createElement(m["a"].Button,{value:"\u672a\u5230\u8d26"},"\u672a\u5230\u8d26"),T.a.createElement(m["a"].Button,{value:"\u5df2\u6536\u8bab"},"\u5df2\u6536\u8bab")))))))}},{key:"render",value:function(){var e=this,t=this.props.loading,a=this.state.selectBusinessIncomesByConditionsResult,s=this.props.form,n=s.getFieldDecorator,l=s.getFieldValue;n("keys",{initialValue:[]});var o=l("keys"),m=o.map(function(t,a){return T.a.createElement("div",null,a%2===0&&0!==o.length?T.a.createElement(h["a"],{className:Q.a.rowClass}):null,T.a.createElement(v["a"],{md:1,sm:20},T.a.createElement(w["a"].Item,{labelCol:{span:5},wrapperCol:{span:6},colon:!1},n("check".concat(t),{initialValue:!0,valuePropName:"checked"})(T.a.createElement(p["a"],{checkedChildren:"\u5f00",unCheckedChildren:"\u5173",defaultChecked:!0})))),T.a.createElement(v["a"],{md:3,sm:20},T.a.createElement(w["a"].Item,{style:{marginRight:8},labelCol:{span:5},wrapperCol:{span:6}},n("kinds".concat(t),{rules:[{message:"\u9009\u62e9\u5b57\u6bb5"}]})(T.a.createElement(M["a"],{placeholder:"\u9009\u62e9\u5b57\u6bb5",style:{width:"100%"}},T.a.createElement(j,{value:"m.reportno"}," \u59d4\u6258\u7f16\u53f7"),T.a.createElement(j,{value:"m.reportno20"}," \u81ea\u7f16\u53f7"),T.a.createElement(j,{value:"m.shipname"}," \u8239\u540d\u6807\u8bc6"),T.a.createElement(j,{value:"m.applicant"},"\u59d4\u6258\u4eba"),T.a.createElement(j,{value:"m.agent"},"\u4ee3\u7406\u4eba"),T.a.createElement(j,{value:"m.payer"},"\u4ed8\u6b3e\u4eba"),T.a.createElement(j,{value:"m.inspway"},"\u68c0\u67e5\u9879\u76ee"),T.a.createElement(j,{value:"m.businesssort"},"\u4e1a\u52a1\u7c7b\u522b"),T.a.createElement(j,{value:"m.businesssource"},"\u4e1a\u52a1\u6765\u6e90"),T.a.createElement(j,{value:"m.tradeway"},"\u8d38\u6613\u65b9\u5f0f"),T.a.createElement(j,{value:"m.cargoname"},"\u68c0\u67e5\u54c1\u540d"),T.a.createElement(j,{value:"m.cargosort"},"\u8d27\u7269\u79cd\u7c7b"),T.a.createElement(j,{value:"m.cnasProject"},"CNAS\u68c0\u67e5\u9879\u76ee"),T.a.createElement(j,{value:"m.cnasCode"},"CNAS\u7f16\u7801"),T.a.createElement(j,{value:"m.inspectplace"},"\u68c0\u9a8c\u5730\u70b9"),T.a.createElement(j,{value:"m.section"},"\u6267\u884c\u90e8\u95e8"))))),T.a.createElement(v["a"],{md:3,sm:20},T.a.createElement(w["a"].Item,{style:{marginRight:8},labelCol:{span:5},wrapperCol:{span:6}},n("conditions".concat(t),{rules:[{message:"\u9009\u62e9\u6761\u4ef6"}]})(T.a.createElement(M["a"],{placeholder:"\u9009\u62e9\u6761\u4ef6",style:{width:"100%"}},T.a.createElement(j,{value:"="},"\u7b49\u4e8e"),T.a.createElement(j,{value:"!="},"\u4e0d\u7b49\u4e8e"),T.a.createElement(j,{value:"like"},"\u5305\u542b"),T.a.createElement(j,{value:"not like"},"\u4e0d\u5305\u542b"))))),T.a.createElement(v["a"],{md:4,sm:10},T.a.createElement(W,null,n("values".concat(t),{rules:[{message:"\u9009\u62e9\u6570\u503c"}]})(T.a.createElement(u["a"],{placeholder:"\u8bf7\u8f93\u5165"})))),T.a.createElement(v["a"],{md:1,sm:5},o.length>=1?T.a.createElement(c["a"],{style:{fontSize:24,marginLeft:8},type:"minus-circle",theme:"twoTone",twoToneColor:"#ff0000",onClick:function(){return e.remove(t)}}):null))});return T.a.createElement(L["a"],null,T.a.createElement(i["a"],{bordered:!1,size:"small"},T.a.createElement("div",{className:A.a.tableList},T.a.createElement("div",{className:A.a.tableListForm},this.renderSimpleForm()),T.a.createElement(h["a"],{className:A.a.tableListForm},m),T.a.createElement(r["a"],{style:{marginTop:5},size:"middle",loading:t,dataSource:a,columns:this.columns,rowKey:"listno",pagination:{showQuickJumper:!0,showSizeChanger:!0}}))))}}]),a}(S["PureComponent"]),l=o))||l)||l);t["default"]=K}}]);