(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[98],{jAi5:function(e,t,a){e.exports={tableListForm:"antd-pro-pages-entrustment-search-tableListForm",submitButtons:"antd-pro-pages-entrustment-search-submitButtons"}},omad:function(e,t,a){"use strict";a.r(t);a("IzEo");var n,r,o,l=a("bx4M"),c=(a("g9YV"),a("wCAj")),s=a("2Taf"),i=a.n(s),u=a("vZ4D"),m=a.n(u),p=a("l4Ni"),f=a.n(p),d=a("ujKo"),h=a.n(d),g=a("MhPg"),v=a.n(g),I=(a("y8nQ"),a("Vl3Y")),y=a("q1tI"),E=a.n(y),S=a("MuoO"),b=a("3a4m"),D=a.n(b),k=a("zHco"),w=a("D6Ec"),C=a.n(w),R=a("wd/R"),x=a.n(R),N=(a("14J3"),a("BMrR")),F=(a("+L6B"),a("2/Rp")),M=(a("5NDa"),a("5rEg")),O=(a("jCWc"),a("kPKH")),j=a("p0pE"),J=a.n(j),L=(a("OaEy"),a("2fM7")),P=a("jAi5"),T=a.n(P);function Y(e){return function(){var t,a=h()(e);if(z()){var n=h()(this).constructor;t=Reflect.construct(a,arguments,n)}else t=a.apply(this,arguments);return f()(this,t)}}function z(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],function(){})),!0}catch(e){return!1}}var A,B,K,H,Q=I["a"].Item,V=L["a"].Option,q=(n=Object(S["connect"])(function(e){var t=e.testInfo,a=e.loading;return{testInfo:t,loading:a.models.testInfo}}),n((o=function(e){v()(a,e);var t=Y(a);function a(){var e;i()(this,a);for(var n=arguments.length,r=new Array(n),o=0;o<n;o++)r[o]=arguments[o];return e=t.call.apply(t,[this].concat(r)),e.handleSearch=function(t){t.preventDefault();var a=e.props,n=a.dispatch,r=a.form,o=a.setDataSource,l=JSON.parse(localStorage.getItem("userinfo")).certCode;r.validateFields(function(e,t){if(console.log(e),!e){var a=J()({},t,{certCode:l,kind:t.kind,value:t.value});n({type:"testInfo/getTestInfos",payload:a,callback:function(e){o(e.data.list)}})}})},e.handleFormReset=function(){var t=e.props,a=t.form,n=t.dispatch,r=t.setDataSource,o=JSON.parse(localStorage.getItem("userinfo")),l=o.certCode,c={certCode:l};n({type:"testInfo/getTestInfos",payload:c,callback:function(e){r(e.data.list)}}),a.resetFields()},e}return m()(a,[{key:"render",value:function(){var e=this.props.form.getFieldDecorator;return E.a.createElement(I["a"],{onSubmit:this.handleSearch,layout:"inline"},E.a.createElement(N["a"],{gutter:{md:8,lg:24,xl:48}},E.a.createElement(O["a"],{md:4,sm:20},E.a.createElement(I["a"].Item,{labelCol:{span:5},wrapperCol:{span:6},colon:!1},e("kind",{rules:[{message:"\u641c\u7d22\u7c7b\u578b"}]})(E.a.createElement(L["a"],{placeholder:"\u641c\u7d22\u7c7b\u578b"},E.a.createElement(V,{value:"reportno"},"\u59d4\u6258\u7f16\u53f7"),E.a.createElement(V,{value:"applicant"},"\u59d4\u6258\u4eba"),E.a.createElement(V,{value:"reportdate"},"\u59d4\u6258\u65e5\u671f"),E.a.createElement(V,{value:"shipname"},"\u8239\u540d\u6807\u8bc6"),E.a.createElement(V,{value:"cargoname"},"\u68c0\u67e5\u54c1\u540d"))))),E.a.createElement(O["a"],{md:6,sm:20},E.a.createElement(Q,null,e("value",{rules:[{message:"\u641c\u7d22\u6570\u636e"}]})(E.a.createElement(M["a"],{placeholder:"\u8bf7\u8f93\u5165"})))),E.a.createElement(O["a"],{md:8,sm:20},E.a.createElement("span",{className:T.a.submitButtons},E.a.createElement(F["a"],{type:"primary",htmlType:"submit"},"\u67e5\u8be2"),E.a.createElement(F["a"],{style:{marginLeft:8},onClick:this.handleFormReset},"\u91cd\u7f6e")))))}}]),a}(y["PureComponent"]),r=o))||r),W=q;function Z(e){return function(){var t,a=h()(e);if(G()){var n=h()(this).constructor;t=Reflect.construct(a,arguments,n)}else t=a.apply(this,arguments);return f()(this,t)}}function G(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],function(){})),!0}catch(e){return!1}}var U=I["a"].create()(W),X=(A=I["a"].create(),B=Object(S["connect"])(function(e){var t=e.testInfo,a=e.loading;return{testInfo:t,loading:a.models.testInfo}}),A(K=B((H=function(e){v()(a,e);var t=Z(a);function a(){var e;i()(this,a);for(var n=arguments.length,r=new Array(n),o=0;o<n;o++)r[o]=arguments[o];return e=t.call.apply(t,[this].concat(r)),e.state={dataSource:[],allReporterName:[]},e.columns=[{title:"\u59d4\u6258\u7f16\u53f7",dataIndex:"reportno"},{title:"\u59d4\u6258\u4eba",dataIndex:"applicant"},{title:"\u59d4\u6258\u65e5\u671f",dataIndex:"reportdate",render:function(e){return E.a.createElement("span",null,x()(e).format("YYYY-MM-DD"))}},{title:"\u8239\u540d\u6807\u8bc6",dataIndex:"shipname"},{title:"\u68c0\u67e5\u54c1\u540d",dataIndex:"cargoname"},{title:"\u72b6\u6001",dataIndex:"overallstate"},{title:"\u8f6c\u59d4\u6258\u516c\u53f8",dataIndex:"company",render:function(e,t){var a=[];if(a=e.split(" "),a.length<2)return e;for(var n=null,r=E.a.createElement("br",null),o=0;o<a.length;o++)n=0===o?a[o]:E.a.createElement("span",null,n,r,a[o]);return E.a.createElement("div",null,n)}},{title:"\u64cd\u4f5c",render:function(t,a){return E.a.createElement(y["Fragment"],null,"\u7533\u8bf7\u4f5c\u5e9f"===t.overallstate||"\u5df2\u53d1\u5e03"===t.overallstate?[E.a.createElement("a",{onClick:function(){return e.detailItem(t,a)}},"\u67e5\u770b\xa0\xa0")]:[E.a.createElement("a",{onClick:function(){return e.detailItem(t,a)}},"\u8f6c\u59d4\u6258\xa0\xa0")],E.a.createElement("a",{onClick:function(){return e.previewItem(t,a)}},"\u59d4\u6258\u8be6\u60c5"))}}],e.detailItem=function(e){sessionStorage.setItem("reportno",e.reportno),sessionStorage.setItem("shipname",e.shipname),sessionStorage.setItem("applicant",e.applicant),sessionStorage.setItem("inspway",e.inspway),sessionStorage.setItem("overallstate",e.overallstate),D.a.push({pathname:"/Entrustment/DetailForSub"})},e.previewItem=function(e){sessionStorage.setItem("reportno",e.reportno),D.a.push({pathname:"/Entrustment/DetailForEntrustment"}),localStorage.setItem("reportDetailNo",e.reportno)},e.setDataSource=function(t){e.setState({dataSource:t})},e}return m()(a,[{key:"componentDidMount",value:function(){var e=this,t=this.props.dispatch,a=JSON.parse(localStorage.getItem("userinfo")).certCode;t({type:"testInfo/getTestInfos",payload:{certCode:a},callback:function(t){e.setState({dataSource:t.data.list})}}),t({type:"testInfo/getClientName",payload:{},callback:function(t){e.setState({allReporterName:t})}})}},{key:"render",value:function(){var e=this.props,t=(e.testInfo.data,e.loading),a=this.state.dataSource;return E.a.createElement(k["a"],{title:"\u8f6c\u59d4\u6258"},E.a.createElement(l["a"],{bordered:!1,size:"small"},E.a.createElement("div",{className:C.a.tableList},E.a.createElement("div",{className:C.a.tableListForm},E.a.createElement(U,{setDataSource:this.setDataSource})),E.a.createElement(c["a"],{style:{marginTop:5},size:"middle",loading:t,dataSource:a,columns:this.columns,rowKey:"reportno",pagination:{showQuickJumper:!0,showSizeChanger:!0}}))))}}]),a}(y["PureComponent"]),K=H))||K)||K);t["default"]=X}}]);