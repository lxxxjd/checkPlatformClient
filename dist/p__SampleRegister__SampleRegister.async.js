(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[125],{"7Q3K":function(e,t,a){"use strict";a.r(t);a("IzEo");var n,r,l,o,i=a("bx4M"),s=(a("g9YV"),a("wCAj")),c=(a("14J3"),a("BMrR")),m=(a("+L6B"),a("2/Rp")),u=(a("5NDa"),a("5rEg")),p=(a("jCWc"),a("kPKH")),d=a("p0pE"),f=a.n(d),v=a("2Taf"),g=a.n(v),E=a("vZ4D"),h=a.n(E),y=a("l4Ni"),S=a.n(y),D=a("ujKo"),I=a.n(D),R=a("MhPg"),C=a.n(R),w=(a("OaEy"),a("2fM7")),k=(a("y8nQ"),a("Vl3Y")),b=a("q1tI"),x=a.n(b),F=a("MuoO"),M=a("3a4m"),N=a.n(M),Y=a("wd/R"),J=a.n(Y),O=a("zHco"),V=a("glGN"),z=a.n(V);function j(e){return function(){var t,a=I()(e);if(K()){var n=I()(this).constructor;t=Reflect.construct(a,arguments,n)}else t=a.apply(this,arguments);return S()(this,t)}}function K(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],function(){})),!0}catch(e){return!1}}var L=k["a"].Item,P=w["a"].Option,B=(n=Object(F["connect"])(function(e){var t=e.sample,a=e.loading;return{sample:t,loading:a.models.sample}}),r=k["a"].create(),n(l=r((o=function(e){C()(a,e);var t=j(a);function a(){var e;g()(this,a);for(var n=arguments.length,r=new Array(n),l=0;l<n;l++)r[l]=arguments[l];return e=t.call.apply(t,[this].concat(r)),e.state={formValues:{}},e.columns=[{title:"\u59d4\u6258\u7f16\u53f7",dataIndex:"reportno"},{title:"\u59d4\u6258\u65e5\u671f",dataIndex:"reportdate",render:function(e){return x.a.createElement("span",null,J()(e).format("YYYY-MM-DD"))}},{title:"\u59d4\u6258\u4eba",dataIndex:"applicant"},{title:"\u8239\u540d\u6807\u8bc6",dataIndex:"shipname"},{title:"\u68c0\u67e5\u54c1\u540d",dataIndex:"cargoname"},{title:"\u72b6\u6001\u65e5\u671f",dataIndex:"overalltime",render:function(t){return e.isValidDate(t)}},{title:"\u72b6\u6001",dataIndex:"overallstate"},{title:"\u6837\u54c1\u7f16\u53f7",dataIndex:"sampleno",render:function(e,t){var a=[];if(void 0===e||null===e||""===e)return null;if(a=e.split(" "),a.length<2)return e;for(var n=null,r=x.a.createElement("br",null),l=0;l<a.length;l++)n=0===l?a[l]:l%1===0?x.a.createElement("span",null,n,r,a[l]):x.a.createElement("span",null,n,"\xa0",a[l]);return x.a.createElement("div",null,n)}},{title:"\u64cd\u4f5c",render:function(t,a){return x.a.createElement(b["Fragment"],null,"\u7533\u8bf7\u4f5c\u5e9f"===t.overallstate||"\u5df2\u53d1\u5e03"===t.overallstate?[x.a.createElement("a",{onClick:function(){return e.toRegisterDetail(t,a)}},"\u67e5\u770b\xa0\xa0")]:[x.a.createElement("a",{onClick:function(){return e.toRegisterDetail(t,a)}},"\u6837\u54c1\u767b\u8bb0\xa0\xa0")],x.a.createElement("a",{onClick:function(){return e.previewItem(t,a)}},"\u59d4\u6258\u8be6\u60c5"))}}],e.isValidDate=function(e){return void 0!==e&&null!==e?x.a.createElement("span",null,J()(e).format("YYYY-MM-DD")):[]},e.previewItem=function(e){localStorage.setItem("reportDetailNo",e.reportno),window.open("/Entrustment/DetailForEntrustment")},e.toRegisterDetail=function(e){sessionStorage.setItem("reportSampleRegisterDetailNo",e.reportno),sessionStorage.setItem("reportSampleRegisterDetail_overallstate",e.overallstate),N.a.push({pathname:"/SampleRegister/SampleRegisterDetail"})},e.handleFormReset=function(){var t=e.props.form;t.resetFields(),e.setState({formValues:{}}),e.init()},e.init=function(){var t=JSON.parse(localStorage.getItem("userinfo")),a=e.props.dispatch,n={certCode:t.certCode,nameC:t.nameC,role:t.role};a({type:"sample/getSampleRegister",payload:n})},e.handleSearch=function(t){t.preventDefault();var a=e.props,n=a.dispatch,r=a.form;r.validateFields(function(e,t){if(console.log(e),!e){var a=JSON.parse(localStorage.getItem("userinfo")),r=f()({},t,{kind:t.kind,value:t.value,certCode:a.certCode,nameC:a.nameC,role:a.role});n({type:"sample/getSampleRegister",payload:r})}})},e}return h()(a,[{key:"componentDidMount",value:function(){this.init()}},{key:"renderSimpleForm",value:function(){var e=this.props.form.getFieldDecorator;return x.a.createElement(k["a"],{onSubmit:this.handleSearch,layout:"inline"},x.a.createElement(c["a"],{gutter:{md:8,lg:24,xl:48}},x.a.createElement(p["a"],{md:4,sm:20},x.a.createElement(k["a"].Item,{labelCol:{span:5},wrapperCol:{span:6},colon:!1},e("kind",{initial:"shipname",rules:[{message:"\u641c\u7d22\u7c7b\u578b"}]})(x.a.createElement(w["a"],{placeholder:"\u641c\u7d22\u7c7b\u578b"},x.a.createElement(P,{value:"reportno"},"\u59d4\u6258\u7f16\u53f7"),x.a.createElement(P,{value:"applicant"},"\u59d4\u6258\u4eba"),x.a.createElement(P,{value:"agent"},"\u4ee3\u7406\u4eba"),x.a.createElement(P,{value:"shipname"},"\u8239\u540d\u6807\u8bc6"),x.a.createElement(P,{value:"cargoname"},"\u68c0\u67e5\u54c1\u540d"),x.a.createElement(P,{value:"overallstate"},"\u72b6\u6001"))))),x.a.createElement(p["a"],{md:6,sm:20},x.a.createElement(L,null,e("value",{rules:[{message:"\u641c\u7d22\u6570\u636e"}]})(x.a.createElement(u["a"],{placeholder:"\u8bf7\u8f93\u5165"})))),x.a.createElement(p["a"],{md:8,sm:20},x.a.createElement("span",{className:z.a.submitButtons},x.a.createElement(m["a"],{type:"primary",htmlType:"submit"},"\u67e5\u8be2"),x.a.createElement(m["a"],{style:{marginLeft:8},onClick:this.handleFormReset},"\u91cd\u7f6e")))))}},{key:"render",value:function(){var e=this.props,t=e.sample.data,a=e.loading;return x.a.createElement(O["a"],{title:"\u6837\u54c1\u767b\u8bb0"},x.a.createElement(i["a"],{bordered:!1,size:"small"},x.a.createElement("div",{className:z.a.tableList},x.a.createElement("div",{className:z.a.tableListForm},this.renderSimpleForm()),x.a.createElement(s["a"],{size:"middle",rowKey:"reportno",loading:a,dataSource:t.list,pagination:{showQuickJumper:!0,showSizeChanger:!0},columns:this.columns}))))}}]),a}(b["PureComponent"]),l=o))||l)||l);t["default"]=B}}]);