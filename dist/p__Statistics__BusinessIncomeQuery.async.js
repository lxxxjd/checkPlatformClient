(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[129],{A7Xz:function(e,t,a){"use strict";a.r(t);a("IzEo");var n,s,l,o,i=a("bx4M"),r=(a("g9YV"),a("wCAj")),c=(a("Pwec"),a("CtXQ")),u=(a("5NDa"),a("5rEg")),m=(a("BoS7"),a("Sdc0")),d=(a("+L6B"),a("2/Rp")),p=(a("14J3"),a("BMrR")),h=(a("jCWc"),a("kPKH")),v=(a("iQDF"),a("+eQT")),f=(a("miYZ"),a("tsqr")),g=(a("2qtc"),a("kLXV")),y=a("2Taf"),E=a.n(y),C=a("vZ4D"),D=a.n(C),Y=a("l4Ni"),k=a.n(Y),I=a("ujKo"),F=a.n(I),R=a("MhPg"),b=a.n(R),B=(a("y8nQ"),a("Vl3Y")),M=(a("OaEy"),a("2fM7")),w=a("q1tI"),S=a.n(w),V=a("MuoO"),T=a("3a4m"),x=a.n(T),N=a("wd/R"),L=a.n(N),O=a("zHco"),A=a("glGN"),J=a.n(A),Q=a("ZzZo"),z=a.n(Q);function P(e){return function(){var t,a=F()(e);if(j()){var n=F()(this).constructor;t=Reflect.construct(a,arguments,n)}else t=a.apply(this,arguments);return k()(this,t)}}function j(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],function(){})),!0}catch(e){return!1}}var W=M["a"].Option,q=B["a"].Item,Z=0,K=(n=B["a"].create(),s=Object(V["connect"])(function(e){var t=e.businessIncome,a=e.loading;return{businessIncome:t,loading:a.models.businessIncome}}),n(l=s((o=function(e){b()(a,e);var t=P(a);function a(){var e;E()(this,a);for(var n=arguments.length,s=new Array(n),l=0;l<n;l++)s[l]=arguments[l];return e=t.call.apply(t,[this].concat(s)),e.state={selectBusinessIncomesByConditionsResult:[],selectBusinessIncomeTotalByConditionsResult:{}},e.columns=[{title:"\u59d4\u6258\u7f16\u53f7",dataIndex:"reportNo"},{title:"\u59d4\u6258\u65e5\u671f",dataIndex:"reportDate",render:function(e){return S.a.createElement("span",null,L()(e).format("YYYY-MM-DD"))}},{title:"\u7533\u8bf7\u4eba",dataIndex:"applicant"},{title:"\u68c0\u67e5\u54c1\u540d",dataIndex:"cargoName"},{title:"\u7533\u62a5\u6570\u91cf",dataIndex:"quantityD"},{title:"\u68c0\u67e5\u9879\u76ee",dataIndex:"inspWay"},{title:"\u68c0\u9a8c\u8d39",dataIndex:"total"},{title:"\u6e05\u5355\u53f7",dataIndex:"listNo"},{title:"\u5230\u8d26\u72b6\u6001",dataIndex:"payStatus"},{title:"\u72b6\u6001",dataIndex:"overAllState"},{title:"\u64cd\u4f5c",render:function(t,a){return S.a.createElement(w["Fragment"],null,S.a.createElement("a",{onClick:function(){return e.previewItem(t)}},"\u67e5\u770b"))}}],e.init=function(){var t=e.props.dispatch,a=JSON.parse(localStorage.getItem("userinfo"));t({type:"businessIncome/selectBusinessIncomesByConditionsInit",payload:{certCode:a.certCode},callback:function(n){e.state.selectBusinessIncomesByConditionsResult=n;var s={kinds:[],values:[],conditions:[],certCode:a.certCode};t({type:"businessIncome/selectBusinessIncomeTotalByConditions",payload:s,callback:function(t){e.state.selectBusinessIncomeTotalByConditionsResult=t}})}})},e.previewItem=function(e){sessionStorage.setItem("reportno",e.reportNo),x.a.push({pathname:"BusinessIncomeDetail"})},e.handleSearch=function(t){t.preventDefault();var a=e.props,n=a.dispatch,s=a.form;s.validateFields(function(t,a){if(t)console.log(t);else{var l=JSON.parse(localStorage.getItem("userinfo")),o=[],i=[],r=[];void 0!==a.statisticFields&&void 0!==a.statisticDateRange&&0!==a.statisticDateRange.length&&("reportdate"===a.statisticFields?(o.push("m.reportdate"),o.push("m.reportdate"),r.push(">="),i.push(L()(a.statisticDateRange[0]).format("YYYY-MM-DD")),r.push("<="),i.push(L()(a.statisticDateRange[1]).format("YYYY-MM-DD"))):(o.push("m.overalltime"),o.push("m.overalltime"),o.push("m.overallstate"),r.push(">="),i.push(L()(a.statisticDateRange[0]).format("YYYY-MM-DD")),r.push("<="),i.push(L()(a.statisticDateRange[1]).format("YYYY-MM-DD")),r.push("="),i.push(a.statisticFields)));var c=s.getFieldValue("keys");for(var u in c){var m=c[u];console.log(m);var d=s.getFieldValue("kinds".concat(m)),p=s.getFieldValue("conditions".concat(m)),h=s.getFieldValue("values".concat(m)),v=s.getFieldValue("check".concat(m));!0===v&&void 0!==d&&void 0!==h&&void 0!==p&&(o.push(d),i.push(h),r.push(p))}var f={kinds:o,values:i,conditions:r,certCode:l.certCode};n({type:"businessIncome/selectBusinessIncomesByConditions",payload:f,callback:function(t){e.state.selectBusinessIncomesByConditionsResult=t,n({type:"businessIncome/selectBusinessIncomeTotalByConditions",payload:f,callback:function(t){e.state.selectBusinessIncomeTotalByConditionsResult=t}})}})}})},e.handleTotalSearch=function(t){t.preventDefault();var a=e.props,n=a.dispatch,s=a.form;s.validateFields(function(t,a){if(t)console.log(t);else{var l=JSON.parse(localStorage.getItem("userinfo")),o=[],i=[],r=[];void 0!==a.statisticFields&&void 0!==a.statisticDateRange&&0!==a.statisticDateRange.length&&("reportdate"===a.statisticFields?(o.push("m.reportdate"),o.push("m.reportdate"),r.push(">="),i.push(L()(a.statisticDateRange[0]).format("YYYY-MM-DD")),r.push("<="),i.push(L()(a.statisticDateRange[1]).format("YYYY-MM-DD"))):(o.push("m.overalltime"),o.push("m.overalltime"),o.push("m.overallstate"),r.push(">="),i.push(L()(a.statisticDateRange[0]).format("YYYY-MM-DD")),r.push("<="),i.push(L()(a.statisticDateRange[1]).format("YYYY-MM-DD")),r.push("="),i.push(a.statisticFields)));var c=s.getFieldValue("keys");for(var u in c){var m=c[u];console.log(m);var d=s.getFieldValue("kinds".concat(m)),p=s.getFieldValue("conditions".concat(m)),h=s.getFieldValue("values".concat(m)),v=s.getFieldValue("check".concat(m));!0===v&&void 0!==d&&void 0!==h&&void 0!==p&&(o.push(d),i.push(h),r.push(p))}var f={kinds:o,values:i,conditions:r,certCode:l.certCode};n({type:"businessIncome/selectBusinessIncomeTotalByConditions",payload:f,callback:function(t){e.state.selectBusinessIncomeTotalByConditionsResult=t}})}})},e.handleConfirmExport=function(t){var a=e.props.form;g["a"].confirm({title:"\u786e\u5b9a\u8981\u5bfc\u51fa\u4e1a\u52a1\u8bb0\u5f55\u5417\uff1f",okText:"\u786e\u8ba4",cancelText:"\u53d6\u6d88",onOk:function(){e.handleExport(t,a)}})},e.handleExport=function(e,t){e.preventDefault(),t.validateFields(function(e,a){if(e)console.log(e);else{var n=JSON.parse(localStorage.getItem("userinfo")),s=[],l=[],o=[];void 0!==a.statisticFields&&void 0!==a.statisticDateRange&&0!==a.statisticDateRange.length&&("reportdate"===a.statisticFields?(s.push("m.reportdate"),s.push("m.reportdate"),o.push(">="),l.push(L()(a.statisticDateRange[0]).format("YYYY-MM-DD")),o.push("<="),l.push(L()(a.statisticDateRange[1]).format("YYYY-MM-DD"))):(s.push("m.overalltime"),s.push("m.overalltime"),s.push("m.overallstate"),o.push(">="),l.push(L()(a.statisticDateRange[0]).format("YYYY-MM-DD")),o.push("<="),l.push(L()(a.statisticDateRange[1]).format("YYYY-MM-DD")),o.push("="),l.push(a.statisticFields)));var i=t.getFieldValue("keys");for(var r in i){var c=i[r];console.log(c);var u=t.getFieldValue("kinds".concat(c)),m=t.getFieldValue("conditions".concat(c)),d=t.getFieldValue("values".concat(c)),p=t.getFieldValue("check".concat(c));!0===p&&void 0!==u&&void 0!==d&&void 0!==m&&(s.push(u),l.push(d),o.push(m))}var h={kinds:s,values:l,conditions:o,certCode:n.certCode};f["a"].success("\u6b63\u5728\u4e0b\u8f7d\u6587\u4ef6\uff0c\u8bf7\u7a0d\u540e\uff01");var v="/api/template/downloadBusinessIncomesAsExcelByConditions";fetch(v,{method:"post",headers:{"Content-Type":"application/json"},body:JSON.stringify(h)}).then(function(e){e.blob().then(function(e){var t=window.URL.createObjectURL(e),a="\u5bfc\u51fa\u8bb0\u5f55.xls",n=document.createElement("a");document.body.appendChild(n),n.style.display="none",n.href=t,n.download=a,n.click(),document.body.removeChild(n)})}).catch(function(e){console.log("\u6587\u4ef6\u4e0b\u8f7d\u5931\u8d25",e)})}})},e.handleFormReset=function(){var t=e.props.form;t.resetFields(),e.init()},e.remove=function(t){var a=e.props.form,n=a.getFieldValue("keys");e.props.form.validateFields(function(e,t){}),a.setFieldsValue({keys:n.filter(function(e){return e!==t})})},e.add=function(){var t=e.props.form,a=t.getFieldValue("keys"),n=a.concat(Z++);t.setFieldsValue({keys:n})},e.flag=0,e.handleAdvanceSearch=function(){if(0===e.flag){var t=4;while(t>0)e.add(),t--;e.flag=1}},e}return D()(a,[{key:"componentDidMount",value:function(){this.init()}},{key:"renderSimpleForm",value:function(){var e=this.props.form.getFieldDecorator,t=v["a"].RangePicker,a=this.state.selectBusinessIncomeTotalByConditionsResult;return S.a.createElement(B["a"],{onSubmit:this.handleSearch,layout:"inline"},S.a.createElement("h3",{style:{margin:5,fontWeight:"bold"}},"\u7edf\u8ba1\u7ed3\u679c:"),S.a.createElement(p["a"],{gutter:16,style:{marginBottom:5,marginLeft:100,marginRight:100}},S.a.createElement(h["a"],{span:8},S.a.createElement("h4",{style:{fontWeight:"bold"}},"\u7533\u62a5\u6570\u91cf\u603b\u548c\uff1a",void 0===a.declaredQuantityTotal?"":a.declaredQuantityTotal)),S.a.createElement(h["a"],{span:8},S.a.createElement("h4",{style:{fontWeight:"bold"}},"\u6279\u6b21\u603b\u548c\uff08\u6279\uff09\uff1a",void 0===a.recordQuantityTotal?"":a.recordQuantityTotal)),S.a.createElement(h["a"],{span:8},S.a.createElement("h4",{style:{fontWeight:"bold"}},"\u68c0\u9a8c\u8d39\u603b\u548c\uff08\u5143\uff09\uff1a",void 0===a.inspectionCostTotal?"":a.inspectionCostTotal))),S.a.createElement(p["a"],{gutter:{md:8,lg:24,xl:48}},S.a.createElement(h["a"],{span:4},S.a.createElement(B["a"].Item,{labelCol:{span:5},wrapperCol:{span:6},colon:!1},e("statisticFields",{})(S.a.createElement(M["a"],{placeholder:"\u9009\u62e9\u5b57\u6bb5"},S.a.createElement(W,{value:"reportdate"},"\u59d4\u6258\u65e5\u671f"),S.a.createElement(W,{value:"\u68c0\u67e5\u5b8c\u6bd5"},"\u68c0\u67e5\u5b8c\u6bd5"),S.a.createElement(W,{value:"\u6d4b\u8bd5\u5b8c\u6bd5"},"\u6d4b\u8bd5\u5b8c\u6bd5"),S.a.createElement(W,{value:"\u62df\u8bc1\u5b8c\u6bd5"},"\u8bc1\u4e66\u5b8c\u6bd5"),S.a.createElement(W,{value:"\u5df2\u53d1\u5e03"},"\u53d1\u5e03\u65e5\u671f"))))),S.a.createElement(h["a"],{span:10},S.a.createElement(B["a"].Item,{labelCol:{span:5},wrapperCol:{span:6},colon:!1},e("statisticDateRange",{})(S.a.createElement(t,{format:"YYYY-MM-DD"})))),S.a.createElement(h["a"],{span:10},S.a.createElement("span",{className:J.a.submitButtons},S.a.createElement(d["a"],{type:"primary",htmlType:"submit"},"\u67e5\u8be2"),S.a.createElement(d["a"],{type:"primary",style:{marginLeft:8},onClick:this.handleTotalSearch},"\u67e5\u8be2\u603b\u989d"),S.a.createElement(d["a"],{type:"primary",style:{marginLeft:8},onClick:this.handleConfirmExport},"\u5bfc\u51fa"),S.a.createElement(d["a"],{style:{marginLeft:8},onClick:this.handleAdvanceSearch},"\u9ad8\u7ea7\u68c0\u7d22"),S.a.createElement(d["a"],{style:{marginLeft:8},onClick:this.handleFormReset},"\u91cd\u7f6e")))))}},{key:"render",value:function(){var e=this,t=this.props.loading,a=this.state.selectBusinessIncomesByConditionsResult,n=this.props.form,s=n.getFieldDecorator,l=n.getFieldValue;s("keys",{initialValue:[]});var o=l("keys"),d=o.map(function(t,a){return S.a.createElement("div",null,a%2===0&&0!==o.length?S.a.createElement(p["a"],{className:z.a.rowClass}):null,S.a.createElement(h["a"],{md:1,sm:20},S.a.createElement(B["a"].Item,{labelCol:{span:5},wrapperCol:{span:6},colon:!1},s("check".concat(t),{initialValue:!0,valuePropName:"checked"})(S.a.createElement(m["a"],{checkedChildren:"\u5f00",unCheckedChildren:"\u5173",defaultChecked:!0})))),S.a.createElement(h["a"],{md:3,sm:20},S.a.createElement(B["a"].Item,{style:{marginRight:8},labelCol:{span:5},wrapperCol:{span:6}},s("kinds".concat(t),{rules:[{message:"\u9009\u62e9\u5b57\u6bb5"}]})(S.a.createElement(M["a"],{placeholder:"\u9009\u62e9\u5b57\u6bb5",style:{width:"100%"}},S.a.createElement(W,{value:"m.reportno"}," \u59d4\u6258\u7f16\u53f7"),S.a.createElement(W,{value:"m.reportno20"}," \u81ea\u7f16\u53f7"),S.a.createElement(W,{value:"m.shipname"}," \u8239\u540d\u6807\u8bc6"),S.a.createElement(W,{value:"m.applicant"},"\u59d4\u6258\u4eba"),S.a.createElement(W,{value:"m.agent"},"\u4ee3\u7406\u4eba"),S.a.createElement(W,{value:"m.businesssort"},"\u4e1a\u52a1\u7c7b\u522b"),S.a.createElement(W,{value:"m.businesssource"},"\u4e1a\u52a1\u6765\u6e90"),S.a.createElement(W,{value:"m.tradeway"},"\u8d38\u6613\u65b9\u5f0f"),S.a.createElement(W,{value:"m.cargoname"},"\u68c0\u67e5\u54c1\u540d"),S.a.createElement(W,{value:"m.cargosort"},"\u8d27\u7269\u79cd\u7c7b"),S.a.createElement(W,{value:"m.cnasProject"},"CNAS\u68c0\u67e5\u9879\u76ee"),S.a.createElement(W,{value:"m.cnasCode"},"CNAS\u7f16\u7801"),S.a.createElement(W,{value:"m.inspectplace"},"\u68c0\u9a8c\u5730\u70b9"),S.a.createElement(W,{value:"m.section"},"\u6267\u884c\u90e8\u95e8"))))),S.a.createElement(h["a"],{md:3,sm:20},S.a.createElement(B["a"].Item,{style:{marginRight:8},labelCol:{span:5},wrapperCol:{span:6}},s("conditions".concat(t),{rules:[{message:"\u9009\u62e9\u6761\u4ef6"}]})(S.a.createElement(M["a"],{placeholder:"\u9009\u62e9\u6761\u4ef6",style:{width:"100%"}},S.a.createElement(W,{value:"="},"\u7b49\u4e8e"),S.a.createElement(W,{value:"!="},"\u4e0d\u7b49\u4e8e"),S.a.createElement(W,{value:"like"},"\u5305\u542b"),S.a.createElement(W,{value:"not like"},"\u4e0d\u5305\u542b"))))),S.a.createElement(h["a"],{md:4,sm:10},S.a.createElement(q,null,s("values".concat(t),{rules:[{message:"\u9009\u62e9\u6570\u503c"}]})(S.a.createElement(u["a"],{placeholder:"\u8bf7\u8f93\u5165"})))),S.a.createElement(h["a"],{md:1,sm:5},o.length>=1?S.a.createElement(c["a"],{style:{fontSize:24,marginLeft:8},type:"minus-circle",theme:"twoTone",twoToneColor:"#ff0000",onClick:function(){return e.remove(t)}}):null))});return S.a.createElement(O["a"],null,S.a.createElement(i["a"],{bordered:!1,size:"small"},S.a.createElement("div",{className:J.a.tableList},S.a.createElement("div",{className:J.a.tableListForm},this.renderSimpleForm()),S.a.createElement(p["a"],{className:J.a.tableListForm},d),S.a.createElement(r["a"],{size:"middle",loading:t,dataSource:a,columns:this.columns,rowKey:"listno",pagination:{showQuickJumper:!0,showSizeChanger:!0}}))))}}]),a}(w["PureComponent"]),l=o))||l)||l);t["default"]=K}}]);