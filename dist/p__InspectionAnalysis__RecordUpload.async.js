(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[108],{"BS1+":function(e,t,a){"use strict";a.r(t);a("IzEo");var n,r,o,l,s=a("bx4M"),c=(a("g9YV"),a("wCAj")),i=(a("14J3"),a("BMrR")),u=(a("+L6B"),a("2/Rp")),m=(a("5NDa"),a("5rEg")),p=(a("jCWc"),a("kPKH")),d=a("p0pE"),f=a.n(d),h=a("2Taf"),v=a.n(h),g=a("vZ4D"),E=a.n(g),I=a("l4Ni"),y=a.n(I),R=a("ujKo"),S=a.n(R),x=a("MhPg"),w=a.n(x),C=(a("y8nQ"),a("Vl3Y")),D=(a("OaEy"),a("2fM7")),b=a("q1tI"),k=a.n(b),F=a("MuoO"),M=a("3a4m"),Y=a.n(M),N=a("zHco"),J=a("glGN"),L=a.n(J),O=a("wd/R"),z=a.n(O);function j(e){return function(){var t,a=S()(e);if(B()){var n=S()(this).constructor;t=Reflect.construct(a,arguments,n)}else t=a.apply(this,arguments);return y()(this,t)}}function B(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],function(){})),!0}catch(e){return!1}}var P=D["a"].Option,V=(n=C["a"].create(),r=Object(F["connect"])(function(e){var t=e.testRecord,a=e.loading;return{testRecord:t,loading:a.models.testRecord}}),n(o=r((l=function(e){w()(a,e);var t=j(a);function a(){var e;v()(this,a);for(var n=arguments.length,r=new Array(n),o=0;o<n;o++)r[o]=arguments[o];return e=t.call.apply(t,[this].concat(r)),e.state={},e.columns=[{title:"\u59d4\u6258\u7f16\u53f7",dataIndex:"reportno"},{title:"\u59d4\u6258\u65e5\u671f",dataIndex:"reportdate",render:function(e){return k.a.createElement("span",null,z()(e).format("YYYY-MM-DD"))}},{title:"\u8239\u540d\u6807\u8bc6",dataIndex:"shipname"},{title:"\u68c0\u67e5\u54c1\u540d",dataIndex:"cargoname"},{title:"\u7533\u8bf7\u9879\u76ee",dataIndex:"inspway"},{title:"\u72b6\u6001\u65e5\u671f",dataIndex:"overalltime",render:function(t){return e.isValidDate(t)}},{title:"\u72b6\u6001",dataIndex:"overallstate"},{title:"\u6d4b\u8bd5\u62a5\u544a",dataIndex:"recordname",render:function(e,t){if(null!==e&&void 0!==e){var a=[];if(a=e.split(" "),a.length<2)return e;for(var n=null,r=k.a.createElement("br",null),o=/\.{1}[a-z]{1,}$/,l=0;l<a.length;l++)n=0===l?null!==o.exec(a[l])?a[l].slice(0,o.exec(a[l]).index):a[l]:null!==o.exec(a[l])?k.a.createElement("span",null,n,r,a[l].slice(0,o.exec(a[l]).index)):k.a.createElement("span",null,n,r,a[l]);return k.a.createElement("div",null,n)}}},{title:"\u64cd\u4f5c",render:function(t,a){return k.a.createElement(b["Fragment"],null,"\u5df2\u53d1\u5e03"===t.overallstate||"\u7533\u8bf7\u4f5c\u5e9f"===t.overallstate?[k.a.createElement("a",{onClick:function(){return e.uploadItem(t,a)}},"\u67e5\u770b\u62a5\u544a\xa0\xa0")]:[k.a.createElement("a",{onClick:function(){return e.uploadItem(t,a)}},"\u4e0a\u4f20\u62a5\u544a\xa0\xa0")],k.a.createElement("a",{onClick:function(){return e.previewItem(t,a)}},"\u59d4\u6258\u8be6\u60c5"))}}],e.uploadItem=function(e){sessionStorage.setItem("reportno",e.reportno),Y.a.push({pathname:"/InspectionAnalysis/ResultRecord"}),sessionStorage.setItem("ResultRecord_overallstate",e.overallstate)},e.previewItem=function(e){sessionStorage.setItem("reportno",e.reportno),Y.a.push({pathname:"/Entrustment/DetailForEntrustment"})},e.isValidDate=function(e){return void 0!==e&&null!==e?k.a.createElement("span",null,z()(e).format("YYYY-MM-DD")):[]},e.modifyItem=function(e){sessionStorage.setItem("reportno",e.reportno),sessionStorage.setItem("shipname",e.shipname),sessionStorage.setItem("applicant",e.applicant),sessionStorage.setItem("reacordupload_overallstate",e.overallstate),Y.a.push({pathname:"/TestRecord/UploadDetail"})},e.handleSearch=function(t){t.preventDefault();var a=e.props,n=a.dispatch,r=a.form;r.validateFields(function(e,t){if(console.log(e),!e){var a=JSON.parse(localStorage.getItem("userinfo")),r=f()({},t,{certCode:a.certCode,source:"\u6d4b\u8bd5\u62a5\u544a"});n({type:"testRecord/getRecordList",payload:r})}})},e.handleFormReset=function(){var t=e.props.form;t.resetFields();var a=JSON.parse(localStorage.getItem("userinfo")),n=e.props.dispatch;n({type:"testRecord/getRecordList",payload:{certCode:a.certCode,source:"\u6d4b\u8bd5\u62a5\u544a"}})},e}return E()(a,[{key:"componentDidMount",value:function(){var e=this.props.dispatch,t=JSON.parse(localStorage.getItem("userinfo"));e({type:"testRecord/getRecordList",payload:{certCode:t.certCode,source:"\u6d4b\u8bd5\u62a5\u544a"}})}},{key:"renderSimpleForm",value:function(){var e=this.props.form.getFieldDecorator;return k.a.createElement(C["a"],{onSubmit:this.handleSearch,layout:"inline"},k.a.createElement(i["a"],{gutter:{md:8,lg:24,xl:48}},k.a.createElement(p["a"],{md:4,sm:20},k.a.createElement(C["a"].Item,{labelCol:{span:5},wrapperCol:{span:6},colon:!1},e("kind",{rules:[{message:"\u641c\u7d22\u7c7b\u578b"}]})(k.a.createElement(D["a"],{placeholder:"\u641c\u7d22\u7c7b\u578b"},k.a.createElement(P,{value:"reportno"},"\u59d4\u6258\u7f16\u53f7"),k.a.createElement(P,{value:"shipname"},"\u8239\u540d\u6807\u8bc6"),k.a.createElement(P,{value:"cargoname"},"\u68c0\u67e5\u54c1\u540d"))))),k.a.createElement(p["a"],{span:6},k.a.createElement(C["a"].Item,null,e("value",{rules:[{message:"\u641c\u7d22\u6570\u636e"}]})(k.a.createElement(m["a"],{placeholder:"\u8bf7\u8f93\u5165"})))),k.a.createElement(p["a"],{span:5},k.a.createElement("span",{className:L.a.submitButtons},k.a.createElement(u["a"],{type:"primary",htmlType:"submit"},"\u67e5\u8be2"),k.a.createElement(u["a"],{style:{marginLeft:8},onClick:this.handleFormReset},"\u91cd\u7f6e")))))}},{key:"render",value:function(){var e=this.props,t=e.testRecord.data,a=e.loading;return k.a.createElement(N["a"],{title:"\u6d4b\u8bd5\u62a5\u544a\u4e0a\u4f20"},k.a.createElement(s["a"],{bordered:!1,size:"small"},k.a.createElement("div",{className:L.a.tableList},k.a.createElement("div",{className:L.a.tableListForm},this.renderSimpleForm()),k.a.createElement(c["a"],{size:"middle",loading:a,dataSource:t.list,columns:this.columns,rowKey:"reportno",pagination:{showQuickJumper:!0,showSizeChanger:!0}}))))}}]),a}(b["PureComponent"]),o=l))||o)||o);t["default"]=V}}]);