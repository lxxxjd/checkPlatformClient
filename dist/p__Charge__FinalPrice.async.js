(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[40],{"/TAa":function(e,t,a){"use strict";a.r(t);a("2qtc");var n,r,o,l,i=a("kLXV"),c=(a("bP8k"),a("gFTJ")),s=(a("IzEo"),a("bx4M")),m=(a("g9YV"),a("wCAj")),p=(a("14J3"),a("BMrR")),u=(a("+L6B"),a("2/Rp")),d=(a("5NDa"),a("5rEg")),g=(a("jCWc"),a("kPKH")),h=a("p0pE"),f=a.n(h),E=(a("/xke"),a("TeRw")),v=a("2Taf"),y=a.n(v),I=a("vZ4D"),S=a.n(I),b=a("l4Ni"),k=a.n(b),C=a("ujKo"),w=a.n(C),F=a("MhPg"),M=a.n(F),R=(a("OaEy"),a("2fM7")),D=(a("y8nQ"),a("Vl3Y")),P=a("q1tI"),x=a.n(P),N=a("MuoO"),J=a("3a4m"),O=a.n(J),z=a("zHco"),Y=a("glGN"),q=a.n(Y),L=a("wd/R"),T=a.n(L);function V(e){return function(){var t,a=w()(e);if(j()){var n=w()(this).constructor;t=Reflect.construct(a,arguments,n)}else t=a.apply(this,arguments);return k()(this,t)}}function j(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],function(){})),!0}catch(e){return!1}}var A=D["a"].Item,B=R["a"].Option,K=(n=Object(N["connect"])(function(e){var t=e.charge,a=e.loading;return{charge:t,loading:a.models.charge}}),r=D["a"].create(),n(o=r((l=function(e){M()(a,e);var t=V(a);function a(){var e;y()(this,a);for(var n=arguments.length,r=new Array(n),o=0;o<n;o++)r[o]=arguments[o];return e=t.call.apply(t,[this].concat(r)),e.state={formValues:{},visible:!1,priceMaking:{}},e.columns=[{title:"\u59d4\u6258\u7f16\u53f7",dataIndex:"reportno"},{title:"\u59d4\u6258\u65e5\u671f",dataIndex:"reportdate",render:function(e){return x.a.createElement("span",null,T()(e).format("YYYY-MM-DD"))}},{title:"\u59d4\u6258\u4eba",dataIndex:"applicant"},{title:"\u8239\u540d\u6807\u8bc6",dataIndex:"shipname"},{title:"\u68c0\u67e5\u54c1\u540d",dataIndex:"cargoname"},{title:"\u603b\u4ef7",dataIndex:"total"},{title:"\u72b6\u6001",dataIndex:"status"},{title:"\u64cd\u4f5c",render:function(t,a){return x.a.createElement(P["Fragment"],null,x.a.createElement("a",{onClick:function(){return e.mobileItem(t,a)}},"\u7f16\u8f91"),"\xa0\xa0","\u5df2\u5b9a\u4ef7"===t.status?[x.a.createElement("a",{onClick:function(){return e.detailItem(t,a)}},"\u67e5\u770b\xa0\xa0")]:[],x.a.createElement("a",{onClick:function(){return e.previewItem(t,a)}},"\u59d4\u6258\u8be6\u60c5"))}}],e.detailItem=function(t){var a=e.props.dispatch,n=t.reportno;a({type:"charge/getPriceMaking",payload:{reportNo:n},callback:function(t){200===t.code?(e.setState({priceMaking:t.data}),e.setState({visible:!0})):E["a"].open({message:"\u83b7\u53d6\u5931\u8d25",description:t.message})}})},e.previewItem=function(e){sessionStorage.setItem("reportno",e.reportno),localStorage.setItem("reportDetailNo",e.reportno),O.a.push({pathname:"/Entrustment/DetailForEntrustment"})},e.mobileItem=function(e){sessionStorage.setItem("reportno",e.reportno),sessionStorage.setItem("reportdate",e.reportdate),sessionStorage.setItem("applicant",e.applicant),sessionStorage.setItem("cargoname",e.cargoname),sessionStorage.setItem("inspway",e.inspway),sessionStorage.setItem("FinalPriceOrigin","FinalPrice"),sessionStorage.setItem("quantityd",e.quantityd),"\u672a\u5b9a\u4ef7"===e.status?O.a.push({pathname:"/Charge/FinalPriceAdd"}):O.a.push({pathname:"/Charge/FinalPriceDetail"})},e.handleFormReset=function(){var t=e.props.form;t.resetFields(),e.setState({formValues:{}});var a=JSON.parse(localStorage.getItem("userinfo")).certCode,n=e.props.dispatch;n({type:"charge/getReportPriceMaking",payload:{certCode:a}})},e.handleSearch=function(t){t.preventDefault();var a=e.props,n=a.dispatch,r=a.form,o=JSON.parse(localStorage.getItem("userinfo")).certCode;r.validateFields(function(e,t){if(console.log(e),!e){var a=f()({},t,{certCode:o,kind:t.kind,value:t.value});n({type:"charge/getReportPriceMaking",payload:a})}})},e.handleCancel=function(){e.setState({visible:!1})},e}return S()(a,[{key:"componentDidMount",value:function(){var e=this.props.dispatch,t=JSON.parse(localStorage.getItem("userinfo")).certCode;e({type:"charge/getReportPriceMaking",payload:{certCode:t}})}},{key:"renderSimpleForm",value:function(){var e=this.props.form.getFieldDecorator;return x.a.createElement(D["a"],{onSubmit:this.handleSearch,layout:"inline"},x.a.createElement(p["a"],{gutter:{md:8,lg:24,xl:48}},x.a.createElement(g["a"],{md:4,sm:20},x.a.createElement(D["a"].Item,{labelCol:{span:5},wrapperCol:{span:6},colon:!1},e("kind",{rules:[{message:"\u641c\u7d22\u7c7b\u578b"}]})(x.a.createElement(R["a"],{placeholder:"\u641c\u7d22\u7c7b\u578b"},x.a.createElement(B,{value:"reportno"},"\u59d4\u6258\u7f16\u53f7"),x.a.createElement(B,{value:"applicant"},"\u59d4\u6258\u4eba"),x.a.createElement(B,{value:"shipname"},"\u8239\u540d\u6807\u8bc6"),x.a.createElement(B,{value:"cargoname"},"\u68c0\u67e5\u54c1\u540d"))))),x.a.createElement(g["a"],{md:6,sm:20},x.a.createElement(A,null,e("value",{rules:[{message:"\u641c\u7d22\u6570\u636e"}]})(x.a.createElement(d["a"],{placeholder:"\u8bf7\u8f93\u5165"})))),x.a.createElement(g["a"],{md:8,sm:20},x.a.createElement("span",{className:q.a.submitButtons},x.a.createElement(u["a"],{type:"primary",htmlType:"submit"},"\u67e5\u8be2"),x.a.createElement(u["a"],{style:{marginLeft:8},onClick:this.handleFormReset},"\u91cd\u7f6e")))))}},{key:"render",value:function(){var e=this.props,t=e.charge.finalData,a=e.loading,n=this.state,r=n.visible,o=n.priceMaking;return x.a.createElement(z["a"],{title:"\u6837\u54c1\u6307\u6807"},x.a.createElement(s["a"],{bordered:!1,size:"small"},x.a.createElement("div",{className:q.a.tableList},x.a.createElement("div",{className:q.a.tableListForm},this.renderSimpleForm()),x.a.createElement(m["a"],{size:"middle",loading:a,dataSource:t,pagination:{showQuickJumper:!0,showSizeChanger:!0},columns:this.columns,rowKey:"reportno"}))),x.a.createElement(i["a"],{title:"\u5b9a\u4ef7\u8be6\u60c5",visible:r,onCancel:this.handleCancel,footer:null,width:800},x.a.createElement(c["a"],{size:"large",title:"\u5b9a\u4ef7",style:{marginBottom:32},bordered:!0},x.a.createElement(c["a"].Item,{label:"\u5b9a\u4ef7\u65b9\u5f0f"},o.priceway),x.a.createElement(c["a"].Item,{label:"\u9879\u76ee"},o.choose),x.a.createElement(c["a"].Item,{label:"\u5355\u4ef7"},o.price),x.a.createElement(c["a"].Item,{label:"\u6570\u91cf"},o.quantity),x.a.createElement(c["a"].Item,{label:"\u603b\u4ef7"},o.total))))}}]),a}(P["PureComponent"]),o=l))||o)||o);t["default"]=K}}]);