(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[144],{aCJl:function(e,t,a){"use strict";a.r(t);a("IzEo");var n,r,o,l,i=a("bx4M"),c=a("jehZ"),s=a.n(c),d=(a("14J3"),a("BMrR")),u=(a("5NDa"),a("5rEg")),m=(a("jCWc"),a("kPKH")),p=a("p0pE"),f=a.n(p),h=a("2Taf"),v=a.n(h),g=a("vZ4D"),R=a.n(g),E=a("l4Ni"),C=a.n(E),y=a("ujKo"),k=a.n(y),I=a("MhPg"),b=a.n(I),S=(a("OaEy"),a("2fM7")),D=(a("y8nQ"),a("Vl3Y")),w=(a("2qtc"),a("kLXV")),x=(a("g9YV"),a("wCAj")),V=(a("+L6B"),a("2/Rp")),M=a("q1tI"),O=a.n(M),N=a("MuoO"),F=a("3a4m"),J=a.n(F),Y=a("zHco"),z=a("glGN"),j=a.n(z),L=a("wd/R"),P=a.n(L);function K(e){return function(){var t,a=k()(e);if(T()){var n=k()(this).constructor;t=Reflect.construct(a,arguments,n)}else t=a.apply(this,arguments);return C()(this,t)}}function T(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],function(){})),!0}catch(e){return!1}}var A=function(e){var t=e.modalReadRecordVisible,a=e.handleModalReadRecordVisible,n=e.ReadRecordData,r=e.loading,o=function(e){return void 0!==e&&null!==e?O.a.createElement("span",null,P()(e).format("MM-DD")):null},l=[{title:"\u68c0\u9a8c\u5458",dataIndex:"inspman"},{title:"\u624b\u673a",dataIndex:"tel"},{title:"\u4efb\u52a1",dataIndex:"inspway"},{title:"\u5c97\u4f4d",dataIndex:"position"},{title:"\u5de5\u65f6",dataIndex:"manhour"},{title:"\u52b3\u52a1",dataIndex:"labourfee"},{title:"\u8bef\u9910",dataIndex:"lunchfee"},{title:"\u4ea4\u901a",dataIndex:"trafficfee"},{title:"\u5176\u4ed6",dataIndex:"otherfee"},{title:"\u6307\u6d3e\u65e5\u671f",dataIndex:"taskdate",render:function(e){return o(e)}},{title:"\u6307\u6d3e\u4eba",dataIndex:"taskman"}];return O.a.createElement(w["a"],{destroyOnClose:!0,title:"\u67e5\u770b\u5ba2\u670d\u4eba\u5458",visible:t,style:{top:100},width:1e3,onCancel:function(){return a()},footer:[O.a.createElement(V["a"],{type:"primary",onClick:function(){return a()}},"\u5173\u95ed")]},O.a.createElement(x["a"],{size:"middle",loading:r,dataSource:n,columns:l,rowKey:"inspman",pagination:{showQuickJumper:!0,showSizeChanger:!0}}))},B=D["a"].Item,Q=S["a"].Option,q=function(e){return Object.keys(e).map(function(t){return e[t]}).join(",")},H=(n=Object(N["connect"])(function(e){var t=e.task,a=e.loading;return{task:t,loading:a.models.task}}),r=D["a"].create(),n(o=r((l=function(e){b()(a,e);var t=K(a);function a(){var e;v()(this,a);for(var n=arguments.length,r=new Array(n),o=0;o<n;o++)r[o]=arguments[o];return e=t.call.apply(t,[this].concat(r)),e.state={formValues:{},modalReadRecordVisible:!1,ReadRecordData:[],iscustomsvisible:!1},e.columns=[{title:"\u59d4\u6258\u7f16\u53f7",dataIndex:"reportno"},{title:"\u59d4\u6258\u65e5\u671f",dataIndex:"reportdate",render:function(e){return O.a.createElement("span",null,P()(e).format("YYYY-MM-DD"))}},{title:"\u59d4\u6258\u4eba",dataIndex:"applicant"},{title:"\u8239\u540d\u6807\u8bc6",dataIndex:"shipname"},{title:"\u68c0\u67e5\u54c1\u540d",dataIndex:"cargoname"},{title:"\u72b6\u6001\u65e5\u671f",dataIndex:"overalltime",render:function(t){return e.isValidDate(t)}},{title:"\u72b6\u6001",dataIndex:"overallstate"},{title:"\u5ba2\u670d\u4eba\u5458",dataIndex:"inspman"},{title:"\u64cd\u4f5c",render:function(t,a){return O.a.createElement(M["Fragment"],null,"\u7533\u8bf7\u4f5c\u5e9f"!==t.overallstate&&"\u5df2\u53d1\u5e03"!==t.overallstate&&!0===e.state.iscustomsvisible?[O.a.createElement("a",{onClick:function(){return e.toCustomerDetail(t,a)}},"\u5ba2\u670d\u6307\u6d3e \xa0\xa0")]:[],O.a.createElement("a",{onClick:function(){return e.ReviewMerchandiser(t,a)}},"\u67e5\u770b")," \xa0\xa0",O.a.createElement("a",{onClick:function(){return e.previewItem(t,a)}},"\u59d4\u6258\u8be6\u60c5"))}}],e.ReviewMerchandiser=function(t){var a=e.props.dispatch,n=new FormData;n.append("reportno",t.reportno);var r=JSON.parse(localStorage.getItem("userinfo")),o={certCode:r.certCode,reportNo:t.reportno};a({type:"task/getCustomers",payload:o,callback:function(t){if(t){for(var a=[],n=0;n<t.list.length;n++)1===t.list[n].state&&a.push(t.list[n]);e.state.ReadRecordData=a}}}),e.handleModalReadRecordVisible(!0)},e.isValidDate=function(e){return void 0!==e&&null!==e?O.a.createElement("span",null,P()(e).format("YYYY-MM-DD")):[]},e.handleStandardTableChange=function(t,a,n){var r=e.props,o=r.dispatch,l=r.form,i=e.state.formValues;l.validateFields(function(e,r){console.log(e);var l=Object.keys(a).reduce(function(e,t){var n=f()({},e);return n[t]=q(a[t]),n},{}),c=JSON.parse(localStorage.getItem("userinfo")),s=f()({currentPage:t.current,pageSize:t.pageSize,certCode:c.certCode,kind:r.kind,value:r.value,role:c.role,nameC:c.nameC},i,l);n.field&&(s.sorter="".concat(n.field,"_").concat(n.order)),o({type:"task/fetch",payload:s})})},e.previewItem=function(e){window.open("/Entrustment/DetailForEntrustment"),localStorage.setItem("reportDetailNo",e.reportno)},e.toCustomerDetail=function(e){localStorage.setItem("reportinfo",JSON.stringify(e)),sessionStorage.setItem("overallstate_CustomerServiceDetail",e.overallstate),J.a.push({pathname:"/TaskAppoint/CustomerServiceDetail"})},e.handleFormReset=function(){var t=JSON.parse(localStorage.getItem("userinfo")),a={certCode:t.certCode,role:t.role,nameC:t.nameC},n=e.props.form;n.resetFields(),e.setState({formValues:{}});var r=e.props.dispatch;r({type:"task/fetch",payload:a})},e.handleSearch=function(t){t.preventDefault();var a=e.props,n=a.dispatch,r=a.form;r.validateFields(function(e,t){if(console.log(e),!e){var a=JSON.parse(localStorage.getItem("userinfo")),r=f()({},t,{kind:t.kind,value:t.value,certCode:a.certCode,role:a.role,nameC:a.nameC});n({type:"task/fetch",payload:r})}})},e.handleModalReadRecordVisible=function(t){e.setState({modalReadRecordVisible:!!t})},e}return R()(a,[{key:"componentDidMount",value:function(){var e=JSON.parse(localStorage.getItem("userinfo"));-1===e.role.indexOf("\u603b\u7ecf\u7406")&&-1===e.role.indexOf("\u4e1a\u52a1\u526f\u603b")&&-1===e.role.indexOf("\u4e1a\u52a1\u7ecf\u7406")||(this.state.iscustomsvisible=!0);var t=this.props.dispatch,a={certCode:e.certCode,role:e.role,nameC:e.nameC};t({type:"task/fetch",payload:a})}},{key:"renderSimpleForm",value:function(){var e=this.props.form.getFieldDecorator;return O.a.createElement(D["a"],{onSubmit:this.handleSearch,layout:"inline"},O.a.createElement(d["a"],{gutter:{md:8,lg:24,xl:48}},O.a.createElement(m["a"],{md:4,sm:20},O.a.createElement(D["a"].Item,{labelCol:{span:5},wrapperCol:{span:6},colon:!1},e("kind",{initialValue:"shipname",rules:[{message:"\u641c\u7d22\u7c7b\u578b"}]})(O.a.createElement(S["a"],{placeholder:"\u641c\u7d22\u7c7b\u578b"},O.a.createElement(Q,{value:"reportno"},"\u59d4\u6258\u7f16\u53f7"),O.a.createElement(Q,{value:"shipname"},"\u8239\u540d\u6807\u8bc6"),O.a.createElement(Q,{value:"cargoname"},"\u68c0\u67e5\u54c1\u540d"),O.a.createElement(Q,{value:"applicant"},"\u59d4\u6258\u4eba"),O.a.createElement(Q,{value:"agent"},"\u4ee3\u7406\u4eba"),O.a.createElement(Q,{value:"overallstate"},"\u72b6\u6001"))))),O.a.createElement(m["a"],{md:6,sm:20},O.a.createElement(B,null,e("value",{rules:[{message:"\u641c\u7d22\u6570\u636e"}]})(O.a.createElement(u["a"],{placeholder:"\u8bf7\u8f93\u5165"})))),O.a.createElement(m["a"],{md:8,sm:20},O.a.createElement("span",{className:j.a.submitButtons},O.a.createElement(V["a"],{type:"primary",htmlType:"submit"},"\u67e5\u8be2"),O.a.createElement(V["a"],{style:{marginLeft:8},onClick:this.handleFormReset},"\u91cd\u7f6e")))))}},{key:"render",value:function(){var e=this.props,t=e.task.data,a=e.loading,n={handleModalReadRecordVisible:this.handleModalReadRecordVisible},r=this.state,o=r.modalReadRecordVisible,l=r.ReadRecordData;return O.a.createElement(Y["a"],{title:"\u5ba2\u670d\u6307\u6d3e"},O.a.createElement(i["a"],{bordered:!1,size:"small"},O.a.createElement("div",{className:j.a.tableList},O.a.createElement("div",{className:j.a.tableListForm},this.renderSimpleForm()),O.a.createElement(A,s()({},n,{modalReadRecordVisible:o,ReadRecordData:l,loading:a})),O.a.createElement(A,s()({},n,{modalReadRecordVisible:o,ReadRecordData:l,loading:a})),O.a.createElement(x["a"],{size:"middle",rowKey:"reportno",loading:a,dataSource:t.list,pagination:{showQuickJumper:!0,showSizeChanger:!0},columns:this.columns}))))}}]),a}(M["PureComponent"]),o=l))||o)||o);t["default"]=H}}]);