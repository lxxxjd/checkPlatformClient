(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[146],{rZM1:function(e,t,a){e.exports={standardTable:"antd-pro-components-standard-table-index-standardTable",tableAlert:"antd-pro-components-standard-table-index-tableAlert"}},xJWj:function(e,t,a){"use strict";a.r(t);a("IzEo");var n=a("bx4M"),r=a("jehZ"),o=a.n(r),l=(a("14J3"),a("BMrR")),i=(a("5NDa"),a("5rEg")),c=(a("jCWc"),a("kPKH")),s=a("p0pE"),d=a.n(s),u=a("2Taf"),p=a.n(u),m=a("vZ4D"),f=a.n(m),h=a("l4Ni"),v=a.n(h),g=a("ujKo"),R=a.n(g),y=a("MhPg"),I=a.n(y),E=(a("OaEy"),a("2fM7")),b=(a("y8nQ"),a("Vl3Y")),k=(a("2qtc"),a("kLXV")),C=(a("g9YV"),a("wCAj")),S=(a("+L6B"),a("2/Rp")),x=a("q1tI"),D=a.n(x),w=a("MuoO"),M=a("3a4m"),V=a.n(M),O=a("Y/ft"),Y=a.n(O),N=a("rZM1"),F=a.n(N);function J(e){return function(){var t,a=R()(e);if(j()){var n=R()(this).constructor;t=Reflect.construct(a,arguments,n)}else t=a.apply(this,arguments);return v()(this,t)}}function j(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],function(){})),!0}catch(e){return!1}}function z(e){var t=[];return e.forEach(function(e){e.needTotal&&t.push(d()({},e,{total:0}))}),t}x["PureComponent"];var P,T,A,L,K=a("zHco"),Z=a("glGN"),B=a.n(Z),Q=a("wd/R"),q=a.n(Q);function H(e){return function(){var t,a=R()(e);if(W()){var n=R()(this).constructor;t=Reflect.construct(a,arguments,n)}else t=a.apply(this,arguments);return v()(this,t)}}function W(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],function(){})),!0}catch(e){return!1}}var _=function(e){var t=e.modalReadRecordVisible,a=e.handleModalReadRecordVisible,n=e.ReadRecordData,r=e.loading,o=function(e){return void 0!==e&&null!==e?D.a.createElement("span",null,q()(e).format("YYYY-MM-DD")):null},l=[{title:"\u68c0\u9a8c\u5458",dataIndex:"inspman"},{title:"\u7535\u8bdd",dataIndex:"tel"},{title:"\u4efb\u52a1",dataIndex:"inspway"},{title:"\u5c97\u4f4d",dataIndex:"position"},{title:"\u5de5\u65f6",dataIndex:"manhour"},{title:"\u52b3\u52a1",dataIndex:"labourfee"},{title:"\u8bef\u9910",dataIndex:"lunchfee"},{title:"\u4ea4\u901a",dataIndex:"trafficfee"},{title:"\u5176\u4ed6",dataIndex:"otherfee"},{title:"\u6307\u6d3e\u65e5\u671f",dataIndex:"taskdate",render:function(e){return o(e)}},{title:"\u6307\u6d3e\u4eba",dataIndex:"taskman"}];return D.a.createElement(k["a"],{destroyOnClose:!0,title:"\u67e5\u770b\u68c0\u9a8c\u4eba\u5458",visible:t,style:{top:100},width:1e3,onCancel:function(){return a()},footer:[D.a.createElement(S["a"],{type:"primary",onClick:function(){return a()}},"\u5173\u95ed")]},D.a.createElement(C["a"],{size:"middle",loading:r,dataSource:n,columns:l,rowKey:"inspman",pagination:{showQuickJumper:!0,showSizeChanger:!0}}))},G=b["a"].Item,X=E["a"].Option,U=function(e){return Object.keys(e).map(function(t){return e[t]}).join(",")},$=(P=Object(w["connect"])(function(e){var t=e.task,a=e.loading;return{task:t,loading:a.models.task}}),T=b["a"].create(),P(A=T((L=function(e){I()(a,e);var t=H(a);function a(){var e;p()(this,a);for(var n=arguments.length,r=new Array(n),o=0;o<n;o++)r[o]=arguments[o];return e=t.call.apply(t,[this].concat(r)),e.state={formValues:{},modalReadRecordVisible:!1,ReadRecordData:[],isinspectorvisible:!1},e.columns=[{title:"\u59d4\u6258\u7f16\u53f7",dataIndex:"reportno"},{title:"\u59d4\u6258\u65e5\u671f",dataIndex:"reportdate",render:function(e){return D.a.createElement("span",null,q()(e).format("YYYY-MM-DD"))}},{title:"\u59d4\u6258\u4eba",dataIndex:"applicant"},{title:"\u8239\u540d\u6807\u8bc6",dataIndex:"shipname"},{title:"\u68c0\u67e5\u54c1\u540d",dataIndex:"cargoname"},{title:"\u72b6\u6001\u65e5\u671f",dataIndex:"overalltime",render:function(t){return e.isValidDate(t)}},{title:"\u72b6\u6001",dataIndex:"overallstate"},{title:"\u68c0\u9a8c\u4eba\u5458",dataIndex:"inspman"},{title:"\u64cd\u4f5c",render:function(t,a){return D.a.createElement(x["Fragment"],null,"\u7533\u8bf7\u4f5c\u5e9f"!==t.overallstate&&"\u5df2\u53d1\u5e03"!==t.overallstate&&!0===e.state.isinspectorvisible?[D.a.createElement("a",{onClick:function(){return e.toInspectDetail(t,a)}},"\u73b0\u573a\u6307\u6d3e \xa0\xa0")]:[],D.a.createElement("a",{onClick:function(){return e.ReviewSurveyor(t,a)}},"\u67e5\u770b")," \xa0\xa0",D.a.createElement("a",{onClick:function(){return e.previewItem(t,a)}},"\u59d4\u6258\u8be6\u60c5"))}}],e.isValidDate=function(e){return void 0!==e&&null!==e?D.a.createElement("span",null,q()(e).format("YYYY-MM-DD")):[]},e.handleStandardTableChange=function(t,a,n){var r=e.props,o=r.dispatch,l=r.form,i=e.state.formValues;l.validateFields(function(e,r){console.log(e);var l=Object.keys(a).reduce(function(e,t){var n=d()({},e);return n[t]=U(a[t]),n},{}),c=JSON.parse(localStorage.getItem("userinfo")),s=d()({currentPage:t.current,pageSize:t.pageSize,certCode:c.certCode,kind:r.kind,value:r.value,role:c.role,nameC:c.nameC},i,l);n.field&&(s.sorter="".concat(n.field,"_").concat(n.order)),o({type:"task/fetchInspect",payload:s})})},e.ReviewSurveyor=function(t){var a=e.props.dispatch,n=new FormData;n.append("reportno",t.reportno);var r=JSON.parse(localStorage.getItem("userinfo")),o={certCode:r.certCode,reportNo:t.reportno};a({type:"task/getInspects",payload:o,callback:function(t){if(t){for(var a=[],n=0;n<t.list.length;n++)1===t.list[n].state&&a.push(t.list[n]);e.state.ReadRecordData=a}}}),e.handleModalReadRecordVisible(!0)},e.previewItem=function(e){V.a.push({pathname:"/Entrustment/DetailForEntrustment",state:e.reportno})},e.toInspectDetail=function(e){localStorage.setItem("reportinfoAndInspect",JSON.stringify(e)),sessionStorage.setItem("overallstate_InspectorDetail",e.overallstate),V.a.push({pathname:"/TaskAppoint/InspectorDetail"})},e.handleFormReset=function(){var t=JSON.parse(localStorage.getItem("userinfo")),a={certCode:t.certCode,role:t.role,nameC:t.nameC},n=e.props.form;n.resetFields(),e.setState({formValues:{}});var r=e.props.dispatch;r({type:"task/fetchInspect",payload:a})},e.handleSearch=function(t){t.preventDefault();var a=e.props,n=a.dispatch,r=a.form;r.validateFields(function(e,t){if(console.log(e),!e){var a=JSON.parse(localStorage.getItem("userinfo")),r=d()({},t,{kind:t.kind,value:t.value,certCode:a.certCode,role:a.role,nameC:a.nameC});n({type:"task/fetchInspect",payload:r})}})},e.handleModalReadRecordVisible=function(t){e.setState({modalReadRecordVisible:!!t})},e}return f()(a,[{key:"componentDidMount",value:function(){var e=JSON.parse(localStorage.getItem("userinfo"));-1===e.role.indexOf("\u603b\u7ecf\u7406")&&-1===e.role.indexOf("\u4e1a\u52a1\u526f\u603b")&&-1===e.role.indexOf("\u64cd\u4f5c\u7ecf\u7406")||(this.state.isinspectorvisible=!0);var t=this.props.dispatch,a={certCode:e.certCode,role:e.role,nameC:e.nameC};t({type:"task/fetchInspect",payload:a})}},{key:"renderSimpleForm",value:function(){var e=this.props.form.getFieldDecorator;return D.a.createElement(b["a"],{onSubmit:this.handleSearch,layout:"inline"},D.a.createElement(l["a"],{gutter:{md:8,lg:24,xl:48}},D.a.createElement(c["a"],{md:4,sm:20},D.a.createElement(b["a"].Item,{labelCol:{span:5},wrapperCol:{span:6},colon:!1},e("kind",{initialValue:"shipname",rules:[{message:"\u641c\u7d22\u7c7b\u578b"}]})(D.a.createElement(E["a"],{placeholder:"\u641c\u7d22\u7c7b\u578b"},D.a.createElement(X,{value:"reportno"},"\u59d4\u6258\u7f16\u53f7"),D.a.createElement(X,{value:"shipname"},"\u8239\u540d\u6807\u8bc6"),D.a.createElement(X,{value:"cargoname"},"\u68c0\u67e5\u54c1\u540d"),D.a.createElement(X,{value:"applicant"},"\u59d4\u6258\u4eba"),D.a.createElement(X,{value:"agent"},"\u4ee3\u7406\u4eba"),D.a.createElement(X,{value:"overallstate"},"\u72b6\u6001"))))),D.a.createElement(c["a"],{md:6,sm:20},D.a.createElement(G,null,e("value",{rules:[{message:"\u641c\u7d22\u6570\u636e"}]})(D.a.createElement(i["a"],{placeholder:"\u8bf7\u8f93\u5165"})))),D.a.createElement(c["a"],{md:8,sm:20},D.a.createElement("span",{className:B.a.submitButtons},D.a.createElement(S["a"],{type:"primary",htmlType:"submit"},"\u67e5\u8be2"),D.a.createElement(S["a"],{style:{marginLeft:8},onClick:this.handleFormReset},"\u91cd\u7f6e")))))}},{key:"render",value:function(){var e=this.props,t=e.task.dataInspect,a=e.loading,r={handleModalReadRecordVisible:this.handleModalReadRecordVisible},l=this.state,i=l.modalReadRecordVisible,c=l.ReadRecordData;return D.a.createElement(K["a"],{title:"\u68c0\u9a8c\u6307\u6d3e"},D.a.createElement(n["a"],{bordered:!1,size:"small"},D.a.createElement("div",{className:B.a.tableList},D.a.createElement("div",{className:B.a.tableListForm},this.renderSimpleForm()),D.a.createElement(_,o()({},r,{modalReadRecordVisible:i,ReadRecordData:c,loading:a})),D.a.createElement(C["a"],{size:"middle",rowKey:"reportno",loading:a,dataSource:t.list,pagination:{showQuickJumper:!0,showSizeChanger:!0},columns:this.columns}))))}}]),a}(x["PureComponent"]),A=L))||A)||A);t["default"]=$}}]);