(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[95],{R5TH:function(e,t,a){"use strict";a.r(t);a("IzEo");var n,r,o,l,c=a("bx4M"),s=(a("g9YV"),a("wCAj")),i=(a("14J3"),a("BMrR")),u=(a("+L6B"),a("2/Rp")),m=(a("5NDa"),a("5rEg")),p=(a("jCWc"),a("kPKH")),d=a("p0pE"),f=a.n(d),h=a("2Taf"),v=a.n(h),E=a("vZ4D"),g=a.n(E),y=a("l4Ni"),I=a.n(y),S=a("ujKo"),C=a.n(S),k=a("MhPg"),w=a.n(k),b=(a("OaEy"),a("2fM7")),R=(a("y8nQ"),a("Vl3Y")),F=a("q1tI"),D=a.n(F),N=a("MuoO"),O=a("3a4m"),x=a.n(O),M=a("zHco"),J=a("D6Ec"),j=a.n(J),z=a("wd/R"),T=a.n(z);function Y(e){return function(){var t,a=C()(e);if(P()){var n=C()(this).constructor;t=Reflect.construct(a,arguments,n)}else t=a.apply(this,arguments);return I()(this,t)}}function P(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],function(){})),!0}catch(e){return!1}}var V=R["a"].Item,B=b["a"].Option,H=function(e){return Object.keys(e).map(function(t){return e[t]}).join(",")},K=(n=Object(N["connect"])(function(e){var t=e.entrustment,a=e.loading;return{entrustment:t,loading:a.models.entrustment}}),r=R["a"].create(),n(o=r((l=function(e){w()(a,e);var t=Y(a);function a(){var e;v()(this,a);for(var n=arguments.length,r=new Array(n),o=0;o<n;o++)r[o]=arguments[o];return e=t.call.apply(t,[this].concat(r)),e.state={selectedRows:[],formValues:{}},e.columns=[{title:"\u59d4\u6258\u7f16\u53f7",dataIndex:"reportno"},{title:"\u59d4\u6258\u65e5\u671f",dataIndex:"reportdate",render:function(e){return D.a.createElement("span",null,T()(e).format("YYYY-MM-DD"))}},{title:"\u59d4\u6258\u4eba",dataIndex:"applicant"},{title:"\u8239\u540d\u6807\u8bc6",dataIndex:"shipname"},{title:"\u68c0\u67e5\u54c1\u540d",dataIndex:"cargoname"},{title:"\u72b6\u6001",dataIndex:"overallstate"},{title:"\u64cd\u4f5c",render:function(t,a){return D.a.createElement(F["Fragment"],null,"\u7533\u8bf7\u4f5c\u5e9f"!==t.overallstate&&"\u5df2\u53d1\u5e03"!==t.overallstate?[D.a.createElement("a",{onClick:function(){return e.modifyItem(t,a)}},"\u4fee\u6539\xa0\xa0")]:[],"\u7533\u8bf7\u4f5c\u5e9f"!==t.overallstate&&"\u5df2\u53d1\u5e03"!==t.overallstate?[D.a.createElement("a",{onClick:function(){return e.uploadItem(t,a)}},"\u4e0a\u4f20\u6587\u4ef6\xa0\xa0")]:[],D.a.createElement("a",{onClick:function(){return e.previewItem(t,a)}},"\u59d4\u6258\u8be6\u60c5"))}}],e.handleStandardTableChange=function(t,a,n){var r=e.props,o=r.dispatch,l=r.form,c=e.state.formValues;l.validateFields(function(e,r){console.log(e);var l=Object.keys(a).reduce(function(e,t){var n=f()({},e);return n[t]=H(a[t]),n},{}),s=JSON.parse(localStorage.getItem("userinfo")),i=f()({currentPage:t.current,pageSize:t.pageSize,certCode:s.certCode,kind:r.kind,value:r.value},c,l);n.field&&(i.sorter="".concat(n.field,"_").concat(n.order)),o({type:"entrustment/fetch",payload:i})})},e.uploadItem=function(e){sessionStorage.setItem("reportno",e.reportno),x.a.push({pathname:"/Entrustment/EntrustmentRecord"})},e.previewItem=function(e){sessionStorage.setItem("reportno",e.reportno),localStorage.setItem("reportDetailNo",e.reportno),x.a.push({pathname:"/Entrustment/DetailForEntrustment"})},e.modifyItem=function(e){sessionStorage.setItem("reportno",e.reportno),x.a.push({pathname:"/Entrustment/ModifyForEntrustment"})},e.copyItem=function(e){sessionStorage.setItem("reportno",e.reportno),x.a.push({pathname:"/Entrustment/copyForEntrustment"})},e.handleFormReset=function(){var t=JSON.parse(localStorage.getItem("userinfo")),a={certCode:t.certCode},n=e.props.form;n.resetFields(),e.setState({formValues:{}});var r=e.props.dispatch;r({type:"entrustment/fetch",payload:a})},e.handleSearch=function(t){t.preventDefault();var a=e.props,n=a.dispatch,r=a.form;r.validateFields(function(e,t){if(console.log(e),!e){var a=JSON.parse(localStorage.getItem("userinfo")),r=f()({},t,{kind:t.kind,value:t.value,certCode:a.certCode});n({type:"entrustment/fetch",payload:r})}})},e}return g()(a,[{key:"componentDidMount",value:function(){var e=JSON.parse(localStorage.getItem("userinfo")),t=this.props.dispatch,a={certCode:e.certCode};t({type:"entrustment/fetch",payload:a})}},{key:"renderSimpleForm",value:function(){var e=this.props.form.getFieldDecorator;return D.a.createElement(R["a"],{onSubmit:this.handleSearch,layout:"inline"},D.a.createElement(i["a"],{gutter:{md:8,lg:24,xl:48}},D.a.createElement(p["a"],{md:4,sm:20},D.a.createElement(R["a"].Item,{labelCol:{span:5},wrapperCol:{span:6},colon:!1},e("kind",{rules:[{message:"\u641c\u7d22\u7c7b\u578b"}]})(D.a.createElement(b["a"],{placeholder:"\u641c\u7d22\u7c7b\u578b"},D.a.createElement(B,{value:"reportno"},"\u59d4\u6258\u7f16\u53f7"),D.a.createElement(B,{value:"applicant"},"\u59d4\u6258\u4eba"),D.a.createElement(B,{value:"shipname"},"\u8239\u540d\u6807\u8bc6"),D.a.createElement(B,{value:"cargoname"},"\u68c0\u67e5\u54c1\u540d"),D.a.createElement(B,{value:"overallstate"},"\u72b6\u6001"))))),D.a.createElement(p["a"],{md:6,sm:20},D.a.createElement(V,null,e("value",{rules:[{message:"\u641c\u7d22\u6570\u636e"}]})(D.a.createElement(m["a"],{placeholder:"\u8bf7\u8f93\u5165"})))),D.a.createElement(p["a"],{md:8,sm:20},D.a.createElement("span",{className:j.a.submitButtons},D.a.createElement(u["a"],{type:"primary",htmlType:"submit"},"\u67e5\u8be2"),D.a.createElement(u["a"],{style:{marginLeft:8},onClick:this.handleFormReset},"\u91cd\u7f6e")))))}},{key:"render",value:function(){var e=this.props,t=e.entrustment.data,a=e.loading;this.state.selectedRows;return D.a.createElement(M["a"],null,D.a.createElement(c["a"],{size:"small",bordered:!1},D.a.createElement("div",null,D.a.createElement("div",{className:j.a.tableListForm},this.renderSimpleForm()),D.a.createElement(s["a"],{size:"middle",className:j.a.antTable,rowClassName:j.a.antTable2,loading:a,rowKey:"reportno",dataSource:t.list,columns:this.columns,pagination:{showQuickJumper:!0,showSizeChanger:!0}}))))}}]),a}(F["PureComponent"]),o=l))||o)||o);t["default"]=K}}]);